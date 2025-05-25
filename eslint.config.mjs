import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js defaults
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Add custom rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Turn off the 'any' restriction
      '@typescript-eslint/no-explicit-any': 'off',
      "react/no-unescaped-entities": "off",
      // Warn about unused variables, but ignore ones that start with '_'
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/rules-of-hooks': 'off',
    },
  },
];

export default eslintConfig;
