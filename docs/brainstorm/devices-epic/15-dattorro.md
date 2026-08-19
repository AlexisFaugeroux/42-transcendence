Reverb Dattorro — douze paramètres, et un piège de nommage dans le SDK. Icône
`dattorro`, accent **vert**.

`preDelay` 0…1000 ms · `bandwidth` % · `decay` % · `damping` % · `inputDiffusion1/2` ·
`decayDiffusion1/2` · `excursionRate` · `excursionDepth` · `dry` dB · `wet` dB.

```
┌ REVERB (DATTORRO) ─────────────────── ⏻ ✕ ┐
│   ◕      ◕      ◕      ◕   │   ◕     ◕   │
│ Pre-Dly  BW    Decay  Damp │  Dry    Wet  │
│  40 ms  80 %   85 %   40 % │ -6db   -9db  │
│  ─ input diff ─  ─ decay diff ─  ─ exc ─  │
│    ◔    ◔          ◔    ◔        ◔   ◔    │
│    1    2          1    2       Rate Depth│
└───────────────────────────────────────────┘
```

## Tâches

- [ ] `effects/DattorroDevice.tsx` + son module SASS.
- [ ] Rangée du haut : quatre `ParamKnob` pleine taille + un `ParamGroup` isolant
      `dry` / `wet`.
- [ ] Rangée du bas : six `ParamKnob size="small"` répartis en **trois `ParamGroup` avec
      en-tête** — « input diff », « decay diff », « exc » — et des labels réduits à
      `1` / `2` / `Rate` / `Depth`.
- [ ] Inscrire le composant dans le registre en remplacement du repli.

## Notes

**Piège vérifié dans les sources du SDK** : sur `DattorroReverbDeviceBoxAdapter`,
`inputDiffusion1/2` **et** `decayDiffusion1/2` s'appellent tous les quatre « Tank 1 » /
« Tank 2 » dans `param.name`. Afficher bêtement les noms du SDK donne quatre knobs
`Tank 1, Tank 2, Tank 1, Tank 2` — illisible et impossible à déboguer à l'oreille.

D'où les en-têtes de groupe : ce sont eux qui portent le sens (`input diff` vs
`decay diff`), les labels des knobs se réduisent à `1` et `2`. C'est aussi ce qui justifie
la prop `label` de `ParamKnob` (T5).

Hiérarchie assumée par la différence de taille : rangée du haut, ce qu'on touche
vraiment ; rangée du bas, les entrailles du tank qu'on règle une fois et qu'on oublie.

## Critère d'acceptation

Les douze paramètres agissent, aucun knob n'affiche « Tank 1 » ou « Tank 2 », les trois
groupes de la rangée basse sont titrés, et les deux rangées tiennent dans la hauteur du
panneau.

Bloqué par T5. Epic #<epic>
