import * as SmartBarActions from 'containers/SmartBarContainer/actions';

import * as Actions from '../actions';
import fmSettingContainerReducer from '../reducer';

describe('fmSettingContainerReducer', () => {
  it('returns the initial state', () => {
    expect(fmSettingContainerReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle fmSettingsContainerRequest action', () => {
    expect(
      fmSettingContainerReducer(undefined, Actions.fmSettingsContainerRequest())
    ).toMatchSnapshot();
  });

  it('should handle schoolSelectionSuccess action', () => {
    expect(
      fmSettingContainerReducer(undefined, SmartBarActions.schoolSelectionSuccess('mockSchoolId'))
    ).toMatchSnapshot();
  });

  it('should handle gradeSelectionSuccess action', () => {
    expect(
      fmSettingContainerReducer(undefined, SmartBarActions.gradeSelectionSuccess('mockGradeId'))
    ).toMatchSnapshot();
  });

  it('should handle teacherSelectionSuccess action', () => {
    expect(
      fmSettingContainerReducer(undefined, SmartBarActions.teacherSelectionSuccess('mockTeacherId'))
    ).toMatchSnapshot();
  });

  it('should handle classSelectionSuccess action', () => {
    expect(
      fmSettingContainerReducer(undefined, SmartBarActions.classSelectionSuccess('mockClassId'))
    ).toMatchSnapshot();
  });

  it('should handle groupSelectionSuccess action', () => {
    expect(
      fmSettingContainerReducer(undefined, SmartBarActions.groupSelectionSuccess('mockGroupId'))
    ).toMatchSnapshot();
  });

  it('should handle studentSelectionSuccess action', () => {
    expect(
      fmSettingContainerReducer(undefined, SmartBarActions.studentSelectionSuccess('mockStudentId'))
    ).toMatchSnapshot();
  });

  it('should handle fmSettingsContainerSuccess action', () => {
    expect(
      fmSettingContainerReducer(undefined, Actions.fmSettingsContainerSuccess())
    ).toMatchSnapshot();
  });

  it('should handle fmGetSettingsSuccess action', () => {
    expect(
      fmSettingContainerReducer(undefined, Actions.fmGetSettingsSuccess({ data: 'mockData' }))
    ).toMatchSnapshot();
  });

  it('should handle fmGetAdvancedSettingsSuccess action', () => {
    expect(
      fmSettingContainerReducer(
        undefined,
        Actions.fmGetAdvancedSettingsSuccess({ data: 'mockData' })
      )
    ).toMatchSnapshot();
  });

  it('should handle fmSettingsSave action', () => {
    expect(
      fmSettingContainerReducer(undefined, Actions.fmSettingsSave({ data: 'mockData' }))
    ).toMatchSnapshot();
  });

  it('should handle fmAdvancedSettingsSave action', () => {
    expect(
      fmSettingContainerReducer(undefined, Actions.fmAdvancedSettingsSave({ data: 'mockData' }))
    ).toMatchSnapshot();
  });
});
