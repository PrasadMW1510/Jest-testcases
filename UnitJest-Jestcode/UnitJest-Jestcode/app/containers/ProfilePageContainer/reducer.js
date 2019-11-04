/**
 * ProfilePage reducer
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  profileDetails: [],
  profileDetailsDistAdmin: [],
  profileDetailsSchoolAdmin: [],
  classDetails: [],
  teacherByGradeDetails: [],
  classByGradeDetails: [],
  studentByGradeDetails: [],
});

function profilePageReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.PROFILE_PAGE_REQUEST_SUCCESS:
      return state.set('profileDetails', fromJS(action.profileDetails));
    case Constants.PROFILE_PAGE_REQUEST_FAILURE:
      return state.set('error', action.error);
    case Constants.TEACHER_BY_GRADE_REQUEST_SUCCESS:
      return state.set('teacherByGradeDetails', fromJS(action.teacherByGradeDetails));
    case Constants.TEACHER_BY_GRADE_REQUEST_FAILURE:
      return state.set('error', action.error);
    case Constants.CLASS_BY_GRADE_REQUEST_SUCCESS:
      return state.set('classByGradeDetails', fromJS(action.classByGradeDetails));
    case Constants.CLASS_BY_GRADE_REQUEST_FAILURE:
      return state.set('error', action.error);
    case Constants.STUDENT_BY_GRADE_REQUEST_SUCCESS:
      return state.set('studentByGradeDetails', fromJS(action.studentByGradeDetails));
    case Constants.STUDENT_BY_GRADE_REQUEST_FAILURE:
      return state.set('error', action.error);
    case Constants.PROFILE_PAGE_DISTRICT_ADMIN_REQUEST_SUCCESS:
      return state.set('profileDetailsDistAdmin', fromJS(action.profileDetailsDistAdmin));
    case Constants.PROFILE_PAGE_DISTRICT_ADMIN_REQUEST_FAILURE:
      return state.set('error', action.error);
    case Constants.PROFILE_PAGE_SCHOOL_ADMIN_REQUEST_SUCCESS:
      return state.set('profileDetailsSchoolAdmin', fromJS(action.profileDetailsSchoolAdmin));
    case Constants.PROFILE_PAGE_SCHOOL_ADMIN_REQUEST_FAILURE:
      return state.set('error', action.error);
    case Constants.PROFILE_PAGE_CLASS_REQUEST_SUCCESS:
      return state.set('classDetails', fromJS(action.classDetails));
    case Constants.PROFILE_PAGE_CLASS_REQUEST_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default profilePageReducer;
