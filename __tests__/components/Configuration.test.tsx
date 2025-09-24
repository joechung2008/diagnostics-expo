import { render } from '@testing-library/react-native';
import Configuration from '../../components/Configuration';

// Mock the ThemeContext
jest.mock('../../components/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      background: '#ffffff',
      surface: '#f5f5f5',
      text: '#000000',
      tableBorder: '#cccccc',
      tableHeaderBg: '#e0e0e0',
    },
  }),
}));

describe('Configuration', () => {
  const mockConfig = {
    apiUrl: 'https://api.example.com',
    timeout: '30000',
    retries: '3',
    debug: 'false',
  };

  it('renders configuration key-value pairs correctly', () => {
    const { toJSON } = render(<Configuration config={mockConfig} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders empty configuration object', () => {
    const { toJSON } = render(<Configuration config={{}} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders single configuration item', () => {
    const singleConfig = { version: '1.0.0' };
    const { toJSON } = render(<Configuration config={singleConfig} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
