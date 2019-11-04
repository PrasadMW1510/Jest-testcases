import { fromJS } from 'immutable';
import * as Actions from '../actions';
import xSkillsSettingContainerReducer from '../reducer';

describe('xSkillsSettingContainerReducer', () => {
  let initialState = null;
  const mockSettings = { mock: 'settings' };

  beforeEach(() => {
    initialState = fromJS({
      error: false,
      settings: {},
      testsMeta: {},
      loadingSettings: false,
      loadingTestAssignment: false,
    });
  });
  it('returns the initial state', () => {
    expect(xSkillsSettingContainerReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle the xSkillsSettingContainerRequest action', () => {
    expect(
      xSkillsSettingContainerReducer(undefined, Actions.xSkillsSettingContainerRequest())
    ).toMatchSnapshot();
  });

  it('shoudl handle the xSkillSettingContainerRequestSuccess action', () => {
    expect(
      xSkillsSettingContainerReducer(
        undefined,
        Actions.xSkillsSettingContainerRequestSuccess(mockSettings)
      )
    ).toMatchSnapshot();
  });

  it('should handle the xSkillsTestAssignmentLoading action', () => {
    expect(
      xSkillsSettingContainerReducer(undefined, Actions.xSkillsTestAssignmentLoading())
    ).toMatchSnapshot();
  });

  it('should handle the xSkillsTestAssignmentRequest action', () => {
    expect(
      xSkillsSettingContainerReducer(undefined, Actions.xSkillsTestAssignmentRequest())
    ).toMatchSnapshot();
  });

  it('should handle the xSkillsTestAssignmentRequestSuccess action', () => {
    expect(
      xSkillsSettingContainerReducer(undefined, Actions.xSkillsTestAssignmentRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle the xSkillsSettingsLoading action', () => {
    expect(
      xSkillsSettingContainerReducer(undefined, Actions.xSkillsSettingsLoading())
    ).toMatchSnapshot();
  });

  it('should handle the xSkillsSettingsRequest action', () => {
    expect(
      xSkillsSettingContainerReducer(undefined, Actions.xSkillsSettingsRequest())
    ).toMatchSnapshot();
  });

  it('should handle the xSkillsSettingsRequestSuccess action', () => {
    expect(
      xSkillsSettingContainerReducer(undefined, Actions.xSkillsSettingsRequestSuccess(mockSettings))
    ).toMatchSnapshot();
  });
});
