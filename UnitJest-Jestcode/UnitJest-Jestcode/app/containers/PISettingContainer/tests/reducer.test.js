import * as SmartBarActions from 'containers/SmartBarContainer/actions';

import * as Actions from '../actions';
import piSettingContainerReducer from '../reducer';

describe('piSettingContainerReducer', () => {
  it('returns the initial state', () => {
    expect(piSettingContainerReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle piSettingsContainerRequest action', () => {
    expect(
      piSettingContainerReducer(undefined, Actions.piSettingsContainerRequest())
    ).toMatchSnapshot();
  });

  it('should handle schoolSelectionSuccess action', () => {
    expect(
      piSettingContainerReducer(undefined, SmartBarActions.schoolSelectionSuccess('mockSchoolId'))
    ).toMatchSnapshot();
  });

  it('should handle gradeSelectionSuccess action', () => {
    expect(
      piSettingContainerReducer(undefined, SmartBarActions.gradeSelectionSuccess('mockGradeId'))
    ).toMatchSnapshot();
  });

  it('should handle teacherSelectionSuccess action', () => {
    expect(
      piSettingContainerReducer(undefined, SmartBarActions.teacherSelectionSuccess('mockTeacherId'))
    ).toMatchSnapshot();
  });

  it('should handle classSelectionSuccess action', () => {
    expect(
      piSettingContainerReducer(undefined, SmartBarActions.classSelectionSuccess('mockClassId'))
    ).toMatchSnapshot();
  });

  it('should handle groupSelectionSuccess action', () => {
    expect(
      piSettingContainerReducer(undefined, SmartBarActions.groupSelectionSuccess('mockGroupId'))
    ).toMatchSnapshot();
  });

  it('should handle studentSelectionSuccess action', () => {
    expect(
      piSettingContainerReducer(undefined, SmartBarActions.studentSelectionSuccess('mockStudentId'))
    ).toMatchSnapshot();
  });

  it('should handle piSettingsContainerSuccess action', () => {
    expect(
      piSettingContainerReducer(undefined, Actions.piSettingsContainerSuccess('mockSettings'))
    ).toMatchSnapshot();
  });

  it('should handle piSettingsSave action', () => {
    expect(
      piSettingContainerReducer(undefined, Actions.piSettingsSave('mockUpdatedSettings'))
    ).toMatchSnapshot();
  });

  it('should handle piSettingsSave action failure', () => {
    expect(
      piSettingContainerReducer(undefined, Actions.piSettingsSaveFailure('err'))
    ).toMatchSnapshot();
  });
});
