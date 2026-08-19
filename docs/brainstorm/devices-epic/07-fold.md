Wavefolder — deux paramètres. Icône `fold`, accent **rouge**.

`drive` 0…30 dB · `volume` −18…0 dB.

```
┌ WAVEFOLDER ── ⏻ ✕ ┐
│     ◕      ◔      │
│   Drive  Volume   │
│  12.0 db  -3.0 db │
└───────────────────┘
```

## Tâches

- [ ] `effects/FoldDevice.tsx` + son module SASS.
- [ ] `drive` en `ParamKnob` pleine taille, `volume` en `ParamKnob size="small"`.
- [ ] Inscrire le composant dans le registre en remplacement du repli.

## Notes

La différence de taille entre les deux knobs n'est pas décorative : `drive` est le
caractère du device, `volume` ne fait que rattraper le niveau que `drive` a fait
exploser. La hiérarchie visuelle dit laquelle des deux mains on pose d'abord.

Le nom affiché est « Wavefolder », pas « Fold » — `Fold` est le nom de la factory.

## Critère d'acceptation

Les deux knobs agissent sur le son, leurs valeurs s'impriment en dB, et le knob
secondaire est visiblement plus petit que le principal.

Bloqué par T5. Epic #<epic>
