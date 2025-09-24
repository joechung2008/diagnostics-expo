import ServerTab from '@/app/(tabs)/server';
import { render } from '@testing-library/react-native';
import React from 'react';

jest.mock('@/components/AppContext', () => ({
  useApp: jest.fn(() => ({
    diagnostics: {
      serverInfo: {
        deploymentId: 'test-deployment-123',
        extensionSync: {
          totalSyncAllCount: 42,
        },
        hostname: 'test-server.example.com',
        nodeVersions: 'v18.17.0',
        serverId: 'server-456',
        uptime: 86400, // 1 day in seconds
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

jest.mock('@/components/ServerInfo', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

describe('ServerTab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders server info when server info exists', () => {
    const mockServerInfo = jest.requireMock('@/components/ServerInfo').default;
    render(<ServerTab />);
    expect(mockServerInfo).toHaveBeenCalled();
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

    const { getByLabelText } = render(<ServerTab />);
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

    const { getByText } = render(<ServerTab />);
    expect(getByText('Error loading diagnostics: Network error')).toBeTruthy();
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

    const mockServerInfo = jest.requireMock('@/components/ServerInfo').default;
    render(<ServerTab />);
    expect(mockServerInfo).not.toHaveBeenCalled();
  });
});
