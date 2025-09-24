import { act, render } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';
import { AppProvider, useApp } from '../../components/AppContext';
import { Environment } from '../../lib/environment';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock fetch
globalThis.fetch = jest.fn();

const TestComponent = () => {
  useApp();
  return null;
};

describe('AppContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          buildInfo: { buildVersion: '1.0.0' },
          extensions: {},
          serverInfo: { serverId: 'test-server' },
        }),
    });
  });

  describe('AppProvider', () => {
    it('renders children', async () => {
      const { getByTestId } = render(
        <AppProvider>
          <View testID="child" />
        </AppProvider>
      );

      // Wait for any async operations to complete
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(getByTestId('child')).toBeTruthy();
    });

    it('provides default state values', async () => {
      let capturedContext: any = null;

      const CaptureComponent = () => {
        capturedContext = useApp();
        return null;
      };

      render(
        <AppProvider>
          <CaptureComponent />
        </AppProvider>
      );

      // Wait for async operations to complete
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(capturedContext).toEqual(
        expect.objectContaining({
          environment: Environment.Public,
          diagnostics: {
            buildInfo: { buildVersion: '1.0.0' },
            extensions: {},
            serverInfo: { serverId: 'test-server' },
          },
          error: undefined,
          loading: false, // Loading complete after fetch
          showEnvironmentDropdown: false,
          extension: undefined,
          showList: true,
          showPaasServerless: false,
          currentId: undefined,
        })
      );
    });

    it('fetches diagnostics on mount', async () => {
      render(
        <AppProvider>
          <TestComponent />
        </AppProvider>
      );

      // Wait for async operations to complete
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(globalThis.fetch).toHaveBeenCalledWith(Environment.Public);
    });

    it('handles fetch success', async () => {
      const mockData = {
        buildInfo: { buildVersion: '1.0.0' },
        extensions: {
          test: { extensionName: 'Test Extension', manageSdpEnabled: true },
        },
        serverInfo: { serverId: 'test-server' },
      };

      (globalThis.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      let capturedContext: any = null;

      const CaptureComponent = () => {
        capturedContext = useApp();
        return null;
      };

      const { rerender } = render(
        <AppProvider>
          <CaptureComponent />
        </AppProvider>
      );

      // Wait for state update
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      rerender(
        <AppProvider>
          <CaptureComponent />
        </AppProvider>
      );

      expect(capturedContext.diagnostics).toEqual(mockData);
      expect(capturedContext.loading).toBe(false);
      expect(capturedContext.error).toBeUndefined();
    });

    it('handles fetch error', async () => {
      const errorMessage = 'Network error';
      (globalThis.fetch as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      let capturedContext: any = null;

      const CaptureComponent = () => {
        capturedContext = useApp();
        return null;
      };

      const { rerender } = render(
        <AppProvider>
          <CaptureComponent />
        </AppProvider>
      );

      // Wait for state update
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      rerender(
        <AppProvider>
          <CaptureComponent />
        </AppProvider>
      );

      expect(capturedContext.error?.message).toBe(errorMessage);
      expect(capturedContext.loading).toBe(false);
      expect(capturedContext.diagnostics).toBeUndefined();
    });

    it('shows paas serverless when extension exists', async () => {
      const mockData = {
        buildInfo: { buildVersion: '1.0.0' },
        extensions: {
          paasserverless: {
            extensionName: 'PaaS Serverless',
            manageSdpEnabled: true,
          },
        },
        serverInfo: { serverId: 'test-server' },
      };

      (globalThis.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      let capturedContext: any = null;

      const CaptureComponent = () => {
        capturedContext = useApp();
        return null;
      };

      const { rerender } = render(
        <AppProvider>
          <CaptureComponent />
        </AppProvider>
      );

      // Wait for state update
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      rerender(
        <AppProvider>
          <CaptureComponent />
        </AppProvider>
      );

      expect(capturedContext.showPaasServerless).toBe(true);
    });
  });

  describe('useApp hook', () => {
    it('throws error when used outside provider', () => {
      expect(() => render(<TestComponent />)).toThrow(
        'useApp must be used within an AppProvider'
      );
    });
  });
});
