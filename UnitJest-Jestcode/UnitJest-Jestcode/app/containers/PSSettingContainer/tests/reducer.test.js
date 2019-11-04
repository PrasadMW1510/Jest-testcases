import * as SmartBarActions from 'containers/SmartBarContainer/actions';

import * as Actions from '../actions';
import psSettingContainerReducer from '../reducer';

describe('psSettingContainerReducer', () => {
  it('returns the initial state', () => {
    expect(psSettingContainerReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle piSettingsContainerRequest action', () => {
    expect(
      psSettingContainerReducer(undefined, Actions.psSettingsContainerRequest())
    ).toMatchSnapshot();
  });

  it('should handle schoolSelectionSuccess action', () => {
    expect(
      psSettingContainerReducer(undefined, SmartBarActions.schoolSelectionSuccess('mockSchoolId'))
    ).toMatchSnapshot();
  });

  it('should handle gradeSelectionSuccess action', () => {
    expect(
      psSettingContainerReducer(undefined, SmartBarActions.gradeSelectionSuccess('mockGradeId'))
    ).toMatchSnapshot();
  });

  it('should handle teacherSelectionSuccess action', () => {
    expect(
      psSettingContainerReducer(undefined, SmartBarActions.teacherSelectionSuccess('mockTeacherId'))
    ).toMatchSnapshot();
  });

  it('should handle classSelectionSuccess action', () => {
    expect(
      psSettingContainerReducer(undefined, SmartBarActions.classSelectionSuccess('mockClassId'))
    ).toMatchSnapshot();
  });

  it('should handle groupSelectionSuccess action', () => {
    expect(
      psSettingContainerReducer(undefined, SmartBarActions.groupSelectionSuccess('mockGroupId'))
    ).toMatchSnapshot();
  });

  it('should handle studentSelectionSuccess action', () => {
    expect(
      psSettingContainerReducer(undefined, SmartBarActions.studentSelectionSuccess('mockStudentId'))
    ).toMatchSnapshot();
  });

  it('should handle piSettingsContainerSuccess action', () => {
    expect(
      psSettingContainerReducer(undefined, Actions.psSettingsContainerSuccess('mockSettings'))
    ).toMatchSnapshot();
  });

  it('should handle piSettingsSave action', () => {
    expect(
      psSettingContainerReducer(undefined, Actions.psSettingsSave('mockUpdatedSettings'))
    ).toMatchSnapshot();
  });

  it('should handle piSettingsSave action failure', () => {
    expect(
      psSettingContainerReducer(undefined, Actions.psSettingsSaveFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle psGetDtmSubProductSuccess action', () => {
    expect(
      psSettingContainerReducer(undefined, Actions.psGetDtmSubProductSuccess('mockUpdatedSettings'))
    ).toMatchSnapshot();
  });

  it('should handle psGetDtmModulesSuccess action', () => {
    expect(
      psSettingContainerReducer(undefined, Actions.psGetDtmModulesSuccess('mockUpdatedSettings'))
    ).toMatchSnapshot();
  });

  it('should handle psTestAssignmentSuccess action', () => {
    expect(
      psSettingContainerReducer(undefined, Actions.psTestAssignmentSuccess('mockUpdatedSettings'))
    ).toMatchSnapshot();
  });

  it('should handle psTestAssignmentSuccess action', () => {
    expect(
      psSettingContainerReducer(undefined, Actions.psTestAssignmentRequest())
    ).toMatchSnapshot();
  });

  it('should handle psTestAssignmentSuccess action', () => {
    expect(
      psSettingContainerReducer(undefined, Actions.psTestAssignmentSuccess('mockUpdatedSettings'))
    ).toMatchSnapshot();
  });
});
