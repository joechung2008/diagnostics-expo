import { useApp } from '@/components/AppContext';
import { useTheme } from '@/components/ThemeContext';
import { Environment, getEnvironmentName } from '@/lib/environment';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Header() {
  const { colors } = useTheme();
  const {
    environment,
    showEnvironmentDropdown,
    setShowEnvironmentDropdown,
    handleEnvironmentSelect,
    showPaasServerless,
    handlePaasServerlessPress,
    handleWebsitesPress,
  } = useApp();

  const dynamicStyles = {
    titleBar: {
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      minHeight: 44,
      padding: 10,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    toolbarTitle: {
      fontSize: 18,
      fontWeight: '600' as const,
      color: colors.text,
      textAlign: 'center' as const,
    },
    controlsBar: {
      alignItems: 'center' as const,
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      minHeight: 44,
      padding: 10,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    environmentButton: {
      alignSelf: 'center' as const,
      padding: 10,
      minWidth: 120,
      backgroundColor: colors.surfaceSecondary,
      borderRadius: 4,
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
    },
    toolbarRight: {
      alignItems: 'center' as const,
      flexDirection: 'row' as const,
    },
    environmentButtonText: {
      fontSize: 14,
      color: colors.text,
    },
    environmentDropdown: {
      position: 'absolute' as const,
      top: 50,
      left: 10,
      right: 10,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 4,
      zIndex: 1000,
      maxHeight: 200,
      minHeight: 50,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    environmentOption: {
      padding: 14,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderSecondary,
    },
    environmentOptionLast: {
      borderBottomWidth: 0,
    },
    environmentOptionText: {
      fontSize: 16,
      color: colors.text,
    },
    toolbarButton: {
      padding: 16,
    },
    toolbarButtonText: {
      fontSize: 14,
      color: colors.primary,
    },
  };

  return (
    <>
      <View style={dynamicStyles.titleBar}>
        <Text style={dynamicStyles.toolbarTitle}>
          Azure Portal Extensions Dashboard
        </Text>
      </View>
      <View style={dynamicStyles.controlsBar}>
        <TouchableOpacity
          style={dynamicStyles.environmentButton}
          onPress={() => setShowEnvironmentDropdown(!showEnvironmentDropdown)}
        >
          <Text style={dynamicStyles.environmentButtonText}>
            {getEnvironmentName(environment)}
          </Text>
          <Ionicons name="chevron-down" size={16} color={colors.text} />
        </TouchableOpacity>
        <View style={dynamicStyles.toolbarRight}>
          {showPaasServerless && (
            <TouchableOpacity
              style={dynamicStyles.toolbarButton}
              onPress={handlePaasServerlessPress}
            >
              <Text style={dynamicStyles.toolbarButtonText}>
                paasserverless
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={dynamicStyles.toolbarButton}
            onPress={handleWebsitesPress}
          >
            <Text style={dynamicStyles.toolbarButtonText}>websites</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showEnvironmentDropdown && (
        <View style={dynamicStyles.environmentDropdown}>
          {Object.values(Environment).map((env, index) => (
            <TouchableOpacity
              key={env}
              style={[
                dynamicStyles.environmentOption,
                index === Object.values(Environment).length - 1 &&
                  dynamicStyles.environmentOptionLast,
              ]}
              onPress={() => handleEnvironmentSelect(env)}
            >
              <Text style={dynamicStyles.environmentOptionText}>
                {getEnvironmentName(env)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
}
