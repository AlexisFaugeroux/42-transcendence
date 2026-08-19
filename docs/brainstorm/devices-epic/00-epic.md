## Objectif

Donner au studio une chaîne d'effets réellement jouable : sélectionner une piste,
insérer un effet, tourner ses paramètres et l'entendre. Onze devices du SDK openDAW
reçoivent une UI React écrite à la main, dans un rack dont la disposition reprend
celle d'openDAW.

Le panneau `devices` est aujourd'hui un `<div>` vide (`src/ui/Devices/Devices.tsx`).

## Contexte codebase (déjà en place)

**Le DSP est déjà chargé.** `@opendaw/studio-core/processors.js` (≈1 Mo) contient les
processeurs de tous les effets, et `lib/projectSetup.ts` fait déjà
`AudioWorklets.install(WorkletsUrl)`. Insérer un effet = ajouter une box dans le box
graph ; le graphe est mirroré vers le worklet et le DSP se câble tout seul. **Il n'y a
pas une ligne de DSP à écrire dans cette epic.**

**Les paramètres arrivent déjà typés, mappés et formatés.** Chaque device a un adapter
dont `namedParameter` expose `getUnitValue()` (0–1, directement `MsnKnob`),
`getPrintValue()` (`-12.4 db`, `50 %`, `1/16`) et `catchupAndSubscribe(fn)`. L'écriture
suit le pattern déjà en place dans `Rack.tsx` : `project.editing.modify(fn, false)`
pendant le geste, `project.editing.mark()` au relâchement — un seul undo par geste.

**La chaîne est déjà réactive et réordonnable.** `unit.audioEffects` est un
`IndexedBoxAdapterCollection` : `catchupAndSubscribe({ onAdd, onRemove, onReorder })`,
`adapters()`, `move(adapter, delta)`. Insertion : `project.api.insertEffect(...)`.
Suppression : `Devices.deleteEffectDevices([...])` (`@opendaw/studio-adapters`).

**Le châssis a déjà ses champs.** `DeviceBoxAdapter` expose `labelField`,
`enabledField` (bypass) et `minimizedField` (replié) ; les effets ajoutent `indexField`
et `host`.

**La sélection existe déjà côté SDK, et elle est déjà branchée.**
`project.userEditingManager.audioUnit` est un slot `UserEditing` qui vit dans le box
graph. Vérifié : `Project.new(env)` (nous ne passons pas `noDefaultUser`) et
`Project.loadAnyVersion` appellent tous deux `project.follow(userInterfaceBoxes[0])`.
La sélection est donc persistée avec le projet et passera dans Yjs sans travail
supplémentaire.

**Les icônes sont livrées.** Les onze glyphes openDAW sont dans `StudioIcon`
(labels `maximizer`, `fold`, `waveshaper`, `crusher`, `reverb`, `stereoTool`,
`tremolo`, `gate`, `dattorro`, `compressor`, `delay`), à afficher en **14 px**.

**Ce qui manque vraiment :** aucune UI réutilisable. Celle d'openDAW existe mais en
`@opendaw/lib-jsx`, interdit ici (deux systèmes JSX dans la même page). Et aucune
métadonnée de disposition : le SDK dit le nom, le mapping et le format d'un paramètre,
jamais « ce knob va là, à cette taille ». Cette table-là, c'est nous qui l'écrivons.

## Périmètre

**Réel :** rack `Devices` avec défilement horizontal, tuile instrument, placeholders,
sélection de la piste éditée, châssis `DeviceEditor` (titre éditable, bypass, replier,
réordonner, supprimer), menu d'ajout d'effet, hook `useParam` + quatre primitives de
paramètre, et les onze devices suivants :

Maximizer (1 paramètre), Fold (2), Waveshaper (3), Crusher (4), Reverb (6),
StereoTool (6), Tidal (6), Gate (7), DattorroReverb (12), Compressor (12), Delay (13).

