# Handoff: openDAW Design System

## Overview

This package documents the openDAW visual language — colors, typography, spacing, components, and brand — as observed in the openDAW Studio codebase (`opendaw.studio`, an open-source web-based DAW). It includes a hi-fi click-thru prototype of the Studio shell (Dashboard → Arrangement → Mixer) plus 14 isolated reference cards covering the design tokens and component vocabulary.

The intent is to give a developer everything they need to either:

- Build new openDAW screens consistent with the existing app, or
- Re-skin / extend an openDAW fork while preserving its visual identity.

## About the Design Files

**The HTML files in this bundle are design references, not production code.** They were produced as static HTML + inline-Babel React, hardcoded values, no real audio engine. Do not ship them as-is.

The openDAW codebase is **TypeScript + custom JSX runtime (`@opendaw/lib-jsx`) + SASS-modules**. When implementing:

- Use the existing `@opendaw/lib-jsx` `createElement` import and SASS-with-`@use "@/colors"` pattern — do **not** introduce React, styled-components, or Tailwind.
- Reuse existing primitives in `ui/components/` (`Button`, `Knob`, `Checkbox`, `MenuButton`, `RadioGroup`, `PeakMeter`, `Icon`) — the prototype re-implements them only because the real ones aren't standalone.
- Read tokens from `Colors` (`@opendaw/studio-enums`) and `IconSymbol` rather than hardcoded hex / SVG paths.

If applying this design _outside_ the openDAW codebase (a separate marketing site, a companion tool), pick the framework that best fits and translate the tokens — they are framework-agnostic CSS variables.

## Fidelity

**High-fidelity.** All colors, type sizes, radii, shadows, and component proportions are intended to match the live app. Two caveats:

1. **Hue values were inferred** from observed SASS usage (`hsl(210, 90%, 30%)` for `$ACTIVE`, `hsl(197, 14%, 6%)` for the header background, etc.). The canonical `Colors` enum lives in `@opendaw/studio-enums` which was not in the mounted source tree. Before shipping, verify the seven accent hues (blue/green/orange/yellow/red/purple/cyan) against the enum and snap exact values.
2. **Fonts are loaded from Google Fonts as a substitute.** Replace the `@import` in `colors_and_type.css` with the real `Rubik` (300, 400) and `Open Sans` `.woff2` files from the openDAW project once available.

---

## Screens / Views

### 1. Dashboard (`ui_kits/studio/Dashboard.jsx`)

**Purpose:** Welcome screen. First view on cold start. User picks a demo project or follows resource links.

**Layout:**

- Vertical-scrolling article, centered, max-width `900px`, padded `32px 24px`.
- Background: `var(--bg-panel-2)` = `hsl(197, 14%, 8%)`.
- Article content stack: `h1` → `h2` → intro paragraph → 2-column grid (Demo Projects 1fr / Resources `240px` fixed) → footer paragraph.

**Components:**

- **`h1` "Welcome to openDAW"** — Rubik 400, 36px, color `white`, margin `0 0 0.05em -3px` (the negative left-margin is intentional, optical alignment).
- **`h2` "A new holistic exploration of music creation inside your browser"** — Rubik 400, 18px, color `var(--color-blue)` = `hsl(210, 90%, 50%)`, margin `0`.
- **Intro paragraph** — Open Sans 400, 13px, color `var(--fg2)` = `hsl(0, 0%, 56%)`, line-height `1.55`. Inline `<a>` use `var(--color-blue)`.
- **Demo Project tile** — `aspect-ratio: 1` cover with a diagonal `linear-gradient(135deg, ...)` (each tile uses different hue stops, all desaturated and dark — see `Dashboard.jsx` `DEMO` array). Bottom-right play badge: 22×22 circle, `rgba(0,0,0,0.4)` bg, 9px white play icon. Below cover: 8/10 padding, title 11px `var(--fg1)`, artist 10px `var(--fg3)`. Card bg `var(--bg-card)` = `hsl(197,14%,12%)`, radius `4px`. Grid: `repeat(auto-fill, minmax(120px, 1fr))`, gap `10px`.
- **Resource link** — Inline-flex row, 6px circular bullet in the link's accent color + Rubik 300 12px label in the same color. One per line, 4px gap.
- **Footer paragraph** — Open Sans 11px, `var(--fg3)`, centered, `margin-top: 3em`. Contains literal "Built with ❤️" emoji.

