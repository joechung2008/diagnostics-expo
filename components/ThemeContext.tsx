import { darkTheme, lightTheme } from '@/lib/theme';
import type { ThemeContextType, ThemeType } from '@/lib/types';
import React, { createContext, use, useEffect, useMemo, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeType>('system');
  const [systemTheme, setSystemTheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemTheme(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  const isDark =
    theme === 'dark' || (theme === 'system' && systemTheme === 'dark');
  const colors = isDark ? darkTheme : lightTheme;

  const contextValue = useMemo(
    () => ({ theme, colors, setTheme, isDark }),
    [theme, colors, isDark]
  );

  return <ThemeContext value={contextValue}>{children}</ThemeContext>;
};
