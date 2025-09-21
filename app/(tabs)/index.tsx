import { useApp } from '@/components/AppContext';
import Extension from '@/components/Extension';
import Extensions from '@/components/Extensions';
import { useTheme } from '@/components/ThemeContext';
import { isExtensionInfo } from '@/lib/utils';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function ExtensionsTab() {
  const { colors } = useTheme();
  const { diagnostics, error, loading, handleLinkClick } = useApp();
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

  const handleLinkClickLocal = (item: any) => {
    handleLinkClick(item);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: id ? 'Extension' : 'Extensions',
        }}
      />
      <View style={dynamicStyles.tabPanel}>
        {loading ? (
          <View style={dynamicStyles.loading}>
            <ActivityIndicator
              size="large"
              color={colors.primary}
              accessibilityLabel="Loading..."
            />
          </View>
        ) : error ? (
          <Text style={dynamicStyles.errorText}>
            Error loading diagnostics: {error.message}
          </Text>
        ) : id ? (
          isExtensionInfo(extension) ? (
            <Extension
              extensionName={extension.extensionName}
              manageSdpEnabled={extension.manageSdpEnabled}
              config={extension.config}
              stageDefinition={extension.stageDefinition}
            />
          ) : (
            <Text style={dynamicStyles.errorText}>
              Extension not found: {id}
            </Text>
          )
        ) : diagnostics?.extensions ? (
          <Extensions
            extensions={diagnostics.extensions}
            onLinkClick={handleLinkClickLocal}
          />
        ) : null}
      </View>
    </>
  );
}
