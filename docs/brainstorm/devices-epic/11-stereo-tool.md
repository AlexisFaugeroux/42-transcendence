Stereo Tool — trois knobs et trois booléens. Icône `stereoTool`, accent **blanc**
(`--fg1`).

`volume` dB · `panning` bipolaire (ancre fournie par le SDK) · `stereo` bipolaire (ancre
fournie) · `invertL` · `invertR` · `swap` booléens.

```
┌ STEREO TOOL ───────── ⏻ ✕ ┐
│    ◕      ◑      ◑        │
│  Volume  Pan   Width      │
│  0.0 db   C     0 %       │
│  [ø L]  [ø R]  [⇄ swap]   │
└───────────────────────────┘
```

## Tâches

- [ ] `effects/StereoToolDevice.tsx` + son module SASS.
- [ ] Trois `ParamKnob` (`volume`, `panning`, `stereo` affiché « Width »).
- [ ] Trois `ParamToggle` en rangée basse : `invertL`, `invertR`, `swap`.
- [ ] Inscrire le composant dans le registre en remplacement du repli.

## Notes

`panning` porte son propre `StringMapping.panning` : il **affiche déjà** `C`, `L20`,
`R45` tout seul. Ne pas reformater sa valeur à la main, `getPrintValue()` fait le travail.

`panning` et `stereo` ont tous deux leur ancre centrale **déclarée par le SDK** : ici,
pas de `anchor={0.5}` à passer. C'est le cas normal ; les quatre exceptions sont
ailleurs (Reverb, Waveshaper, Compressor ×2).

Les trois booléens tiennent sur une rangée de `ParamToggle`, ce qui laisse le device en
deux lignes utiles malgré ses six paramètres.

## Critère d'acceptation

Les trois knobs agissent, `panning` affiche `C` au centre et `L…`/`R…` de part et d'autre
sans code de formatage local, et les trois pills basculent leur booléen avec un undo
chacune.

Bloqué par T5. Epic #<epic>
