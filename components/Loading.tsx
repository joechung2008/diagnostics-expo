import { useTheme } from '@/components/ThemeContext';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoadingProps {
  message: string;
}

const Loading = ({ message }: LoadingProps) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    loading: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    message: {
      color: colors.text,
      fontSize: 14,
      marginTop: 12,
    },
  });

  return (
    <View style={styles.loading}>
      <ActivityIndicator
        accessibilityLabel={message}
        size="large"
        color={colors.primary}
      />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

export default Loading;
