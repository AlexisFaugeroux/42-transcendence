export interface DecodedPeaks {
  buckets: number;
  min: Float32Array;
  max: Float32Array;
}

const MAGIC = 'MSNP';

export function decodePeak(buffer: ArrayBuffer): DecodedPeaks {
  const view = new DataView(buffer);

  const magic = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3));
  if (magic !== MAGIC) throw new Error('Not an MSNP pekas file');

  const channels = view.getUint8(5);
  const buckets = view.getUint16(6, true);
  const min = new Float32Array(buckets);
  const max = new Float32Array(buckets);

  const base = 8;

  for (let b = 0; b < buckets; b++) {
    let mn = 0;
    let mx = 0;
    for (let c = 0; c < channels; c++) {
      const off = base + (c * buckets + b) * 2;
      mn += view.getInt8(off) / 127;
      mx += view.getInt8(off + 1) / 127;
    }
    min[b] = mn / channels;
    max[b] = mx / channels;
  }
  return { buckets, max, min };
}