**States:** None beyond hover (tile background lightens to `var(--bg-elevated)`). Click on tile → switch to Arrangement screen with project name set.

---

### 2. Header (`ui_kits/studio/Header.jsx`)

**Purpose:** Persistent top bar across all studio screens. Holds brand menu, undo/redo, MIDI/help, transport, time displays, master peak meter, screen selector, performance stats.

**Layout:**

- Height `2.5em` (≥ 36px), background `var(--bg-panel)` = `hsl(197, 14%, 6%)`, bottom border `1px solid var(--line-faint)`.
- Single horizontal flex row, padding `0 6px`. Sections separated by `<Hr/>` — a 1px vertical divider in `var(--line-faint)` with `6px` horizontal margin.
- Order: Brand menu · Hr · Undo/Redo · Hr · MIDI + Help · Hr · Transport (Play/Stop/Record/Loop) · Hr · UnitDisplays (BPM, Sig, Bars, Time) · Hr · Metronome · Hr · `flex: 1` spacer · Hr · master PeakMeter · Hr · Screen selector · Hr · Performance stats.

**Components:**

- **Brand menu** — `<button>`, transparent bg, contains `<h5>openDAW</h5>` (Rubik 400 12px `var(--fg1)`) + 10px triangle icon `var(--fg2)`. On hover → fg becomes `var(--fg1)`.
- **IconButton** (undo/redo/midi/help/transport/metronome) — Square button, transparent bg, `padding: 4px`, 14px SVG icon. Default color `var(--fg2)` → hover `var(--fg1)`. Active state takes a per-button color (record = red, midi = orange, metronome = orange, play = green, help = green).
- **UnitDisplay** — Vertical stack, right-aligned, padding `0 6px`. Top: 14px Rubik 400 tabular-nums value, color `var(--fg1)` (the active "Bars" display uses 18px and `var(--color-blue)`). Bottom: 8px uppercase Rubik 300 unit label `var(--fg3)`, letter-spacing `0.6`.
- **Master PeakMeter** — Stacked pair of 4×64px bars, 1px gap. Track bg `var(--color-void)`. Fill is `linear-gradient(90deg, var(--color-green) 0% 65%, var(--color-yellow) 65% 88%, var(--color-red) 88% 100%)`, scaled by `width: <pct>%`.
- **Screen selector** — Segmented `<button>` row, single `0.5px solid var(--color-dark)` outer border, `3px` radius, internal `0.5px` dividers. Each button: 13px icon, padding `4px 8px`, transparent bg → selected bg `color-mix(in srgb, var(--color-blue) 14%, transparent)`, fg `var(--color-blue)`. Six entries: Dashboard / Arrangement / Mixer / Piano / Shadertoy / Meter.
- **Performance stats** — 9px Rubik mono, two-line stacked (`CPU 14%` / `MEM 312MB`), `var(--fg3)`.

**States:** Transport buttons toggle (clicking the active one returns to "stop"). Screen buttons set the workspace. MIDI / metronome toggles persist.

---

### 3. Arrangement (`ui_kits/studio/Arrangement.jsx`)

**Purpose:** Main timeline — multi-track strip view with audio + MIDI regions over a bar grid.

**Layout:**

- Two-row flex column inside the workspace area. Row 1: Ruler. Row 2: scrollable Tracks list.
- Each row has a fixed `160px` left column ("Tracks" header / track header) and a flexible region area.
- **Bars × zoom:** 16 bars × 34px per bar = 544px content width.

**Ruler (`height: 24px`):**

- Background `var(--bg-panel)`. Bottom border `1px solid var(--line-faint)`.
- SVG ticks: every bar gets a tick from y=14, every 4th bar from y=4 in `var(--fg2)`. Bar number label every 4 bars at `(x+3, y=11)` Rubik mono 9px `var(--fg2)`.
- **Playhead** — Vertical 1px line in `var(--color-orange)` at `(2.5 * zoom)` px, with a 8×6 downward-pointing triangle flag at the top.

**Track row (`height: 44px`, bottom border `1px solid var(--line-faint)`):**

