# Studio (Web DAW)

A minimal web-based DAW built on the [openDAW-headless](https://github.com/andremichelle/openDAW-headless) SDK. The goal
is a slimmed-down version of [openDAW](https://opendaw.studio/), focusing on core DAW interactions rather than a
full-featured production tool.

**Current development**: vu meter in header component

## Target features (MVP)

1. **Load samples into a timeline/grid** — drag or click to place a clip onto a track.
2. **Browse audio samples** — panel listing samples from `public/audio/`.
3. **Transport controls** — play / stop / (later: loop, record-arm visual only).
4. **Playback** — plays arranged clips through the openDAW audio engine with a moving playhead.

**Non-goals (for now):** MIDI editing, mixing/effects routing, automation, plugin hosting, recording, multi-project
management, persistence.

## Audio engine

The DAW is powered by `@opendaw/*` SDK packages:

- `studio-sdk`, `studio-core` — main SDK and project model
- `studio-boxes`, `studio-adapters` — box system and adapters
- `lib-dsp` — DSP primitives
- `lib-fusion` — reactive data layer
- `lib-std`, `lib-runtime`, `lib-dom`, `lib-jsx` — utilities

See `package.json` for the full set. The SDK uses its own JSX system (`@opendaw/lib-jsx`), not React — be careful not to
mix them.

## Repo layout

```
studio/
├── CLAUDE.md          <- this file
├── public/
│   └── audio/         <- sample files (static assets served by Vite)
├── src/
│   ├── App.tsx
│   ├── lib/           <- audioUtils, projectSetup, seedDemoData, types
│   └── ui/
│       ├── Timeline/  (Timeline, Grid)
│       └── Transport/
├── vite.config.ts
└── TODO.txt           <- scratch notes (may be stale — trust code + this file)
```

## Studio-specific conventions

- **Styling:** SASS modules. Translate design tokens from `design/` (root) into SASS. See `design/ui_kits/studio/` for
  the high-fidelity DAW mockup.
- **Build:** Vite + React 19 + TypeScript.
- The `design/` folder referenced here is the root-level `design/`, not a local one.

## Dev server

```sh
pnpm --filter @transcendence/studio dev
```
