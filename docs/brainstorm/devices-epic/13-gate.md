Noise Gate — sept paramètres en deux groupes. Icône `gate`, accent **cyan**.

`threshold` −80…0 dB · `return` 0…24 dB · `floor` −72…−12 dB · `attack` 0…50 ms ·
`hold` 0…500 ms · `release` 1…2000 ms · `inverse` booléen.

```
┌ NOISE GATE ──────────────────── ⏻ ✕ ┐
│   ◕      ◕      ◕   │   ◕     ◕    ◕│
│ Thresh Return  Floor│  Atk   Hold  Rel│
│ -40db  6.0db  -60db │  5ms   50ms 200 │
│ [inverse]           │                 │
└─────────────────────────────────────┘
```

## Tâches

- [ ] `effects/GateDevice.tsx` + son module SASS.
- [ ] Deux `ParamGroup` séparés : à gauche les niveaux (`threshold`, `return`, `floor`),
      à droite l'enveloppe (`attack`, `hold`, `release`).
- [ ] `inverse` en `ParamToggle` sous le groupe de gauche.
- [ ] Inscrire le composant dans le registre en remplacement du repli.

## Notes

Le découpage en deux groupes est le geste de design de ce device : les trois premiers
paramètres disent **quand** le gate ouvre, les trois suivants **comment** il ouvre. C'est
la façon dont on pense un gate quand on l'utilise, et le séparateur doit la rendre
visible sans un mot d'explication.

`inverse` va sous les niveaux et pas au milieu : il inverse la condition d'ouverture,
donc il appartient au groupe « quand ».

## Critère d'acceptation

Les six knobs agissent, les deux groupes sont visuellement séparés, `inverse` bascule le
comportement du gate, et le device tient en deux rangées.

Bloqué par T5. Epic #<epic>
