module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'nextjs',
  ],
  ignorePatterns: ['node_modules/', '**/__tests__/', '**/__mocks__/'],
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          '@@': './src',
          '@@components': './src/components',
          '@@pages': './src/pages',
          '@@utils': './src/utils',
          '@@lib': './src/lib',
        },
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'import/no-unresolved': 'off', // eslint has weird import issues, so just ignore them now
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'react/jsx-curly-newline': 'off',
    'react/no-children-prop': 'off',
    'react/no-danger': 'off',
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'comma-dangle': [1, 'always-multiline'],
    'no-shadow': 'off',
    'no-plusplus': 'off',
    'no-use-before-define': 'off',
    /**
     * The following import rules are disabled as they are provided
     * by typescript directly.
     * See https://github.com/typescript-eslint/typescript-eslint/blob/f335c504bcf75623d2d671e2e784b047e5e186b9/docs/getting-started/linting/FAQ.md#eslint-plugin-import
     */
    'import/named': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: [
          'builtin',
          'external',
          'internal',
          ['index', 'sibling', 'parent'],
        ],
        pathGroups: [
          {
            pattern:
              '@@{modules,components,screens,utils,assets,styled-components}',
            group: 'internal',
            position: 'before',
          },
        ],
        'newlines-between': 'always',
      },
    ],
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/display-name': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
  },
};
