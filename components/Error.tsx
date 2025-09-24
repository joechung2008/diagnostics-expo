import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '@/components/ThemeContext';

const Error: React.FC<{ message: string }> = ({ message }) => {
  const { colors } = useTheme();

  return (
    <Text style={[styles.errorText, { color: colors.error }]}>{message}</Text>
  );
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    // color is injected from theme via inline style so tests can override if needed
  },
});

export default Error;
