import { useApp } from '@/components/AppContext';
import BuildInfo from '@/components/BuildInfo';
import Error from '@/components/Error';
import Loading from '@/components/Loading';
import { useTheme } from '@/components/ThemeContext';
import React from 'react';
import { View } from 'react-native';

export default function BuildTab() {
  const { colors } = useTheme();
  const { diagnostics, error, loading } = useApp();

  const dynamicStyles = {
    tabPanel: {
      flex: 1,
      padding: 10,
      backgroundColor: colors.background,
    },
  };

  return (
    <View style={dynamicStyles.tabPanel}>
      {loading ? (
        <Loading message="Loading diagnostics..." />
      ) : error ? (
        <Error message={`Error loading diagnostics: ${error.message}`} />
      ) : diagnostics?.buildInfo ? (
        <BuildInfo {...diagnostics.buildInfo} />
      ) : null}
    </View>
  );
}
