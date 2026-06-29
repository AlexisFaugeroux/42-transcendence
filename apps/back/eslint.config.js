import { createBaseConfig } from '@transcendence/eslint-config';

export default [
  ...createBaseConfig({
    ignores: ['dist/', 'build/', 'src/generated/**', 'prisma.config.ts'],
    tsconfigRootDir: import.meta.dirname,
  }),
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
