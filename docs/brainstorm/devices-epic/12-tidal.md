Tremolo / Autopan (`Tidal`) — six paramètres, dont un qui n'est pas un knob. Icône
`tremolo`, accent **blanc** (`--fg1`).

`rate` = 17 fractions de `1/1` à `1/128` (`ValueMapping.values`) · `depth` % ·
`slope` bipolaire · `symmetry` % (affiché bipolaire) · `offset` ±180° ·
`channelOffset` ±180°.

```
┌ TREMOLO / AUTOPAN ─────────────── ⏻ ✕ ┐
│  Rate [ 1/8 ▾ ]                        │
│    ◕      ◑      ◑      ◑      ◑       │
│  Depth  Slope   Sym   Offset  Ch.Ofs   │
│  50 %    0 %    0 %     0°      90°    │
└────────────────────────────────────────┘
```

## Tâches

- [ ] `effects/TidalDevice.tsx` + son module SASS.
- [ ] `rate` en `ParamSelect` sur la première ligne — les 17 fractions viennent du
      `ValueMapping.values` du paramètre, ne pas les recopier en dur.
- [ ] Cinq `ParamKnob` sur la seconde ligne ; `channelOffset` porte un label explicite
      (« Ch.Ofs » ou « Channel »).
- [ ] Inscrire le composant dans le registre en remplacement du repli.

## Notes

Un knob sur dix-sept valeurs discrètes est injouable : on ne sait jamais si on est sur
`1/8` ou `1/8T`. Le `Select` affiche la fraction, c'est le contrôle juste.

`channelOffset` est le paramètre qui transforme le trémolo en autopan : à 0° les deux
canaux montent et descendent ensemble, à 180° ils s'opposent et le son se balade d'une
oreille à l'autre. Il mérite un label explicite plutôt qu'une abréviation opaque — c'est
la fonctionnalité annoncée par le nom du device.

`slope`, `symmetry`, `offset` et `channelOffset` ont tous leur **ancre centrale déclarée
par le SDK** : rien à passer à la main.

Piste optionnelle, hors périmètre : un mini aperçu de la forme d'onde piloté par
`slope`/`symmetry`. C'est du canvas, donc pas dans cette tâche.

## Critère d'acceptation

Le `Select` liste les 17 fractions et change la vitesse ; les cinq knobs agissent, les
quatre bipolaires partent du centre ; `channelOffset` à 180° produit bien un autopan
audible.

Bloqué par T5. Epic #<epic>
