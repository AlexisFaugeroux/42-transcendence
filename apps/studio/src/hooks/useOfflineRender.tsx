import { WavFile } from '@opendaw/lib-dsp';
import { DefaultObservableValue, Errors, Option, type Terminable } from '@opendaw/lib-std';
import { OfflineEngineRenderer } from '@opendaw/studio-core';
import { useEffect, useRef, useState } from 'react';
import { useProject } from '../contexts/ProjectContext';

export interface UseOfflineRenderResult {
  cancel: () => void;
  error: Error | null;
  isRendering: boolean;
  progress: number;
  start: () => Promise<ArrayBuffer | null>;
}

export function useOfflineRender(): UseOfflineRenderResult {
  const { project } = useProject();
  const [progress, setProgress] = useState(0);
  const [isRendering, setIsRendering] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const subscriptionRef = useRef<Terminable | null>(null);
  const runIdRef = useRef(0);
  const mountedRef = useRef(true);

  const cancel = (): void => {
    abortRef.current?.abort();
    abortRef.current = null;
    subscriptionRef.current?.terminate();
    subscriptionRef.current = null;
  };

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
      abortRef.current = null;
      subscriptionRef.current?.terminate();
      subscriptionRef.current = null;
    };
  }, []);

  const start = async (): Promise<ArrayBuffer | null> => {
    cancel();

    const runId = ++runIdRef.current;
    const abortController = new AbortController();
    abortRef.current = abortController;

    const progressValue = new DefaultObservableValue(0);
    const subscription = progressValue.subscribe((owner) => {
      if (!mountedRef.current || runIdRef.current !== runId) return;
      setProgress(owner.getValue());
    });
    subscriptionRef.current = subscription;

    if (mountedRef.current) {
      setProgress(0);
      setError(null);
      setIsRendering(true);
    }

    try {
      // Must copy: the live project's LiveStreamReceiver is already connected.
      // Same pattern as openDAW Mixdowns.exportMixdown.
      const audioData = await OfflineEngineRenderer.start(
        project.copy(),
        Option.None,
        progressValue,
        abortController.signal,
      );
      if (runIdRef.current !== runId) return null;
      return WavFile.encodeFloats(audioData);
    } catch (caught) {
      if (Errors.isAbort(caught) || runIdRef.current !== runId) return null;
      const next = caught instanceof Error ? caught : new Error(String(caught));
      if (mountedRef.current) setError(next);
      throw next;
    } finally {
      subscription.terminate();
      if (subscriptionRef.current === subscription) subscriptionRef.current = null;
      if (abortRef.current === abortController) abortRef.current = null;
      if (mountedRef.current && runIdRef.current === runId) setIsRendering(false);
    }
  };

  return { cancel, error, isRendering, progress, start };
}
