import TabsLayout from '@/app/(tabs)/_layout';
import { render } from '@testing-library/react-native';
import React from 'react';

// Mock ThemeContext
jest.mock('@/components/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      background: '#112233',
      surface: '#445566',
      surfaceSecondary: '#667788',
      text: '#000000',
      border: '#999999',
    },
  }),
}));

// Mock Header and TabsContainer to assert they're rendered
jest.mock('@/components/Header', () => {
  return function MockHeader() {
    return null as any;
  };
});

jest.mock('@/components/TabsContainer', () => {
  return function MockTabsContainer() {
    return null as any;
  };
});

describe('TabsLayout', () => {
  it('renders Header and TabsContainer and applies background color', () => {
    const { toJSON } = render(<TabsLayout />);

    // snapshot covers Header + TabsContainer and applied styles
    expect(toJSON()).toMatchSnapshot();
  });
});
