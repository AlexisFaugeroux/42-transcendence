Le device le plus simple du lot, choisi en premier pour éprouver le châssis et les
primitives sur un cas trivial. Icône `maximizer`, accent **jaune**.

`threshold` — linéaire −24…0 dB. C'est tout : le makeup est automatique.

```
┌ MAXIMIZER ─ ⏻ ✕ ┐
│      ▁          │
│      █          │
│      █  ceiling │
│      █  -6.0 db │
│      ▔          │
└─────────────────┘
```

## Tâches

- [ ] `effects/MaximizerDevice.tsx` + son module SASS.
- [ ] `threshold` en **fader vertical** (`Slider` vertical d'antd), pas en knob, avec son
      label « ceiling » et sa valeur imprimée à droite.
- [ ] Inscrire le composant dans le registre `registry.ts` en remplacement du repli.

## Notes

Un plafond se raconte mieux avec un fader vertical qu'avec un knob : le geste (descendre
le plafond) épouse la métaphore. C'est le seul device du lot qui n'utilise pas
`ParamKnob`, et c'est assumé — le sur-mesure commence ici.

Un seul paramètre laisse beaucoup de place : ne pas la remplir. Le panneau doit rester
étroit pour que la chaîne reste lisible.

## Critère d'acceptation

Le fader règle le plafond, la valeur imprimée suit en dB, le geste complet produit une
entrée d'undo, et le device se bypasse et se replie comme les autres.

Bloqué par T5. Epic #<epic>
