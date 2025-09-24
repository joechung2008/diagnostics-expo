import { useApp } from '@/components/AppContext';
import Extension from '@/components/Extension';
import ExtensionLoading from '@/components/ExtensionLoading';
import Error from '@/components/Error';
import { useTheme } from '@/components/ThemeContext';
import { isExtensionInfo } from '@/lib/utils';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

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
        <ExtensionLoading />
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
