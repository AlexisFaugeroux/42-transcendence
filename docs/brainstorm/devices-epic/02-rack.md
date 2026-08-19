Remplacer le `<div>` vide de `src/ui/Devices/Devices.tsx` par le rack : la chaîne de la
piste éditée, qui défile horizontalement. Disposition reprise de
`panel/DevicePanel.tsx|sass` d'openDAW.

## Tâches

- [ ] Hook `useEffectChain(unit)` : `unit.audioEffects.catchupAndSubscribe({ onAdd, onRemove, onReorder })`,
      rend `adapters()` dans l'ordre des index, `terminate()` au démontage.
- [ ] `Devices.tsx` : deux conteneurs consécutifs en `flex-direction: row` — tuile
      instrument, puis effets audio — dans une piste en `width: max-content`,
      `column-gap: 0.125em`, avec défilement horizontal.
- [ ] Liserés (`Devices.module.scss`, tokens uniquement, aucune couleur en dur) :

```scss
// conteneur des effets audio
border-top: 1px solid var(--line-hover);
background: linear-gradient(
  to bottom,
  rgba(255, 255, 255, 0.05),
  transparent 24px
);

// tuile instrument : même procédé, liseré plus franc
border-top: 1px solid var(--fg3);
```

- [ ] `InstrumentTile` : icône + nom de l'instrument, non éditable, non cliquable.
      Réutiliser `track.instrumentName`, déjà calculé dans `lib/types` et affiché par
      `Rack.tsx` — retrouver la piste par son `audioUnitBox`, plutôt que de replomber
      l'adapter d'instrument.
- [ ] Deux placeholders, chaînes passées par i18n : « aucune piste sélectionnée »
      (rien d'édité) et « aucun effet dans la chaîne » (chaîne vide).

## Notes

openDAW fixe son rack à **248 px** de haut. Nous gardons `flex: 2 1 0` dans la colonne
3:2:2 (`App.module.scss`), soit ~180–200 px utiles : **deux rangées de knobs maximum,
en-tête comprise**. Les onze maquettes ont été dessinées sous cette contrainte, y
compris Delay et Compressor qui sont les pires cas. Ne pas l'assouplir sans les
redessiner.

Le liseré d'openDAW est `linear-gradient(to bottom, var(--color-blue) -500%, transparent 20%)` :
le `-500%` place l'arrêt de couleur loin au-dessus du bloc, si bien qu'on n'en voit que
la queue. Ce procédé n'est lisible qu'avec une couleur **saturée** ; avec un blanc à
5 % d'alpha il serait strictement invisible, d'où le dégradé reformulé ci-dessus qui
part de sa vraie valeur au bord haut.

Le liseré est neutre et non bleu parce que `--color-blue` est notre couleur d'action
primaire et `--color-active` celle de la sélection, et que `--color-green` veut dire
« ça joue » dans le studio (`Transport`, `MsnPeakMeter`, `Footer`).

## Critère d'acceptation

Sans piste sélectionnée, le panneau affiche son placeholder ; avec une piste
sélectionnée mais aucun effet, il affiche la tuile instrument et le second placeholder ;
sélectionner une autre piste change le contenu sans souscription qui fuit.

Bloqué par T1. Epic #<epic>
