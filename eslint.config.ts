// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    ignores: [
        'dist',
        'node_modules',
        'coverage',
        'bun.lockb',
        'bun.lock',
        'package-lock.json',
        'yarn.lock',
        'pnpm-lock.yaml',
        'tsconfig.tsbuildinfo',
    ],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    }
  }
);