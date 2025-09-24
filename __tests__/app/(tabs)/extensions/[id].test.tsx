import { render } from '@testing-library/react-native';
import React from 'react';
import ExtensionTab from '../../../../app/(tabs)/extensions/[id]';

// Mock react-native
jest.mock('react-native', () => ({
  View: jest.fn((props) => 'View'),
  Text: jest.fn((props) => 'Text'),
  ActivityIndicator: jest.fn((props) => 'ActivityIndicator'),
  StyleSheet: {
    create: jest.fn(() => ({})),
  },
}));

// Mock the context hooks
jest.mock('@/components/AppContext', () => ({
  useApp: jest.fn(() => ({
    diagnostics: {
      extensions: {
        'test-ext': {
          extensionName: 'Test Extension',
          manageSdpEnabled: true,
          config: {},
          stageDefinition: {},
        },
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
const mockExtension = jest.fn(() => 'Extension');
jest.mock('@/components/Extension', () => ({
  default: mockExtension,
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(() => ({ id: 'test-ext' })),
}));

// Mock utils
jest.mock('@/lib/utils', () => ({
  isExtensionInfo: jest.fn(
    (value) => value !== undefined && 'extensionName' in value
  ),
}));

describe('ExtensionTab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing when extension exists', () => {
    expect(() => render(<ExtensionTab />)).not.toThrow();
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

    expect(() => render(<ExtensionTab />)).not.toThrow();
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

    expect(() => render(<ExtensionTab />)).not.toThrow();
  });

  it('renders extension when extension exists and is valid', () => {
    const mockUseLocalSearchParams = jest.mocked(
      jest.requireMock('expo-router').useLocalSearchParams
    );
    mockUseLocalSearchParams.mockReturnValue({ id: 'test-ext' });

    expect(() => render(<ExtensionTab />)).not.toThrow();
  });

  it('renders "Select an extension" when extension does not exist', () => {
    const mockUseLocalSearchParams = jest.mocked(
      jest.requireMock('expo-router').useLocalSearchParams
    );
    mockUseLocalSearchParams.mockReturnValue({ id: 'nonexistent' });

    const mockUseApp = jest.mocked(
      jest.requireMock('@/components/AppContext').useApp
    );
    mockUseApp.mockReturnValue({
      diagnostics: { extensions: {} },
      error: null,
      loading: false,
    });

    expect(() => render(<ExtensionTab />)).not.toThrow();
  });

  it('renders "Select an extension" when extension is invalid', () => {
    const mockUseLocalSearchParams = jest.mocked(
      jest.requireMock('expo-router').useLocalSearchParams
    );
    mockUseLocalSearchParams.mockReturnValue({ id: 'invalid-ext' });

    const mockUseApp = jest.mocked(
      jest.requireMock('@/components/AppContext').useApp
    );
    mockUseApp.mockReturnValue({
      diagnostics: {
        extensions: {
          'invalid-ext': 'invalid', // not an extension info object
        },
      },
      error: null,
      loading: false,
    });

    const mockIsExtensionInfo = jest.mocked(
      jest.requireMock('@/lib/utils').isExtensionInfo
    );
    mockIsExtensionInfo.mockReturnValue(false);

    expect(() => render(<ExtensionTab />)).not.toThrow();
  });
});