- **Track header** (160px wide, `var(--bg-panel)`, right border `1px solid var(--line-faint)`):
  - Top row: 8×8 square color swatch (track accent color, with `0 0 4px -1px <color>` glow) + 11px track name `var(--fg1)` + three mini-buttons M / S / R.
    - **M** (mute): when active, `var(--color-red)` border + fg, `box-shadow: 0 0 3px -1px currentColor`, bg `color-mix(in srgb, var(--color-red) 14%, transparent)`. When inactive, `var(--color-dark)` border + `var(--fg3)` fg.
    - **S** (solo): same pattern with `var(--color-yellow)`.
    - **R** (arm record): same pattern with `var(--color-red)`, default opacity 0.4.
  - Bottom row: 9px Rubik mono instrument label `var(--fg3)`, letter-spacing `0.04`.
  - Whole header `opacity: 0.5` when track is muted.
- **Region area** — alternating subtle row tint (`var(--color-void)` vs `rgba(255,255,255,0.008)`).
  - **Bar grid** — Vertical lines, every bar `var(--line-faint)`, every 4th bar `var(--line-soft)`.
  - **Region** — Absolutely positioned. Top 4, height 36, left `s * zoom + 1`, width `l * zoom - 2`. Border `0.5px solid <track-color>`, radius `2px`, padding `2px 5px`.
    - Background: MIDI = `color-mix(in srgb, <track-color> 22%, var(--color-void))`. Audio = `color-mix(in srgb, <track-color> 14%, var(--color-void))` (slightly darker).
    - Top row: 9px region label, `font-family` is `var(--font-mono)` for audio, `var(--font-display)` for MIDI, color = track color.
    - Bottom row: MIDI shows 4 thin horizontal bars (1.5px tall, varying widths 40/70/55/60%, opacity 0.7) representing notes. Audio shows a stretched SVG waveform path, `stroke-width: 0.6`, no fill.
    - Muted track regions get `opacity: 0.4`.
  - Playhead overlay — 1px `var(--color-orange)` vertical line at `2.5 * zoom`, `pointer-events: none`.
- **Add Track row** — At end of list, padding `8px 12px`, 12px add icon + 11px "Add Track" text, `var(--fg3)`.

**Track data (default seed):**

1. **Drums** — Playfield instrument, `var(--color-blue)`, regions at bars 1-4, 5-8 ("Drums A"), 9-16 ("Drums B").
2. **Bass** — Vaporisateur, `var(--color-purple)`, regions at 3-8 ("Bass Lo"), 11-16 ("Bass Hi").
3. **Lead** — Vaporisateur, `var(--color-yellow)`, regions at 5-8, 13-16.
4. **Pad** — Modular, `var(--color-cyan)`, **muted**, single region 1-16.
5. **Vocal** — Audio, `var(--color-orange)`, audio region at 7-11 (`vox-take-03.wav`).
6. **Texture** — Tape, `var(--color-red)`, audio region at 9-16 (`tape-loop.wav`).

---

### 4. Mixer (`ui_kits/studio/Mixer.jsx`)

**Purpose:** Channel-strip view of all tracks + auxes + master.

**Layout:**

- Horizontal flex row, `overflow-x: auto`, full-height. Background `var(--color-void)`.
- Each strip is **56px wide**, `flex-shrink: 0`, right border `1px solid var(--line-faint)`. Master strip uses `var(--bg-card)` background to differentiate.

**Strip contents (top → bottom, `8px 0` outer padding, gap `6px`):**

