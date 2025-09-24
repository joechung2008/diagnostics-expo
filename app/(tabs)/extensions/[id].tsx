import { useApp } from '@/components/AppContext';
import Error from '@/components/Error';
import Extension from '@/components/Extension';
import Loading from '@/components/Loading';
import { useTheme } from '@/components/ThemeContext';
import { isExtensionInfo } from '@/lib/utils';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    <View style={[styles.container, dynamicStyles.tabPanel]}>
      {loading ? (
        <Loading message="Loading extension..." />
      ) : error ? (
        <Error message={`Error loading extension: ${error.message}`} />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
