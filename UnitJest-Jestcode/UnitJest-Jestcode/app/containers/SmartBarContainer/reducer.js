/*
 *
 * SmartBarContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as AppConstants from 'containers/App/constants';
import * as Constants from './constants';

const initialState = fromJS({
  selectedSchoolId: '',
  selectedClassId: '',
  selectedGroupId: '',
  selectedStudentId: '',
  selectedGradeId: '',
  selectedTeacherId: '',
  clickedSchoolId: '',
  clickedClassId: '',
  clickedGroupId: '',
  clickedStudentId: '',
  clickedGradeId: '',
  clickedTeacherId: '',
  selectedCohType: '',
  activeSchoolId: '',
  activeGradeId: '',
  activeTeacherId: '',
  activeClassId: '',
  activeGroupId: '',
  activeStudentId: '',
});

/**
 * smartBar
 *  a click is when a cohort is Clicked once.
 *  a selection is when a clicked cohort is clicked a second time and it then becomes the active selected cohort.
 *    in flash SAM this is indicated by the selected cohort being colored the same as current Tab (Roster=Orange, Reports=Blue, etc)
 *  (the second click does not need to be a standard DoubleClick i.e. it doesn't need to be a rapid second click)
 * @param state
 * @param action
 * @returns {any}
 */
function smartBarContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GRADE_SELECTION_SUCCESS:
      return state
        .set('selectedGradeId', action.gradeId)
        .set('selectedTeacherId', '')
        .set('selectedClassId', '')
        .set('selectedGroupId', '')
        .set('selectedStudentId', '')
        .set('selectedCohType', AppConstants.COHORT_TYPE.Grade);
    case Constants.TEACHER_SELECTION_SUCCESS:
      return state
        .set('selectedTeacherId', action.teacherId)
        .set('selectedClassId', '')
        .set('selectedGroupId', '')
        .set('selectedStudentId', '')
        .set('selectedCohType', AppConstants.COHORT_TYPE.Teacher);
    case Constants.SCHOOL_SELECTION_SUCCESS:
      return state
        .set('selectedSchoolId', action.schoolId)
        .set('selectedGradeId', '')
        .set('selectedTeacherId', '')
        .set('selectedClassId', '')
        .set('selectedGroupId', '')
        .set('selectedStudentId', '')
        .set('selectedCohType', AppConstants.COHORT_TYPE.School);
    case Constants.CLASS_SELECTION_SUCCESS:
      return state
        .set('selectedClassId', action.classId)
        .set('selectedStudentId', '')
        .set('selectedGroupId', '')
        .set('selectedCohType', AppConstants.COHORT_TYPE.Class);
    case Constants.GROUP_SELECTION_SUCCESS:
      return state
        .set('selectedGroupId', action.groupId)
        .set('selectedStudentId', '')
        .set('selectedCohType', AppConstants.COHORT_TYPE.Group);
    case Constants.STUDENT_SELECTION_SUCCESS:
      return state
        .set('selectedStudentId', action.studentId)
        .set('selectedCohType', AppConstants.COHORT_TYPE.Student);
    case AppConstants.UPDATE_GRADE_DATA:
      return state
        .set('clickedGradeId', action.gradeId)
        .set('clickedTeacherId', '')
        .set('clickedClassId', '')
        .set('clickedGroupId', '')
        .set('clickedStudentId', '');
    case AppConstants.UPDATE_TEACHER_DATA:
      return state
        .set('clickedTeacherId', action.teacherId)
        .set('clickedClassId', '')
        .set('clickedGroupId', '')
        .set('clickedStudentId', '');
    case AppConstants.UPDATE_SCHOOL_DATA:
      return state
        .set('clickedSchoolId', action.schoolId)
        .set('clickedGradeId', '')
        .set('clickedTeacherId', '')
        .set('clickedClassId', '')
        .set('clickedGroupId', '')
        .set('clickedStudentId', '');
    case AppConstants.UPDATE_CLASS_DATA:
      return state
        .set('clickedClassId', action.classId)
        .set('clickedStudentId', '')
        .set('clickedGroupId', '');
    case AppConstants.UPDATE_GROUP_DATA:
      return state.set('clickedGroupId', action.groupId).set('clickedStudentId', '');
    case AppConstants.UPDATE_STUDENT_DATA:
      return state.set('clickedStudentId', action.studentId);
    case Constants.PROFILE_SELECTED_SCHOOL:
      return state.set('activeSchoolId', fromJS(action.schoolId));
    case Constants.PROFILE_SELECTED_GRADE:
      return state.set('activeGradeId', fromJS(action.gradeId));
    case Constants.PROFILE_SELECTED_TEACHER:
      return state.set('activeTeacherId', fromJS(action.teacherId));
    case Constants.PROFILE_SELECTED_CLASS:
      return state.set('activeClassId', fromJS(action.classId));
    case Constants.PROFILE_SELECTED_GROUP:
      return state.set('activeGroupId', fromJS(action.groupId));
    case Constants.PROFILE_SELECTED_STUDENT:
      return state.set('activeStudentId', fromJS(action.studentId));
    case Constants.RESET_SELECTIONS:
    case AppConstants.LOGOUT_REQUEST_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default smartBarContainerReducer;
