import type { EffectFactory } from '@opendaw/studio-core';
import { EffectFactories } from '@opendaw/studio-core';
import { theme } from '@transcendence/ui';
import type { StudioIconLabel } from '../components/StudioIcon/types';

export type EffectFamily = 'dynamics' | 'distortion' | 'space' | 'stereo';

export interface EffectEntry {
  factory: EffectFactory;
  family: EffectFamily;
  label: string;
  icon: StudioIconLabel;
  accent: string;
}

export const EFFECT_ENTRIES: readonly EffectEntry[] = [
  {
    factory: EffectFactories.Compressor,
    family: 'dynamics',
    label: 'Compressor',
    icon: 'compressor',
    accent: theme.yellow,
  },
  {
    factory: EffectFactories.Gate,
    family: 'dynamics',
    label: 'Noise Gate',
    icon: 'gate',
    accent: theme.cyan,
  },
  {
    factory: EffectFactories.Maximizer,
    family: 'dynamics',
    label: 'Maximizer',
    icon: 'maximizer',
    accent: theme.yellow,
  },
  {
    factory: EffectFactories.Crusher,
    family: 'distortion',
    label: 'Bit Crusher',
    icon: 'crusher',
    accent: theme.red,
  },
  {
    factory: EffectFactories.Fold,
    family: 'distortion',
    label: 'Wavefolder',
    icon: 'fold',
    accent: theme.red,
  },
  {
    factory: EffectFactories.Waveshaper,
    family: 'distortion',
    label: 'Waveshaper',
    icon: 'waveshaper',
    accent: theme.red,
  },
  {
    factory: EffectFactories.Delay,
    family: 'space',
    label: 'Delay',
    icon: 'delay',
    accent: theme.purple,
  },
  {
    factory: EffectFactories.Reverb,
    family: 'space',
    label: 'Free Reverb',
    icon: 'reverb',
    accent: theme.green,
  },
  {
    factory: EffectFactories.DattorroReverb,
    family: 'space',
    label: 'Dattorro Reverb',
    icon: 'dattorro',
    accent: theme.green,
  },
  {
    factory: EffectFactories.StereoTool,
    family: 'stereo',
    label: 'Stereo Tool',
    icon: 'stereoTool',
    accent: theme.fg1,
  },
  {
    factory: EffectFactories.Tidal,
    family: 'stereo',
    label: 'Tremolo / Autopan',
    icon: 'tremolo',
    accent: theme.fg1,
  },
];
