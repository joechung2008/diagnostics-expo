import StageDefinition from '@/components/StageDefinition';
import { render } from '@testing-library/react-native';

// Mock the ThemeContext
jest.mock('@/components/ThemeContext', () => ({
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

describe('StageDefinition', () => {
  const mockStageDefinition = {
    development: ['dev-server-1', 'dev-server-2'],
    production: ['prod-server-1'],
    staging: ['staging-server-1', 'staging-server-2', 'staging-server-3'],
  };

  it('renders stage definition title', () => {
    const { getByText, toJSON } = render(
      <StageDefinition stageDefinition={mockStageDefinition} />
    );

    expect(getByText('Stage Definitions')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders all stage keys and values correctly', () => {
    const { getByText, toJSON } = render(
      <StageDefinition stageDefinition={mockStageDefinition} />
    );

    expect(getByText('Key')).toBeTruthy();
    expect(getByText('Value')).toBeTruthy();

    // Check development stage
    expect(getByText('development')).toBeTruthy();
    expect(getByText('dev-server-1, dev-server-2')).toBeTruthy();

    // Check production stage
    expect(getByText('production')).toBeTruthy();
    expect(getByText('prod-server-1')).toBeTruthy();

    // Check staging stage
    expect(getByText('staging')).toBeTruthy();
    expect(
      getByText('staging-server-1, staging-server-2, staging-server-3')
    ).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders single stage definition', () => {
    const singleStage = { production: ['prod-server-1'] };
    const { getByText, toJSON } = render(
      <StageDefinition stageDefinition={singleStage} />
    );

    expect(getByText('production')).toBeTruthy();
    expect(getByText('prod-server-1')).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders empty stage definition', () => {
    const emptyStage = {};
    const { getByText, toJSON } = render(
      <StageDefinition stageDefinition={emptyStage} />
    );

    expect(getByText('Stage Definitions')).toBeTruthy();
    expect(getByText('Key')).toBeTruthy();
    expect(getByText('Value')).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders stage with empty server list', () => {
    const stageWithEmptyList = { empty: [] };
    const { getByText, toJSON } = render(
      <StageDefinition stageDefinition={stageWithEmptyList} />
    );

    expect(getByText('empty')).toBeTruthy();
    expect(getByText('')).toBeTruthy(); // Empty string for empty array

    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot with complete stage definition data', () => {
    const { toJSON } = render(
      <StageDefinition stageDefinition={mockStageDefinition} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
