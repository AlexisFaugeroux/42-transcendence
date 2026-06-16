**Goal:** Add the two modals — confirm-delete (single or selection) and the add-samples upload dialog — and wire them to the delete actions and the "Add sample" button. This completes the page.

**Design source:** `design/samples.jsx` (`DeleteSampleModal`, `UploadModal`) · **Parent:** #16 · **Depends on:** Task 3 (delete actions), Task 2 (Add button)

> Both use antd's `Modal`. The upload dialog uses antd's `Upload.Dragger` for the dropzone instead of
> the design's hand-built one. No real uploading — `beforeUpload` returns `false` so files are never sent.

---

- [ ] **Step 1: Delete modal**

  `apps/front/src/pages/Samples/DeleteSampleModal.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Modal } from '@transcendence/ui';
  import type { Sample } from './samples.data';

  export type DeleteTarget = Sample | 'selection' | null;

  interface DeleteSampleModalProps {
    target: DeleteTarget;
    selectedCount: number;
    onCancel: () => void;
    onConfirm: () => void;
  }

  export function DeleteSampleModal({ target, selectedCount, onCancel, onConfirm }: DeleteSampleModalProps): JSX.Element {
    const isMulti = target === 'selection';
    const sample = target && target !== 'selection' ? target : null;

    return (
      <Modal
        open={target !== null}
        title={isMulti ? `Delete ${selectedCount} samples?` : 'Delete this sample?'}
        okText="Delete"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
        onOk={onConfirm}
        onCancel={onCancel}
      >
        {isMulti ? (
          <p>These files will be removed from your library. Sessions that already use them will keep their cached copies.</p>
        ) : (
          <p>
            The file <code>{sample?.name}</code> will be removed from your library. Sessions that already
            use it will keep their cached copies.
          </p>
        )}
      </Modal>
    );
  }
  ```

- [ ] **Step 2: Upload modal**

  `apps/front/src/pages/Samples/UploadModal.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Modal, Upload } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { STORAGE_LIMIT_GB, formatMB } from './samples.data';
  import styles from './UploadModal.module.scss';

  interface UploadModalProps {
    open: boolean;
    onClose: () => void;
    usedMB: number;
  }

  // Static queue to illustrate the states (the design shows done/uploading/queued).
  const QUEUE = [
    { name: 'shaker_swing_120.wav', size: 1.4, status: 'Added' },
    { name: 'vox_breath_short.wav', size: 0.9, status: 'Added' },
    { name: 'synth_lead_140_Amin.wav', size: 5.6, status: '62%' },
    { name: 'field_market.flac', size: 22.0, status: 'Queued' },
  ];

  export function UploadModal({ open, onClose, usedMB }: UploadModalProps): JSX.Element {
    const queueTotal = QUEUE.reduce((acc, f) => acc + f.size, 0);

    return (
      <Modal open={open} title="Add samples" footer={null} onCancel={onClose} width={540}>
        <Upload.Dragger multiple beforeUpload={() => false} showUploadList={false} accept=".wav,.mp3,.flac,.aif">
          <p className={styles.dropIcon}>
            <MsnIcon name="download" size="22px" color="hsl(25, 90%, 55%)" style={{ transform: 'rotate(180deg)' }} />
          </p>
          <p className={styles.dropTitle}>Drop audio files here</p>
          <p className={styles.dropHint}>.wav .mp3 .flac .aif — up to 100 MB per file</p>
        </Upload.Dragger>

        <div className={styles.queueLabel}>
          Queue · {QUEUE.length} files · {formatMB(queueTotal)}
        </div>
        <div className={styles.queue}>
          {QUEUE.map((file) => (
            <div key={file.name} className={styles.queueRow}>
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.mono}>{formatMB(file.size)}</span>
              <span className={styles.status}>{file.status}</span>
            </div>
          ))}
        </div>

        <div className={styles.after}>
          <span>After upload</span>
          <span>
            <span className={styles.accent}>{formatMB(usedMB + queueTotal)}</span> / {STORAGE_LIMIT_GB} GB
          </span>
        </div>
      </Modal>
    );
  }
  ```

  `apps/front/src/pages/Samples/UploadModal.module.scss`:

  ```scss
  .dropIcon { margin: 0 0 8px; }
  .dropTitle { margin: 0; color: hsl(0, 0%, 92%); font-size: 14px; }
  .dropHint { margin: 4px 0 0; color: hsl(0, 0%, 38%); font-size: 12px; }

  .queueLabel {
    margin: 16px 0 8px;
    color: hsl(0, 0%, 38%);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .queue {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .queueRow {
    display: grid;
    grid-template-columns: 1fr 60px 70px;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 3px;
    background: hsl(197, 14%, 3%);
    border: 0.5px solid rgba(255, 255, 255, 0.04);
  }

  .fileName {
    font-family: ui-monospace, monospace;
    font-size: 12px;
    color: hsl(0, 0%, 92%);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mono {
    font-family: ui-monospace, monospace;
    font-size: 11px;
    color: hsl(0, 0%, 56%);
  }

  .status {
    font-family: ui-monospace, monospace;
    font-size: 10px;
    text-transform: uppercase;
    text-align: right;
    color: hsl(0, 0%, 56%);
  }

  .after {
    margin-top: 14px;
    padding: 10px 12px;
    border-radius: 3px;
    background: hsl(197, 14%, 3%);
    border: 0.5px solid rgba(255, 255, 255, 0.04);
    font-family: ui-monospace, monospace;
    font-size: 11px;
    color: hsl(0, 0%, 56%);
    display: flex;
    justify-content: space-between;
  }

  .accent {
    color: hsl(25, 90%, 55%);
  }
  ```

- [ ] **Step 3: Wire everything in `Samples.tsx`**

  ```tsx
  import { DeleteSampleModal, type DeleteTarget } from './DeleteSampleModal';
  import { UploadModal } from './UploadModal';

  const [confirmDelete, setConfirmDelete] = useState<DeleteTarget>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const usedMB = Math.round(SAMPLES.reduce((acc, s) => acc + s.size, 0));

  // Update earlier placeholders:
  //  - "Add sample" button onClick      → setUploadOpen(true)
  //  - SampleTable/Grid onDelete={(s)}  → setConfirmDelete(s)
  //  - SelectionBar onDelete            → setConfirmDelete('selection')

  const confirmDeletion = (): void => {
    // TODO (backend): delete the file(s) here.
    setConfirmDelete(null);
    setSelectedKeys([]);
  };

  // at the end of the page JSX:
  <DeleteSampleModal
    target={confirmDelete}
    selectedCount={selectedKeys.length}
    onCancel={() => setConfirmDelete(null)}
    onConfirm={confirmDeletion}
  />
  <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} usedMB={usedMB} />
  ```

- [ ] **Step 4: Verify the whole page**
  - **Add sample** opens the upload dialog (dropzone + queue + "after upload" storage line); the dropzone
    accepts drops/browse but doesn't actually upload.
  - A row's **✕** opens "Delete this sample?" with the filename; **Delete** closes it.
  - Select several rows → selection bar **Delete** opens "Delete N samples?"; confirming clears selection.
  - Full page: header → title + storage → toolbar → (selection bar) → list/grid; filters, sort, view
    toggle, play, select and both modals all work; responsive down to mobile.

**Done when:** both modals work and are wired to the delete + add actions, the full page is complete,
`pnpm run check` passes. This closes out #16.
