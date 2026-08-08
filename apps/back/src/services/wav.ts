import { type FileHandle, open } from 'node:fs/promises';

interface WavFmt {
  audioFormat: number;
  channels: number;
  sampleRate: number;
  byteRate: number;
  blockAlign: number;
  bitsPerSample: number;
}

export interface WavInfo {
  fmt: WavFmt;
  durationMs: number;
  size: number;
  channelData?: Float32Array[];
}

class WavManager {
  private readonly FMT_MIN_BYTES = 16;

  public async decodeWav(path: string, options?: { channelData?: boolean }): Promise<WavInfo> {
    const fh = await open(path);

    try {
      const riff = Buffer.alloc(12);
      await fh.read(riff, 0, 12, 0);
      if (riff.toString('ascii', 0, 4) !== 'RIFF' || riff.toString('ascii', 8, 12) !== 'WAVE') {
        throw new Error(`Not a .wav file: ${path}`);
      }

      let fmt: WavFmt | null = null;
      let dataBodyStart = -1;
      let dataBodySize = -1;
      let offset = 12; // first chunk start
      let channelData: Float32Array[] = [];

      const head = Buffer.alloc(8);

      while (true) {
        const { bytesRead } = await fh.read(head, 0, 8, offset);
        if (bytesRead < 8) break;

        const label = head.toString('ascii', 0, 4);
        const size = head.readUInt32LE(4);

        if (label === 'fmt ') {
          const chunk = await this._readChunk(fh, offset + bytesRead, size);
          fmt = this._parseFmt(chunk);
        } else if (label === 'data') {
          if (!fmt) throw new Error(`fmt chunk missing before data in file: ${path}`);
          dataBodyStart = offset + bytesRead;
          dataBodySize = size;

          if (options?.channelData) {
            const dataBuffer = Buffer.alloc(size);
            await fh.read(dataBuffer, 0, size, dataBodyStart);
            channelData = this._extractChannelData(fmt, dataBuffer, dataBodySize);
          }
        }

        offset += bytesRead + size + (size % 2); // + (size % 2) -> padding byte if odd size, see wav.md
      }

      if (!fmt) throw new Error(`Cannot find fmt chunk in file: ${path}`);
      if (dataBodySize < 0) throw new Error(`Cannot find data chunk in file ${path}`);

      const { size: fileSize } = await fh.stat();
      const actualDataSize = this._getDataSize(fileSize, dataBodySize, dataBodyStart); // dataBodySize is declared in the file, but not necessarily true

      const durationMs = Math.round((actualDataSize / fmt.byteRate) * 1000);

      return { channelData, durationMs, fmt, size: fileSize };
    } finally {
      await fh.close();
    }
  }

  private _parseFmt(body: Buffer): WavFmt {
    if (body.length < this.FMT_MIN_BYTES)
      throw new Error(`fmt chunk too short: ${body.length} bytes`);

    return {
      audioFormat: body.readUInt16LE(0),
      bitsPerSample: body.readUInt16LE(14),
      blockAlign: body.readUInt16LE(12),
      byteRate: body.readUInt32LE(8),
      channels: body.readUInt16LE(2),
      sampleRate: body.readUInt32LE(4),
    };
  }

  private async _readChunk(fh: FileHandle, at: number, size: number): Promise<Buffer> {
    const buffer = Buffer.alloc(size);
    await fh.read(buffer, 0, size, at);
    return buffer;
  }

  private _extractChannelData(
    fmt: WavFmt,
    buffer: Buffer,
    size: number,
  ): Float32Array<ArrayBuffer>[] {
    const { bitsPerSample, channels } = fmt;
    const bytesPerSample = bitsPerSample / 8;
    const numFrames = Math.floor(size / (bytesPerSample * channels));
    const channelData = Array.from({ length: channels }, () => new Float32Array(numFrames));

    const readSample = this._sampleReader(fmt);
    for (let f = 0; f < numFrames; f++) {
      for (let c = 0; c < channels; c++) {
        const at = (f * channels + c) * bytesPerSample;
        channelData[c][f] = readSample(buffer, at);
      }
    }

    return channelData;
  }

  private _sampleReader(fmt: WavFmt): (buffer: Buffer, at: number) => number {
    if (fmt.audioFormat === 3) {
      // already [-1.0, 1.0]
      if (fmt.bitsPerSample === 32) return (b, at) => b.readFloatLE(at);
      if (fmt.bitsPerSample === 64) return (b, at) => b.readDoubleLE(at);
    }
    if (fmt.audioFormat === 1) {
      // divide to transpose to [-1.0, 1.0]
      switch (fmt.bitsPerSample) {
        case 16:
          return (b, at) => b.readInt16LE(at) / 2 ** 15;
        case 24:
          return (b, at) => b.readIntLE(at, 3) / 2 ** 23;
        case 32:
          return (b, at) => b.readInt32LE(at) / 2 ** 31;
      }
    }
    throw new Error(`Unsupported .wav: format ${fmt.audioFormat}, ${fmt.bitsPerSample}-bit`);
  }

  private _getDataSize(fileSize: number, dataBodySize: number, dataBodyStart: number) {
    const physicalBytes = fileSize - dataBodyStart;

    return dataBodySize === 0 ? physicalBytes : Math.min(dataBodySize, physicalBytes);
  }
}

export const wavManager = new WavManager();
