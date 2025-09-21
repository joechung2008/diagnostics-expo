import { AppProvider } from '@/components/AppContext';
import { ThemeProvider } from '@/components/ThemeContext';
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Slot />
      </AppProvider>
    </ThemeProvider>
  );
}
