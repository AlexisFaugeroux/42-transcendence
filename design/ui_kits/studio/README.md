# openDAW Studio — UI Kit

Hi-fi recreation of the openDAW Studio app. This is **not production code** — components are simplified to the cosmetic level so they can be composed for design mocks.

## What's here

| File              | Description                                                                         |
| ----------------- | ----------------------------------------------------------------------------------- |
| `index.html`      | Click-thru: Dashboard → Studio workspace (header → arrangement → mixer toggle)      |
| `Header.jsx`      | Top bar: brand menu, transport, tempo/sig, time displays, peak meter, screen picker |
| `Footer.jsx`      | Status bar: sample rate, latency, storage, build info                               |
| `Dashboard.jsx`   | Welcome screen with demo project grid + resources column                            |
| `Workspace.jsx`   | Panel-grid scaffold: browser + arrangement + (optional) mixer                       |
| `Arrangement.jsx` | Timeline ruler + multi-track strip with a few audio/MIDI region samples             |
| `Mixer.jsx`       | Channel strip column with peak meters, faders, mute/solo, sends                     |
| `Browser.jsx`     | Left-side tabs (Devices / Samples / Projects)                                       |
| `primitives.jsx`  | `Knob`, `PeakMeter`, `Fader`, `FramedButton`, `Icon` (uses brand symbols), `Hr`     |

## Source of truth

Visuals lifted from `ui/header/Header.tsx`, `ui/dashboard/Dashboard.tsx`, `ui/workspace/`, `ui/components/Knob.tsx`, `ui/components/PeakMeter.tsx`, `ui/components/Menu.tsx`, `ui/footer/Footer.sass`. Icons inlined from the project's `IconLibrary.tsx` sprite (a copy is in `assets/IconLibrary.tsx.txt`).
