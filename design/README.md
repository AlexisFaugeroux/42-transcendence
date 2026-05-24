# openDAW Design System

A design system distilled from the **openDAW Studio** codebase — an open-source, browser-based Digital Audio Workstation (DAW) focused on music education and data privacy. No login, no tracking, all in the browser.

> "openDAW is an open source web based music studio with a clear focus on education and data privacy, open to everyone with no login required so you can start creating music right away." — *Dashboard copy*

---

## Sources

| Source | Path |
|---|---|
| openDAW UI codebase (mounted) | `ui/` (read-only via local FS) |
| Public site | https://opendaw.studio |
| Music publishing | https://music.opendaw.studio |
| API | https://api.opendaw.studio |
| Repo | https://github.com/andremichelle/opendaw |

The codebase is JSX-via-`@opendaw/lib-jsx` (not React) + SASS modules. The icon library is a single SVG `<symbol>` sprite (`ui/IconLibrary.tsx`).

---

## Index (manifest of root)

| File / Folder | What's in it |
|---|---|
| `README.md` | This file |
| `SKILL.md` | Agent-Skills front-matter wrapper |
| `colors_and_type.css` | All CSS variables + base element styles |
| `fonts/` | Webfonts (**Rubik 300/400** UI; **Open Sans** prose) — *see Caveats* |
| `assets/` | Logo SVGs, favicons, icon sprite, sample images |
| `preview/` | Design-System tab cards |
| `ui_kits/studio/` | High-fidelity recreation of the Studio app (header, transport, mixer, timeline, dashboard) |
| `ui_kits/studio/index.html` | Click-thru of Studio: dashboard → workspace |

---

## Product context

openDAW is **one product** with several distinct surfaces:

1. **Studio (`opendaw.studio`)** — the DAW itself. Workspace with header (transport, tempo, signature, time-display), browser panel, mixer, timeline (with primary tracks + audio-unit tracks), device editors (instruments + audio/MIDI effects), modular patcher, piano-roll, code editor (custom JS instruments/effects), shadertoy.
2. **Dashboard / landing** — entry screen with demo projects, resources, and an info-panel for project metadata + cover art.
3. **Auxiliary pages** — `/manuals`, `/preferences`, `/privacy`, `/imprint`, `/colors`, `/icons`, `/components`, `/automation`, `/graph`, `/stats`, `/test`, `/performance`.
4. **Music portal (`music.opendaw.studio`)** — published tracks. *Not in this repo; not modeled.*

Hallmarks:
- **Dense** UI of small controls (knobs, peak meters, drop-downs, framed buttons).
- **Near-black** panels with **saturated accent hues** for state.
- **No accounts, no tracking** — privacy-first.

---

## CONTENT FUNDAMENTALS

**Voice:** plainspoken, slightly self-deprecating, builder-to-builder. Open-source culture, not corporate. The product talks about itself in first person plural ("our music portal", "subscribe to our newsletter") and addresses the user as **you**.

**Casing:**
- Page/section titles: **Title Case** ("Welcome to openDAW", "Daily Unique Visitors", "Audio Output Latency").
- UI labels and tooltips: **Title Case** for verbs/nouns ("Primary Tracks", "Midi Access"), short and direct.
- Buttons: occasionally **ALL CAPS** for emphasis on commit actions (`APPLY`, `LOAD`, `SAVE` in Preferences).
- Brand: always lowercase **`openDAW`** mid-sentence, except at the start of a sentence.

**Tone & vibe:**
- Earnest, informational, no marketing fluff. ("The studio is still evolving and not production ready yet.")
- Privacy stated as a **value**, not a feature. ("No tracking, no data collection, no user accounts." — set in `--color-red` on the Imprint page.)
- Educational framing: linked "education" page, manuals, tutorials.

**Emoji:** sparingly. A heart `♥`/`❤️` appears in the footer copy ("Built with ❤️", "thank you ♥"). A warning sign `⚠️` appears next to a storage threshold. **No emoji in product chrome.**

