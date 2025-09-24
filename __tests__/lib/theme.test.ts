import { lightTheme, darkTheme } from '@/lib/theme';
import type { ThemeColors } from '@/lib/types';

describe('Theme', () => {
  describe('lightTheme', () => {
    it('has all required ThemeColors properties', () => {
      const requiredProperties: (keyof ThemeColors)[] = [
        'background',
        'surface',
        'surfaceSecondary',
        'text',
        'textSecondary',
        'textTertiary',
        'border',
        'borderSecondary',
        'primary',
        'primaryText',
        'accent',
        'error',
        'success',
        'warning',
        'tableBorder',
        'tableHeaderBg',
        'tableRowBg',
        'tableRowAltBg',
      ];

      requiredProperties.forEach((prop) => {
        expect(lightTheme).toHaveProperty(prop);
        expect(typeof lightTheme[prop]).toBe('string');
      });
    });

    it('has valid hex color values', () => {
      Object.values(lightTheme).forEach((color) => {
        expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });

    it('has appropriate light theme colors', () => {
      expect(lightTheme.background).toBe('#ffffff');
      expect(lightTheme.surface).toBe('#f8f9fa');
      expect(lightTheme.text).toBe('#212529');
      expect(lightTheme.primary).toBe('#0056b3');
      expect(lightTheme.tableHeaderBg).toBe('#f8f9fa');
      expect(lightTheme.tableRowBg).toBe('#ffffff');
    });

    it('has contrasting colors for accessibility', () => {
      // Light background should have dark text
      expect(lightTheme.background).toBe('#ffffff');
      expect(lightTheme.text).toBe('#212529');

      // Primary button should have white text on blue background
      expect(lightTheme.primary).toBe('#0056b3');
      expect(lightTheme.primaryText).toBe('#ffffff');
    });
  });

  describe('darkTheme', () => {
    it('has all required ThemeColors properties', () => {
      const requiredProperties: (keyof ThemeColors)[] = [
        'background',
        'surface',
        'surfaceSecondary',
        'text',
        'textSecondary',
        'textTertiary',
        'border',
        'borderSecondary',
        'primary',
        'primaryText',
        'accent',
        'error',
        'success',
        'warning',
        'tableBorder',
        'tableHeaderBg',
        'tableRowBg',
        'tableRowAltBg',
      ];

      requiredProperties.forEach((prop) => {
        expect(darkTheme).toHaveProperty(prop);
        expect(typeof darkTheme[prop]).toBe('string');
      });
    });

    it('has valid hex color values', () => {
      Object.values(darkTheme).forEach((color) => {
        expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });

    it('has appropriate dark theme colors', () => {
      expect(darkTheme.background).toBe('#121212');
      expect(darkTheme.surface).toBe('#1e1e1e');
      expect(darkTheme.text).toBe('#ffffff');
      expect(darkTheme.primary).toBe('#4dabf7');
      expect(darkTheme.tableHeaderBg).toBe('#2d2d2d');
      expect(darkTheme.tableRowBg).toBe('#1e1e1e');
    });

    it('has contrasting colors for accessibility', () => {
      // Dark background should have light text
      expect(darkTheme.background).toBe('#121212');
      expect(darkTheme.text).toBe('#ffffff');

      // Primary button should have white text on blue background
      expect(darkTheme.primary).toBe('#4dabf7');
      expect(darkTheme.primaryText).toBe('#ffffff');
    });
  });

  describe('Theme consistency', () => {
    it('both themes have the same structure', () => {
      const lightKeys = Object.keys(lightTheme).sort();
      const darkKeys = Object.keys(darkTheme).sort();

      expect(lightKeys).toEqual(darkKeys);
      expect(lightKeys).toHaveLength(18); // All ThemeColors properties
    });

    it('themes have different color values', () => {
      // Ensure themes are actually different
      const lightValues = Object.values(lightTheme);
      const darkValues = Object.values(darkTheme);

      expect(lightValues).not.toEqual(darkValues);

      // But they should have the same number of properties
      expect(lightValues).toHaveLength(darkValues.length);
    });

    it('maintains consistent color naming conventions', () => {
      // Both themes should use hex colors
      [lightTheme, darkTheme].forEach((theme) => {
        Object.entries(theme).forEach(([key, value]) => {
          expect(value).toMatch(/^#[0-9a-fA-F]{6}$/);
          expect(typeof value).toBe('string');
        });
      });
    });
  });

  describe('Color validation', () => {
    it('validates all colors are proper hex format', () => {
      const hexRegex = /^#[0-9a-fA-F]{6}$/;

      [lightTheme, darkTheme].forEach((theme) => {
        Object.entries(theme).forEach(([property, color]) => {
          expect(color).toMatch(hexRegex);
          // Ensure no invalid characters
          expect(color).not.toMatch(/[^#0-9a-fA-F]/);
        });
      });
    });

    it('ensures themes have some color diversity', () => {
      [lightTheme, darkTheme].forEach((theme) => {
        const values = Object.values(theme);
        const uniqueValues = [...new Set(values)];

        // Ensure we have at least 50% unique colors (very basic check)
        expect(uniqueValues.length).toBeGreaterThan(values.length * 0.5);
      });
    });
  });
});
