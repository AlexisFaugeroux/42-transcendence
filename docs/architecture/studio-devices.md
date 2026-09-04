# Studio devices (effects rack)

App: `apps/studio` — `src/ui/Devices/`, `src/hooks/useParam.tsx`,
`src/ui/components/MsnParam*`

Eleven audio effects, editable per audio unit. The openDAW SDK provides the DSP
and the parameter model; everything in `ui/Devices/` is the React skin over it.

## The three moving parts

```
useEditedAudioUnit()  ── which track is being edited (SDK selection → React)
      │
useEffectChain(unit)  ── the ordered list of effects on it
      │
DEVICES[box.ClassName] ── which component renders each effect
      │
useParam(parameter)   ── one SDK parameter ⇄ one React-controlled widget
```

## `useParam` is the whole bridge

Every knob, select and toggle in every device goes through this one hook. It does
four things that are easy to get wrong individually and impossible to get wrong
once they live in one place:

```ts
const sub = param.catchupAndSubscribe((obs) => setValue(obs.getUnitValue()));
return () => {
  sub.terminate();
};
```

- **`catchupAndSubscribe`, not `subscribe`.** The SDK's subscribe only fires on
  _future_ changes, so a plain subscription leaves the widget showing its initial
  state until the user touches something. `catchup` delivers the current value
  immediately. Every subscription in the studio uses this variant.
- **`terminate()` on unmount.** SDK subscriptions are not garbage-collected with
  the component. Forgetting this leaks a listener per mount, and the symptom shows
  up much later as setState-on-unmounted warnings, not as a leak.
- **Writes go through `project.editing.modify(…, false)`.** Parameter changes are
  edits on the box graph, not React state; the `false` suppresses the undo mark so
  a drag does not push a hundred undo steps.
- **`onChangeEnd` calls `project.editing.mark()`.** That is what makes one drag one
  undoable action. Split across two callbacks because the SDK cannot know when a
  gesture ends.

It also returns `param.anchor` and `param.getPrintValue()`. **`anchor` is the
parameter's neutral position**, which is what a knob needs to draw its fill from
the right origin — a pan knob fills from the centre, a gain knob from the left.
Reading it from the parameter instead of hardcoding it per widget is why a device
does not have to know which of its knobs are bipolar.

## Registry and factories

Two parallel tables, both keyed on the SDK box class name:

| File                 | Maps                               | Used by                      |
| -------------------- | ---------------------------------- | ---------------------------- |
| `deviceRegistry.ts`  | `box.ClassName` → React component  | rendering an existing effect |
| `effectFactories.ts` | ordered list of insertable effects | add-effect menu, Devices tab |

`DEVICES[effect.box.ClassName]` resolves the component, falling back to
`UnknownDevice` — so an effect the SDK knows about and we have not skinned yet
renders a placeholder instead of crashing the rack.

`EFFECT_ENTRIES` carries `label`, `icon`, `accent` and a `family`
(`dynamics | distortion | space | stereo`) alongside the SDK `factory`. **The array
order is the menu order, and `family` is what draws the separators** — the menu
inserts a divider wherever the previous entry's family differs, so entries of one
family must stay contiguous. Reordering the array reorders the menu; scattering a
family silently produces duplicate dividers.

`EFFECT_ENTRIES` feeds two surfaces: the add-effect menu and the browser panel's
**Devices tab** (`ui/Browser/Devices/Devices.tsx`, an antd `Listy` grouped by
`family`). One table, so an effect cannot appear in one place and not the other.

Adding an effect is therefore three edits: a `<Name>Device.tsx`, an entry in
`DEVICES`, an entry in `EFFECT_ENTRIES`.

## Two ways to add an effect

`AddEffectButton` (styles in its own `AddEffectButton.module.scss` since the rack
was split) **appends** at the end of the chain. **Drag & drop inserts at a
position:**

1. the browser's Devices tab sets the entry's `boxName` on the
   `application/x-effect` dataTransfer type in `onDragStart`;
2. `EffectChain` reads it on `drop`, resolves it back to an `EffectEntry`, and
   computes the insert index by walking `[data-effect-index]` tiles and finding the
   first whose horizontal midpoint is right of the pointer — the index maths reads
   the **DOM**, not React state, so `DeviceEditor` must keep rendering
   `data-effect-index` on its root;
3. it then calls
   `project.api.insertEffect(audioUnit.audioEffectsField, entry.factory, index)`
   inside `project.editing.modify` — like any other graph mutation.

The `BorderBeam` marker rendered at `dropIndex` (state, updated on `dragOver`) is
the only feedback that the drop will land between two devices; `dragLeave` clears
it only when the pointer actually left the chain
(`e.currentTarget.contains(e.relatedTarget)`), otherwise moving over a child tile
would flicker it off.

`EffectChain` also owns the empty case — `Devices.tsx` no longer branches between a
filled and an empty chain, it always renders `<EffectChain>`.

## Naming: our labels are not the SDK's

The registry keys are SDK box names, the UI labels are ours, and they deliberately
disagree where the SDK name would not mean anything to a producer:

| SDK box                   | Our device        |
| ------------------------- | ----------------- |
| `CrusherDeviceBox`        | Bitcrusher        |
| `FoldDeviceBox`           | Wavefolder        |
| `GateDeviceBox`           | Noise Gate        |
| `ReverbDeviceBox`         | Free Reverb       |
| `DattorroReverbDeviceBox` | Dattorro Reverb   |
| `TidalDeviceBox`          | Tremolo / Autopan |

Keep the mapping in the two tables. Do not rename around it.

## SDK gotchas found while building these

- **The Delay adds its two time controls, it does not choose between them.** Each
  of the three time rows is a _pair_: a synced fraction (`delay`,
  `preSyncTimeLeft`, `preSyncTimeRight`) plus a millisecond offset (`millisTime`,
  `preMillisTimeLeft`, `preMillisTimeRight`). The engine sums them. The `+` glyph
  between the select and the knob in `DelayDevice` is not decoration — it is the
  only thing telling the user that setting a fraction does not replace the offset.
- **The Dattorro reverb has duplicate parameter labels.** Its tank section exposes
  two pairs of controls whose natural labels collide, which is why they are
  labelled `1` / `2` inside grouped sections rather than by name. Do not
  "fix" them into unique names without regrouping the layout.
- **Not every parameter exposes an anchor.** Where one is missing the knob falls
  back to its design default; that is a parameter-model gap, not a bug in the
  widget.
- **`enabledField` and `minimizedField` are separate subscriptions.**
  `DeviceEditor` subscribes to each with its own effect, because they are distinct
  SDK fields — one `useEffect` reading both would only re-render for whichever it
  subscribed to.
- **Reordering is an edit.** `audioUnit.audioEffects.move(effect, delta)` must be
  wrapped in `project.editing.modify`, like any other graph mutation — as must
  `project.api.insertEffect(field, factory, index)`.

## Where the specs live

The per-device UI specs written during the epic (`#271`–`#287`) were published as
GitHub issues and untracked from the repo (`7d265b3`); `docs/brainstorm/` is
git-ignored. The issues are the reference for intended layout and parameter
grouping.
