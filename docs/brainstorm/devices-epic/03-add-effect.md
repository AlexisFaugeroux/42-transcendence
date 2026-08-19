Sans bouton d'ajout, la chaîne reste vide et rien n'est testable. Équivalent de
`AddEffectButton.tsx` chez openDAW.

## Tâches

- [ ] `AddEffectButton` en fin de chaîne : un `+` qui ouvre un menu (le `Dropdown`
      d'antd est déjà utilisé dans `Rack.tsx`) listant les onze devices, chacun avec
      son icône `StudioIcon` en 14 px et son accent.
- [ ] Insertion :
      `project.editing.modify(() => project.api.insertEffect(unit.audioEffectsField, EffectFactories.X))`
      — ici le `modify` par défaut (avec marque) est le bon : insérer un effet **est**
      une action annulable.
- [ ] Table locale des onze factories retenues, dans l'ordre du menu, avec leur label
      d'affichage et leur label d'icône.

## Notes

**Ne pas alimenter le menu depuis `EffectFactories.AudioNamed` ou `AudioList`.** Ces
collections contiennent `Revamp`, `Vocoder`, `Werkstatt`, `Modular` et `NeuralAmp`, tous
hors périmètre : `NeuralAmp` est `external: true` et va télécharger une lib, `Modular`
s'appelle littéralement « 🔇 Create New Modular Audio Effect (inaudible yet) ». Le repli
`UnknownDevice` (T4) les afficherait sans planter, mais on ne veut pas les proposer.

Les noms affichés ne sont pas tous ceux du SDK : `Reverb` se nomme « Free Reverb »,
`Tidal` « Tremolo / Autopan », `Fold` « Wavefolder ». Reprendre les intitulés des
maquettes (`docs/brainstorm/studio-devices-ui.txt`).

## Critère d'acceptation

Les onze entrées du menu insèrent chacune leur effet à la fin de la chaîne, un undo le
retire, et deux insertions successives se placent dans l'ordre.

Bloqué par T2. Epic #<epic>
