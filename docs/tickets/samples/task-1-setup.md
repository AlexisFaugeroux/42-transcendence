**Goal:** Scaffold the Samples (library) page — set up the page + `/samples` route, the sample dataset & helpers, and a reusable waveform placeholder. It uses the shared app header built in #83.

**Design source:** `design/samples.jsx` · tokens in `design/colors_and_type.css`

> 👋 **Task 1 of the Samples page** (parent #16). Depends on **#48 (react-router)** and on the shared
> **`AppHeader`** from **#83**. Common setup (`sass-embedded`, fonts, `MsnThemeProvider`) is assumed done.
>
> 🔁 **Shared header:** the Samples, Dashboard (#13) and Sessions (#17) pages all use the same sticky
> top header. It's built once in **#83 (`AppHeader`)** — this page just renders `<AppHeader active="library" />`.

**Conventions:** antd via `@transcendence/ui`; icons via `@transcendence/ui/components/MsnIcon/MsnIcon`;
`import type` for types.

---

- [ ] **Step 1: Make sure the shared header exists**

  This page renders the shared **`AppHeader`** (`apps/front/src/components/AppHeader/AppHeader.tsx`),
  built in **#83**. If it doesn't exist yet, do #83 first, then continue here. Nothing to build in this
  step — Step 4 renders `<AppHeader active="library" />`.

- [ ] **Step 2: Data, types and helpers**

  `apps/front/src/pages/Samples/samples.data.ts`:

  ```ts
  export type SampleFamily = 'drums' | 'bass' | 'synth' | 'vocal' | 'fx' | 'perc' | 'texture';
  export type SampleKind = 'one-shot' | 'loop' | 'field' | 'vocal' | 'stem';

  export interface Sample {
    id: number;
    name: string;
    family: SampleFamily;
    kind: SampleKind;
    bpm: number | null;
    key: string | null;
    dur: string;
    size: number; // MB
    pack: string;
    added: string;
    tags: string[];
    fav: boolean;
    seed: string;
  }

  export const SAMPLE_FAMILIES: SampleFamily[] = ['drums', 'bass', 'synth', 'vocal', 'fx', 'perc', 'texture'];
  export const SAMPLE_KINDS: SampleKind[] = ['one-shot', 'loop', 'field', 'vocal', 'stem'];

  export const STORAGE_LIMIT_GB = 4;
  export const STORAGE_LIMIT_MB = STORAGE_LIMIT_GB * 1024;

  export const SAMPLES: Sample[] = [
    { id: 1, name: 'kick_garage_07.wav', family: 'drums', kind: 'one-shot', bpm: null, key: null, dur: '0:01', size: 2.3, pack: 'Cassette Drums', added: '2h ago', tags: ['punchy', '808'], fav: true, seed: 'kick07' },
    { id: 2, name: 'loop_house_124_C.wav', family: 'drums', kind: 'loop', bpm: 124, key: 'C min', dur: '0:08', size: 4.1, pack: 'Garage Tape Vol.2', added: 'yesterday', tags: ['house', 'groove'], fav: false, seed: 'loop124' },
    { id: 3, name: 'subbass_140_F.wav', family: 'bass', kind: 'one-shot', bpm: 140, key: 'F min', dur: '0:02', size: 1.8, pack: 'Modular Cells', added: '3d ago', tags: ['sub', 'clean'], fav: true, seed: 'sub140' },
    { id: 4, name: 'vox_breath_long.wav', family: 'vocal', kind: 'vocal', bpm: null, key: 'A maj', dur: '0:14', size: 7.2, pack: 'Vocal Chops 03', added: '3d ago', tags: ['airy', 'texture'], fav: false, seed: 'voxlong' },
    { id: 5, name: 'field_cafe_lyon_03.flac', family: 'texture', kind: 'field', bpm: null, key: null, dur: '1:42', size: 38.4, pack: 'Field Lyon 04', added: '5d ago', tags: ['ambience', 'city'], fav: false, seed: 'fieldcafe' },
    { id: 6, name: 'snare_room_dust.wav', family: 'drums', kind: 'one-shot', bpm: null, key: null, dur: '0:01', size: 1.6, pack: 'Cassette Drums', added: '1w ago', tags: ['dusty', 'mid'], fav: false, seed: 'snareroom' },
    { id: 7, name: 'pad_granular_Cmin.wav', family: 'synth', kind: 'loop', bpm: 88, key: 'C min', dur: '0:32', size: 12.7, pack: 'Granular Pads', added: '1w ago', tags: ['pad', 'airy'], fav: true, seed: 'padgran' },
    { id: 8, name: 'perc_shaker_off.wav', family: 'perc', kind: 'loop', bpm: 120, key: null, dur: '0:04', size: 2.0, pack: 'Garage Tape Vol.2', added: '1w ago', tags: ['off-grid'], fav: false, seed: 'shakeroff' },
    { id: 9, name: 'fx_riser_long.wav', family: 'fx', kind: 'one-shot', bpm: null, key: null, dur: '0:06', size: 3.4, pack: 'Personal', added: '2w ago', tags: ['riser', 'build'], fav: false, seed: 'fxriser' },
    { id: 10, name: 'vox_chop_amaj_03.wav', family: 'vocal', kind: 'vocal', bpm: 92, key: 'A maj', dur: '0:03', size: 2.2, pack: 'Vocal Chops 03', added: '2w ago', tags: ['chop', 'wet'], fav: true, seed: 'voxchop' },
    { id: 11, name: 'hat_open_brushed.wav', family: 'drums', kind: 'one-shot', bpm: null, key: null, dur: '0:01', size: 1.1, pack: 'Cassette Drums', added: '2w ago', tags: ['brush', 'bright'], fav: false, seed: 'hatopen' },
    { id: 12, name: 'stem_rhodes_take2.wav', family: 'synth', kind: 'stem', bpm: 96, key: 'G min', dur: '2:14', size: 48.6, pack: 'Personal', added: '3w ago', tags: ['rhodes', 'warm'], fav: false, seed: 'rhodes2' },
    { id: 13, name: 'field_train_st.flac', family: 'texture', kind: 'field', bpm: null, key: null, dur: '0:48', size: 22.1, pack: 'Field Lyon 04', added: '3w ago', tags: ['transport'], fav: false, seed: 'fieldtrain' },
    { id: 14, name: 'bass_slap_one.wav', family: 'bass', kind: 'one-shot', bpm: null, key: 'E min', dur: '0:01', size: 0.8, pack: 'Modular Cells', added: '4w ago', tags: ['slap', 'short'], fav: false, seed: 'bassslap' },
    { id: 15, name: 'loop_breakbeat_172.wav', family: 'drums', kind: 'loop', bpm: 172, key: null, dur: '0:05', size: 2.7, pack: 'Cassette Drums', added: '5w ago', tags: ['jungle', 'break'], fav: true, seed: 'break172' },
    { id: 16, name: 'fx_swell_dark.wav', family: 'fx', kind: 'one-shot', bpm: null, key: null, dur: '0:09', size: 4.6, pack: 'Personal', added: '6w ago', tags: ['swell', 'dark'], fav: false, seed: 'fxswell' },
    { id: 17, name: 'perc_woodblock_a.wav', family: 'perc', kind: 'one-shot', bpm: null, key: null, dur: '0:01', size: 0.4, pack: 'Garage Tape Vol.2', added: '8w ago', tags: ['wood', 'tight'], fav: false, seed: 'wood_a' },
    { id: 18, name: 'synth_arp_140_Dmin.wav', family: 'synth', kind: 'loop', bpm: 140, key: 'D min', dur: '0:11', size: 5.3, pack: 'Modular Cells', added: '9w ago', tags: ['arp', 'driving'], fav: false, seed: 'arp140' },
  ];

  export const FAMILY_COLOR: Record<SampleFamily, string> = {
    drums: 'hsl(25, 90%, 55%)',
    bass: 'hsl(8, 85%, 55%)',
    synth: 'hsl(210, 90%, 50%)',
    vocal: 'hsl(45, 95%, 55%)',
    perc: 'hsl(140, 65%, 45%)',
    texture: 'hsl(190, 75%, 50%)',
    fx: 'hsl(280, 65%, 60%)',
  };

  export function formatMB(mb: number): string {
    if (mb >= 1024) return `${(mb / 1024).toFixed(2)} GB`;
    if (mb < 1) return `${Math.round(mb * 1000)} KB`;
    return `${mb.toFixed(1)} MB`;
  }

  export function parseDur(d: string): number {
    const [m, s] = d.split(':').map(Number);
    return (m || 0) * 60 + (s || 0);
  }
  ```

- [ ] **Step 3: Waveform placeholder**

  The design draws a real waveform per sample. Use a deterministic bar placeholder.
  `apps/front/src/pages/Samples/WaveformPlaceholder.tsx`:

  ```tsx
  import type { JSX } from 'react';

  function hashString(s: string): number {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  interface WaveformPlaceholderProps {
    seed: string;
    color: string;
    bars?: number;
    height?: number;
  }

  export function WaveformPlaceholder({ seed, color, bars = 40, height = 28 }: WaveformPlaceholderProps): JSX.Element {
    const base = hashString(seed);
    // Deterministic pseudo-heights so each sample's waveform is stable across renders.
    const heights = Array.from({ length: bars }, (_, i) => Math.max(0.12, Math.abs(Math.sin(base + i * 1.7))));

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', height }}>
        {heights.map((h, i) => (
          <span key={i} style={{ flex: 1, height: `${h * 100}%`, background: color, opacity: 0.8, borderRadius: 1 }} />
        ))}
      </div>
    );
  }
  ```

- [ ] **Step 4: Page shell + route**

  `apps/front/src/pages/Samples/Samples.module.scss`:

  ```scss
  .page {
    min-height: 100vh;
    background: hsl(197, 14%, 3%);
    color: hsl(0, 0%, 92%);
  }

  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 28px 32px 80px;
  }

  @media (max-width: 600px) {
    .container {
      padding: 20px 16px 64px;
    }
  }
  ```

  `apps/front/src/pages/Samples/Samples.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { AppHeader } from '../../components/AppHeader/AppHeader';
  import styles from './Samples.module.scss';

  export function Samples(): JSX.Element {
    return (
      <div className={styles.page}>
        <AppHeader active="library" />
        <div className={styles.container}>
          {/* Filled by later tasks:
              Task 2: title row + storage bar
              Task 3: list view (+ selection bar)
              Task 4: toolbar (search/filter/sort)
              Task 5: grid view + view toggle
              Task 6: delete + upload modals */}
        </div>
      </div>
    );
  }
  ```

  In `apps/front/src/App.tsx`:

  ```tsx
  import { Samples } from './pages/Samples/Samples';
  // inside <Routes>:
  <Route path="/samples" element={<Samples />} />
  ```

- [ ] **Step 5: Verify** — `http://localhost:5173/samples` shows the shared header with **Library**
  highlighted; nav links route to `/home`, `/sessions` (404-fallback for now), `/settings`. Body is empty.

**Done when:** `/samples` route, data/helpers and the waveform placeholder exist and the page renders the
shared `AppHeader` (from #83); `pnpm run check` passes.
