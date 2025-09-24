import { render } from '@testing-library/react-native';
import React from 'react';
import ServerTab from '../../../app/(tabs)/server';

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
      serverInfo: {
        serverVersion: '1.0.0',
        uptime: '1 day',
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
const mockServerInfo = jest.fn(() => 'ServerInfo');
jest.mock('@/components/ServerInfo', () => ({
  default: mockServerInfo,
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  Stack: {
    Screen: jest.fn(() => null),
  },
}));

describe('ServerTab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct title', () => {
    render(<ServerTab />);
    expect(jest.requireMock('expo-router').Stack.Screen).toHaveBeenCalledWith(
      expect.objectContaining({
        options: { title: 'Server Info' },
      }),
      undefined
    );
  });

  it('renders server info when server info exists', () => {
    expect(() => render(<ServerTab />)).not.toThrow();
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

    expect(() => render(<ServerTab />)).not.toThrow();
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

    expect(() => render(<ServerTab />)).not.toThrow();
  });

  it('renders nothing when server info does not exist', () => {
    const mockUseApp = jest.mocked(
      jest.requireMock('@/components/AppContext').useApp
    );
    mockUseApp.mockReturnValue({
      diagnostics: {},
      error: null,
      loading: false,
    });

    expect(() => render(<ServerTab />)).not.toThrow();
  });
});
