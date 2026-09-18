import { ApiErrorReponse, apiUpload } from '@transcendence/auth';

export type TrackVisibility = 'PRIVATE' | 'SHARED' | 'PUBLIC';

export interface UploadTrackFields {
  title: string;
  visibility: TrackVisibility;
  projectId: string;
  bpm: number;
}

export async function uploadTrack(
  wav: ArrayBuffer,
  fields: UploadTrackFields,
  onProgress?: (ratio: number) => void,
): Promise<void> {
  const form = new FormData();
  // Text fields BEFORE the file — busboy only exposes fields that arrived first.
  form.append('title', fields.title);
  form.append('visibility', fields.visibility);
  form.append('projectId', fields.projectId);
  form.append('bpm', String(fields.bpm));
  form.append('track', new File([wav], `${fields.title}.wav`, { type: 'audio/wav' }));

  const res = await apiUpload('/api/tracks/upload', form, onProgress);

  if (!res.ok) throw new ApiErrorReponse(`[/api/tracks/upload] : ${res.statusText}`, res.status);
}
