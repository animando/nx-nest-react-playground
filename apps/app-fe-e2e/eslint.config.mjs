import { configs } from 'eslint-plugin-playwright';
import baseConfig from '../../eslint.config.mjs';

export default [
  configs['flat/recommended'],

  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.js'],
    // Override or add rules here
    rules: {},
  },
];
