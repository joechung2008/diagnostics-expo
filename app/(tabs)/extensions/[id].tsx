import { useApp } from '@/components/AppContext';
import Extension from '@/components/Extension';
import { useTheme } from '@/components/ThemeContext';
import { isExtensionInfo } from '@/lib/utils';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function ExtensionTab() {
  const { colors } = useTheme();
  const { diagnostics, error, loading } = useApp();
  const { id } = useLocalSearchParams();

  const extension = diagnostics?.extensions?.[id as string];

  const dynamicStyles = {
    tabPanel: {
      flex: 1,
      padding: 10,
      backgroundColor: colors.background,
    },
    loading: {
      flex: 1,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },
    errorText: {
      fontSize: 16,
      textAlign: 'center' as const,
      color: colors.error,
    },
  };

  return (
    <View style={styles.container}>
      <View style={dynamicStyles.tabPanel}>
        {loading ? (
          <View style={dynamicStyles.loading}>
            <ActivityIndicator
              size="large"
              color={colors.primary}
              accessibilityLabel="Loading extension..."
            />
          </View>
        ) : error ? (
          <Text style={dynamicStyles.errorText}>
            Error loading extension: {error.message}
          </Text>
        ) : isExtensionInfo(extension) ? (
          <Extension
            extensionName={extension.extensionName}
            manageSdpEnabled={extension.manageSdpEnabled}
            config={extension.config}
            stageDefinition={extension.stageDefinition}
          />
        ) : (
          <Text style={dynamicStyles.errorText}>Select an extension</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
