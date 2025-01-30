import { FlatCompat } from '@eslint/eslintrc';
import { configs } from '@eslint/js';
import { fixupConfigRules } from '@eslint/compat';
import { configs as _configs } from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: configs.recommended,
});

export default [
  ...fixupConfigRules(compat.extends('next')),

  ...fixupConfigRules(compat.extends('next/core-web-vitals')),

  ...baseConfig,
  ..._configs['flat/react-typescript'],
  {
    ignores: ['.next/**/*', 'out/_next'],
  },
];
