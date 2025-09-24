import { useTheme } from '@/components/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    errorText: {
      color: colors.error,
      fontSize: 16,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

export default Error;
