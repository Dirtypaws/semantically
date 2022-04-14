module.exports = {
  env: {
    jest: true,
    'jest/globals': true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'airbnb-base',
    'prettier',
  ],
  globals: {},
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['import', 'jest', 'prettier', 'promise'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-restricted-syntax': 'off',
    'consistent-return': 'warn',
    'import/no-cycle': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'no-else-return': 'warn',
    'no-param-reassign': ['error', { props: false }],
    'no-shadow': 'off',
    'promise/always-return': 'warn',
    'prefer-destructuring': 'off',
    'brace-style': 2,
    'no-console': 'error',
    'no-underscore-dangle': 0,
    'require-await': 'off',
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    camelcase: 'off',
    'import/no-unresolved': [2, { caseSensitive: false }],
  },
  ignorePatterns: ['dist'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@src', './src']],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/', 'tests/'],
      },
    },
  },
};
