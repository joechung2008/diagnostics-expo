import ExtensionTab from '@/app/(tabs)/extensions/[id]';
import { render } from '@testing-library/react-native';
import React from 'react';

// Mock the context hooks
jest.mock('@/components/AppContext', () => ({
  useApp: jest.fn(() => ({
    diagnostics: {
      extensions: {
        'test-ext': {
          // Provide a real ExtensionInfo-shaped object so real utils.isExtensionInfo works
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
      text: '#000000',
    },
  })),
}));

// Mock Extension component to render identifiable text (use require inside factory)
jest.mock('@/components/Extension', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(() => ({ id: 'test-ext' })),
}));

// Mock utils
// Note: Do NOT mock '@/lib/utils' here. Tests should use the real implementation.

describe('ExtensionTab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the extension when it exists', () => {
    const mockExtension = jest.requireMock('@/components/Extension').default;
    render(<ExtensionTab />);
    expect(mockExtension).toHaveBeenCalled();
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

    const { getByLabelText } = render(<ExtensionTab />);
    expect(getByLabelText('Loading extension...')).toBeTruthy();
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

    const { getByText } = render(<ExtensionTab />);
    expect(getByText('Error loading extension: Network error')).toBeTruthy();
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

    const { getByText } = render(<ExtensionTab />);
    expect(getByText('Select an extension')).toBeTruthy();
  });
});
