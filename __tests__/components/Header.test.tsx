import Header from '@/components/Header';
import { fireEvent, render } from '@testing-library/react-native';

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

// Create mocks for useApp functions
const mockSetShowEnvironmentDropdown = jest.fn();
const mockHandleEnvironmentSelect = jest.fn();
const mockHandlePaasServerlessPress = jest.fn();
const mockHandleWebsitesPress = jest.fn();
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
    jest.clearAllMocks();
    mockUseApp.mockReturnValue({
      environment: 'https://hosting.portal.azure.net/api/diagnostics',
      setShowEnvironmentDropdown: mockSetShowEnvironmentDropdown,
      showEnvironmentDropdown: false,
      showPaasServerless: true,
      handleEnvironmentSelect: mockHandleEnvironmentSelect,
      handlePaasServerlessPress: mockHandlePaasServerlessPress,
      handleWebsitesPress: mockHandleWebsitesPress,
    });
  });

  it('renders with default state', () => {
    const { toJSON } = render(<Header />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with environment dropdown visible', () => {
    mockUseApp.mockReturnValueOnce({
      environment:
        'https://hosting.azureportal.usgovcloudapi.net/api/diagnostics',
      setShowEnvironmentDropdown: mockSetShowEnvironmentDropdown,
      showEnvironmentDropdown: true,
      showPaasServerless: false,
      handleEnvironmentSelect: mockHandleEnvironmentSelect,
      handlePaasServerlessPress: mockHandlePaasServerlessPress,
      handleWebsitesPress: mockHandleWebsitesPress,
    });

    const { toJSON } = render(<Header />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with different environment', () => {
    mockUseApp.mockReturnValueOnce({
      environment:
        'https://hosting.azureportal.chinacloudapi.cn/api/diagnostics',
      setShowEnvironmentDropdown: mockSetShowEnvironmentDropdown,
      showEnvironmentDropdown: false,
      showPaasServerless: true,
      handleEnvironmentSelect: mockHandleEnvironmentSelect,
      handlePaasServerlessPress: mockHandlePaasServerlessPress,
      handleWebsitesPress: mockHandleWebsitesPress,
    });

    const { toJSON } = render(<Header />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with PaaS Serverless hidden', () => {
    mockUseApp.mockReturnValueOnce({
      environment: 'https://hosting.portal.azure.net/api/diagnostics',
      setShowEnvironmentDropdown: mockSetShowEnvironmentDropdown,
      showEnvironmentDropdown: false,
      showPaasServerless: false,
      handleEnvironmentSelect: mockHandleEnvironmentSelect,
      handlePaasServerlessPress: mockHandlePaasServerlessPress,
      handleWebsitesPress: mockHandleWebsitesPress,
    });

    const { toJSON } = render(<Header />);
    expect(toJSON()).toMatchSnapshot();
  });

  describe('interactions', () => {
    it('calls setShowEnvironmentDropdown when environment button is pressed', () => {
      const { getByText } = render(<Header />);

      const environmentButton = getByText('Public Cloud');
      fireEvent.press(environmentButton);

      expect(mockSetShowEnvironmentDropdown).toHaveBeenCalledWith(true);
    });

    it('toggles environment dropdown when button is pressed multiple times', () => {
      mockUseApp.mockReturnValue({
        environment: 'https://hosting.portal.azure.net/api/diagnostics',
        setShowEnvironmentDropdown: mockSetShowEnvironmentDropdown,
        showEnvironmentDropdown: true,
        showPaasServerless: true,
        handleEnvironmentSelect: mockHandleEnvironmentSelect,
        handlePaasServerlessPress: mockHandlePaasServerlessPress,
        handleWebsitesPress: mockHandleWebsitesPress,
      });

      const { getAllByText } = render(<Header />);

      const environmentButtons = getAllByText('Public Cloud');
      fireEvent.press(environmentButtons[0]);

      expect(mockSetShowEnvironmentDropdown).toHaveBeenCalledWith(false);
    });

    it('calls handleEnvironmentSelect when environment option is pressed', () => {
      mockUseApp.mockReturnValue({
        environment: 'https://hosting.portal.azure.net/api/diagnostics',
        setShowEnvironmentDropdown: mockSetShowEnvironmentDropdown,
        showEnvironmentDropdown: true,
        showPaasServerless: true,
        handleEnvironmentSelect: mockHandleEnvironmentSelect,
        handlePaasServerlessPress: mockHandlePaasServerlessPress,
        handleWebsitesPress: mockHandleWebsitesPress,
      });

      const { getByText } = render(<Header />);

      const fairfaxOption = getByText('Fairfax');
      fireEvent.press(fairfaxOption);

      expect(mockHandleEnvironmentSelect).toHaveBeenCalledWith(
        'https://hosting.azureportal.usgovcloudapi.net/api/diagnostics'
      );
    });

    it('calls handlePaasServerlessPress when paasserverless button is pressed', () => {
      const { getByText } = render(<Header />);

      const paasButton = getByText('paasserverless');
      fireEvent.press(paasButton);

      expect(mockHandlePaasServerlessPress).toHaveBeenCalled();
    });

    it('calls handleWebsitesPress when websites button is pressed', () => {
      const { getByText } = render(<Header />);

      const websitesButton = getByText('websites');
      fireEvent.press(websitesButton);

      expect(mockHandleWebsitesPress).toHaveBeenCalled();
    });
  });
});
