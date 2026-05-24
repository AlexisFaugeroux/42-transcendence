import { createBaseConfig, createReactConfig } from '@transcendence/eslint-config';

export default [
  ...createBaseConfig({
    ignores: ['dist/', 'build/'],
    tsconfigRootDir: import.meta.dirname,
  }),
  ...createReactConfig(),
];
