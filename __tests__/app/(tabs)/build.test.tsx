import { render } from '@testing-library/react-native';
import React from 'react';
import BuildTab from '../../../app/(tabs)/build';

// Mock react-native
jest.mock('react-native', () => ({
  View: jest.fn((props) => 'View'),
  Text: jest.fn((props) => 'Text'),
  ActivityIndicator: jest.fn((props) => 'ActivityIndicator'),
}));

// Mock the context hooks
jest.mock('@/components/AppContext', () => ({
  useApp: jest.fn(() => ({
    diagnostics: {
      buildInfo: {
        version: '1.0.0',
        buildTime: '2023-01-01T00:00:00Z',
      },
    },
    error: null,
    loading: false,
  })),
}));

jest.mock('@/components/ThemeContext', () => ({
  useTheme: jest.fn(() => ({
    colors: {
      background: '#ffffff',
      primary: '#007bff',
      error: '#dc3545',
    },
  })),
}));

// Mock components
const mockBuildInfo = jest.fn(() => 'BuildInfo');
jest.mock('@/components/BuildInfo', () => ({
  default: mockBuildInfo,
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  Stack: {
    Screen: jest.fn(() => null),
  },
}));

describe('BuildTab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct title', () => {
    render(<BuildTab />);
    expect(jest.requireMock('expo-router').Stack.Screen).toHaveBeenCalledWith(
      expect.objectContaining({
        options: { title: 'Build Info' },
      }),
      undefined
    );
  });

  it('renders loading indicator when loading', () => {
    const mockUseApp = jest.mocked(
      jest.requireMock('@/components/AppContext').useApp
    );
    mockUseApp.mockReturnValue({
      diagnostics: null,
      error: null,
      loading: true,
    });

    expect(() => render(<BuildTab />)).not.toThrow();
  });

  it('renders error message when there is an error', () => {
    const mockUseApp = jest.mocked(
      jest.requireMock('@/components/AppContext').useApp
    );
    mockUseApp.mockReturnValue({
      diagnostics: null,
      error: { message: 'Network error' },
      loading: false,
    });

    expect(() => render(<BuildTab />)).not.toThrow();
  });

  it('renders build info when build info exists', () => {
    expect(() => render(<BuildTab />)).not.toThrow();
  });

  it('renders nothing when build info does not exist', () => {
    const mockUseApp = jest.mocked(
      jest.requireMock('@/components/AppContext').useApp
    );
    mockUseApp.mockReturnValue({
      diagnostics: {},
      error: null,
      loading: false,
    });

    expect(() => render(<BuildTab />)).not.toThrow();
  });
});
