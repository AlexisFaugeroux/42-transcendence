Delay — treize paramètres, le device le plus dense du lot, et une surprise dans le DSP.
Icône `delay`, accent **violet**.

`delay` fraction musicale · `millisTime` 0…1000 ms · `preSyncTimeLeft/Right` fractions ·
`preMillisTimeLeft/Right` ms · `feedback` % · `cross` % · `filter` bipolaire (ancre
fournie par le SDK) · `lfoSpeed` 0,1…5 Hz · `lfoDepth` 0…50 ms · `dry` dB · `wet` dB.

```
┌ DELAY ──────────────────────────────────────── ⏻ ✕ ┐
│ Time  [ 1/8 ▾ ] + ◕ 0.0 ms                          │
│ Pre L [ 1/16 ▾] + ◔ 0.0 ms    ◕      ◕      ◑       │
│ Pre R [ 1/8 ▾ ] + ◔ 12.0 ms Feedbk  Cross  Filter   │
│                              45 %    20 %    0 %    │
│                    ─ lfo ─  ◔ Speed 0.50 Hz ◔ Depth │
└─────────────────────────────────────────────────────┘
```

## Tâches

- [ ] `effects/DelayDevice.tsx` + son module SASS.
- [ ] Bloc de gauche : **trois paires `ParamSelect` (fraction) + `ParamKnob` (offset ms)**
      — le temps principal (`delay` + `millisTime`), puis le pré-délai gauche et droit.
      Le `+` entre les deux contrôles est littéral, l'afficher.
- [ ] Bloc de droite : `feedback`, `cross`, `filter` en `ParamKnob` pleine taille.
- [ ] LFO en `ParamGroup` titré, `lfoSpeed` et `lfoDepth` en `size="small"`.
- [ ] `dry` / `wet` : à placer dans le bloc de droite ou en groupe séparé, au jugé de
      l'espace restant.
- [ ] Inscrire le composant dans le registre en remplacement du repli.

## Notes

**Il n'y a PAS de bascule sync/ms.** La box n'a aucun champ de mode : le DSP **additionne**
les deux temps. Vérifié dans `processors.js` :

```
offset = pulsesToSamples(Fractions[delay]) + millisTime × 0.001 × sampleRate
```

Le `+` des maquettes est donc littéral, et c'est ce qui rend l'UI honnête : chaque temps
est une paire _fraction musicale + décalage en ms_, et il y en a trois — le temps
principal, le pré-délai gauche et le pré-délai droit. Toute UI qui présenterait un
sélecteur « sync / ms » mentirait sur ce que fait le device.

Ce sont les deux pré-délais gauche/droit qui, combinés à `cross`, creusent le ping-pong
stéréo. C'est la raison de les montrer séparément au lieu de les cacher.

`filter` a son **ancre déclarée** par le SDK ici — contrairement au `filter` du **Reverb**
(T10), qui ne l'a pas. Deux paramètres de même nom, deux comportements : ne pas passer
`anchor={0.5}` à la main sur celui-ci.

Le LFO reste en knobs secondaires : c'est du chorus d'appoint, pas le cœur du device.
Treize paramètres dans deux rangées demandent cette hiérarchie, sinon rien ne ressort.

## Critère d'acceptation

Les trois paires fraction + offset se règlent indépendamment et s'entendent ;
`feedback`, `cross` et `filter` agissent ; le ping-pong stéréo s'obtient en réglant les
deux pré-délais avec `cross` ; le device tient dans la hauteur du panneau.

Bloqué par T5. Epic #<epic>
