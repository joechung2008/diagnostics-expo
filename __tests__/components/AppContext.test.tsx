import { AppProvider, useApp } from '@/components/AppContext';
import { Environment } from '@/lib/environment';
import { act, render } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';

// Mock expo-router
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
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
    mockPush.mockClear();
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

    it('handles HTTP response errors', async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        statusText: 'Not Found',
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

      expect(capturedContext.error?.message).toBe(
        'Failed to fetch diagnostics: Not Found'
      );
      expect(capturedContext.loading).toBe(false);
      expect(capturedContext.diagnostics).toBeUndefined();
    });

    it('skips fetch when environment is not set', async () => {
      // Test the edge case where environment becomes falsy
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

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const fetchCallCount = (globalThis.fetch as jest.Mock).mock.calls.length;

      // Manually set environment to empty string to trigger the early return
      await act(async () => {
        capturedContext.setEnvironment('');
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Fetch should not be called again when environment is empty
      expect((globalThis.fetch as jest.Mock).mock.calls.length).toBe(
        fetchCallCount
      );
    });
  });

  describe('context handlers', () => {
    let capturedContext: any = null;

    const CaptureComponent = () => {
      capturedContext = useApp();
      return null;
    };

    const renderWithContext = () => {
      return render(
        <AppProvider>
          <CaptureComponent />
        </AppProvider>
      );
    };

    beforeEach(async () => {
      const mockData = {
        buildInfo: { buildVersion: '1.0.0' },
        extensions: {
          paasserverless: {
            extensionName: 'PaaS Serverless',
            manageSdpEnabled: true,
          },
          websites: {
            extensionName: 'Websites',
            manageSdpEnabled: true,
          },
          testExtension: {
            extensionName: 'Test Extension',
            manageSdpEnabled: true,
          },
        },
        serverInfo: { serverId: 'test-server' },
      };

      (globalThis.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      renderWithContext();

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });
    });

    it('handleEnvironmentSelect changes environment and resets state', async () => {
      const newEnv = Environment.Fairfax;

      await act(async () => {
        capturedContext.handleEnvironmentSelect(newEnv);
      });

      // Wait for re-render to capture updated context
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockPush).toHaveBeenCalledWith('/');
    });

    it('handleLinkClick navigates to extension when valid extension exists', async () => {
      const mockItem = {
        key: 'testExtension',
        name: 'Test Extension',
      };

      await act(async () => {
        capturedContext.handleLinkClick(mockItem);
      });

      expect(mockPush).toHaveBeenCalledWith('/extensions/testExtension');
    });

    it('handleLinkClick does nothing when extension does not exist', async () => {
      const mockItem = {
        key: 'nonExistentExtension',
        name: 'Non-Existent Extension',
      };

      await act(async () => {
        capturedContext.handleLinkClick(mockItem);
      });

      // mockPush should only have been called once from previous test
      // Reset mock to check this specific call
      mockPush.mockClear();

      await act(async () => {
        capturedContext.handleLinkClick(mockItem);
      });

      expect(mockPush).not.toHaveBeenCalled();
    });

    it('handleLinkClick does nothing when item has no key', async () => {
      const mockItem = {
        name: 'No Key Item',
      };

      mockPush.mockClear();

      await act(async () => {
        capturedContext.handleLinkClick(mockItem);
      });

      expect(mockPush).not.toHaveBeenCalled();
    });

    it('handlePaasServerlessPress navigates to paasserverless extension', async () => {
      mockPush.mockClear();

      await act(async () => {
        capturedContext.handlePaasServerlessPress();
      });

      expect(mockPush).toHaveBeenCalledWith('/extensions/paasserverless');
    });

    it('handlePaasServerlessPress does nothing when paasserverless extension does not exist', async () => {
      // Create context with no paasserverless extension
      const mockDataWithoutPaaS = {
        buildInfo: { buildVersion: '1.0.0' },
        extensions: {},
        serverInfo: { serverId: 'test-server' },
      };

      (globalThis.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockDataWithoutPaaS),
      });

      renderWithContext();

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      mockPush.mockClear();

      await act(async () => {
        capturedContext.handlePaasServerlessPress();
      });

      expect(mockPush).not.toHaveBeenCalled();
    });

    it('handleWebsitesPress navigates to websites extension', async () => {
      mockPush.mockClear();

      await act(async () => {
        capturedContext.handleWebsitesPress();
      });

      expect(mockPush).toHaveBeenCalledWith('/extensions/websites');
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
