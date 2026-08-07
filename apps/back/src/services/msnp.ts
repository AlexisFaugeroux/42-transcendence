class MsnpManager {
  private readonly PEAKS_MAGIC;
  private readonly PEAKS_VERSION;
  private readonly PEAKS_BUCKETS;
  private readonly PEAKS_HEADER_BYTES = 8;

  constructor({ buckets, magic, version }: { magic: string; version: number; buckets: number }) {
    this.PEAKS_MAGIC = magic;
    this.PEAKS_VERSION = version;
    this.PEAKS_BUCKETS = buckets;
  }

  public generatePeaks(channels: Float32Array[]): Buffer {
    const numChannels = channels.length;
    const numFrames = channels[0].length ?? 0;
    const buffer = Buffer.alloc(this.PEAKS_HEADER_BYTES + numChannels * this.PEAKS_BUCKETS * 2);

    buffer.write(this.PEAKS_MAGIC, 0, 'ascii');
    buffer.writeUint8(this.PEAKS_VERSION, 4);
    buffer.writeUint8(numChannels, 5);
    buffer.writeUint16LE(this.PEAKS_BUCKETS, 6);

    let offset = this.PEAKS_HEADER_BYTES;
    for (const data of channels) {
      for (let b = 0; b < this.PEAKS_BUCKETS; b++) {
        const start = Math.floor((b * numFrames) / this.PEAKS_BUCKETS);
        const end = Math.max(start + 1, Math.floor(((b + 1) * numFrames) / this.PEAKS_BUCKETS));
        let min = 0;
        let max = 0;
        for (let i = start; i < end && i < numFrames; i++) {
          const v = data[i];
          if (v < min) min = v;
          if (v > max) max = v;
        }
        buffer.writeInt8(this._encodeSample(min), offset++);
        buffer.writeInt8(this._encodeSample(max), offset++);
      }
    }
    return buffer;
  }

  private _encodeSample(v: number): number {
    // float [-1, 1] -> int8 [-127, 127]
    const n = Math.round(v * 127);
    return n < -127 ? -127 : n > 127 ? 127 : n;
  }
}

export const msnpManager = new MsnpManager({ buckets: 1024, magic: 'MSNP', version: 1 });
