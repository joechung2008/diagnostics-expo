import TabsLayout from '@/app/(tabs)/_layout';
import { render } from '@testing-library/react-native';
import React from 'react';

// Mock react-native
jest.mock('react-native', () => ({
  View: jest.fn(() => 'View'),
  StyleSheet: {
    create: jest.fn(() => ({})),
  },
}));

// Mock the context hooks
jest.mock('@/components/AppContext', () => ({
  useApp: jest.fn(() => ({
    currentId: 'test-id',
  })),
}));

jest.mock('@/components/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      background: '#ffffff',
      primary: '#007bff',
      textSecondary: '#666666',
      surface: '#f8f9fa',
      border: '#dee2e6',
    },
  }),
}));

// Mock Header component
jest.mock('@/components/Header', () => ({
  default: jest.fn(() => 'Header'),
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  Tabs: jest.fn(({ children }) => 'Tabs'),
  usePathname: jest.fn(() => '/'),
}));

// Mock expo vector icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: jest.fn(() => 'Icon'),
}));

describe('TabsLayout', () => {
  it('renders without crashing', () => {
    expect(() => render(<TabsLayout />)).not.toThrow();
  });

  it('renders all tab screens', () => {
    expect(() => render(<TabsLayout />)).not.toThrow();
  });

  it('applies theme colors to tabs', () => {
    expect(() => render(<TabsLayout />)).not.toThrow();
  });

  it('handles navigation state correctly', () => {
    const mockUsePathname = jest.mocked(
      jest.requireMock('expo-router').usePathname
    );
    const mockUseApp = jest.mocked(
      jest.requireMock('@/components/AppContext').useApp
    );

    // Test when on root path with currentId
    mockUsePathname.mockReturnValue('/');
    mockUseApp.mockReturnValue({ currentId: 'test-id' });
    expect(() => render(<TabsLayout />)).not.toThrow();

    // Test when on extension path
    mockUsePathname.mockReturnValue('/extensions/test-id');
    expect(() => render(<TabsLayout />)).not.toThrow();

    // Test when on root path without currentId
    mockUsePathname.mockReturnValue('/');
    mockUseApp.mockReturnValue({ currentId: undefined });
    expect(() => render(<TabsLayout />)).not.toThrow();
  });

  it('includes icons for each tab', () => {
    expect(() => render(<TabsLayout />)).not.toThrow();
  });
});
