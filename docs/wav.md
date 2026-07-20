# Reading a `.wav` file

How to interpret the bytes of a WAV file: its structure, and the few tools
needed to read any field out of it.

## A file is a sequence of bytes

Every file is a numbered sequence of **bytes**, each holding a value from 0 to
255, usually written as two hex digits (`00`–`ff`). To inspect one, `xxd` prints
three columns — the **offset** (byte number, in hex), the raw **bytes**, and
their **ASCII** rendering (a `.` for non-printable bytes):

```bash
xxd -l 64 file.wav          # first 64 bytes
xxd -s 12280 -l 32 file.wav # 32 bytes starting at offset 12280
```

## Two kinds of bytes: text and numbers

The same bytes mean different things depending on how you read them.

- **Text (ASCII).** Byte `0x52` is the code for `R`, so `52 49 46 46` reads as
  `"RIFF"`. These 4-letter labels mark the sections of the file.

  ```ts
  buf.toString("ascii", 0, 4); // "RIFF"
  ```

- **Numbers, little-endian.** Multi-byte integers are stored **least-significant
  byte first**, so you read them _backwards_: the bytes `f6 d0 0f 00` are the
  number `0x000fd0f6` = `1036534`, not `0xf6d00f00`. The `LE` helpers reverse it
  for you:

  ```ts
  buf.readUInt32LE(4); // 4 bytes → 1036534
  buf.readUInt16LE(0); // 2 bytes
  ```

## WAV = a RIFF container of chunks

- **RIFF** (_Resource Interchange File Format_) is a generic container: the file
  is a list of **chunks**, each starting with a 4-byte label + a 4-byte
  little-endian size, followed by that many bytes of content. RIFF says nothing
  about the content — `.avi` uses the same container.
- A **WAV** is a RIFF file whose content is audio: the outer `RIFF` chunk is
  followed by the tag `WAVE`, then the audio chunks.
- **`fmt `** (_format_, padded to 4 chars with a trailing space) describes **how
  the audio is encoded**: channels, sample rate, bit depth.
- **`data`** holds the raw audio samples.
- Other chunks may appear (`LIST` = metadata like track name/author, `PAD ` =
  alignment padding). You skip the ones you don't care about.
- **PCM** (_Pulse-Code Modulation_) is the simplest encoding: raw uncompressed
  amplitude samples. `fmt.audioFormat == 1` means PCM.

Every chunk has the same anatomy, and the file is just chunks back to back:

```
one chunk = [ 4-byte ASCII label ][ 4-byte LE size N ][ N bytes of content ]

┌───────────────────────────────────────────────────────────────┐
│ "RIFF"  size(4)  "WAVE"        ← outer chunk = the whole file   │
│  ├──────────────────────────────────────────────────────────┐  │
│  │ "fmt "  size(4)  format fields (channels, rate, bits …)    │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ "LIST"  size(4)  metadata (name, author …)     ← optional  │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ "PAD "  size(4)  zero padding                   ← optional  │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ "data"  size(4)  raw audio samples                         │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

The optional chunks may appear in any order and there may be others — which is
why you walk the list instead of assuming offsets (see below).

## The `fmt ` chunk layout

The `fmt ` chunk body (right after its 8-byte header) is:

| Body offset | Size | Field           | Meaning                               |
| ----------- | ---- | --------------- | ------------------------------------- |
| 0           | 2    | `audioFormat`   | 1 = PCM                               |
| 2           | 2    | `numChannels`   | 1 = mono, 2 = stereo                  |
| 4           | 4    | `sampleRate`    | samples per second (e.g. 44100)       |
| 8           | 4    | `byteRate`      | audio bytes per second                |
| 12          | 2    | `blockAlign`    | bytes per sample frame (all channels) |
| 14          | 2    | `bitsPerSample` | bit depth (16, 24, …)                 |

`byteRate == sampleRate * numChannels * bitsPerSample / 8`.

### Which read function

Now that the fields are named, here is which helper reads each. The `read…LE`
name encodes two independent choices — **how many bytes** (16 = 2, 32 = 4) and
**signed or not** (`Int` = can be negative, `UInt` = always ≥ 0):

| Function       | Bytes | Signed | Range            | Where it's used in a WAV                                                   |
| -------------- | ----- | ------ | ---------------- | -------------------------------------------------------------------------- |
| `readUInt16LE` | 2     | no     | 0 … 65 535       | `fmt ` fields: `audioFormat`, `numChannels`, `blockAlign`, `bitsPerSample` |
| `readUInt32LE` | 4     | no     | 0 … ~4.29e9      | chunk sizes, `sampleRate`, `byteRate`                                      |
| `readInt16LE`  | 2     | yes    | −32 768 … 32 767 | audio samples of a **16-bit** PCM file (the common case)                   |
| `readInt32LE`  | 4     | yes    | ±2.15e9          | audio samples of a **32-bit** PCM file                                     |

Rules of thumb:

- **Header fields** are sizes and counts → never negative → `readUInt…`.
- **Audio samples** swing around zero → signed → `readInt…`.
- Pick 16 vs 32 to match the field's byte size. Reading a 4-byte field with a
  16-bit function silently returns only half the value.
- No `readInt24LE` exists: 24-bit samples are read as 3 raw bytes; 32-bit
  **float** samples use `readFloatLE`.

## Do not assume fixed offsets — walk the chunks

A common bug is assuming `data` starts right after `fmt ` (at offset 36). It
often does **not**: real files insert `LIST`, `PAD `, and other chunks in
between. To find any chunk, **iterate**: read a chunk's label and size, and if
it isn't the one you want, skip past it using its size — advance by
`8 + size + (size % 2)`.

> **Why `+ (size % 2)`?** RIFF requires every chunk to start on an even byte
> offset (word alignment). So when a chunk's content has an **odd** size, a
> single padding byte (`0x00`) is appended after it — and that pad byte is **not
> counted** in the declared `size`. `size % 2` is `1` for an odd size and `0`
> for an even one, so it adds the pad byte only when present. Forget it and, the
> first time an odd-sized chunk appears, every subsequent label is read one byte
> off and the whole walk desyncs. (In the example above all sizes are even, so
> no padding is applied — but a parser must still handle the odd case.)

## Worked example

A real sample from the project
(`infra/audio_data/<ownerId>/<uuid>.wav`, "SOR Hats"):

```
offset  bytes           meaning
0       "RIFF"          RIFF container
4       f6 d0 0f 00     1036534  = file size - 8
8       "WAVE"          audio content
12      "fmt "          format chunk
16      10 00 00 00     16       = fmt body size
20      01 00           1        = PCM
22      02 00           2        = stereo
24      44 ac 00 00     44100    = sample rate
28      98 09 04 00     264600   = byteRate  (44100 * 2 * 3)
32      06 00           6        = blockAlign (bytes per sample, all channels)
34      18 00           24       = bits per sample
36      "LIST"          metadata chunk (236 bytes) — skipped
280     "PAD "          padding chunk (11992 bytes) — skipped
12280   "data"          audio chunk
12284   fe a0 0f 00     1024254  = data size (audio bytes)
12288   00 00 00 …      audio samples begin
```

The two chunks (`LIST`, `PAD `) between `fmt ` and `data` are exactly why
walking is required.

## Useful derived values

- **Duration** (seconds) = `dataChunkSize / byteRate`.
  Here: `1024254 / 264600` ≈ **3.87 s**.
- **Sample frame size** (bytes per instant, all channels) = `blockAlign`.
  Here 6 bytes = 3 (left, 24-bit) + 3 (right).
