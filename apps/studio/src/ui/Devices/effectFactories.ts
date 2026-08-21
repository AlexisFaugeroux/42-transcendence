import type { AudioEffectDeviceAdapter } from '@opendaw/studio-adapters';
import {
  CompressorDeviceBox,
  CrusherDeviceBox,
  DattorroReverbDeviceBox,
  DelayDeviceBox,
  FoldDeviceBox,
  GateDeviceBox,
  MaximizerDeviceBox,
  ReverbDeviceBox,
  StereoToolDeviceBox,
  TidalDeviceBox,
  WaveshaperDeviceBox,
} from '@opendaw/studio-boxes';
import type { EffectFactory } from '@opendaw/studio-core';
import { EffectFactories } from '@opendaw/studio-core';
import { theme } from '@transcendence/ui';
import type { StudioIconLabel } from '../components/StudioIcon/types';

export type EffectDeviceLabel =
  | 'Compressor'
  | 'Noise Gate'
  | 'Maximizer'
  | 'Bitcrusher'
  | 'Wavefolder'
  | 'Waveshaper'
  | 'Delay'
  | 'Free Reverb'
  | 'Dattorro Reverb'
  | 'Stereo Tool'
  | 'Tremolo / Autopan';

export type EffectFamily = 'dynamics' | 'distortion' | 'space' | 'stereo';

export interface EffectEntry {
  boxName: string;
  factory: EffectFactory;
  family: EffectFamily;
  label: EffectDeviceLabel;
  icon: StudioIconLabel;
  accent: string;
}

// L'ordre est celui du menu, et `family` y place les séparateurs : les entrées
// d'une même famille doivent rester contiguës.
export const EFFECT_ENTRIES: readonly EffectEntry[] = [
  {
    boxName: CompressorDeviceBox.ClassName,
    factory: EffectFactories.Compressor,
    family: 'dynamics',
    label: 'Compressor',
    icon: 'compressor',
    accent: theme.yellow,
  },
  {
    boxName: GateDeviceBox.ClassName,
    factory: EffectFactories.Gate,
    family: 'dynamics',
    label: 'Noise Gate',
    icon: 'gate',
    accent: theme.cyan,
  },
  {
    boxName: MaximizerDeviceBox.ClassName,
    factory: EffectFactories.Maximizer,
    family: 'dynamics',
    label: 'Maximizer',
    icon: 'maximizer',
    accent: theme.yellow,
  },
  {
    boxName: CrusherDeviceBox.ClassName,
    factory: EffectFactories.Crusher,
    family: 'distortion',
    label: 'Bitcrusher',
    icon: 'crusher',
    accent: theme.red,
  },
  {
    boxName: FoldDeviceBox.ClassName,
    factory: EffectFactories.Fold,
    family: 'distortion',
    label: 'Wavefolder',
    icon: 'fold',
    accent: theme.red,
  },
  {
    boxName: WaveshaperDeviceBox.ClassName,
    factory: EffectFactories.Waveshaper,
    family: 'distortion',
    label: 'Waveshaper',
    icon: 'waveshaper',
    accent: theme.red,
  },
  {
    boxName: DelayDeviceBox.ClassName,
    factory: EffectFactories.Delay,
    family: 'space',
    label: 'Delay',
    icon: 'delay',
    accent: theme.purple,
  },
  {
    boxName: ReverbDeviceBox.ClassName,
    factory: EffectFactories.Reverb,
    family: 'space',
    label: 'Free Reverb',
    icon: 'reverb',
    accent: theme.green,
  },
  {
    boxName: DattorroReverbDeviceBox.ClassName,
    factory: EffectFactories.DattorroReverb,
    family: 'space',
    label: 'Dattorro Reverb',
    icon: 'dattorro',
    accent: theme.green,
  },
  {
    boxName: StereoToolDeviceBox.ClassName,
    factory: EffectFactories.StereoTool,
    family: 'stereo',
    label: 'Stereo Tool',
    icon: 'stereoTool',
    accent: theme.fg1,
  },
  {
    boxName: TidalDeviceBox.ClassName,
    factory: EffectFactories.Tidal,
    family: 'stereo',
    label: 'Tremolo / Autopan',
    icon: 'tremolo',
    accent: theme.fg1,
  },
];

export function findEffectEntry(effect: AudioEffectDeviceAdapter): EffectEntry | undefined {
  return EFFECT_ENTRIES.find(({ boxName }) => effect.box.name === boxName);
}
