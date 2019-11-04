import * as SmartBarActions from 'containers/SmartBarContainer/actions';

import * as Actions from '../actions';
import r180EESettingContainerReducer from '../reducer';

describe('r180EESettingContainerReducer', () => {
  it('returns the initial state', () => {
    expect(r180EESettingContainerReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle r180EESettingsContainerRequest action', () => {
    expect(
      r180EESettingContainerReducer(undefined, Actions.r180EESettingsContainerRequest())
    ).toMatchSnapshot();
  });

  it('should handle gradeSelectionSuccess action', () => {
    expect(
      r180EESettingContainerReducer(undefined, SmartBarActions.gradeSelectionSuccess('mockGradeId'))
    ).toMatchSnapshot();
  });

  it('should handle teacherSelectionSuccess action', () => {
    expect(
      r180EESettingContainerReducer(
        undefined,
        SmartBarActions.teacherSelectionSuccess('mockTeacherId')
      )
    ).toMatchSnapshot();
  });

  it('should handle classSelectionSuccess action', () => {
    expect(
      r180EESettingContainerReducer(undefined, SmartBarActions.classSelectionSuccess('mockClassId'))
    ).toMatchSnapshot();
  });

  it('should handle gradeSelectionSuccess action', () => {
    expect(
      r180EESettingContainerReducer(undefined, SmartBarActions.gradeSelectionSuccess('mockGradeId'))
    ).toMatchSnapshot();
  });

  it('should handle groupSelectionSuccess action', () => {
    expect(
      r180EESettingContainerReducer(undefined, SmartBarActions.groupSelectionSuccess('mockGroupId'))
    ).toMatchSnapshot();
  });

  it('should handle studentSelectionSuccess action', () => {
    expect(
      r180EESettingContainerReducer(
        undefined,
        SmartBarActions.studentSelectionSuccess('mockStudentId')
      )
    ).toMatchSnapshot();
  });

  it('should handle r180EESettingsContainerSuccess action', () => {
    expect(
      r180EESettingContainerReducer(undefined, Actions.r180EESettingsContainerSuccess())
    ).toMatchSnapshot();
  });

  it('should handle r180EEGetSettingsSuccess action', () => {
    expect(
      r180EESettingContainerReducer(undefined, Actions.r180EEGetSettingsSuccess('mockSettings'))
    ).toMatchSnapshot();
  });

  it('should handle r180EEGetInstallStagesSuccess action', () => {
    expect(
      r180EESettingContainerReducer(
        undefined,
        Actions.r180EEGetInstallStagesSuccess('mockInstalledStages')
      )
    ).toMatchSnapshot();
  });

  it('should handle r180EESetSelectedStage action', () => {
    expect(
      r180EESettingContainerReducer(undefined, Actions.r180EESetSelectedStage('mockSelectedStage'))
    ).toMatchSnapshot();
  });

  it('should handle r180EEGetTopicsSuccess action', () => {
    expect(
      r180EESettingContainerReducer(undefined, Actions.r180EEGetTopicsSuccess('mockTopics'))
    ).toMatchSnapshot();
  });

  it('should handle r180EESettingsSave action', () => {
    expect(
      r180EESettingContainerReducer(undefined, Actions.r180EESettingsSave('mockSaveData'))
    ).toMatchSnapshot();
  });

  it('should handle r180EETopicSave action', () => {
    expect(
      r180EESettingContainerReducer(undefined, Actions.r180EETopicSave('mockTopicData'))
    ).toMatchSnapshot();
  });
});
