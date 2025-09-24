import { render } from '@testing-library/react-native';
import Extension from '../../components/Extension';

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

// Mock child components
jest.mock('../../components/Configuration', () => {
  return {
    __esModule: true,
    default: 'MockConfiguration',
  };
});

jest.mock('../../components/StageDefinition', () => {
  return {
    __esModule: true,
    default: 'MockStageDefinition',
  };
});

describe('Extension', () => {
  const mockConfig = {
    apiUrl: 'https://api.example.com',
    timeout: '30000',
  };

  const mockStageDefinition = {
    development: ['dev-server-1', 'dev-server-2'],
    production: ['prod-server-1'],
  };

  it('renders extension name and config', () => {
    const { toJSON } = render(
      <Extension
        extensionName="Test Extension"
        config={mockConfig}
        manageSdpEnabled={true}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders extension name and stage definition', () => {
    const { toJSON } = render(
      <Extension
        extensionName="Another Extension"
        stageDefinition={mockStageDefinition}
        manageSdpEnabled={false}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders extension name with both config and stage definition', () => {
    const { toJSON } = render(
      <Extension
        extensionName="Full Extension"
        config={mockConfig}
        stageDefinition={mockStageDefinition}
        manageSdpEnabled={true}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders extension name only when no config or stage definition', () => {
    const { toJSON } = render(
      <Extension extensionName="Minimal Extension" manageSdpEnabled={false} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
