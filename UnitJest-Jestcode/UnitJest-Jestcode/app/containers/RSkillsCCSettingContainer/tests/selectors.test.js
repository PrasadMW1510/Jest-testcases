import { fromJS } from 'immutable';
import makeSelectRSkillsCCSettingContainer, * as Selectors from '../selectors';

describe('selectRSkillsCCSettingContainerDomain', () => {
  let mockedState = null;

  beforeEach(() => {
    const rSkillsCCSettingContainer = fromJS({
      error: null,
      stages: 'mockStages',
      loading: false,
      programSettings: 'mockProgramSettings',
      defaultProgramSettings: {},
      defaultProgramSettingsLoading: false,
    });

    mockedState = fromJS({
      rSkillsCCSettingContainer,
    });
  });

  it('should select programSettings substate', () => {
    expect(Selectors.makeProgramSetting()(mockedState)).toMatchSnapshot();
  });

  it('should select stages substate', () => {
    expect(Selectors.makeSelectTestAssignmentStages()(mockedState)).toMatchSnapshot();
  });

  it('should select loading substate', () => {
    expect(Selectors.makeSelectRSkillsCCSettingContainerLoading()(mockedState)).toMatchSnapshot();
  });

  it('should select rSkillsCCSetting Container Domain', () => {
    expect(makeSelectRSkillsCCSettingContainer()(mockedState)).toMatchSnapshot();
  });

  it('should select the default program settings', () => {
    expect(Selectors.makeDefaultProgramSetting()(mockedState)).toMatchSnapshot();
  });

  it('should select default program settings loading substate', () => {
    expect(
      Selectors.makeSelectRSkillsCCSettingDefaultProgramSettingsLoading()(mockedState)
    ).toMatchSnapshot();
  });
});
