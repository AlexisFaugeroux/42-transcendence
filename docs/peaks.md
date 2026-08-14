# The `.peaks` sidecar format (MSNP)

A small binary file holding a precomputed amplitude envelope of a `.wav`, so the
browser can draw a waveform without downloading or decoding the audio.

Written by `apps/back/src/services/msnp.ts`, read by
`apps/front/src/lib/peaks.ts`. Nothing else parses it.

## Why a sidecar file

Drawing a waveform needs an envelope, not audio. Getting it from the `.wav`
would mean fetching the whole file and running `decodeAudioData` in the browser
— for a library page that is tens of megabytes and a lot of CPU, to produce a
few hundred pixels per row.

Concretely, for `DSP ACE Processed Loop 127 18.wav`:

| File     | Size        |
| -------- | ----------- |
| `.wav`   | 1 012 356 B |
| `.peaks` | 4 104 B     |

About 250× smaller, and already in the shape the renderer wants. A 100-sample
library costs ~400 KB of peaks instead of ~100 MB of audio.

The `.peaks` file always sits next to its `.wav`, same directory, same UUID,
different extension — see
[audio-file-storage.md](./architecture/audio-file-storage.md).

## Layout

An 8-byte header, then the body. No chunks, no padding, no variable-length
fields: the whole file is addressable by arithmetic.

```
┌──────────────────────────────────────────────────────────────┐
│ header (8 bytes)                                             │
│   "MSNP"  version(1)  channels(1)  buckets(2, LE)            │
├──────────────────────────────────────────────────────────────┤
│ channel 0 : [min,max] × buckets      ← 2 bytes per bucket    │
├──────────────────────────────────────────────────────────────┤
│ channel 1 : [min,max] × buckets                              │
└──────────────────────────────────────────────────────────────┘
```

### Header

| Offset | Size | Field      | Read with                 | Value                |
| ------ | ---- | ---------- | ------------------------- | -------------------- |
| 0      | 4    | magic      | 4 ASCII bytes             | `"MSNP"`             |
| 4      | 1    | `version`  | `getUint8` / `readUint8`  | `1`                  |
| 5      | 1    | `channels` | `getUint8` / `readUint8`  | 1 = mono, 2 = stereo |
| 6      | 2    | `buckets`  | `getUint16(…, true)` (LE) | `1024`               |

Little-endian for `buckets`, like WAV — see [wav.md](./wav.md) if the
`readUInt16LE` family is unfamiliar.

### Body

`channels × buckets` pairs of **signed 8-bit** values, laid out **channel-major**
— all of channel 0's buckets, then all of channel 1's:

```
byteOffset(channel, bucket) = 8 + (channel * buckets + bucket) * 2
                              ^min       ^max is the next byte
```

Each pair is the minimum and maximum sample value observed over that bucket's
slice of the audio, quantised from float `[-1, 1]` to int8 `[-127, 127]`:

```ts
Math.round(value * 127); // clamped to ±127
```

Total file size is therefore always `8 + channels * buckets * 2`.

## Worked example

A real seeded file
(`infra/media_data/samples/<ownerId>/39f8bcd8-….peaks`, "DSP ACE Processed Loop 127 18.wav"):

```
$ ls -l 39f8bcd8-….peaks
4104 bytes                       = 8 + 2 * 1024 * 2  ✓

$ xxd -l 16 39f8bcd8-….peaks
00000000: 4d53 4e50 0102 0004 fd00 fa00 fa00 fa00  MSNP............
```

| Offset | Bytes         | Meaning                                   |
| ------ | ------------- | ----------------------------------------- |
| 0      | `4d 53 4e 50` | `"MSNP"`                                  |
| 4      | `01`          | version 1                                 |
| 5      | `02`          | 2 channels (stereo)                       |
| 6      | `00 04`       | `0x0400` little-endian = **1024** buckets |
| 8      | `fd 00`       | channel 0, bucket 0 → min `-3`, max `0`   |
| 10     | `fa 00`       | channel 0, bucket 1 → min `-6`, max `0`   |

`-3` as a float is `-3 / 127` ≈ `-0.024` — the loop starts quiet.

Channel 1 begins at `8 + 1024 * 2` = `2056` = `0x808`:

```
$ xxd -s 2056 -l 16 39f8bcd8-….peaks
00000808: fd00 fa00 fa00 fa00 fb00 fd00 fe00 0001  ................
```

Nearly identical to channel 0 at the same buckets, as expected for a
centre-panned loop. A hard-panned sample shows the two runs diverging.

## Lifecycle

- **On upload** — `controllers/sample.ts` decodes the WAV
  (`wavManager.decodeWav(…, { channelData: true })`), passes the channel
  `Float32Array`s to `msnpManager.generatePeaks`, and writes the result next to
  the `.wav` via `sampleStorageService.write(uuid, ownerId, peaks, 'peaks')`.
- **On seed** — same path, from `scripts/seed/`.
- **On delete** — `sampleStorageService.remove` unlinks both extensions.
- **Served** — by nginx under `/samples/`, behind the same `auth_request` check
  as the audio itself. There is no separate permission: if you may read the
  `.wav`, you may read its `.peaks`.

The API exposes it as `Sample.peaksUrl`, derived in the repository's
`_format` by swapping the extension — it is not a database column.
