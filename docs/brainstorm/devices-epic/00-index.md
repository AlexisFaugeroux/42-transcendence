# Epic « Devices d'effets » — index des issues à créer

Brouillons prêts pour `gh issue create --body-file`. Rien n'est encore publié.
Remplacer `#<epic>` par le numéro réel de l'issue parente après sa création.

| Fichier               | Titre                                                                                       | Labels              | Bloqué par |
| --------------------- | ------------------------------------------------------------------------------------------- | ------------------- | ---------- |
| `00-epic.md`          | Devices d'effets : rack, châssis et les 11 devices du studio                                | `feature`, `studio` | —          |
| `01-selection.md`     | Devices - Tâche 1 : sélection de l'unité éditée (`userEditingManager.audioUnit`)            | `feature`, `studio` | —          |
| `02-rack.md`          | Devices - Tâche 2 : rack `Devices` — conteneurs, défilement, placeholders, tuile instrument | `feature`, `studio` | T1         |
| `03-add-effect.md`    | Devices - Tâche 3 : `AddEffectButton` — insérer un effet dans la chaîne                     | `feature`, `studio` | T2         |
| `04-device-editor.md` | Devices - Tâche 4 : châssis `DeviceEditor` + registre + repli `UnknownDevice`               | `feature`, `studio` | T3         |
| `05-use-param.md`     | Devices - Tâche 5 : `useParam` et les quatre primitives de paramètre                        | `feature`, `studio` | T4         |
| `06-maximizer.md`     | Devices - Tâche 6 : Maximizer (1 paramètre)                                                 | `feature`, `studio` | T5         |
| `07-fold.md`          | Devices - Tâche 7 : Wavefolder / `Fold` (2 paramètres)                                      | `feature`, `studio` | T5         |
| `08-waveshaper.md`    | Devices - Tâche 8 : Waveshaper (3 paramètres)                                               | `feature`, `studio` | T5         |
| `09-crusher.md`       | Devices - Tâche 9 : Bit Crusher (4 paramètres)                                              | `feature`, `studio` | T5         |
| `10-reverb.md`        | Devices - Tâche 10 : Free Reverb (6 paramètres)                                             | `feature`, `studio` | T5         |
| `11-stereo-tool.md`   | Devices - Tâche 11 : Stereo Tool (6 paramètres)                                             | `feature`, `studio` | T5         |
| `12-tidal.md`         | Devices - Tâche 12 : Tremolo / Autopan — `Tidal` (6 paramètres)                             | `feature`, `studio` | T5         |
| `13-gate.md`          | Devices - Tâche 13 : Noise Gate (7 paramètres)                                              | `feature`, `studio` | T5         |
| `14-compressor.md`    | Devices - Tâche 14 : Compressor (12 paramètres)                                             | `feature`, `studio` | T5         |
| `15-dattorro.md`      | Devices - Tâche 15 : Reverb Dattorro (12 paramètres)                                        | `feature`, `studio` | T5         |
| `16-delay.md`         | Devices - Tâche 16 : Delay (13 paramètres)                                                  | `feature`, `studio` | T5         |

## Ordre

T1 → T2 → T3 → T4 → T5 en chaîne stricte : chaque tâche du socle est visible à
l'écran, aucune n'est un refactor invisible. T6 → T16 ne dépendent que de T5 et
sont **parallélisables entre coéquipiers** : chacune remplace un repli
`UnknownDevice` par la vraie UI, dans son propre fichier.

## Sources

- Maquettes et paramètres exacts : `docs/brainstorm/studio-devices-ui.txt`
- Ce que le SDK fournit : `docs/brainstorm/studio-devices.txt`
- Aperçu des icônes : https://claude.ai/code/artifact/99f189aa-7d69-427f-899c-26a26005a8a2
- Référence openDAW : `packages/app/studio/src/ui/devices/` dans
  `github.com/andremichelle/openDAW` (`panel/DevicePanel.tsx|sass`,
  `DeviceEditor.sass`, `ParameterLabelKnob`, `ControlGroup`, `AddEffectButton`,
  `audio-effects/*DeviceEditor.tsx`)
