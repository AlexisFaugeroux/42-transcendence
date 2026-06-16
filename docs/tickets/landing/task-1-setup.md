**Goal:** Scaffold the Landing page in `apps/front`, set up the responsive layout conventions every later task reuses, and wire it to the `/` route.

**Design source:** `design/landing.jsx` · `design/MakeSomeNoise Landing.html` · tokens in `design/colors_and_type.css`

> 👋 This is **Task 1 of the Landing page** (parent issue #11). The page is large, so it's split into
> small tasks — each adds one section. This task builds the empty shell the others slot into.
>
> 🔗 **Depends on #48 (react-router).** The setup steps shared with #12/#15 (`sass-embedded`, fonts,
> `MsnThemeProvider`) are assumed done — verify, don't redo.

**Conventions used across all Landing tasks (read once):**

- **antd via `@transcendence/ui`** — `import { Button, Tag, Avatar } from '@transcendence/ui'` (never `antd` directly).
- **Reuse the existing icons/wordmark** from the shared package:
  ```ts
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { MsnWordmark } from '@transcendence/ui/components/MsnWordmark/MsnWordmark';
  ```
- **Responsive rule of thumb:** every section is full-width (for full-bleed backgrounds); content is
  centered by an inner container with `max-width` + side padding. Breakpoints we use everywhere:
  `@media (max-width: 960px)` (tablet) and `@media (max-width: 600px)` (mobile).
- **`import type`** for type-only imports (`verbatimModuleSyntax` is on).

---

- [ ] **Step 1: Create the page folder**

  Create `apps/front/src/pages/Landing/` — all Landing files live here.

- [ ] **Step 2: Shared layout styles**

  `apps/front/src/pages/Landing/Landing.module.scss`:

  ```scss
  .page {
    width: 100%;
    overflow-x: hidden;
    background: hsl(197, 14%, 3%); // --color-void
    color: hsl(0, 0%, 92%); // --fg1
  }

  // Reusable centered container. Each section renders a full-width <section>
  // with its own background, and puts its content inside a .inner.
  .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  @media (max-width: 600px) {
    .inner {
      padding: 0 16px;
    }
  }
  ```

- [ ] **Step 3: A shared image placeholder**

  The design has several "drop a screenshot here" slots. Build one reusable component.
  `apps/front/src/pages/Landing/ImagePlaceholder.tsx`:

  ```tsx
  import type { CSSProperties, JSX } from 'react';

  interface ImagePlaceholderProps {
    label: string;
    height?: number;
    accent?: string;
    style?: CSSProperties;
  }

  export function ImagePlaceholder({
    label,
    height = 240,
    accent = 'hsl(25, 90%, 55%)',
    style,
  }: ImagePlaceholderProps): JSX.Element {
    return (
      <div
        style={{
          width: '100%',
          height,
          borderRadius: 4,
          border: '0.5px solid rgba(255, 255, 255, 0.07)',
          background:
            'repeating-linear-gradient(135deg, hsl(197,14%,12%) 0 14px, hsl(197,14%,8%) 14px 28px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          ...style,
        }}
      >
        <span
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: 11,
            color: 'hsl(0, 0%, 38%)',
            background: 'hsl(197, 14%, 3%)',
            padding: '4px 10px',
            borderRadius: 2,
            border: `0.5px dashed ${accent}`,
            maxWidth: '90%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ color: accent }}>// </span>
          {label}
        </span>
      </div>
    );
  }
  ```

- [ ] **Step 4: The page shell**

  `apps/front/src/pages/Landing/Landing.tsx` — an empty frame the next tasks fill in:

  ```tsx
  import type { JSX } from 'react';
  import styles from './Landing.module.scss';

  export function Landing(): JSX.Element {
    return (
      <div className={styles.page}>
        {/* Sections are added by the following tasks, in this order:
            <TopNav />      (Task 2)
            <Hero />        (Task 3)
            <StatsStrip />  (Task 4)
            <Features />    (Task 5)
            <DeepDives />   (Task 6)
            <Community />   (Task 7)
            <Cta />         (Task 8)
            <SiteFooter />  (Task 8) */}
      </div>
    );
  }
  ```

- [ ] **Step 5: Add the `/` route**

  In `apps/front/src/App.tsx` (created in #48), render `Landing` at `/` instead of redirecting to login:

  ```tsx
  import { Landing } from './pages/Landing/Landing';

  // ...inside <Routes>:
  <Route path="/" element={<Landing />} />
  ```

  Remove the old `<Route path="/" element={<Navigate to="/login" replace />} />` line. Keep the `*`
  fallback.

- [ ] **Step 6: Verify**

  `pnpm --filter @transcendence/front dev` → open `http://localhost:5173/` → you get a dark, empty
  page (no errors in the console). The shell is ready for Task 2.

**Done when:** the `Landing` folder exists with `Landing.tsx`, `Landing.module.scss`, and
`ImagePlaceholder.tsx`; `/` renders `<Landing />`; `pnpm run check` passes.
