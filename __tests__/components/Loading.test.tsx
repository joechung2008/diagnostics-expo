import Loading from '@/components/Loading';
import { render } from '@testing-library/react-native';
import React from 'react';

jest.mock('@/components/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      background: '#ffffff',
      surface: '#f5f5f5',
      text: '#000000',
      primary: '#00ff00',
    },
  }),
}));

describe('Loading component', () => {
  it('renders loading indicator and message', () => {
    const { toJSON } = render(<Loading message="Loading extension..." />);
    expect(toJSON()).toMatchSnapshot();
  });
});
