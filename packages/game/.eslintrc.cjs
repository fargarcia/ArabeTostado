'use strict';

module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  globals: {
    __DEV__: true,
  },
  rules: {
    'prettier/prettier': ['error', { printWidth: 110, singleQuote: true }],
    'no-invalid-this': 'off',
    'consistent-return': 'off',
    'no-return-assign': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',

    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/default': 'off',
    'import/namespace': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'import/no-cycle': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          // un-ban a type that's banned by default
          Function: false,
        },
        extendDefaults: true,
      },
    ],
  } /* ,
  '@typescript-eslint/ban-types': [
    'error',
    {
      Number: 'false',
    },
  ] */,
};
