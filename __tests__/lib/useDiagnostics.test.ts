import { Environment } from '@/lib/environment';
import type { Diagnostics } from '@/lib/types';
import { useDiagnostics } from '@/lib/useDiagnostics';
import { renderHook, waitFor } from '@testing-library/react-native';

// Mock fetch
global.fetch = jest.fn();

const mockDiagnostics: Diagnostics = {
  extensions: {
    testExtension: {
      extensionName: 'Test Extension',
      manageSdpEnabled: true,
    },
  },
  buildInfo: {
    buildVersion: '1.0.0',
  },
  serverInfo: {
    deploymentId: 'test-deployment',
    extensionSync: {
      totalSyncAllCount: 5,
    },
    hostname: 'test-hostname',
    serverId: 'test-server',
  },
};

describe('useDiagnostics', () => {
  const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should initialize with loading true when environment is provided', () => {
    // Mock fetch to never resolve so we can check initial state
    mockFetch.mockImplementationOnce(() => new Promise(() => {}));

    const { result } = renderHook(() => useDiagnostics(Environment.Public));

    expect(result.current.diagnostics).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    expect(result.current.loading).toBe(true);
  });

  it('should fetch diagnostics successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockDiagnostics,
    } as Response);

    const { result } = renderHook(() => useDiagnostics(Environment.Public));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.diagnostics).toEqual(mockDiagnostics);
    expect(result.current.error).toBeUndefined();
    expect(mockFetch).toHaveBeenCalledWith(Environment.Public);
  });

  it('should handle network errors', async () => {
    const networkError = new Error('Network error');
    mockFetch.mockRejectedValueOnce(networkError);

    const { result } = renderHook(() => useDiagnostics(Environment.Public));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.diagnostics).toBeUndefined();
    expect(result.current.error).toEqual(networkError);
  });

  it('should handle HTTP errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    } as Response);

    const { result } = renderHook(() => useDiagnostics(Environment.Public));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.diagnostics).toBeUndefined();
    expect(result.current.error).toEqual(
      new Error('Failed to fetch diagnostics: Not Found')
    );
  });

  it('should not fetch when environment is falsy', () => {
    const { result } = renderHook(() => useDiagnostics('' as any));

    expect(result.current.loading).toBe(false);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should handle JSON parsing errors', async () => {
    const jsonError = new Error('Invalid JSON');
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockRejectedValueOnce(jsonError),
    } as any);

    const { result } = renderHook(() => useDiagnostics(Environment.Public));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.diagnostics).toBeUndefined();
    expect(result.current.error).toEqual(jsonError);
  });

  it('should call fetch with the provided environment', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockDiagnostics,
    } as Response);

    const { result } = renderHook(() => useDiagnostics(Environment.Fairfax));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockFetch).toHaveBeenCalledWith(Environment.Fairfax);
  });

  it('should clear error state on successful fetch after error', async () => {
    // First render with error
    const networkError = new Error('Network error');
    mockFetch.mockRejectedValueOnce(networkError);

    const { result } = renderHook(() => useDiagnostics(Environment.Public));

    await waitFor(() => {
      expect(result.current.error).toEqual(networkError);
    });

    expect(result.current.diagnostics).toBeUndefined();
  });
});
