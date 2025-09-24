import RootLayout from '../../app/_layout';
import { render } from '@testing-library/react-native';
import React from 'react';

// Mock the context providers
jest.mock('../../components/AppContext', () => ({
  AppProvider: jest.fn(
    ({ children }: { children: React.ReactNode }) => children
  ),
}));

jest.mock('../../components/ThemeContext', () => ({
  ThemeProvider: jest.fn(
    ({ children }: { children: React.ReactNode }) => children
  ),
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  Slot: jest.fn(() => null),
}));

describe('RootLayout', () => {
  it('renders without crashing', () => {
    expect(() => render(<RootLayout />)).not.toThrow();
  });

  it('renders with provider hierarchy', () => {
    // Since providers just pass through children, we just verify it renders
    expect(() => render(<RootLayout />)).not.toThrow();
  });
});
