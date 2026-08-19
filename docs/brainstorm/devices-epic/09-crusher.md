Bit Crusher — quatre paramètres, dont un entier qui mérite son propre contrôle.
Icône `crusher`, accent **rouge**.

`crush` % · `bits` entier 1…16 (`linearInteger(1, 16)`) · `boost` 0…24 dB ·
`mix` exponentiel %.

```
┌ BIT CRUSHER ────────── ⏻ ✕ ┐
│ Bits ████████░░░░░░░░   8   │
│    ◕       ◕       ◕        │
│  Crush   Boost    Mix       │
│   75 %   6.0 db  100 %      │
└─────────────────────────────┘
```

## Tâches

- [ ] `effects/CrusherDevice.tsx` + son module SASS.
- [ ] `bits` en **barre de 16 segments cliquables** sur la première ligne, valeur
      affichée à droite.
- [ ] `crush`, `boost`, `mix` en trois `ParamKnob` sur la seconde ligne.
- [ ] Inscrire le composant dans le registre en remplacement du repli.

## Notes

`bits` n'a que seize valeurs : un knob y « saute » d'un cran à l'autre sans qu'on sache
jamais où on est. Seize segments disent la valeur d'un coup d'œil et se cliquent
directement. C'est le paramètre signature du device — c'est lui qui fait le son — donc
il prend la première ligne à lui seul.

Deux lignes, c'est le maximum disponible (~180–200 px, en-tête comprise). La barre de
bits doit donc rester basse : une bande de segments, pas une rangée de boutons.

## Critère d'acceptation

Cliquer un segment fixe le nombre de bits et s'entend immédiatement ; les trois knobs
agissent ; le tout tient en deux lignes sans déborder du panneau.

Bloqué par T5. Epic #<epic>
