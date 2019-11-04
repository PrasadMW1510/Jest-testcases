/*
 *
 * PssettingContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as Constants from './constants';
const initialState = fromJS({
  error: false,
  loading: false,
  settings: {},
  testAssignment: {},
});

function pssettingContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.PS_SETTINGS_CONTAINER:
    case SmartBarConstants.SCHOOL_SELECTION_SUCCESS:
    case SmartBarConstants.GRADE_SELECTION_SUCCESS:
    case SmartBarConstants.TEACHER_SELECTION_SUCCESS:
    case SmartBarConstants.CLASS_SELECTION_SUCCESS:
    case SmartBarConstants.GROUP_SELECTION_SUCCESS:
    case SmartBarConstants.STUDENT_SELECTION_SUCCESS:
      return initialState.set('loading', true);
    case Constants.PS_SETTINGS_CONTAINER_SUCCESS:
      return state.set('settings', fromJS(action.settings)).set('loading', false);
    case Constants.PS_TEST_ASSIGNMENT:
      return state.set('loading', true);
    case Constants.PS_TEST_ASSIGNMENT_SUCCESS:
      return state.set('loading', false);
    case Constants.PS_TEST_ASSIGNMENT_MODULE_SUCCESS:
      return state.set('dtmModules', fromJS(action.testAssignment));
    case Constants.PS_TEST_ASSIGNMENT_SUBPRODUCT_SUCCESS:
      return state.set('subproduct', fromJS(action.settings));
    case Constants.PS_TEST_ASSIGNMENT_TEST_SUCCESS:
      return state.set('dtmTests', fromJS(action.settings));
    case Constants.PS_SETTINGS_SAVE:
      return state.set('loading', true);
    case Constants.PS_TEST_ASSIGNMENT_MODULE_REQUEST:
      return state.set('loading', false);
    default:
      return state;
  }
}

export default pssettingContainerReducer;
