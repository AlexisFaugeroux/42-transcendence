Le panneau devices ne peut rien afficher tant qu'on ne sait pas _de quelle piste_ on
montre la chaîne. Le SDK a déjà le mécanisme — c'est celui qu'openDAW utilise pour son
propre rack — il n'y a qu'à s'y brancher.

## Tâches

- [ ] Hook `useEditedAudioUnit()` dans `src/hooks/` : souscrit à
      `project.userEditingManager.audioUnit.catchupAndSubscribe(…)`, rend
      `AudioUnitBoxAdapter | null` (via `project.boxAdapters.adapterFor(box, AudioUnitBoxAdapter)`),
      et appelle `terminate()` dans le cleanup.
- [ ] `Rack.tsx` : cliquer sur un rack appelle
      `project.userEditingManager.audioUnit.edit(track.audioUnitBox)`.
- [ ] État visuel « piste éditée » sur le rack, via
      `userEditingManager.audioUnit.isEditing(track.audioUnitBox)` :
      `--color-active` + `--glow-active`, nos deux tokens de sélection.
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

`audioUnit.get()` rend un `Option<Vertex>` : passer par `match({ none, some })` plutôt
que par un `unwrap()` nu, sinon la première frame sans sélection jette.

## Critère d'acceptation

Cliquer sur un rack l'allume et éteint le précédent ; recharger la page conserve la
piste sélectionnée ; aucune entrée d'historique n'est créée par le clic lui-même — au pire
un Ctrl+Z ultérieur défait la sélection, ce qui est le comportement du SDK.

Epic #<epic>
