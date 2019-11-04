import * as SmartBarActions from 'containers/SmartBarContainer/actions';

import * as Actions from '../actions';
import s44SettingContainerReducer from '../reducer';

describe('s44SettingContainerReducer', () => {
  it('returns the initial state', () => {
    expect(s44SettingContainerReducer(undefined, {})).toMatchSnapshot();
  });

  describe('should set loading to true', () => {
    it('should handle s44SettingsContainerRequest action', () => {
      expect(
        s44SettingContainerReducer(undefined, Actions.s44SettingsContainerRequest())
      ).toMatchSnapshot();
    });

    it('should handle gradeSelectionSuccess action', () => {
      expect(
        s44SettingContainerReducer(undefined, SmartBarActions.gradeSelectionSuccess('mockGradeId'))
      ).toMatchSnapshot();
    });

    it('should handle teacherSelectionSuccess action', () => {
      expect(
        s44SettingContainerReducer(
          undefined,
          SmartBarActions.teacherSelectionSuccess('mockTeacherId')
        )
      ).toMatchSnapshot();
    });

    it('should handle classSelectionSuccess action', () => {
      expect(
        s44SettingContainerReducer(undefined, SmartBarActions.classSelectionSuccess('mockClassId'))
      ).toMatchSnapshot();
    });

    it('should handle gradeSelectionSuccess action', () => {
      expect(
        s44SettingContainerReducer(undefined, SmartBarActions.gradeSelectionSuccess('mockGradeId'))
      ).toMatchSnapshot();
    });

    it('should handle groupSelectionSuccess action', () => {
      expect(
        s44SettingContainerReducer(undefined, SmartBarActions.groupSelectionSuccess('mockGroupId'))
      ).toMatchSnapshot();
    });

    it('should handle studentSelectionSuccess action', () => {
      expect(
        s44SettingContainerReducer(
          undefined,
          SmartBarActions.studentSelectionSuccess('mockStudentId')
        )
      ).toMatchSnapshot();
    });
  });

  it('should handle s44SettingsContainerSuccess', () => {
    expect(
      s44SettingContainerReducer(undefined, Actions.s44SettingsContainerSuccess('mockSettings'))
    ).toMatchSnapshot();
  });
});
