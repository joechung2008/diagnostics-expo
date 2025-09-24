import ExtensionsTab from '@/app/(tabs)/index';
import { render } from '@testing-library/react-native';
import React from 'react';

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
    handleLinkClick: jest.fn(),
  })),
}));

jest.mock('@/components/ThemeContext', () => ({
  useTheme: jest.fn(() => ({
    colors: {
      background: '#ffffff',
      primary: '#007bff',
      error: '#dc3545',
      text: '#000000',
    },
  })),
}));

jest.mock('@/components/Extension', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock('@/components/Extensions', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(() => ({})),
}));

describe('ExtensionsTab', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders extensions list with correct title when no id parameter', () => {
    const mockExtensions = jest.requireMock('@/components/Extensions').default;
    render(<ExtensionsTab />);
    expect(mockExtensions).toHaveBeenCalled();
  });

  it('renders individual extension with correct title when id parameter exists', () => {
    const mockUseLocalSearchParams = jest.mocked(
      jest.requireMock('expo-router').useLocalSearchParams
    );
    mockUseLocalSearchParams.mockReturnValue({ id: 'test-ext' });

    const mockExtension = jest.requireMock('@/components/Extension').default;
    render(<ExtensionsTab />);
    expect(mockExtension).toHaveBeenCalled();
  });

  it('shows loading indicator when loading', () => {
    const mockUseApp = jest.mocked(
      jest.requireMock('@/components/AppContext').useApp
    );
    mockUseApp.mockReturnValue({
      diagnostics: null,
      error: null,
      loading: true,
      handleLinkClick: jest.fn(),
    });

    const { getByLabelText } = render(<ExtensionsTab />);
    expect(getByLabelText('Loading extensions...')).toBeTruthy();
  });

  it('shows error message when there is an error', () => {
    const mockUseApp = jest.mocked(
      jest.requireMock('@/components/AppContext').useApp
    );
    mockUseApp.mockReturnValue({
      diagnostics: null,
      error: { message: 'Network error' },
      loading: false,
      handleLinkClick: jest.fn(),
    });

    const { getByText } = render(<ExtensionsTab />);
    expect(getByText('Error loading diagnostics: Network error')).toBeTruthy();
  });

  it('shows extension not found when extension does not exist', () => {
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
      handleLinkClick: jest.fn(),
    });

    const { getByText } = render(<ExtensionsTab />);
    expect(getByText('Extension not found: nonexistent')).toBeTruthy();
  });
});
