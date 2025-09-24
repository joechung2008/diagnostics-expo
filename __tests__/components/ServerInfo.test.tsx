import { render } from '@testing-library/react-native';
import ServerInfo from '../../components/ServerInfo';

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

describe('ServerInfo', () => {
  const mockServerInfo = {
    hostname: 'test-server.example.com',
    uptime: 1234567890,
    serverId: 'server-123',
    deploymentId: 'deploy-456',
    nodeVersions: 'v18.17.0',
    extensionSync: {
      totalSyncAllCount: 42,
    },
  };

  it('renders all server information correctly', () => {
    const { toJSON } = render(<ServerInfo {...mockServerInfo} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('handles optional fields gracefully', () => {
    const partialServerInfo = {
      hostname: 'test-server.example.com',
      serverId: 'server-123',
      deploymentId: 'deploy-456',
      extensionSync: {
        totalSyncAllCount: 0,
      },
    };

    const { toJSON } = render(<ServerInfo {...partialServerInfo} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
