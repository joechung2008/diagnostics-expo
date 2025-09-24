import Error from '@/components/Error';
import { render } from '@testing-library/react-native';
import React from 'react';

jest.mock('@/components/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      background: '#ffffff',
      surface: '#f5f5f5',
      text: '#000000',
      error: '#ff0000',
    },
  }),
}));

describe('Error component', () => {
  it('renders the error message and matches snapshot', () => {
    const { toJSON } = render(<Error message="Something went wrong" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
