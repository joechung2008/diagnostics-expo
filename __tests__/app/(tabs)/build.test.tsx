import { render } from '@testing-library/react-native';
import React from 'react';
import BuildTab from '@/app/(tabs)/build';

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
      text: '#000000',
    },
  })),
}));

jest.mock('@/components/BuildInfo', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

describe('BuildTab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders build info when build info exists', () => {
    const mockBuildInfo = jest.requireMock('@/components/BuildInfo').default;
    render(<BuildTab />);
    expect(mockBuildInfo).toHaveBeenCalled();
  });

  it('shows loading indicator when loading', () => {
    const mockUseApp = jest.mocked(
      jest.requireMock('@/components/AppContext').useApp
    );
    mockUseApp.mockReturnValue({
      diagnostics: null,
      error: null,
      loading: true,
    });

    const { getByLabelText } = render(<BuildTab />);
    expect(getByLabelText('Loading diagnostics...')).toBeTruthy();
  });

  it('shows error message when there is an error', () => {
    const mockUseApp = jest.mocked(
      jest.requireMock('@/components/AppContext').useApp
    );
    mockUseApp.mockReturnValue({
      diagnostics: null,
      error: { message: 'Network error' },
      loading: false,
    });

    const { getByText } = render(<BuildTab />);
    expect(getByText('Error loading diagnostics: Network error')).toBeTruthy();
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

    const mockBuildInfo = jest.requireMock('@/components/BuildInfo').default;
    render(<BuildTab />);
    expect(mockBuildInfo).not.toHaveBeenCalled();
  });
});
