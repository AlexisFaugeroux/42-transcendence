import { createBaseConfig } from '@transcendence/eslint-config';

export default createBaseConfig({
  ignores: ['dist/', 'build/', 'generated/**', 'prisma.config.ts'],
  tsconfigRootDir: import.meta.dirname,
});