1. **Type label** (only on AUX/MASTER) — 8px uppercase letter-spaced `0.06`. AUX = `var(--color-orange)`, MASTER = `var(--fg1)` weight 400 letter-spacing `0.08`.
2. **Pan knob** — 22px, bipolar, `var(--color-green)`. Knob renders a 36-radius arc in a 100×100 viewBox, 6px stroke, drop-shadow glow (`0 0 2px <color>`), value pointer is a 3px line from center to (r-6).
3. **Sends** (non-aux/master only) — Two horizontal mini-faders. Each is a 3px-tall track in `var(--color-void)` with an orange fill (`var(--color-orange)`), labeled `RV` and `DL` in 8px Rubik mono `var(--fg3)` to the right.
4. **Mute / Solo buttons** — Pair, 3px gap. M = red treatment when active, S = yellow treatment when active. 9px Rubik 400, padding `1px 5px`, border `0.5px solid currentColor`, radius `2px`, glow `0 0 3px -1px currentColor` when active.
5. **Fader + Vertical Peak Meter** — 130px tall row.
   - **Fader**: 18px wide, vertical track 2px wide in `var(--color-void)` with repeating tick lines every 6px. Thumb: 14×6 rect in track color, radius `1px`, glow `0 0 4px -1px <color>` + inset highlight. Position from bottom = `value * 100%`.
   - **VertPeakMeter**: Two 4px columns, `var(--color-void)` background, vertical green→yellow→red gradient fill (same stops as horizontal version, rotated). Fills from bottom.
6. **dB readout** — 9px Rubik mono `var(--fg2)` value (formatted `(log10(level + 0.01) * 20 + 6).toFixed(1)`, with master pinned at `0.0`).
7. **Color stripe + name** — Pinned to bottom (`margin-top: auto`). 70%-wide × 3px stripe in track color, then 10px Rubik 300 `var(--fg1)` name, ellipsized.

**Channel data (default seed):** Drums (blue), Bass (purple), Lead (yellow), Pad (cyan, muted), Vocal (orange, soloed), Texture (red), Reverb (green AUX), Master (white).

---

### 5. Browser (`ui_kits/studio/Browser.jsx`)

**Purpose:** Left-edge panel in the workspace, switches between Devices / Samples / Files. Shared across Arrangement and Mixer screens.

**Layout:** 220px wide, `var(--color-black)` bg, right border `1px solid var(--line-faint)`. Three sections: Tabs · Search · List.

- **Tabs** — Horizontal flex, three buttons each `flex: 1`. Bottom border `1px solid var(--line-faint)`. Selected tab: `var(--color-orange)` color, `1px solid var(--color-orange)` bottom border (replaces the section border at that point). Inactive tabs: `var(--fg3)`. Each tab has an 11px icon + 10px uppercase Rubik 300 letter-spaced label.
- **Search** — 8px padding, `var(--color-void)` input bg, `0.5px solid var(--line-soft)` border, 22px tall, 11px Rubik 300, radius 3px. Focus state: blue border + glow.
- **List item (Devices)** — 5/10 padding, 6px gap. Left: 6×6 colored dot in the device's accent color. Center: 11px name `var(--fg1)`. Right: 9px Rubik mono "INS" or "FX" tag in `var(--fg3)`. **Drag mousedown** changes bg to `var(--color-active)` = `hsl(210, 90%, 30%)`.
- **List item (Samples)** — Same row pattern, 11px Rubik mono filename, 11px cyan `Icon name="sample"` (waveform).

---

### 6. Footer (`ui_kits/studio/Footer.jsx`)

**Purpose:** Status bar.

**Layout:** Height `1.25rem` (≥ 22px), `var(--bg-panel)` background, top border `1px solid var(--line-faint)`. Horizontal row of stat items.

- **Stat item** — Inline-flex, 4px gap, `0 8px` padding, full-height, right border `1px solid var(--line-faint)`. 10px Rubik mono, default `var(--fg2)`. Some items use accent colors (latency = yellow, links = blue, project name leads with a green `●` bullet).
- **Items, in order:** `● <Project Name>` · `48000 Hz` · `buffer 256` · `latency 5.3 ms` (yellow) · `storage 41%` · `<flex spacer>` · `v2026.04 · build a3f` · `opendaw.studio` (blue).

---

## Interactions & Behavior

- **Dashboard project tile click** → set project name, switch screen to `default` (Arrangement).
- **Brand menu click** → return to Dashboard.
- **Screen selector** → switches between `dashboard | default | mixer | piano | shadertoy | meter`. (Only `dashboard`, `default`, `mixer` are wired in the prototype.)
- **Transport buttons** → click cycles between `stop` and the clicked state. Active state shows the button's accent color + glow.
- **MIDI / Metronome toggles** → boolean, local state.
- **Mute / Solo / Arm-record on track header** → visual only in prototype, but in the real app each writes to the timeline's track adapter.
- **Hover** — Default `IconButton` color goes from `var(--fg2)` → `var(--fg1)`. Framed buttons get a `0 0 3px -1px currentColor` glow on hover.
- **Active glow** — All "armed" controls (record button, active transport, active mute, active solo, active screen selector item) use the same accent treatment: bordered, glowed, faintly tinted background via `color-mix(in srgb, <accent> 14%, transparent)`.

