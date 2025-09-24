import { Environment, getEnvironmentName } from '@/lib/environment';

describe('Environment', () => {
  describe('Environment constants', () => {
    it('has correct Public environment URL', () => {
      expect(Environment.Public).toBe(
        'https://hosting.portal.azure.net/api/diagnostics'
      );
    });

    it('has correct Fairfax environment URL', () => {
      expect(Environment.Fairfax).toBe(
        'https://hosting.azureportal.usgovcloudapi.net/api/diagnostics'
      );
    });

    it('has correct Mooncake environment URL', () => {
      expect(Environment.Mooncake).toBe(
        'https://hosting.azureportal.chinacloudapi.cn/api/diagnostics'
      );
    });
  });

  describe('getEnvironmentName', () => {
    it('returns "Public Cloud" for Public environment', () => {
      expect(getEnvironmentName(Environment.Public)).toBe('Public Cloud');
    });

    it('returns "Fairfax" for Fairfax environment', () => {
      expect(getEnvironmentName(Environment.Fairfax)).toBe('Fairfax');
    });

    it('returns "Mooncake" for Mooncake environment', () => {
      expect(getEnvironmentName(Environment.Mooncake)).toBe('Mooncake');
    });

    it('handles all environment types', () => {
      const environments = Object.values(Environment);
      const names = environments.map((env) => getEnvironmentName(env));

      expect(names).toEqual(['Public Cloud', 'Fairfax', 'Mooncake']);
      expect(names).toHaveLength(3);
      expect(names).not.toContain(undefined);
    });

    it('provides consistent mapping', () => {
      // Test that the same environment always returns the same name
      expect(getEnvironmentName(Environment.Public)).toBe(
        getEnvironmentName(Environment.Public)
      );
      expect(getEnvironmentName(Environment.Fairfax)).toBe(
        getEnvironmentName(Environment.Fairfax)
      );
      expect(getEnvironmentName(Environment.Mooncake)).toBe(
        getEnvironmentName(Environment.Mooncake)
      );
    });
  });

  describe('EnvironmentType', () => {
    it('is a union of all environment URLs', () => {
      const envs: (typeof Environment)[keyof typeof Environment][] =
        Object.values(Environment);

      // All values should be strings (URLs)
      envs.forEach((env) => {
        expect(typeof env).toBe('string');
        expect(env).toMatch(/^https:\/\//);
      });

      // Should have exactly 3 environments
      expect(envs).toHaveLength(3);
    });
  });
});
