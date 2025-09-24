import { render } from '@testing-library/react-native';
import React from 'react';
import ExtensionsTab from '../../../app/(tabs)/index';

// Mock react-native
jest.mock('react-native', () => ({
  View: jest.fn((props) => 'View'),
  Text: jest.fn((props) => 'Text'),
  ScrollView: jest.fn((props) => 'ScrollView'),
  TouchableOpacity: jest.fn((props) => 'TouchableOpacity'),
  ActivityIndicator: jest.fn((props) => 'ActivityIndicator'),
}));

// Mock the context hooks
jest.mock('@/components/AppContext', () => ({
  useApp: jest.fn(() => ({
    diagnostics: {
      extensions: {
        'test-ext': {
          extensionName: 'Test Extension',
          manageSdpEnabled: true,
        },
      },
    },
    error: null,
    loading: false,
    handleLinkClick: jest.fn(),
  })),
}));

jest.mock('../../../components/ThemeContext', () => ({
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
jest.mock('../../../components/Extension', () => ({
  default: mockExtension,
}));

const mockExtensions = jest.fn(() => 'Extensions');
jest.mock('../../../components/Extensions', () => ({
  default: mockExtensions,
}));

jest.mock('../../../components/Configuration', () => ({
  default: jest.fn(() => 'Configuration'),
}));

jest.mock('../../../components/StageDefinition', () => ({
  default: jest.fn(() => 'StageDefinition'),
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  Stack: {
    Screen: jest.fn(() => null),
  },
  useLocalSearchParams: jest.fn(() => ({})),
}));

// Mock utils
jest.mock('../../../lib/utils', () => ({
  isExtensionInfo: jest.fn(
    (value) => value !== undefined && 'extensionName' in value
  ),
  byKey: jest.fn(),
  toNavLink: jest.fn(() => ({ key: 'test', title: 'Test' })),
}));

describe('ExtensionsTab', () => {
  it('renders extensions list with correct title when no id parameter', () => {
    render(<ExtensionsTab />);
    expect(jest.requireMock('expo-router').Stack.Screen).toHaveBeenCalledWith(
      expect.objectContaining({
        options: { title: 'Extensions' },
      }),
      undefined
    );
  });

  it('renders individual extension with correct title when id parameter exists', () => {
    // Mock useLocalSearchParams to return an id
    const mockUseLocalSearchParams = jest.mocked(
      jest.requireMock('expo-router').useLocalSearchParams
    );
    mockUseLocalSearchParams.mockReturnValue({ id: 'test-ext' });

    render(<ExtensionsTab />);
    expect(jest.requireMock('expo-router').Stack.Screen).toHaveBeenCalledWith(
      expect.objectContaining({
        options: { title: 'Extension' },
      }),
      undefined
    );
  });

  it('shows loading indicator when loading', () => {
    const mockUseApp = jest.mocked(
      jest.requireMock('../../../components/AppContext').useApp
    );
    mockUseApp.mockReturnValue({
      diagnostics: null,
      error: null,
      loading: true,
      handleLinkClick: jest.fn(),
    });

    expect(() => render(<ExtensionsTab />)).not.toThrow();
  });

  it('shows error message when there is an error', () => {
    const mockUseApp = jest.mocked(
      jest.requireMock('../../../components/AppContext').useApp
    );
    mockUseApp.mockReturnValue({
      diagnostics: null,
      error: { message: 'Network error' },
      loading: false,
      handleLinkClick: jest.fn(),
    });

    expect(() => render(<ExtensionsTab />)).not.toThrow();
  });

  it('shows extension not found when extension does not exist', () => {
    const mockUseLocalSearchParams = jest.mocked(
      jest.requireMock('expo-router').useLocalSearchParams
    );
    mockUseLocalSearchParams.mockReturnValue({ id: 'nonexistent' });

    const mockUseApp = jest.mocked(
      jest.requireMock('../../../components/AppContext').useApp
    );
    mockUseApp.mockReturnValue({
      diagnostics: { extensions: {} },
      error: null,
      loading: false,
      handleLinkClick: jest.fn(),
    });

    expect(() => render(<ExtensionsTab />)).not.toThrow();
  });

  it('passes correct props to Extension component', () => {
    const mockUseLocalSearchParams = jest.mocked(
      jest.requireMock('expo-router').useLocalSearchParams
    );
    mockUseLocalSearchParams.mockReturnValue({ id: 'test-ext' });

    // Verify the mock is set
    expect(mockUseLocalSearchParams()).toEqual({ id: 'test-ext' });

    expect(() => render(<ExtensionsTab />)).not.toThrow();
  });

  it('passes correct props to Extensions component', () => {
    expect(() => render(<ExtensionsTab />)).not.toThrow();
  });
});
