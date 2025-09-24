import { ThemeProvider, useTheme } from '@/components/ThemeContext';
import { darkTheme } from '@/lib/theme';
import { render } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';

// Mock document for web platform
Object.defineProperty(globalThis, 'document', {
  value: {
    body: {
      style: {},
    },
  },
  writable: true,
});

const TestComponent = () => {
  useTheme();
  return null;
};

describe('ThemeContext', () => {
  beforeEach(() => {
    // Reset document body style
    if (globalThis.document?.body?.style) {
      globalThis.document.body.style.backgroundColor = '';
    }
  });

  describe('ThemeProvider', () => {
    it('renders children', () => {
      const { getByTestId } = render(
        <ThemeProvider>
          <View testID="child" />
        </ThemeProvider>
      );

      expect(getByTestId('child')).toBeTruthy();
    });

    it('provides theme context', () => {
      let capturedContext: any = null;

      const CaptureComponent = () => {
        capturedContext = useTheme();
        return null;
      };

      render(
        <ThemeProvider>
          <CaptureComponent />
        </ThemeProvider>
      );

      expect(capturedContext).toEqual(
        expect.objectContaining({
          theme: 'system',
          colors: expect.any(Object),
          setTheme: expect.any(Function),
          isDark: expect.any(Boolean),
        })
      );
    });

    it('allows theme switching', () => {
      let capturedContext: any = null;

      const TestWithTheme = () => {
        capturedContext = useTheme();
        React.useEffect(() => {
          capturedContext.setTheme('dark');
        }, []);
        return null;
      };

      render(
        <ThemeProvider>
          <TestWithTheme />
        </ThemeProvider>
      );

      expect(capturedContext.colors).toBe(darkTheme);
    });
  });

  describe('useTheme hook', () => {
    it('throws error when used outside provider', () => {
      expect(() => render(<TestComponent />)).toThrow(
        'useTheme must be used within a ThemeProvider'
      );
    });
  });
});
