import { createBaseConfig, createReactConfig } from '@transcendence/eslint-config';

export default [
  ...createBaseConfig({
    ignores: ['dist/', 'build/', 'public/'],
    tsconfigRootDir: import.meta.dirname,
  }),
  ...createReactConfig(),
];
