import Configuration from '@/components/Configuration';
import StageDefinition from '@/components/StageDefinition';
import { useTheme } from '@/components/ThemeContext';
import type { ExtensionProps } from '@/lib/types';
import React from 'react';
import { ScrollView, Text } from 'react-native';

const Extension: React.FC<ExtensionProps> = ({
  config,
  extensionName,
  stageDefinition,
}) => {
  const { colors } = useTheme();

  const dynamicStyles = {
    scrollView: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      display: 'flex' as const,
      flexDirection: 'column' as const,
      gap: 16,
      padding: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: '600' as const,
      marginBottom: 10,
      color: colors.text,
    },
  };

  return (
    <ScrollView
      style={dynamicStyles.scrollView}
      contentContainerStyle={dynamicStyles.container}
    >
      <Text style={dynamicStyles.title}>{extensionName}</Text>
      {config && <Configuration config={config} />}
      {stageDefinition && <StageDefinition stageDefinition={stageDefinition} />}
    </ScrollView>
  );
};

export default Extension;
