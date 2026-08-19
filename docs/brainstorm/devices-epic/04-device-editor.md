Le châssis commun à tous les devices, plus le registre qui associe une box à son
composant et le corps de repli qui rend les onze devices utilisables avant même que
leur UI existe. Équivalents openDAW : `DeviceEditor.tsx|sass`, `DeviceEditorFactory.tsx`,
`UnknownEffectDeviceEditor.tsx`.

## Tâches

- [ ] `DeviceEditor` : grille `2rem` d'en-tête + contenu extensible.
- [ ] En-tête : icône du device en 14 px à son accent, titre (`labelField`) éditable au
      double-clic, puis les actions — bypass (`enabledField`), replier
      (`minimizedField`), `←` / `→` (`unit.audioEffects.move(adapter, ∓1)`), supprimer
      (`Devices.deleteEffectDevices([adapter])`).
- [ ] État **replié** : l'en-tête devient une barre verticale de `1.25rem`, titre en
      `writing-mode: vertical-rl` + `rotate(180deg)`, petites capitales. Le motif existe
      déjà dans `PanelHeader.module.scss` (`.headerContainerBrowserCollapsed`) — le
      reprendre plutôt que le réinventer.
- [ ] État **bypassé** : `filter: saturate(0) brightness(0.6)` sur tout le panneau. Les
      contrôles restent visibles et lisibles — c'est le choix d'openDAW, et il est bon :
      on veut voir ce qu'on a réglé pendant qu'on compare avec et sans.
- [ ] `registry.ts` : liste de paires `[BoxClass, Component]` et résolution par
      `box instanceof BoxClass`, avec `UnknownDevice` en repli.
- [ ] `UnknownDevice` : icône du device + « N paramètres » en `--fg3`.

## Notes

Résoudre le registre par `instanceof` contre les classes de `@opendaw/studio-boxes`
(`DelayDeviceBox`, `GateDeviceBox`, …) plutôt que par une clé chaîne : c'est vérifié par
le compilateur et ça ne dépend pas d'un nom de classe qui pourrait changer à la
minification.

`enabledField` et `minimizedField` sont des `BooleanField` : les basculer dans un
`project.editing.modify(() => field.setValue(!field.getValue()))` **avec** marque — ce
sont des actions discrètes, chacune mérite son undo. C'est l'inverse du geste continu
d'un knob (T5).

Attention à `enabledField` : le champ dit « activé », donc bypassé = `false`. Ne pas
inverser la logique du bouton.

Le repli `UnknownDevice` n'est pas un pis-aller, c'est ce qui rend les onze tâches
suivantes parallélisables : dès la fin de cette tâche la chaîne accepte les onze
devices, chacun se bypasse, se replie, se réordonne et se supprime, et chaque tâche
device n'a plus qu'à remplacer un corps dans son propre fichier.

Le réordonnancement est au menu (`←` / `→`) et pas au drag : openDAW le fait au drag
(`DeviceDragging.ts`, `DevicePanelDragAndDrop.ts`), mais l'ordre d'une chaîne d'effets
change rarement, le SDK fait déjà tout le travail dans `move()`, et le drag se marie mal
avec des knobs qui capturent déjà le pointeur.

## Critère d'acceptation

Un effet inséré s'affiche avec son icône et son nombre de paramètres, se renomme au
double-clic, se bypasse (le panneau se désature), se replie en bandeau vertical, se
déplace dans la chaîne et se supprime. Chaque action est annulable une par une.

Bloqué par T3. Epic #<epic>
