# Studio (Web DAW)

A minimal web-based DAW built on the
[openDAW-headless](https://github.com/andremichelle/openDAW-headless) SDK. The goal is a
slimmed-down version of [openDAW](https://opendaw.studio/), focusing on core DAW interactions rather
than a full-featured production tool.

## Implemented

1. **Load samples into a timeline/grid** — drag or click to place a clip onto a track; move and
   resize clips.
2. **Browse audio samples** — panel listing the samples the backend returns (`api/sample.ts` →
   `hooks/useSamples`); the audio itself is fetched from `/samples/<ownerId>/<uuid>.wav`, which
   nginx guards with `auth_request`.
3. **Transport controls** — play / stop, loop region, master VU meter, metrics.
4. **Playback** — plays arranged clips through the openDAW audio engine with a moving playhead.
5. **Effects rack** — per-audio-unit effect chain with 11 devices, an add-effect picker, a device
   editor, and drag & drop from the browser's Devices tab to insert an effect at a position. See
   `ui/Devices/` and `docs/architecture/studio-devices.md`.
6. **Project persistence** — save / load / list / rename / archive / delete through `/api/project/*`
   (`api/project.ts`); `LeaveStudioModal` prompts to save on exit.
7. **Export** — offline (faster-than-real-time) render via `hooks/useOfflineRender`, then upload as
   a `Track` from `ExportModal` (`api/track.ts`).

**Non-goals (for now):** MIDI editing, automation, plugin hosting, live recording, real-time
collaborative editing.

## Audio engine

The DAW is powered by `@opendaw/*` SDK packages:

- `studio-sdk`, `studio-core` — main SDK and project model
- `studio-boxes`, `studio-adapters` — box system and adapters
- `lib-dsp` — DSP primitives
- `lib-fusion` — reactive data layer
- `lib-std`, `lib-runtime`, `lib-dom`, `lib-jsx` — utilities

See `package.json` for the full set. The SDK uses its own JSX system (`@opendaw/lib-jsx`), not React
— be careful not to mix them.

## Repo layout

```
studio/
├── CLAUDE.md          <- this file
├── src/
│   ├── App.tsx
│   ├── api/           <- project.ts, sample.ts, track.ts (same conventions as apps/front)
│   ├── contexts/      <- ProjectContext, TracksContext
│   ├── hooks/         <- useCurrentPosition, useEditedAudioUnit, useEffectChain, useMasterPeaks,
│   │                     useOfflineRender, usePanels, useParam, useSamples, useTableScrollY
│   ├── lib/           <- arrangementFactory, audioUtils, projectSetup, resolveCssColor, types
│   ├── utils/         <- base64 (project state <-> transport encoding)
│   └── ui/
│       ├── Timeline/  (Timeline, Grid, LoopRegion, Rack, constants)
│       ├── Header/    (Transport, Meter, Metrics, ExportModal, LeaveStudioModal)
│       ├── Browser/   (Samples, Devices — the draggable effect list)
│       ├── Devices/   (Devices, EffectChain, DeviceEditor, AddEffectButton,
│       │               deviceRegistry, effectFactories, one <Name>Device.tsx per
│       │               effect, UnknownDevice)
│       ├── Editor/ · Footer/ · PanelFrame/
│       └── components/ (MsnPeakMeter, MsnParamGroup, MsnParamKnob, MsnParamSelect,
│                        MsnParamToggle, StudioIcon)
└── vite.config.ts
```

`Msn Param*` are the generic parameter widgets every device is built from; `useParam` is the bridge
between an SDK parameter and React state. A new effect is a `<Name>Device.tsx` plus an entry in
`deviceRegistry` and `effectFactories` — `UnknownDevice` is the fallback so an unregistered box
renders something instead of crashing.

Sample audio is served by nginx, not by Vite — `public/` is empty.

## Studio-specific conventions

- **Styling:** SASS modules. Translate design tokens from `design/` (root) into SASS. See
  `design/ui_kits/studio/` for the high-fidelity DAW mockup.
- **Build:** Vite + React 19 + TypeScript.
- The `design/` folder referenced here is the root-level `design/`, not a local one.

## Dev server

```sh
pnpm --filter @transcendence/studio dev
```
