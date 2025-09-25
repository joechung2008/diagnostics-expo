// Jest setup file for Expo testing
// Matchers from @testing-library/react-native are automatically available in v12+
// Provide a simple mock for react-native-safe-area-context used in components
// so tests that import SafeAreaView (or hooks) don't fail in the node env.
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  return {
    SafeAreaView: (props) =>
      React.createElement('SafeAreaView', props, props.children),
    SafeAreaProvider: (props) =>
      React.createElement('SafeAreaProvider', props, props.children),
    SafeAreaInsetsContext: {
      Consumer: ({ children }) =>
        children({ top: 0, right: 0, bottom: 0, left: 0 }),
    },
    initialWindowSafeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 },
  };
});
