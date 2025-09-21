import { useApp } from '@/components/AppContext';
import BuildInfo from '@/components/BuildInfo';
import { useTheme } from '@/components/ThemeContext';
import { Stack } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function BuildTab() {
  const { colors } = useTheme();
  const { diagnostics, error, loading } = useApp();

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
    <>
      <Stack.Screen
        options={{
          title: 'Build Info',
        }}
      />
      <View style={dynamicStyles.tabPanel}>
        {loading ? (
          <View style={dynamicStyles.loading}>
            <ActivityIndicator
              size="large"
              color={colors.primary}
              accessibilityLabel="Loading diagnostics..."
            />
          </View>
        ) : error ? (
          <Text style={dynamicStyles.errorText}>
            Error loading diagnostics: {error.message}
          </Text>
        ) : diagnostics?.buildInfo ? (
          <BuildInfo {...diagnostics.buildInfo} />
        ) : null}
      </View>
    </>
  );
}
