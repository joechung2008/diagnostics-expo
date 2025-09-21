import { useTheme } from '@/components/ThemeContext';
import type { BuildInfoProps } from '@/lib/types';
import React from 'react';
import { Text, View } from 'react-native';

const BuildInfo: React.FC<BuildInfoProps> = ({ buildVersion }) => {
  const { colors } = useTheme();

  const items = [
    {
      name: 'Build Version',
      value: buildVersion,
    },
  ];

  const dynamicStyles = {
    container: {
      padding: 10,
      backgroundColor: colors.background,
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
      <View style={dynamicStyles.table}>
        <View style={dynamicStyles.header}>
          <Text style={dynamicStyles.headerText}>Name</Text>
          <Text style={dynamicStyles.headerText}>Value</Text>
        </View>
        {items.map((item) => (
          <View key={item.name} style={dynamicStyles.row}>
            <Text style={[dynamicStyles.cell, dynamicStyles.cellText]}>
              {item.name}
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

export default BuildInfo;
