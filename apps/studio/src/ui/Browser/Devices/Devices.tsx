import type { JSX } from 'react';
import { ConfigProvider, Divider, Flex, Listy, theme } from '@transcendence/ui';
import { EFFECT_ENTRIES, type EffectEntry } from '../../Devices/effectFactories';
import { StudioIcon } from '../../components/StudioIcon/StudioIcon';

export function Devices(): JSX.Element {
  return (
    <ConfigProvider
      theme={{
        components: {
          Listy: {
            colorBgContainer: theme.bgPanel,
            colorFillAlter: 'transparent',
            colorTextDescription: theme.fg3,
            fontSize: 11,
            fontWeightStrong: 500,
            itemPaddingBlock: 2,
            itemPaddingInline: 8,
            lineHeight: 2,
            paddingXS: 3,
          },
        },
      }}
    >
      <Listy<EffectEntry>
        items={[...EFFECT_ENTRIES]}
        rowKey={(effect) => `effect-${effect.boxName}`}
        sticky
        styles={{ groupHeader: { fontSize: 10 } }}
        group={{
          key: (effect) => effect.family,
          title: (title) => (
            <Flex align="center">
              {title.toString().toUpperCase()}
              <Divider />
            </Flex>
          ),
        }}
        itemRender={(effect) => (
          <Flex align="center" gap="small">
            <StudioIcon name={effect.icon} size={14} color={effect.accent} />
            {effect.label}
          </Flex>
        )}
      />
    </ConfigProvider>
  );
}
