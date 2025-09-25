import RootLayout from '@/app/_layout';
import { render } from '@testing-library/react-native';
import React from 'react';

// Mock providers with spies
let mockAppProvider: jest.Mock;
let mockThemeProvider: jest.Mock;
let mockSafeAreaProvider: jest.Mock;
let mockSlot: jest.Mock;

jest.mock('@/components/AppContext', () => {
  mockAppProvider = jest.fn(
    ({ children }: { children: React.ReactNode }) => children
  );
  return {
    AppProvider: mockAppProvider,
  };
});

jest.mock('@/components/ThemeContext', () => {
  mockThemeProvider = jest.fn(
    ({ children }: { children: React.ReactNode }) => children
  );
  return {
    ThemeProvider: mockThemeProvider,
  };
});

jest.mock('react-native-safe-area-context', () => {
  mockSafeAreaProvider = jest.fn(
    ({ children }: { children: React.ReactNode }) => children
  );
  return {
    SafeAreaProvider: mockSafeAreaProvider,
  };
});

jest.mock('expo-router', () => {
  mockSlot = jest.fn(() => null);
  return {
    Slot: mockSlot,
  };
});

describe('RootLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with proper provider hierarchy', () => {
    const { toJSON } = render(<RootLayout />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders all required providers and components', () => {
    render(<RootLayout />);

    expect(mockSafeAreaProvider).toHaveBeenCalledTimes(1);
    expect(mockThemeProvider).toHaveBeenCalledTimes(1);
    expect(mockAppProvider).toHaveBeenCalledTimes(1);
    expect(mockSlot).toHaveBeenCalledTimes(1);
  });

  it('renders without crashing', () => {
    expect(() => render(<RootLayout />)).not.toThrow();
  });
});
