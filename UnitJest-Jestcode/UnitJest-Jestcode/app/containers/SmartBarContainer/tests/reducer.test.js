import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as AppActions from 'containers/App/actions';
import smartBarReducer from '../reducer';
import * as Actions from '../actions';

describe('SmartBar reducer', () => {
  const mockedState = fromJS({
    selectedSchoolId: 'selectedSchoolId',
    selectedClassId: 'selectedClassId',
    selectedGroupId: 'selectedGroupId',
    selectedStudentId: 'selectedStudentId',
    selectedGradeId: 'selectedGradeId',
    selectedTeacherId: 'selectedTeacherId',
    clickedSchoolId: 'clickedSchoolId',
    clickedClassId: 'clickedClassId',
    clickedGroupId: 'clickedGroupId',
    clickedStudentId: 'clickedStudentId',
    clickedGradeId: 'clickedGradeId',
    clickedTeacherId: 'clickedTeacherId',
    activeSchoolId: 'activeSchoolId',
    activeGradeId: 'activeGradeId',
    activeTeacherId: 'activeTeacherId',
    activeClassId: 'activeClassId',
    activeGroupId: 'activeGroupId',
    activeStudentId: 'activeStudentId',
  });

  it('returns the initial state', () => {
    expect(smartBarReducer(undefined, {})).toMatchSnapshot();
  });

  describe('SmartBar selections', () => {
    it('should handle school selection actions', () => {
      expect(
        smartBarReducer(
          undefined,
          Actions.schoolSelectionSuccess(mockedState.get('selectedSchoolId'))
        )
      ).toMatchSnapshot();
    });

    it('should handle grade selection actions', () => {
      expect(
        smartBarReducer(
          undefined,
          Actions.gradeSelectionSuccess(mockedState.get('selectedGradeId'))
        )
      ).toMatchSnapshot();
    });

    it('should handle teacher selection actions', () => {
      expect(
        smartBarReducer(
          undefined,
          Actions.teacherSelectionSuccess(mockedState.get('selectedTeacherId'))
        )
      ).toMatchSnapshot();
    });

    it('should handle class selection actions', () => {
      expect(
        smartBarReducer(
          undefined,
          Actions.classSelectionSuccess(mockedState.get('selectedClassId'))
        )
      ).toMatchSnapshot();
    });

    it('should handle group selection actions', () => {
      expect(
        smartBarReducer(
          undefined,
          Actions.groupSelectionSuccess(mockedState.get('selectedGroupId'))
        )
      ).toMatchSnapshot();
    });

    it('should handle student selection actions', () => {
      expect(
        smartBarReducer(
          undefined,
          Actions.studentSelectionSuccess(mockedState.get('selectedStudentId'))
        )
      ).toMatchSnapshot();
    });
  });

  describe('SmartBar clicks', () => {
    it('should handle school click actions', () => {
      expect(
        smartBarReducer(undefined, AppActions.updateSchoolData(mockedState.get('clickedSchoolId')))
      ).toMatchSnapshot();
    });

    it('should handle grade click actions', () => {
      expect(
        smartBarReducer(undefined, AppActions.updateGradeData(mockedState.get('clickedGradeId')))
      ).toMatchSnapshot();
    });

    it('should handle teacher click actions', () => {
      expect(
        smartBarReducer(
          undefined,
          AppActions.updateTeacherData(mockedState.get('clickedTeacherId'))
        )
      ).toMatchSnapshot();
    });

    it('should handle class click actions', () => {
      expect(
        smartBarReducer(undefined, AppActions.updateClassData(mockedState.get('clickedClassId')))
      ).toMatchSnapshot();
    });

    it('should handle group click actions', () => {
      expect(
        smartBarReducer(undefined, AppActions.updateGroupData(mockedState.get('clickedGroupId')))
      ).toMatchSnapshot();
    });

    it('should handle student click actions', () => {
      expect(
        smartBarReducer(
          undefined,
          AppActions.updateStudentData(mockedState.get('clickedStudentId'))
        )
      ).toMatchSnapshot();
    });

    it('should handle action school actions', () => {
      expect(
        smartBarReducer(undefined, Actions.activeSelectedSchool(mockedState.get('activeSchoolId')))
      ).toMatchSnapshot();
    });

    it('should handle active grade actions', () => {
      expect(
        smartBarReducer(undefined, Actions.activeSelectedGrade(mockedState.get('activeGradeId')))
      ).toMatchSnapshot();
    });

    it('should handle active teacher actions', () => {
      expect(
        smartBarReducer(
          undefined,
          Actions.activeSelectedTeacher(mockedState.get('activeTeacherId'))
        )
      ).toMatchSnapshot();
    });

    it('should handle active class actions', () => {
      expect(
        smartBarReducer(undefined, Actions.activeSelectedClass(mockedState.get('activeClassId')))
      ).toMatchSnapshot();
    });

    it('should handle active group actions', () => {
      expect(
        smartBarReducer(undefined, Actions.activeSelectedGroup(mockedState.get('activeGroupId')))
      ).toMatchSnapshot();
    });

    it('should handle active student actions', () => {
      expect(
        smartBarReducer(
          undefined,
          Actions.activeSelectedStudent(mockedState.get('activeStudentId'))
        )
      ).toMatchSnapshot();
    });
  });

  describe('Reset related actions', () => {
    it('should handle logout actions', () => {
      expect(smartBarReducer(mockedState, AppActions.logoutRequestSuccess())).toMatchSnapshot();
    });

    it('should handle reset selections actions', () => {
      expect(smartBarReducer(mockedState, Actions.resetSelections())).toMatchSnapshot();
    });
  });

  describe('Routes', () => {
    it('should handle transition to none-home tab', () => {
      expect(
        smartBarReducer(mockedState, { type: LOCATION_CHANGE, payload: { pathname: '/roster' } })
      ).toMatchSnapshot();
    });
  });
});
