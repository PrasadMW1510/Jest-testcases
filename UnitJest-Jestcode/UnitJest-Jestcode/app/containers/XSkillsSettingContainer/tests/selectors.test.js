import { fromJS } from 'immutable';
import { makeSelectXSkillsSettingContainer } from '../selectors';
let mockState = null;
let xSkillsSettingContainerDomain = null;
describe('selectXskillsSettingContainerDomain', () => {
  beforeEach(() => {
    xSkillsSettingContainerDomain = fromJS({
      error: false,
      testsMeta: {},
      loadingSettings: false,
      loadingTestAssignment: false,
    });

    mockState = fromJS({ xSkillsSettingContainerDomain });
  });
  it('should consistently return the xSkillsSettingContainer state', () => {
    expect(makeSelectXSkillsSettingContainer()(mockState)).toMatchSnapshot();
  });
});
