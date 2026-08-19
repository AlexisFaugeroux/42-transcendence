Le panneau devices ne peut rien afficher tant qu'on ne sait pas _de quelle piste_ on
montre la chaîne. Le SDK a déjà le mécanisme — c'est celui qu'openDAW utilise pour son
propre rack — il n'y a qu'à s'y brancher.

## Tâches

- [ ] Hook `useEditedAudioUnit()` dans `src/hooks/`, rendant `AudioUnitBoxAdapter | null` :

```ts
const subscription = project.userEditingManager.audioUnit.catchupAndSubscribe((option) =>
  setUnit(
    option.match({
      none: () => null,
      // le vertex reçu est le champ `editing`, pas la box : `.box` remonte au propriétaire
      some: (vertex) =>
        vertex.box instanceof AudioUnitBox
          ? project.boxAdapters.adapterFor(vertex.box, AudioUnitBoxAdapter)
          : null,
    }),
  ),
);
return () => subscription.terminate();
```

- [ ] `Rack.tsx` : cliquer sur un rack appelle
      `project.userEditingManager.audioUnit.edit(track.audioUnitBox.editing)` — **le champ,
      pas la box** (voir les notes).
- [ ] État visuel « piste éditée » sur le rack, en comparant la valeur du hook :
      `edited?.box === track.audioUnitBox` → `--color-active` + `--glow-active`, nos deux
      tokens de sélection. **Ne pas** utiliser `isEditing()` pour ça (voir les notes).
- [ ] Le clic ne doit pas se déclencher depuis les contrôles déjà présents dans le rack
      (knobs volume/pan, pills M/S, dropdown) — cibler la zone d'en-tête ou arrêter la
      propagation.

## Notes

`UserEditing.edit()` **fait déjà son `editing.modify(…, false)` en interne** (vérifié
dans `studio-adapters/dist/editing/UserEditing.js`). Ne pas l'envelopper dans un second
`modify`, et ne pas appeler `mark()` derrière : ce serait forcer une entrée d'historique
pour un simple clic.

Ce `false` ne signifie pas « hors historique » — c'est le contresens facile. Il signifie
« ne ferme pas le groupe maintenant » : la modification reste dans `#pending`, et
`BoxEditing.undo()` appelle `mark()` lui-même quand quelque chose y attend. Conséquence
observable : après un clic sur une autre piste, le premier Ctrl+Z défait **la sélection**,
et il en faut un second pour revenir au dernier réglage. C'est le comportement du SDK ;
ne pas chercher à le corriger dans cette tâche.

`edit()` est **silencieusement inopérant si `follow()` n'a jamais été appelé** :
`#pointer` reste `Option.None`, `ifSome` ne fait rien, aucune erreur ne remonte. Bonne
nouvelle, c'est déjà branché chez nous — `Project.new(env)` (nous ne passons pas
`noDefaultUser`) et `Project.loadAnyVersion` appellent tous deux
`project.follow(userInterfaceBoxes[0])`. Rien à plomber, mais si un jour la sélection
« ne fait rien », c'est la première chose à vérifier.

Le slot vit dans le box graph, donc la sélection est **persistée avec le projet** et
passera dans Yjs sans travail supplémentaire. C'est la raison de ne pas utiliser un
contexte React à la place.

**On édite le champ `editing`, jamais la box.** `AudioUnitBox` n'accepte pas
`Pointers.Editing` — ses `pointerRules` n'acceptent que `Selection`, `Automation`,
`MetaData` et `SideChain`. Le vertex qui accepte `Editing` est son champ
`get editing(): Field<Pointers.Editing>`. C'est ce que fait openDAW :
`userEditingManager.audioUnit.edit(audioUnitBox.editing)` dans `ProjectApi.js:41`, et
`modularSystem.edit(moduleSetupBox.editing)` dans `EffectFactories.js:352`.

**Le callback reçoit un seul paramètre, `Option<Vertex>`**, et il est appelé
immédiatement à la souscription avec la valeur courante (`observer(this.get())`) avant de
l'être à chaque changement. Un `Vertex` est n'importe quel nœud du box graph — une box ou
un de ses champs — et ici c'est le champ `editing` : d'où le `.box` pour remonter à la
box propriétaire. Sur une box, `get box()` renvoie `this`, donc l'appel reste sans risque.
Passer par `match({ none, some })` plutôt que par un `unwrap()` nu, sinon la première
frame sans sélection jette.

Le garde `instanceof AudioUnitBox` n'est pas de la paranoïa : `adapterFor` fait `panic()`
sur une box supprimée et vérifie le type ensuite. Comme le slot est persisté dans le
projet, un fichier rechargé peut pointer sur une piste entre-temps supprimée.

**`isEditing()` n'est pas réactif.** C'est une lecture impérative : appelée pendant le
rendu, elle ne provoque aucun re-render quand la sélection change. L'état visuel doit
donc dériver de la valeur du hook. Et si tu t'en sers ailleurs, il faut lui passer **le
même vertex** qu'à `edit()` — le champ `editing`, pas la box, puisque la comparaison
passe par `Option.contains`.

## Critère d'acceptation

Cliquer sur un rack l'allume et éteint le précédent ; recharger la page conserve la
piste sélectionnée ; aucune entrée d'historique n'est créée par le clic lui-même — au pire
un Ctrl+Z ultérieur défait la sélection, ce qui est le comportement du SDK.

Epic #<epic>
