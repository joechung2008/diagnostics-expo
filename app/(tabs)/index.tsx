import { useApp } from '@/components/AppContext';
import Error from '@/components/Error';
import Extension from '@/components/Extension';
import Extensions from '@/components/Extensions';
import Loading from '@/components/Loading';
import { useTheme } from '@/components/ThemeContext';
import { isExtensionInfo } from '@/lib/utils';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function ExtensionsTab() {
  const { colors } = useTheme();
  const { diagnostics, error, loading, handleLinkClick } = useApp();
  const { id } = useLocalSearchParams();

  const extension = diagnostics?.extensions?.[id as string];

  const dynamicStyles = {
    errorText: {
      fontSize: 16,
      textAlign: 'center' as const,
      color: colors.error,
    },
    loading: {
      alignItems: 'center' as const,
      flex: 1,
      justifyContent: 'center' as const,
    },
    tabPanel: {
      backgroundColor: colors.background,
      flex: 1,
      padding: 10,
    },
  };

  return (
    <View style={dynamicStyles.tabPanel}>
      {loading ? (
        <Loading message="Loading extensions..." />
      ) : error ? (
        <Error message={`Error loading diagnostics: ${error.message}`} />
      ) : id ? (
        isExtensionInfo(extension) ? (
          <Extension
            extensionName={extension.extensionName}
            manageSdpEnabled={extension.manageSdpEnabled}
            config={extension.config}
            stageDefinition={extension.stageDefinition}
          />
        ) : (
          <Error message={`Extension not found: ${id}`} />
        )
      ) : diagnostics?.extensions ? (
        <Extensions
          extensions={diagnostics.extensions}
          onLinkClick={handleLinkClick}
        />
      ) : null}
    </View>
  );
}
