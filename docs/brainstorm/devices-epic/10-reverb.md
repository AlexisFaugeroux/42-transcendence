Free Reverb — six paramètres sur une seule rangée. Icône `reverb`, accent **vert**.

`decay` (affiché « Room-Size ») % · `preDelay` exponentiel 1…500 ms · `damp` % ·
`filter` bipolaire % · `dry` dB · `wet` dB.

```
┌ REVERB ───────────────────────── ⏻ ✕ ┐
│   ◕      ◕      ◕      ◑   │  ◕    ◕ │
│  Room  Pre-Dly  Damp  Filter│ Dry  Wet│
│  50 %   12 ms   30 %    0 % │ -6db -12│
└──────────────────────────────────────┘
```

## Tâches

- [ ] `effects/ReverbDevice.tsx` + son module SASS.
- [ ] Six `ParamKnob` sur une rangée, avec un `ParamGroup` qui **isole `dry` / `wet`**
      derrière un séparateur.
- [ ] `decay` affiché « Room-Size » via la prop `label`.
- [ ] `filter` : passer **`anchor={0.5}` à la main**.
- [ ] Inscrire le composant dans le registre en remplacement du repli.

## Notes

Le séparateur avant `dry` / `wet` n'est pas cosmétique : les quatre premiers knobs
façonnent la queue de réverbération, les deux derniers dosent combien on en met. Ce sont
deux gestes mentaux différents, et le trait le dit.

`filter` est bipolaire sans ancre déclarée par le SDK → `anchor={0.5}` explicite.
Attention, c'est l'inverse du `filter` du **Delay**, pour lequel le SDK _déclare_ bien
l'ancre : deux paramètres de même nom, deux comportements. Ne pas généraliser depuis
l'un vers l'autre.

`decay` s'appelle `decay` dans le SDK mais se comprend comme une taille de pièce : le
label affiché doit être « Room-Size », c'est ce que l'oreille entend.

## Critère d'acceptation

Les six knobs agissent, `filter` a son repère central, `dry`/`wet` sont visuellement
détachés des quatre autres, et le tout tient sur une seule rangée.

Bloqué par T5. Epic #<epic>
