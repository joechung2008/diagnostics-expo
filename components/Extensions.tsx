import { useTheme } from '@/components/ThemeContext';
import type { ExtensionsProps } from '@/lib/types';
import { byKey, isExtensionInfo, toNavLink } from '@/lib/utils';
import React, { useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

const Extensions: React.FC<ExtensionsProps> = ({ extensions, onLinkClick }) => {
  const { colors } = useTheme();

  const links = useMemo(
    () =>
      Object.values(extensions)
        .filter(isExtensionInfo)
        .map(toNavLink)
        .sort(byKey),
    [extensions]
  );

  const dynamicStyles = {
    container: {
      flexGrow: 0,
      flexShrink: 1,
      minWidth: 0,
      padding: 10,
      backgroundColor: colors.background,
    },
    navButton: {
      alignItems: 'center' as const,
      borderRadius: 4,
      justifyContent: 'center' as const,
      padding: 16,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 8,
    },
    buttonText: {
      fontSize: 16,
      color: colors.text,
      textAlign: 'center' as const,
    },
  };

  return (
    <ScrollView style={dynamicStyles.container} accessibilityLabel="Extensions">
      {links.map((link) => (
        <TouchableOpacity
          key={link.key}
          style={dynamicStyles.navButton}
          onPress={() => onLinkClick?.(link)}
        >
          <Text style={dynamicStyles.buttonText}>{link.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Extensions;
