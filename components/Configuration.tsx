import { useTheme } from '@/components/ThemeContext';
import type { ConfigurationProps, KeyValuePair } from '@/lib/types';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

const Configuration: React.FC<ConfigurationProps> = ({ config }) => {
  const { colors } = useTheme();

  const items = useMemo(
    () =>
      Object.entries(config).reduce<KeyValuePair<string>[]>(
        (previous, [key, value]) => [...previous, { key, value }],
        []
      ),
    [config]
  );

  const dynamicStyles = {
    container: {
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold' as const,
      marginBottom: 10,
      color: colors.text,
    },
    table: {
      borderWidth: 1,
      borderColor: colors.tableBorder,
      backgroundColor: colors.surface,
    },
    header: {
      flexDirection: 'row' as const,
      borderBottomWidth: 1,
      borderBottomColor: colors.tableBorder,
      paddingTop: 5,
      paddingBottom: 5,
      backgroundColor: colors.tableHeaderBg,
    },
    headerText: {
      flex: 1,
      fontWeight: 'bold' as const,
      paddingLeft: 5,
      paddingRight: 5,
      color: colors.text,
    },
    row: {
      flexDirection: 'row' as const,
      paddingTop: 5,
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: colors.tableBorder,
    },
    cell: {
      flex: 1,
      paddingLeft: 5,
      paddingRight: 5,
      minWidth: 0, // Allow flex items to shrink below their content size
    },
    cellText: {
      flex: 1,
      flexShrink: 1,
      color: colors.text,
    },
  };

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>Configuration</Text>
      <View style={dynamicStyles.table}>
        <View style={dynamicStyles.header}>
          <Text style={dynamicStyles.headerText}>Key</Text>
          <Text style={dynamicStyles.headerText}>Value</Text>
        </View>
        {items.map((item) => (
          <View key={item.key} style={dynamicStyles.row}>
            <Text style={[dynamicStyles.cell, dynamicStyles.cellText]}>
              {item.key}
            </Text>
            <Text style={[dynamicStyles.cell, dynamicStyles.cellText]}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Configuration;
