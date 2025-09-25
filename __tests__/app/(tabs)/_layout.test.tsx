import TabsLayout from '@/app/(tabs)/_layout';
import { render } from '@testing-library/react-native';
import React from 'react';

// Mock ThemeContext
jest.mock('@/components/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      background: '#ffffff',
      surface: '#f5f5f5',
      surfaceSecondary: '#e0e0e0',
      text: '#000000',
      border: '#cccccc',
      primary: '#007AFF',
      textSecondary: '#8E8E93',
    },
  }),
}));

// Mock Header component
jest.mock('@/components/Header', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

// Mock TabsContainer component
jest.mock('@/components/TabsContainer', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

// Mock SafeAreaView
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, style }: any) => {
    const { createElement } = jest.requireActual('react');
    return createElement('SafeAreaView', { style }, children);
  },
}));

describe('TabsLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct structure and theme colors', () => {
    const { toJSON } = render(<TabsLayout />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders SafeAreaView with correct styles', () => {
    const { toJSON } = render(<TabsLayout />);
    // Since we're using snapshot testing, we rely on the snapshot to verify styles
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders Header component', () => {
    const mockHeader = jest.requireMock('@/components/Header').default;
    render(<TabsLayout />);
    expect(mockHeader).toHaveBeenCalledTimes(1);
  });

  it('renders TabsContainer component', () => {
    const mockTabsContainer = jest.requireMock(
      '@/components/TabsContainer'
    ).default;
    render(<TabsLayout />);
    expect(mockTabsContainer).toHaveBeenCalledTimes(1);
  });

  it('applies theme background color to container', () => {
    const { toJSON } = render(<TabsLayout />);
    // The snapshot will capture the background color from theme
    expect(toJSON()).toMatchSnapshot();
  });

  it('uses flex: 1 container style', () => {
    const { toJSON } = render(<TabsLayout />);
    // The snapshot will capture the flex: 1 style
    expect(toJSON()).toMatchSnapshot();
  });
});
