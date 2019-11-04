import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  profileDetails: [],
  permissionsData: [],
  schoolsAndClassesDetails: {},
});

function addEditTeacherReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.ADD_EDIT_TEACHER_REQUEST_PROFILE_DETAILS_SUCCESS:
      return state.set('profileDetails', fromJS(action.profileDetails));
    case Constants.ADD_EDIT_TEACHER_REQUEST_PERMISSIONS_SUCCESS:
      return state.set('permissionsData', action.permissionsData);
    case Constants.ADD_EDIT_TEACHER_REQUEST_SCHOOL_AND_CLASSES_SUCCESS:
      return state.set('schoolsAndClassesDetails', fromJS(action.schoolsAndClassesDetails));
    case Constants.ADD_EDIT_TEACHER_REQUEST_PASSWORD_CONFIG_SUCCESS:
      return state.set('passwordConfig', fromJS(action.passwordConfig));
    default:
      return state;
  }
}

export default addEditTeacherReducer;
