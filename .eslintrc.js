module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/recommended',
      'plugin:node/recommended',
    ],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      // Custom rules
      'no-console': 'warn', // Warn on console logs
      'import/order': ['error', {
        'groups': [['builtin', 'external', 'internal']],
        'newlines-between': 'always',
        'alphabetize': { 'order': 'asc', 'caseInsensitive': true }
      }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
    settings: {
      node: {
        tryExtensions: ['.js', '.json', '.node', '.ts']
      }
    },
  };
  