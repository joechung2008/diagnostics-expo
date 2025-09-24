import Header from '@/components/Header';
import { render } from '@testing-library/react-native';

// Mock the ThemeContext
jest.mock('@/components/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      background: '#ffffff',
      surface: '#f5f5f5',
      surfaceSecondary: '#e0e0e0',
      text: '#000000',
      border: '#cccccc',
    },
  }),
}));

// Create a mock for useApp
const mockUseApp = jest.fn();

// Mock the AppContext
jest.mock('@/components/AppContext', () => ({
  useApp: () => mockUseApp(),
}));

// Mock expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'MockIonicons',
}));

describe('Header', () => {
  beforeEach(() => {
    mockUseApp.mockReturnValue({
      environment: 'public',
      showEnvironmentDropdown: false,
      setShowEnvironmentDropdown: jest.fn(),
      handleEnvironmentSelect: jest.fn(),
      showPaasServerless: true,
      handlePaasServerlessPress: jest.fn(),
      handleWebsitesPress: jest.fn(),
    });
  });

  it('renders with default state', () => {
    const { toJSON } = render(<Header />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with environment dropdown visible', () => {
    mockUseApp.mockReturnValueOnce({
      environment: 'staging',
      showEnvironmentDropdown: true,
      setShowEnvironmentDropdown: jest.fn(),
      handleEnvironmentSelect: jest.fn(),
      showPaasServerless: false,
      handlePaasServerlessPress: jest.fn(),
      handleWebsitesPress: jest.fn(),
    });

    const { toJSON } = render(<Header />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with different environment', () => {
    mockUseApp.mockReturnValueOnce({
      environment: 'development',
      showEnvironmentDropdown: false,
      setShowEnvironmentDropdown: jest.fn(),
      handleEnvironmentSelect: jest.fn(),
      showPaasServerless: true,
      handlePaasServerlessPress: jest.fn(),
      handleWebsitesPress: jest.fn(),
    });

    const { toJSON } = render(<Header />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with PaaS Serverless hidden', () => {
    mockUseApp.mockReturnValueOnce({
      environment: 'public',
      showEnvironmentDropdown: false,
      setShowEnvironmentDropdown: jest.fn(),
      handleEnvironmentSelect: jest.fn(),
      showPaasServerless: false,
      handlePaasServerlessPress: jest.fn(),
      handleWebsitesPress: jest.fn(),
    });

    const { toJSON } = render(<Header />);
    expect(toJSON()).toMatchSnapshot();
  });
});
