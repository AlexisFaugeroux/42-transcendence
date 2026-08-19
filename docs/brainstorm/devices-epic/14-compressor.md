Compressor — douze paramètres, dont quatre booléens qui pilotent des knobs. Icône
`compressor`, accent **jaune**.

`inputgain` ±30 dB · `threshold` −60…0 dB · `ratio` exponentiel 1…24 · `knee` 0…24 dB ·
`attack` 0…100 ms · `release` 5…1500 ms · `makeup` ±40 dB · `mix` % · booléens
`lookahead` `automakeup` `autoattack` `autorelease`.

```
┌ COMPRESSOR ─────────────────────────────────── ⏻ ✕ ┐
│  ◑     ◕      ◕     ◕  │   ◕     ◕   │  ◑      ◕   │
│ Input Thresh Ratio Knee│  Atk    Rel  │ Makeup  Mix │
│ 0db   -18db   4.0  6db │ 10ms  200ms  │  +3db  100% │
│                        │[auto] [auto] │ [auto]      │
│ [lookahead]                                         │
└─────────────────────────────────────────────────────┘
```

## Tâches

- [ ] `effects/CompressorDevice.tsx` + son module SASS.
- [ ] Trois `ParamGroup` : détection (`inputgain`, `threshold`, `ratio`, `knee`),
      enveloppe (`attack`, `release`), sortie (`makeup`, `mix`).
- [ ] **Chaque toggle `auto` grise et désactive le knob qu'il pilote** :
      `autoattack` → `attack`, `autorelease` → `release`, `automakeup` → `makeup`.
      Le toggle se place **sous** son knob.
- [ ] `lookahead` en `ParamToggle` isolé.
- [ ] `inputgain` et `makeup` : passer **`anchor={0.5}` à la main**.
- [ ] Inscrire le composant dans le registre en remplacement du repli.

## Notes

Le vrai geste de design ici, et ce qui rend douze paramètres lisibles : **placer chaque
toggle `auto` sous le knob qu'il neutralise**. La relation devient évidente sans une
ligne d'explication, et un knob grisé annonce qu'il ne sert plus à rien tant que l'auto
est actif. Sans ça, ce device est un mur de douze contrôles.

`inputgain` et `makeup` sont bipolaires **sans ancre déclarée** par le SDK : deux des
quatre cas de l'epic à corriger à la main.

**Pas de VU de réduction de gain**, et ce n'est pas un oubli : l'adapter n'expose aucun
signal de réduction, `labeledAudioOutputs()` ne sert qu'au routage, et `MeterWorklet`
mesure des pistes, pas l'intérieur d'un device. Ce VU demanderait de la plomberie moteur
en plus — explicitement hors périmètre.

La box porte aussi un pointeur `sideChain` : hors périmètre également.

## Critère d'acceptation

Les huit knobs agissent ; activer `autoattack`, `autorelease` ou `automakeup` grise et
désactive exactement le knob correspondant ; `inputgain` et `makeup` ont leur repère
central ; le device tient dans la hauteur du panneau.

Bloqué par T5. Epic #<epic>
