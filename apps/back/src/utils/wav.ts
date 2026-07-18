import { type FileHandle, open } from 'node:fs/promises';

interface WAVFmt {
  pcm: boolean;
  stereo: boolean;
  sampleRate: number;
  byteRate: number;
  blockAlign: number;
  bitsPerSample: number;
}

export interface ParsedWAVFile {
  durationMs: number;
  size: number;
  fmt: WAVFmt;
}

async function extractFmtChunck(fh: FileHandle, bodyStart: number, bodySize: number): Promise<WAVFmt> {
  const buffer = Buffer.alloc(bodySize);
  const body = await fh.read(buffer, 0, bodySize, bodyStart);

  return {
    bitsPerSample: body.buffer.readInt16LE(14),
    blockAlign: body.buffer.readInt16LE(12),
    byteRate: body.buffer.readUInt32LE(8),
    pcm: body.buffer.readInt16LE() === 1 ? true : false,
    sampleRate: body.buffer.readUInt32LE(4),
    stereo: body.buffer.readInt16LE(2) === 2 ? true : false,
  };
}

export async function parseWAV(path: string): Promise<ParsedWAVFile> {
  const fh = await open(path);

  try {
    const riff = Buffer.alloc(12);
    await fh.read(riff, 0, 12, 0);
    if (riff.toString('ascii', 0, 4) !== 'RIFF' || riff.toString('ascii', 8, 12) !== 'WAVE') {
      throw new Error(`Not a WAV file: ${path}`);
    }

    let fmt: WAVFmt | null = null;
    let dataBodyStart = -1;
    let dataBodySize = -1;
    let offset = 12; // first chunk start

    const head = Buffer.alloc(8);

    while (true) {
      const { bytesRead } = await fh.read(head, 0, 8, offset);
      if (bytesRead < 8) break;

      const label = head.toString('ascii', 0, 4);
      const size = head.readUInt32LE(4);

      if (label === 'fmt ') {
        fmt = await extractFmtChunck(fh, offset + bytesRead, size);
      } else if (label === 'data') {
        if (!fmt) throw new Error(`fmt chunck missing before data in file: ${path}`);
        dataBodyStart = offset + bytesRead;
        dataBodySize = size;
      }

      offset += bytesRead + size + (size % 2); // + (size % 2) -> padding byte if odd size, see wav.md
    }

    if (!fmt) throw new Error(`Cannot find fmt chunk in file: ${path}`);
    if (dataBodySize === -1) throw new Error(`Cannot find data chunck in file ${path}`);

    let actualDataSize = dataBodySize; // dataBodySize is declared in the file, but necessarily true
    const { size: fileSize } = await fh.stat();
    const physicalBytes = fileSize - dataBodyStart;
    const realDataBytes = Math.min(dataBodySize, physicalBytes);

    if (dataBodySize == 0 || realDataBytes > 0) actualDataSize = physicalBytes;

    const durationMs = Math.round((actualDataSize / fmt.byteRate) * 1000);

    return { durationMs, fmt, size: fileSize };
  } finally {
    await fh.close();
  }
}
