import * as SmartBarActions from 'containers/SmartBarContainer/actions';

import * as Actions from '../actions';
import s44NGSettingContainerReducer from '../reducer';

describe('s44NGSettingContainerReducer', () => {
  it('returns the initial state', () => {
    expect(s44NGSettingContainerReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle s44NGSettingsContainerSuccess action', () => {
    expect(
      s44NGSettingContainerReducer(undefined, Actions.s44NGSettingsContainerSuccess('mockSettings'))
    ).toMatchSnapshot();
  });

  describe('should set loading to true', () => {
    it('should handle s44NGSettingsContainerRequest action', () => {
      expect(
        s44NGSettingContainerReducer(undefined, Actions.s44NGSettingsContainerRequest())
      ).toMatchSnapshot();
    });

    it('should handle gradeSelectionSuccess action', () => {
      expect(
        s44NGSettingContainerReducer(
          undefined,
          SmartBarActions.gradeSelectionSuccess('mockGradeId')
        )
      ).toMatchSnapshot();
    });

    it('should handle teacherSelectionSuccess action', () => {
      expect(
        s44NGSettingContainerReducer(
          undefined,
          SmartBarActions.teacherSelectionSuccess('mockTeacherId')
        )
      ).toMatchSnapshot();
    });

    it('should handle classSelectionSuccess action', () => {
      expect(
        s44NGSettingContainerReducer(
          undefined,
          SmartBarActions.classSelectionSuccess('mockClassId')
        )
      ).toMatchSnapshot();
    });

    it('should handle gradeSelectionSuccess action', () => {
      expect(
        s44NGSettingContainerReducer(
          undefined,
          SmartBarActions.gradeSelectionSuccess('mockGradeId')
        )
      ).toMatchSnapshot();
    });

    it('should handle groupSelectionSuccess action', () => {
      expect(
        s44NGSettingContainerReducer(
          undefined,
          SmartBarActions.groupSelectionSuccess('mockGroupId')
        )
      ).toMatchSnapshot();
    });

    it('should handle studentSelectionSuccess action', () => {
      expect(
        s44NGSettingContainerReducer(
          undefined,
          SmartBarActions.studentSelectionSuccess('mockStudentId')
        )
      ).toMatchSnapshot();
    });
  });
});
