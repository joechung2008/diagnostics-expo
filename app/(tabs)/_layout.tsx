import { useApp } from '@/components/AppContext';
import Header from '@/components/Header';
import { useTheme } from '@/components/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, usePathname } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function TabsLayout() {
  const pathname = usePathname();
  const { colors } = useTheme();
  const { currentId } = useApp();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      <View style={styles.tabsContainer}>
        <Tabs
          screenOptions={{
            headerShown: false, // Header is in Header component
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textSecondary,
            tabBarStyle: {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Extensions',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list" size={size} color={color} />
              ),
              href: pathname !== '/' ? '/' : null,
            }}
          />
          <Tabs.Screen
            name="extensions/[id]"
            options={{
              title: 'Extension',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="document-text" size={size} color={color} />
              ),
              href: pathname === '/' ? `/extensions/${currentId}` : null,
            }}
          />
          <Tabs.Screen
            name="build"
            options={{
              title: 'Build Info',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="build" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="server"
            options={{
              title: 'Server Info',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="server" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flex: 1,
  },
});
