Waveshaper — trois paramètres. Icône `waveshaper`, accent **rouge**.

`inputGain` 0…40 dB · `outputGain` −24…+24 dB · `mix` %.

```
┌ WAVESHAPER ─────────── ⏻ ✕ ┐
│    ◕     ∫     ◑      ◕    │
│  Input       Output   Mix  │
│  6.0 db      0.0 db  100 % │
└────────────────────────────┘
```

## Tâches

- [ ] `effects/WaveshaperDevice.tsx` + son module SASS.
- [ ] Trois `ParamKnob`, avec le glyphe décoratif entre l'entrée et la sortie.
- [ ] `outputGain` : passer **`anchor={0.5}` à la main**.
- [ ] Inscrire le composant dans le registre en remplacement du repli.

## Notes

La lecture est gauche → droite : on entre, on déforme, on sort. Le glyphe central est
**décoratif** — une vraie courbe de transfert calculée serait du canvas, et c'est
justement ce qui fait sortir `Revamp` du périmètre de l'epic.

`outputGain` est bipolaire par sa plage (−24…+24 dB) mais **le SDK ne déclare pas
d'ancre** : sans `anchor={0.5}` explicite, le knob démarre à gauche et le zéro se
retrouve au milieu du parcours sans marque visible. Un des quatre cas listés dans les
garde-fous de l'epic.

## Critère d'acceptation

Les trois knobs agissent sur le son, et `outputGain` a bien son repère central : à
0.0 dB l'aiguille est en haut, pas à gauche.

Bloqué par T5. Epic #<epic>
