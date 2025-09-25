import TabsContainer from '@/components/TabsContainer';
import { render } from '@testing-library/react-native';
import React from 'react';

// Mock ThemeContext
jest.mock('@/components/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      primary: '#007AFF',
      textSecondary: '#8E8E93',
      surface: '#F2F2F7',
      border: '#C6C6C8',
    },
  }),
}));

// Create a mock for useApp
const mockUseApp = jest.fn();

// Mock AppContext
jest.mock('@/components/AppContext', () => ({
  useApp: () => mockUseApp(),
}));

// Mock expo-router
const mockUsePathname = jest.fn();
jest.mock('expo-router', () => {
  const MockTabs = ({ children, ...props }: any) => {
    const createElement = require('react').createElement;
    return createElement('Tabs', props, children);
  };

  MockTabs.Screen = ({ ...props }: any) => {
    const createElement = require('react').createElement;
    return createElement('TabsScreen', props);
  };

  return {
    Tabs: MockTabs,
    usePathname: () => mockUsePathname(),
  };
});

// Mock expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'MockIonicons',
}));

describe('TabsContainer', () => {
  beforeEach(() => {
    mockUseApp.mockReturnValue({
      currentId: 'test-extension-id',
    });
    mockUsePathname.mockReturnValue('/');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default state', () => {
    const { toJSON } = render(<TabsContainer />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with current extension ID', () => {
    mockUseApp.mockReturnValue({
      currentId: 'my-extension-123',
    });

    const { toJSON } = render(<TabsContainer />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders when on extension detail page', () => {
    mockUsePathname.mockReturnValue('/extensions/test-id');

    const { toJSON } = render(<TabsContainer />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders when no current extension ID is set', () => {
    mockUseApp.mockReturnValue({
      currentId: null,
    });

    const { toJSON } = render(<TabsContainer />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('applies theme colors correctly', () => {
    const { toJSON } = render(<TabsContainer />);

    // The snapshot will capture the theme colors applied to the tab bar
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders all tab screens with correct titles and icons', () => {
    const { toJSON } = render(<TabsContainer />);

    // This test verifies that all 4 tabs (Extensions, Extension, Build Info, Server Info) are rendered
    expect(toJSON()).toMatchSnapshot();
  });
});
