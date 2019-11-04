import * as SmartBarActions from 'containers/SmartBarContainer/actions';

import * as Actions from '../actions';
import rcSettingContainerReducer from '../reducer';

describe('rcSettingContainerReducer', () => {
  it('returns the initial state', () => {
    expect(rcSettingContainerReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle rcSettingsContainerRequest action', () => {
    expect(
      rcSettingContainerReducer(undefined, Actions.rcSettingsContainerRequest())
    ).toMatchSnapshot();
  });

  it('should handle gradeSelectionSuccess action', () => {
    expect(
      rcSettingContainerReducer(undefined, SmartBarActions.gradeSelectionSuccess('mockGradeId'))
    ).toMatchSnapshot();
  });

  it('should handle teacherSelectionSuccess action', () => {
    expect(
      rcSettingContainerReducer(undefined, SmartBarActions.teacherSelectionSuccess('mockTeacherId'))
    ).toMatchSnapshot();
  });

  it('should handle classSelectionSuccess action', () => {
    expect(
      rcSettingContainerReducer(undefined, SmartBarActions.classSelectionSuccess('mockClassId'))
    ).toMatchSnapshot();
  });

  it('should handle gradeSelectionSuccess action', () => {
    expect(
      rcSettingContainerReducer(undefined, SmartBarActions.gradeSelectionSuccess('mockGradeId'))
    ).toMatchSnapshot();
  });

  it('should handle groupSelectionSuccess action', () => {
    expect(
      rcSettingContainerReducer(undefined, SmartBarActions.groupSelectionSuccess('mockGroupId'))
    ).toMatchSnapshot();
  });

  it('should handle studentSelectionSuccess action', () => {
    expect(
      rcSettingContainerReducer(undefined, SmartBarActions.studentSelectionSuccess('mockStudentId'))
    ).toMatchSnapshot();
  });

  it('should handle rcSettingsContainerSuccess action', () => {
    expect(
      rcSettingContainerReducer(undefined, Actions.rcSettingsContainerSuccess())
    ).toMatchSnapshot();
  });

  it('should handle rcGetSettingsSuccess action', () => {
    expect(
      rcSettingContainerReducer(undefined, Actions.rcGetSettingsSuccess('mockSettings'))
    ).toMatchSnapshot();
  });

  // TODO: Uncomment and uncomment for second tab actions.

  /* it('should handle rcGetInstallStagesSuccess action', () => {
    expect(
      rcSettingContainerReducer(undefined, Actions.rcGetInstallStagesSuccess('mockInstalledStages'))
    ).toMatchSnapshot();
  });

  it('should handle rcSetSelectedStage action', () => {
    expect(
      rcSettingContainerReducer(undefined, Actions.rcSetSelectedStage('mockSelectedStage'))
    ).toMatchSnapshot();
  });

  it('should handle rcGetTopicsSuccess action', () => {
    expect(
      rcSettingContainerReducer(undefined, Actions.rcGetTopicsSuccess('mockTopics'))
    ).toMatchSnapshot();
  }); */
});
