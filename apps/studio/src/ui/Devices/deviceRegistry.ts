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
import type { FC } from 'react';
import { BitcrusherDevice } from './BitcrusherDevice';
import { CompressorDevice } from './CompressorDevice';
import { DattorroReverbDevice } from './DattorroReverbDevice';
import { DelayDevice } from './DelayDevice';
import { FreeReverbDevice } from './FreeReverbDevice';
import { MaximizerDevice } from './MaximizerDevice';
import { NoiseGateDevice } from './NoiseGateDevice';
import { StereoToolDevice } from './StereoToolDevice';
import { TremoloAutopanDevice } from './TremoloAutopanDevice';
import { WavefolderDevice } from './WavefolderDevice';
import { WaveshaperDevice } from './WaveshaperDevice';

export interface DeviceProps {
  effect: AudioEffectDeviceAdapter;
}

export const DEVICES: Record<string, FC<DeviceProps>> = {
  [CompressorDeviceBox.ClassName]: CompressorDevice,
  [GateDeviceBox.ClassName]: NoiseGateDevice,
  [MaximizerDeviceBox.ClassName]: MaximizerDevice,
  [CrusherDeviceBox.ClassName]: BitcrusherDevice,
  [FoldDeviceBox.ClassName]: WavefolderDevice,
  [WaveshaperDeviceBox.ClassName]: WaveshaperDevice,
  [DelayDeviceBox.ClassName]: DelayDevice,
  [ReverbDeviceBox.ClassName]: FreeReverbDevice,
  [DattorroReverbDeviceBox.ClassName]: DattorroReverbDevice,
  [StereoToolDeviceBox.ClassName]: StereoToolDevice,
  [TidalDeviceBox.ClassName]: TremoloAutopanDevice,
};
