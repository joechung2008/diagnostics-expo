import { render } from '@testing-library/react-native';
import BuildInfo from '../../components/BuildInfo';

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

describe('BuildInfo', () => {
  it('renders build version correctly', () => {
    const { toJSON } = render(<BuildInfo buildVersion="1.0.0" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays the correct table structure', () => {
    const { toJSON } = render(<BuildInfo buildVersion="2.1.3" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
