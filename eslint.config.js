// https://docs.expo.dev/guides/using-eslint/
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier');
const { defineConfig } = require('eslint/config');
const reactX = require('eslint-plugin-react-x');
const reactNative = require('eslint-plugin-react-native');
const prettier = require('eslint-plugin-prettier');

module.exports = defineConfig([
  {
    ignores: ['dist/*', 'react/*'],
  },
  expoConfig,
  prettierConfig,
  {
    plugins: {
      'react-x': reactX,
      'react-native': reactNative,
      prettier,
    },
    rules: {
      ...reactX.configs.recommended.rules,
      ...reactNative.configs.all.rules,
      'prettier/prettier': 'error',
    },
  },
]);
