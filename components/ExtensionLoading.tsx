import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useTheme } from '@/components/ThemeContext';

const ExtensionLoading: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.loading}>
      <ActivityIndicator
        size="large"
        color={colors.primary}
        accessibilityLabel="Loading extension..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default ExtensionLoading;
