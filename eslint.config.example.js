export default {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['dist', '**/*.d.ts', 'vite.config.ts', 'src/main.tsx'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/stylistic',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],
  plugins: [
    'react',
    'jsx-a11y',
    'react-hooks',
    'react-refresh',
    'simple-import-sort',
    'import',
    'unicorn',
    'promise',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'unicorn/filename-case': 'off',
    'unicorn/prevent-abbreviations': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
      rules: {},
    },
  ],
};
