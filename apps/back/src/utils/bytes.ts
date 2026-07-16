export function toBytes(data: Uint8Array): Uint8Array<ArrayBuffer> {
  const bytes = new Uint8Array(data.byteLength);
  bytes.set(data);
  return bytes;
}

export function toArrayBuffer(bytes: Uint8Array<ArrayBuffer>): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}