No animations or transitions are specified — the live app is largely instantaneous (it's a DAW; latency would feel sluggish). Add transitions sparingly if at all.

## State Management

For a faithful in-app implementation, follow the existing observable pattern:

- `service.layout.screen` — `ObservableValue<ScreenKey>`.
- `service.projectProfileService` — current project, optional. Holds `engine`, `timelineBoxAdapter`, `editing`, `liveStreamReceiver`.
- `service.engine.bpm`, `service.engine.position`, `EngineAddresses.PEAKS` — engine-level streams.
- `MidiDevices.available()` — observable boolean.
- `StudioPreferences` — visibility flags (e.g. `enable-history-buttons`).
- `GlobalShortcuts` — keymap source.

For an external prototype, plain React state per the JSX files is fine.

## Design Tokens

All tokens live in `colors_and_type.css` as CSS variables. Reproduced here for reference:

### Brand / Accent Hues

| Token            | Value                | Use                                        |
| ---------------- | -------------------- | ------------------------------------------ |
| `--color-blue`   | `hsl(210, 90%, 50%)` | primary, h2 headings, links, active screen |
| `--color-green`  | `hsl(140, 65%, 45%)` | save / pan knob / play / OK                |
| `--color-orange` | `hsl(25, 90%, 55%)`  | regions, h3, metronome, browser tab active |
| `--color-yellow` | `hsl(45, 95%, 55%)`  | volume / solo                              |
| `--color-red`    | `hsl(8, 85%, 55%)`   | record / mute / danger                     |
| `--color-purple` | `hsl(280, 65%, 60%)` | publish / apply / Vaporisateur             |
| `--color-cyan`   | `hsl(190, 75%, 50%)` | accent (Pad track)                         |

### Neutrals (197° hue tint on darks)

| Token            | Value                | Use                             |
| ---------------- | -------------------- | ------------------------------- |
| `--color-bright` | `hsl(0, 0%, 92%)`    | primary fg                      |
| `--color-gray`   | `hsl(0, 0%, 56%)`    | secondary fg                    |
| `--color-dark`   | `hsl(0, 0%, 38%)`    | disabled / hairline borders     |
| `--color-shadow` | `hsl(197, 14%, 12%)` | card / well                     |
| `--color-black`  | `hsl(197, 14%, 6%)`  | header / footer / panel         |
| `--color-void`   | `hsl(197, 14%, 3%)`  | deepest bg / arrangement canvas |

### Semantic Surfaces

- `--bg-app: var(--color-void)`
- `--bg-panel: var(--color-black)`
- `--bg-panel-2: hsl(197, 14%, 8%)` (dashboard)
- `--bg-card: var(--color-shadow)`
- `--bg-elevated: hsl(197, 14%, 16%)` (menu / dialog)
- `--line-faint: rgba(255, 255, 255, 0.04)`
- `--line-soft: rgba(255, 255, 255, 0.07)`
- `--line-hover: rgba(255, 255, 255, 0.12)`
- `--color-active: hsl(210, 90%, 30%)` (menu hover, mousedown)
- `--color-active-parent: hsla(210, 90%, 30%, 0.5)`

### Foreground

- `--fg1: var(--color-bright)` — primary text
- `--fg2: var(--color-gray)` — secondary text
- `--fg3: var(--color-dark)` — muted / labels

### Type

- `--font-display: "Rubik", system-ui, sans-serif` — UI / headers (Rubik 300 default UI weight, 400 for headings)
- `--font-body: "Open Sans", system-ui, sans-serif` — prose paragraphs
- `--font-mono: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace` — values, code, file paths

### Type Scale (UI is dense, small wins)

- `--fs-10: 10px` — footer items, tiny labels
- `--fs-11: 11px`
- `--fs-12: 12px` — default UI
- `--fs-13: 13px` — dashboard prose
- `--fs-14: 14px`
- `--fs-18: 18px` — h2
- `--fs-22: 22px`
- `--fs-36: 36px` — h1

### Radii

- `--radius-1: 2px` — pill / region / mini-button
- `--radius-2: 4px` — default button / card
- `--radius-3: 6px`
- `--radius-4: 8px`

### Shadows / Glows

- `--glow-active: 0 0 3px -1px var(--color-active)` — focus / press
- `--glow-frame: 0 0 3px -1px currentColor` — active framed button
- `--shadow-floating: 0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)` — menu, dialog

### Spacing (em-based, follows the live SASS)

- `--gap-1: 0.25em`
- `--gap-2: 0.5em`
- `--gap-3: 0.75em`
- `--gap-4: 1em`
- `--gap-6: 1.5em`

## Assets

- **Logo SVG** — `assets/logo.svg`. The 3-rectangle openDAW mark, 24×24 viewBox, `currentColor` fill. Always lowercase wordmark `open` (Rubik 300) + `DAW` (Rubik 400, blue).
- **Icon library** — `assets/IconLibrary.tsx.txt` is a verbatim copy of the live `ui/IconLibrary.tsx` containing the full SVG sprite (Play, Stop, Record, Loop, Mute, Solo, Add, Close, Menu, Help, Midi, OpenDAW, Automation, …). In the real codebase, render via `<Icon symbol={IconSymbol.Play}/>`. The prototype inlines a subset in `primitives.jsx`.
- **Fonts** — Not bundled. Source originals from the openDAW project: `rubik-300.woff2`, `rubik-400.woff2`, `OpenSans-Regular.ttf` and place in `fonts/`. The current `colors_and_type.css` has a Google Fonts `@import` as fallback — remove it once real fonts are available.

## Files

```
design_handoff_opendaw_design_system/
├── README.md                    ← this file
├── colors_and_type.css          ← all design tokens as CSS variables
├── assets/
│   ├── logo.svg                 ← brand mark
│   └── IconLibrary.tsx.txt      ← verbatim IconLibrary sprite
├── ui_kits/studio/
│   ├── index.html               ← click-thru: Dashboard → Arrangement → Mixer
│   ├── primitives.jsx           ← Icon, Hr, FramedButton, IconButton, Knob, PeakMeter, VertPeakMeter, Fader, UnitDisplay
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Dashboard.jsx
│   ├── Browser.jsx              ← left-side tabs (Devices/Samples/Files)
│   ├── Arrangement.jsx          ← timeline + tracks
│   ├── Mixer.jsx                ← channel strips
│   ├── Workspace.jsx            ← screen router
│   └── README.md                ← per-kit notes
└── preview/                     ← isolated reference cards
    ├── colors-accent.html       ← 7 hue swatches
    ├── colors-neutrals.html     ← bright → void scale
    ├── colors-semantic.html     ← bg / fg / active mapping
    ├── type-display.html        ← h1 / h2 / h3
    ├── type-body-ui.html        ← Rubik 300 sizes + Open Sans + mono
    ├── radii-spacing.html
    ├── shadows.html
    ├── buttons.html             ← default / framed / active / commit / danger
    ├── knobs-meters.html        ← knob / fader / peak meter
    ├── menu.html                ← floating menu with shortcuts
    ├── inputs.html              ← text / select / checkbox / radio
    ├── card-tile.html           ← demo project tile
    ├── logo.html
    └── iconography.html         ← icon sprite preview
```

## Quick start for a developer

1. **Open `ui_kits/studio/index.html`** in a browser to see the click-thru. Use it as the visual source of truth.
2. **Open `colors_and_type.css`** — copy these values into your codebase's token system (`@opendaw/studio-enums::Colors` if you're inside the openDAW repo; otherwise CSS vars / a tokens object).
3. **Match the Studio shell** — Header / Workspace / Footer is a 3-row vertical flex (`flex-direction: column; height: 100vh`), with the workspace using `flex: 1; overflow: hidden`. Browser pinned 220px on the left.
4. **Verify the inferred hex values** against `Colors` enum before shipping. Same for the missing fonts.
5. **Don't ship the Babel/JSX prototype** — re-implement with `@opendaw/lib-jsx` + SASS modules following `ui/components/` patterns.