**Hors périmètre :** `Revamp` (courbe d'EQ à dessiner), `Modular` (patcher),
`Werkstatt` (éditeur de code), `Vocoder` (bandes d'analyse), `NeuralAmp`
(`external: true`, télécharge une lib) — tous exigent un canvas ou un éditeur. Les
effets MIDI, les éditeurs d'instruments, le channel strip et le side-chain du
Compressor également.

## Choix d'architecture

- **Un composant React par device, pas un renderer générique piloté par une table.**
  C'est aussi ce que fait openDAW (`DelayDeviceEditor.tsx`, `GateDeviceEditor.tsx`, …).
  Une table produirait onze grilles de knobs interchangeables ; le sur-mesure est
  précisément ce qui rend un Gate lisible comme un gate et un Delay comme un delay.

- **Cinq pièces partagées, et pas une de plus** : le rack, le châssis, `useParam`, et
  quatre primitives de paramètre (`ParamKnob`, `ParamToggle`, `ParamSelect`,
  `ParamGroup`) — le miroir de `ParameterLabelKnob` / `ParameterToggleButton` /
  `ControlGroup` chez openDAW. Sans elles, huit lignes de câblage recopiées onze fois.
  Le sur-mesure reste dans la **disposition**, pas dans le branchement d'un knob.

- **Vocabulaire aligné sur openDAW.** `Devices` = le rack, `DeviceEditor` = le châssis
  d'un device. Nos premières notes appelaient `DevicePanel` le châssis, alors que c'est
  le nom du **rack** chez eux ; garder l'inversion garantissait la confusion à chaque
  relecture de leur code.

- **Un registre `box → composant` avec un repli `UnknownDevice`** (leur
  `DeviceEditorFactory.tsx` + `UnknownEffectDeviceEditor.tsx`). Dès la fin du socle,
  les onze devices s'insèrent, se bypassent, se replient et se suppriment : ils
  affichent juste leur icône et leur nombre de paramètres. Chaque tâche device remplace
  ensuite un repli par la vraie UI — **onze tâches parallélisables, aucun conflit**.

- **La sélection passe par le slot du SDK, pas par un état React.**
  `userEditingManager.audioUnit` vit dans le box graph : persisté, synchronisable,
  et déjà branché. Un contexte React ferait doublon et divergerait à la première
  session collaborative.

- **Le liseré des conteneurs est neutre, pas bleu.** openDAW colore la section des
  effets en bleu et l'instrument en vert. Chez nous `--color-blue` est la couleur
  d'action primaire (`colorPrimary` d'antd) et sa variante `--color-active` celle de
  la sélection ; `--color-green` veut dire « ça joue » (bouton play, `MsnPeakMeter`,
  footer). Un liseré permanent dans ces teintes mangerait deux signaux d'état. C'est
  le **procédé** qu'on reprend — liseré 1 px en haut + dégradé qui s'estompe — avec
  `--line-hover` pour les effets et `--fg3` pour l'instrument.

- **Pas d'i18n sur les noms de devices ni les labels de paramètres.** « Drive », « Mix »,
  « Pre-Dly » sont du jargon de DAW, anglais dans tous les DAW y compris openDAW.
  Traduire une centaine de labels en trois langues serait absurde. Seules les chaînes
  du panneau passent par i18n : placeholders, « ajouter un effet », « supprimer ».

## Sous-tâches

- [ ] #<T1> — T1 — Sélection de l'unité éditée (`userEditingManager.audioUnit`)
- [ ] #<T2> — T2 — Rack `Devices` : conteneurs, défilement, placeholders, tuile instrument
- [ ] #<T3> — T3 — `AddEffectButton` : insérer un effet dans la chaîne
- [ ] #<T4> — T4 — Châssis `DeviceEditor` + registre + repli `UnknownDevice`
- [ ] #<T5> — T5 — `useParam` et les quatre primitives de paramètre
- [ ] #<T6> — T6 — Maximizer (1 paramètre)
- [ ] #<T7> — T7 — Wavefolder / `Fold` (2)
- [ ] #<T8> — T8 — Waveshaper (3)
- [ ] #<T9> — T9 — Bit Crusher (4)
- [ ] #<T10> — T10 — Free Reverb (6)
- [ ] #<T11> — T11 — Stereo Tool (6)
- [ ] #<T12> — T12 — Tremolo / Autopan `Tidal` (6)
- [ ] #<T13> — T13 — Noise Gate (7)
- [ ] #<T14> — T14 — Compressor (12)
- [ ] #<T15> — T15 — Reverb Dattorro (12)
- [ ] #<T16> — T16 — Delay (13)

## Dépendances

Le socle est une chaîne stricte : T2 dépend de T1, T3 de T2, T4 de T3, T5 de T4.
Chaque maillon est visible à l'écran — aucun n'est un refactor invisible.
T6 → T16 ne dépendent que de T5 et sont indépendantes entre elles.

**Le studio a une chaîne d'effets utilisable dès la fin de T5.** Les onze tâches
suivantes améliorent chacune un device sans jamais casser les autres.

## Garde-fous à ne pas perdre de vue

1. **Toute souscription au SDK se termine au démontage.** `catchupAndSubscribe` rend un
   objet dont il faut appeler `terminate()` dans le cleanup du `useEffect`. Oublier
   fuit une souscription par device ouvert, et ça ne se voit pas au compile.
2. **`modify(fn, false)` pendant le geste, `mark()` au relâchement.** Un `modify` par
   pixel de drag remplirait la pile d'undo de trois cents entrées.
3. **La contrainte de hauteur est de deux rangées de knobs, en-tête comprise.** Le
   panneau fait `flex: 2 1 0` dans une colonne 3:2:2, soit ~180–200 px utiles ; un
   `MsnKnob` fait 40 px, 61 px avec son label et sa valeur.
4. **`UserEditing.edit()` fait déjà son `modify(…, false)` en interne.** Ne pas
   l'envelopper dans un second `modify`, et pas de `mark()` derrière. Ce `false` ne veut
   pas dire « hors historique » mais « groupe laissé ouvert » : `undo()` le referme
   lui-même, donc le premier Ctrl+Z après un changement de piste défait la sélection.
5. **Quatre paramètres sont bipolaires sans ancre déclarée par le SDK** — `Reverb.filter`,
   `Waveshaper.outputGain`, `Compressor.inputgain`, `Compressor.makeup` : passer
   `anchor={0.5}` à la main, sinon le knob part de la gauche au lieu du centre.
6. **Ne pas afficher aveuglément `param.name`.** Sur le Dattorro, `inputDiffusion1/2`
   **et** `decayDiffusion1/2` s'appellent tous les quatre « Tank 1 » / « Tank 2 ».
