import { byKey, isExtensionInfo, toNavLink, when } from '@/lib/utils';

describe('Utils', () => {
  describe('isExtensionInfo', () => {
    it('returns true for valid ExtensionInfo objects', () => {
      const validExtension: any = {
        extensionName: 'Test Extension',
        manageSdpEnabled: true,
      };

      expect(isExtensionInfo(validExtension)).toBe(true);
    });

    it('returns false for ExtensionError objects', () => {
      const errorExtension: any = {
        lastError: {
          errorMessage: 'Something went wrong',
          time: '2023-01-01T00:00:00Z',
        },
      };

      expect(isExtensionInfo(errorExtension)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(isExtensionInfo(undefined)).toBe(false);
    });
  });

  describe('byKey', () => {
    it('returns -1 when first key is alphabetically before second', () => {
      const a: any = { key: 'apple' };
      const b: any = { key: 'banana' };

      expect(byKey(a, b)).toBe(-1);
    });

    it('returns 1 when first key is alphabetically after second', () => {
      const a: any = { key: 'zebra' };
      const b: any = { key: 'apple' };

      expect(byKey(a, b)).toBe(1);
    });

    it('returns 0 when keys are equal', () => {
      const a: any = { key: 'apple' };
      const b: any = { key: 'apple' };

      expect(byKey(a, b)).toBe(0);
    });

    it('handles empty strings', () => {
      const a: any = { key: '' };
      const b: any = { key: 'apple' };

      expect(byKey(a, b)).toBe(-1);
    });

    it('handles special characters', () => {
      const a: any = { key: '123' };
      const b: any = { key: 'abc' };

      expect(byKey(a, b)).toBe(-1); // '1' comes before 'a'
    });
  });

  describe('toNavLink', () => {
    it('converts ExtensionInfo to KeyedNavLink', () => {
      const extensionInfo: any = {
        extensionName: 'My Extension',
        manageSdpEnabled: true,
        config: { key: 'value' },
      };

      const result = toNavLink(extensionInfo);

      expect(result).toEqual({
        key: 'My Extension',
        name: 'My Extension',
        url: '',
      });
    });

    it('works with different extension names', () => {
      const extensionInfo: any = {
        extensionName: 'Another Extension',
        manageSdpEnabled: false,
      };

      const result = toNavLink(extensionInfo);

      expect(result).toEqual({
        key: 'Another Extension',
        name: 'Another Extension',
        url: '',
      });
    });

    it('handles extension names with special characters', () => {
      const extensionInfo: any = {
        extensionName: 'Extension-123_ABC',
        manageSdpEnabled: true,
      };

      const result = toNavLink(extensionInfo);

      expect(result).toEqual({
        key: 'Extension-123_ABC',
        name: 'Extension-123_ABC',
        url: '',
      });
    });
  });

  describe('when', () => {
    it('returns args when condition is true', () => {
      const result = when(true, 'a', 'b', 'c');
      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('returns empty array when condition is false', () => {
      const result = when(false, 'a', 'b', 'c');
      expect(result).toEqual([]);
    });

    it('works with different types', () => {
      const result = when(true, 1, 2, 3);
      expect(result).toEqual([1, 2, 3]);
    });

    it('works with objects', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const result = when(true, obj1, obj2);
      expect(result).toEqual([obj1, obj2]);
    });

    it('returns empty array when false with no args', () => {
      const result = when(false);
      expect(result).toEqual([]);
    });
  });
});
