import type { TranslationKey } from '@transcendence/i18n';
import type { MsnIconLabel } from '@transcendence/ui';
import studioTimeline from '../../assets/landing/studio-timeline.png';

export interface Feature {
  id: string;
  available: boolean;
  icon: MsnIconLabel;
  color: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  bulletKeys: TranslationKey[];
}

export const FEATURES: Feature[] = [
  {
    bulletKeys: [
      'landing.features.beatMaker.bullets.sequencer',
      'landing.features.beatMaker.bullets.crates',
      'landing.features.beatMaker.bullets.midi',
      'landing.features.beatMaker.bullets.library',
    ],
    color: 'hsl(25, 90%, 55%)',
    descKey: 'landing.features.beatMaker.desc',
    icon: 'produce',
    available: true,
    id: 'beatMaker',
    titleKey: 'landing.features.beatMaker.title',
  },
  {
    bulletKeys: [
      'landing.features.recording.bullets.multitrack',
      'landing.features.recording.bullets.punchIn',
      'landing.features.recording.bullets.latency',
      'landing.features.recording.bullets.comping',
    ],
    color: 'hsl(8, 85%, 55%)',
    descKey: 'landing.features.recording.desc',
    icon: 'record',
    available: false,
    id: 'recording',
    titleKey: 'landing.features.recording.title',
  },
  {
    bulletKeys: [
      'landing.features.mixer.bullets.strips',
      'landing.features.mixer.bullets.sends',
      'landing.features.mixer.bullets.eq',
      'landing.features.mixer.bullets.export',
    ],
    color: 'hsl(210, 90%, 50%)',
    descKey: 'landing.features.mixer.desc',
    icon: 'mix',
    available: false,
    id: 'mixer',
    titleKey: 'landing.features.mixer.title',
  },
  {
    bulletKeys: [
      'landing.features.streaming.bullets.live',
      'landing.features.streaming.bullets.cursor',
      'landing.features.streaming.bullets.listeners',
      'landing.features.streaming.bullets.replay',
    ],
    color: 'hsl(190, 75%, 50%)',
    descKey: 'landing.features.streaming.desc',
    icon: 'waveform',
    available: true,
    id: 'streaming',
    titleKey: 'landing.features.streaming.title',
  },
  {
    bulletKeys: [
      'landing.features.social.bullets.profiles',
      'landing.features.social.bullets.follows',
      'landing.features.social.bullets.playlists',
      'landing.features.social.bullets.reposts',
    ],
    color: 'hsl(140, 65%, 45%)',
    descKey: 'landing.features.social.desc',
    icon: 'users',
    available: true,
    id: 'social',
    titleKey: 'landing.features.social.title',
  },
  {
    bulletKeys: [
      'landing.features.chat.bullets.dms',
      'landing.features.chat.bullets.group',
      'landing.features.chat.bullets.shared',
      'landing.features.chat.bullets.stems',
    ],
    color: 'hsl(280, 65%, 60%)',
    descKey: 'landing.features.chat.desc',
    icon: 'chat',
    available: true,
    id: 'chat',
    titleKey: 'landing.features.chat.title',
  },
];

export interface DeepDive {
  id: string;
  available: boolean;
  accent: string;
  eyebrowKey: TranslationKey;
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
  image?: string;
}

export const DEEP_DIVES: DeepDive[] = [
  {
    accent: 'hsl(25, 90%, 55%)',
    bodyKey: 'landing.deepDives.production.body',
    eyebrowKey: 'landing.deepDives.production.eyebrow',
    available: true,
    id: 'production',
    image: studioTimeline,
    titleKey: 'landing.deepDives.production.title',
  },
  {
    accent: 'hsl(8, 85%, 55%)',
    bodyKey: 'landing.deepDives.streaming.body',
    eyebrowKey: 'landing.deepDives.streaming.eyebrow',
    available: false,
    id: 'streaming',
    titleKey: 'landing.deepDives.streaming.title',
  },
  {
    accent: 'hsl(210, 90%, 50%)',
    bodyKey: 'landing.deepDives.mixing.body',
    eyebrowKey: 'landing.deepDives.mixing.eyebrow',
    available: false,
    id: 'mixing',
    titleKey: 'landing.deepDives.mixing.title',
  },
];