**Specific examples (verbatim from `ui/`):**
- Dashboard h1: *"Welcome to openDAW"*
- Dashboard h2: *"A new holistic exploration of music creation inside your browser"*
- Privacy page: *"openDAW respects your privacy. This application does not collect…"*
- Imprint: *"No tracking, no data collection, no user accounts."*
- Footer prompt on storage: *" > 80% ⚠️"*
- Code editor menu group: *"Tracks"*, *"Noise"* — single-word, color-coded.

**I vs you:** the system mostly uses neither — it labels and describes. When voice surfaces (dashboard, privacy), it's "**we** built this; **you** create" — never "I".

---

## VISUAL FOUNDATIONS

A near-black studio canvas with saturated accents that double as **functional state colors**: each accent has a meaning attached, not just an aesthetic.

### Color
- **Surfaces** are layered near-blacks tuned at hue 197° (cool, very low saturation): `--color-void → --color-black → --bg-panel-2 → --color-shadow → --bg-elevated`.
- **Hue accents from the `Colors` enum** — every saturated hue maps to a *function*:
  - `blue` → primary action / info / record-source / chart
  - `green` → load / save / pan-knob / OK level / monitor
  - `orange` → highlight / region / metronome / sidechain / aux-bus group
  - `yellow` → volume-knob / solo / clipping mid-band / loop area fill
  - `red` → record / mute / errors / privacy assertion
  - `purple` → publish / apply / magnitude chart
  - `gray / dark / bright` → neutral foreground levels
- **No bluish-purple gradients.** Colors are *flat fills with low-opacity glows*, not gradients.

### Type
- **Rubik 300** for almost all UI chrome (light weight even at small sizes).
- **Rubik 400** for emphasis, headings.
- **Open Sans** for prose paragraphs (dashboard body, manuals).
- Mono only inside the code editor.
- Sizes are **small and dense** — 10–14px for chrome, 36px for the single dashboard h1. UI text is `0.625rem`–`0.75rem` (10–12px).

### Spacing
- Em-based throughout; controls measure `1.5em–1.75em`.
- Header is `2.5em` tall, footer `1.25rem`. Knobs `1.75em` square.
- Panel gaps are 1px hairlines (`gap: 1px`), the chrome between panels is the void itself showing through.

### Backgrounds
- **No imagery** behind the app. Cover art is the only image surface (project cover, demo project thumbnails).
- Panels use `panel-background` / `panel-background-dark` mixins — **flat near-black**, sometimes with a faint inner glow. **No textures, no patterns, no gradients.**
- The marketing/dashboard area uses the same dark panel — there's no separate "marketing aesthetic".

### Animation
- Minimal. The product is real-time audio — visual motion competes with audio attention.
- Peak meters, knob value changes, scroller smoothing — **functional motion only**.
- Hover transitions on menu items are immediate (no eased fade).
- No bounces, no spring physics, no decorative parallax.

