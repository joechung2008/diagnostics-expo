import { render } from '@testing-library/react-native';
import Extensions from '../../components/Extensions';

// Mock the ThemeContext
jest.mock('../../components/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      background: '#ffffff',
      surface: '#f5f5f5',
      text: '#000000',
      border: '#cccccc',
    },
  }),
}));

// Mock the utils functions
jest.mock('../../lib/utils', () => ({
  byKey: jest.fn((a, b) => a.key.localeCompare(b.key)),
  isExtensionInfo: jest.fn(
    (value) => value && typeof value === 'object' && 'extensionName' in value
  ),
  toNavLink: jest.fn(({ extensionName }) => ({
    key: extensionName,
    name: extensionName,
    url: '',
  })),
}));

describe('Extensions', () => {
  const mockExtensions = {
    'extension-1': {
      extensionName: 'Extension A',
      manageSdpEnabled: true,
      config: { key1: 'value1' },
    },
    'extension-2': {
      extensionName: 'Extension B',
      manageSdpEnabled: false,
      stageDefinition: { dev: ['server1'] },
    },
    'extension-3': {
      extensionName: 'Extension C',
      manageSdpEnabled: true,
    },
  };

  const mockOnLinkClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders extensions list correctly', () => {
    const { toJSON } = render(
      <Extensions extensions={mockExtensions} onLinkClick={mockOnLinkClick} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders empty extensions list', () => {
    const { toJSON } = render(
      <Extensions extensions={{}} onLinkClick={mockOnLinkClick} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('filters out non-extension info items', () => {
    const extensionsWithErrors = {
      ...mockExtensions,
      'error-extension': {
        lastError: {
          errorMessage: 'Something went wrong',
          time: '2023-01-01T00:00:00Z',
        },
      },
    };

    const { toJSON } = render(
      <Extensions
        extensions={extensionsWithErrors}
        onLinkClick={mockOnLinkClick}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('handles single extension', () => {
    const singleExtension = {
      'single-ext': {
        extensionName: 'Single Extension',
        manageSdpEnabled: true,
      },
    };

    const { toJSON } = render(
      <Extensions extensions={singleExtension} onLinkClick={mockOnLinkClick} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with accessibility label', () => {
    const { toJSON } = render(
      <Extensions extensions={mockExtensions} onLinkClick={mockOnLinkClick} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
