import { GENERAL_FAILURE } from 'containers/App/constants';
import * as Actions from '../actions';
import * as Constants from '../constants';

describe('XSkillsSettingContainer actions', () => {
  const mockError = 'mockError';
  const mockSaveData = { output: { output_data: { test_number: '3' } } };
  const mockSaveSettingsData = { settings: [] };
  it('should match xSkillsSettingContainerRequest action', () => {
    const action = Actions.xSkillsSettingContainerRequest();
    expect(action).toMatchSnapshot();
    expect(action.type).toEqual(Constants.XSKILLS_SETTING_CONTAINER_REQUEST);
  });

  it('should match xSkillsSettingContainerRequestSuccess action', () => {
    const action = Actions.xSkillsSettingContainerRequestSuccess();
    expect(action).toMatchSnapshot();
    expect(action.type).toEqual(Constants.XSKILLS_SETTING_CONTAINER_REQUEST_SUCCESS);
  });

  it('should match xSkillsSettingContainerRequestFailure action', () => {
    const action = Actions.xSkillsSettingContainerRequestFailure(mockError);
    expect(action).toMatchSnapshot();
    expect(action.type).toEqual(GENERAL_FAILURE);
    expect(action.subType).toEqual(Constants.XSKILLS_SETTING_CONTAINER_REQUEST_FAILURE);
  });

  it('should match xSkillsTestAssignmentSaveRequest action', () => {
    const action = Actions.xSkillsTestAssignmentSaveRequest(mockSaveData);
    expect(action).toMatchSnapshot();
    expect(action.type).toEqual(Constants.XSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST);
  });

  it('should match xSkillsTestAssignmentSaveRequestSuccess action', () => {
    const action = Actions.xSkillsTestAssignmentSaveRequestSuccess();
    expect(action).toMatchSnapshot();
    expect(action.type).toEqual(Constants.XSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST_SUCCESS);
  });

  it('should match xSkillsTestAssignmentSaveRequestFailure action', () => {
    const action = Actions.xSkillsTestAssignmentSaveRequestFailure(mockError);
    expect(action).toMatchSnapshot();
    expect(action.type).toEqual(GENERAL_FAILURE);
    expect(action.subType).toEqual(Constants.XSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST_FAILURE);
  });

  it('should match xSkillsSettingsRequest action', () => {
    const action = Actions.xSkillsSettingsRequest();
    expect(action).toMatchSnapshot();
    expect(action.type).toEqual(Constants.XSKILLS_SETTINGS_REQUEST);
  });

  it('should match xSkillsSettingsRequestSuccess action', () => {
    const action = Actions.xSkillsSettingsRequestSuccess({});
    expect(action).toMatchSnapshot();
    expect(action.type).toEqual(Constants.XSKILLS_SETTINGS_REQUEST_SUCCESS);
  });

  it('should match xSkillsSettingsRequestFailure action', () => {
    const action = Actions.xSkillsSettingsRequestFailure(mockError);
    expect(action).toMatchSnapshot();
    expect(action.type).toEqual(GENERAL_FAILURE);
    expect(action.subType).toEqual(Constants.XSKILLS_SETTINGS_REQUEST_FAILURE);
  });

  it('should match xSkillsSettingsSaveRequest action', () => {
    const action = Actions.xSkillsSettingsSaveRequest(mockSaveSettingsData);
    expect(action).toMatchSnapshot();
    expect(action.type).toEqual(Constants.XSKILLS_SETTINGS_SAVE_REQUEST);
  });
});
