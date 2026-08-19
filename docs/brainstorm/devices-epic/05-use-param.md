Le câblage d'un paramètre du SDK vers un contrôle React, écrit une fois pour les onze
devices. Équivalents openDAW : `ParameterLabelKnob`, `ParameterToggleButton`,
`ControlGroup`.

## Tâches

- [ ] `useParam(param)` dans `src/hooks/`, dont voici le contrat exact :

```
value        = param.getUnitValue()          tenu à jour par param.catchupAndSubscribe(…)
print        = param.getPrintValue()         { value, unit }
anchor       = l'ancre du paramètre          surchargeable par la prop du contrôle
onChange(v)  = project.editing.modify(() => param.setUnitValue(v), false)
onChangeEnd  = project.editing.mark()
cleanup      = subscription.terminate()
```

- [ ] `ParamKnob` : `MsnKnob` + label + valeur imprimée. Props `size`
      (`'normal' | 'small'` pour les knobs secondaires des maquettes), `anchor`
      surchargeable, `disabled`, `label` (pour renommer un paramètre mal nommé par le SDK).
- [ ] `ParamToggle` : `MsnPill` lié à un paramètre booléen — `getValue()` / `setValue()`,
      pas `getUnitValue()`.
- [ ] `ParamSelect` : `Select` d'antd alimenté par un paramètre `ValueMapping.values([…])`
      (le `rate` du Tidal, les fractions du Delay).
- [ ] `ParamGroup` : conteneur avec en-tête optionnel en petites capitales et séparateur
      vertical `--line-soft` — le `│` des maquettes.

## Notes

`modify(fn, false)` pendant le geste puis `mark()` au relâchement : c'est le pattern déjà
en place dans `Rack.tsx` pour volume et pan. Un `modify` marqué par pixel de drag
remplirait la pile d'undo de trois cents entrées pour un seul tour de knob.

`terminate()` n'est pas optionnel. `catchupAndSubscribe` rend un objet dont le cleanup du
`useEffect` doit appeler `terminate()`, sinon chaque ouverture du panneau fuit une
souscription par paramètre — et ça ne se voit ni au compile ni à l'œil.

L'ancre vient normalement du paramètre lui-même, mais **quatre paramètres sont
bipolaires sans ancre déclarée** : `Reverb.filter`, `Waveshaper.outputGain`,
`Compressor.inputgain`, `Compressor.makeup`. D'où la prop `anchor` surchargeable, qui
sert à passer `0.5` à la main sur ces quatre-là.

La prop `label` sert aux paramètres que le SDK nomme mal ou nomme deux fois : `decay`
s'affiche « Room-Size » sur le Reverb, et les quatre paramètres de diffusion du Dattorro
s'appellent tous « Tank 1 » / « Tank 2 ».

Ces quatre primitives sont le **seul** code partagé entre devices. Tout le reste — quels
contrôles, quel groupement, quelle hiérarchie — est écrit à la main dans chaque tâche
device : c'est là que se joue le sur-mesure.

## Critère d'acceptation

Sur un device quelconque, tourner un knob change le son, la valeur imprimée suit au
format du SDK (`-12.4 db`, `50 %`), le geste complet produit **une** entrée d'undo, et
ouvrir puis fermer le panneau vingt fois ne laisse aucune souscription active.

Bloqué par T4. Epic #<epic>
