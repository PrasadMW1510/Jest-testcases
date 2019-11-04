/*
 *
 * PISettingContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  loading: false,
  settings: {},
});

function pisettingContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.PI_SETTINGS_CONTAINER:
    case SmartBarConstants.SCHOOL_SELECTION_SUCCESS:
    case SmartBarConstants.GRADE_SELECTION_SUCCESS:
    case SmartBarConstants.TEACHER_SELECTION_SUCCESS:
    case SmartBarConstants.CLASS_SELECTION_SUCCESS:
    case SmartBarConstants.GROUP_SELECTION_SUCCESS:
    case SmartBarConstants.STUDENT_SELECTION_SUCCESS:
      return initialState.set('loading', true);
    case Constants.PI_SETTINGS_CONTAINER_SUCCESS:
      return state.set('settings', fromJS(action.settings)).set('loading', false);
    case Constants.PI_SETTINGS_SAVE:
      return state.set('loading', true);
    case Constants.PI_SETTINGS_SAVE_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default pisettingContainerReducer;
