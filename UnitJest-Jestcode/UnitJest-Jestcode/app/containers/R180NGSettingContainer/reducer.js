/*
 *
 * R180NgsettingContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  loading: false,
  programSetting: {},
  programEnrollmentSetting: [],
});

function r180NGSettingContainerReducer(state = initialState, action) {
  switch (action.type) {
    case SmartBarConstants.SCHOOL_SELECTION_SUCCESS:
    case SmartBarConstants.GRADE_SELECTION_SUCCESS:
    case SmartBarConstants.TEACHER_SELECTION_SUCCESS:
    case SmartBarConstants.CLASS_SELECTION_SUCCESS:
    case SmartBarConstants.GROUP_SELECTION_SUCCESS:
    case SmartBarConstants.STUDENT_SELECTION_SUCCESS:
      return initialState.set('loading', true);
    case Constants.R180NG_PROGRAM_SETTINGS_REQUEST_SUCCESS:
      return state.set('programSetting', fromJS(action.programSetting)).set('loading', false);
    case Constants.R180NG_PROGRAM_SETTINGS_ENROLLMENT_REQUEST_SUCCESS:
      return state.set('programEnrollmentSetting', fromJS(action.programEnrollmentSetting));
    case Constants.R180NG_PROGRAM_SETTINGS_ENROLLMENT_REQUEST_FAILURE:
    case Constants.R180NG_PROGRAM_SETTINGS_REQUEST_FAILURE:
      return state.set('error', action.error);
    case Constants.R180NG_SAVE_REQUEST_SUCCESS:
      return state.set('loading', true);
    case Constants.UPDATE_R180NG_SETTING_REQUEST_SUCCESS:
      return state.set('programSetting', fromJS(action.setting)).set('loading', false);
    case LOCATION_CHANGE:
      return action.payload.pathname === '/roster' ? initialState : state;
    case Constants.R180NG_SAVE_REQUEST_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default r180NGSettingContainerReducer;
