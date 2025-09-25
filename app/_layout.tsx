import { AppProvider } from '@/components/AppContext';
import { ThemeProvider } from '@/components/ThemeContext';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppProvider>
          <Slot />
        </AppProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