### Hover / press / active states
- **Hover (menu item):** `background: hsl(210,90%,30%)` solid blue, white text — high-contrast, instant.
- **Hover (icon button):** color shifts from `--color-dark` → `--color-bright`.
- **Active (toggled / checked):** `color: var(--color-active)` (the button's `activeColor` prop, e.g. `Colors.orange`), plus a `box-shadow: 0 0 3px -1px <activeColor>` glow and a 4–8% same-color fill.
- **Pressed:** input `:active` swaps to active color (no shrink, no scale).
- **Disabled:** `pointer-events: none; color: var(--color-dark)`.

### Borders
- `0.5px solid currentColor` on framed buttons — **half-pixel** lines for a fine, instrument-panel feel.
- Hairline dividers `1px solid rgba(white, 0.04–0.07)`.
- No thick borders anywhere.

### Shadows
- **Outer glows**, not drop shadows: `0 0 3px -1px <accent>` — small, tight, color-matched. Used on framed buttons and active controls.
- Floating surfaces (menus, dialogs) use a soft shadow + 1px white-04 ring (`mixins.floating`).

### Transparency & blur
- Color-mix tints for soft fills: `color-mix(in srgb, var(--color) 5%, transparent)`.
- No `backdrop-filter: blur` — the system relies on solid layered blacks instead.
- The Knob shadow uses `filter: blur(1px); mix-blend-mode: luminosity` — that's the only blur in chrome.

### Corner radii
- `0.25em` (≈ 3px) is the universal radius — buttons, menu items, tags. Tight, uniform.
- Round controls (knobs, peak-meter dots) are full circles.

### Cards
- Backgrounds: `--color-shadow` (slightly lighter than panel).
- Border: none — just the background-color step.
- Radius: `0.25em` or none.
- **No left-border-accent cards.**
- Demo project cards are tile-like with a cover image + title + artist line.

### Iconography
See **ICONOGRAPHY** section below.

### Layout rules
- **Fixed-height header** + flex-fill workspace + fixed-height footer.
- The workspace is a **panel grid**: vertical and horizontal regions separated by 1px gutters with `PanelResizer` handles.
- Tooltips are floating absolute-positioned overlays.
- Modals are centered with the floating mixin.

---

## ICONOGRAPHY

openDAW ships **its own custom icon set** — there is no third-party icon font and no Lucide/Heroicons.

- **Storage:** a single inline SVG sprite at `ui/IconLibrary.tsx` containing ~150 `<symbol>` definitions, identified by the `IconSymbol` enum from `@opendaw/studio-enums`. Components reference symbols by name through `<Icon symbol={IconSymbol.Play} />`.
- **Style:** mixed but cohesive — most are **solid `fill="currentColor"`** silhouettes; a few are stroke (`Mute`, `Solo`, `Exclude`, EQ filter shapes — `HighPass`, `LowPass`, etc.). ViewBoxes vary (16, 20, 24, 32, 100, 256, 300, 512) — they're optimized per-icon, not normalized to a single canvas.
- **Sizes in chrome:** typically **1em** (12–14px), occasionally `1.25em` for emphasis (selected state, errors).
- **Color:** always inherits `currentColor`, so a single SVG can render in any accent based on `color: var(--color-orange)` etc.
- **Notable bespoke marks:** `OpenDAW` (3-rectangle layout brand mark), `Vinyl`, `Saxophone`, `BassGuitar`, `DrumSet`, `Microphone`, `Adsr`, `Dial`, `TapeReel`, EQ filter shapes (`HighPass` / `LowShelf` / `Peak` / `HighShelf` / `LowPass`), transport (`Record` / `Play` / `Stop` / `Loop` / `LoopStart` / `LoopEnd`).
- **Emoji as icons:** essentially never in chrome. The `⚠️` in the footer storage warning is the rare exception.
- **Unicode chars as icons:** none observed.
- **Usage docs:** `/icons` route renders the full sprite for browsing.

The **brand sprite is copied verbatim** into `assets/icon-library.tsx.txt` so consumers can drop it into a page. We also extract the **`OpenDAW` logo mark** into `assets/logo.svg`.

> **Caveat:** we did not have access to the original Rubik or Open Sans `.woff2` / `.ttf` files. The CSS expects `fonts/rubik-300.woff2`, `fonts/rubik-400.woff2`, `fonts/OpenSans-Regular.ttf`. Until those are dropped in, the system falls back to system-ui via the substitute @import in `colors_and_type.css`. **Please drop the original openDAW font files into `fonts/` to make the system pixel-accurate.**

---

## Caveats & known gaps

- **Fonts not bundled.** See above. Rubik and Open Sans are both on Google Fonts so a CDN substitute is acceptable temporarily.
- **`Colors` enum exact hex values** were not directly readable (they live in `@opendaw/studio-enums`, outside `ui/`). Values in `colors_and_type.css` are reconstructed from observed usage (`hsl(210,90%,30%)` for Menu active, `hsl(197,14%,6%)` for header bg, plus the saturated 50–55% L accents). **Confirm with the studio-enums source if you have it.**
- **Real `colors.sass`** referenced as `@/colors` in SASS files lives outside the ui/ mount — we couldn't read it. The CSS variables here are inferred from `var(--color-*)` references throughout `ui/`.
- **No marketing site / docs site** in scope — only the Studio surface is recreated.
- **Click-thru depth** in the Studio kit is intentionally shallow — meant for layout/visual review, not functional simulation.
