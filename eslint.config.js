// https://docs.expo.dev/guides/using-eslint/
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier');
const { defineConfig } = require('eslint/config');
const jest = require('eslint-plugin-jest');
const prettier = require('eslint-plugin-prettier');
const reactNative = require('eslint-plugin-react-native');
const reactX = require('eslint-plugin-react-x');

module.exports = defineConfig([
  {
    ignores: [
      'android',
      'coverage',
      'dist',
      'ios',
      'src/**/*.d.ts',
      '*.{config.setup}.{js,ts}',
    ],
  },
  expoConfig,
  prettierConfig,
  {
    plugins: {
      jest,
      'react-x': reactX,
      'react-native': reactNative,
      prettier,
    },
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js'],
        },
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      ...reactX.configs.recommended.rules,
      ...reactNative.configs.all.rules,
      'prettier/prettier': 'error',
    },
  },
]);
