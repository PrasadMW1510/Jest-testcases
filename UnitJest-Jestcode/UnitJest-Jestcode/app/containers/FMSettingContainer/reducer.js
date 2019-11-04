/*
 *
 * FMSettingContainer reducer
 *
 */

import { fromJS } from 'immutable';

import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as Constants from './constants';

const initialState = fromJS({
  loading: false,
  settings: {},
  advancedSettings: {},
});

function fmSettingContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.FM_SETTINGS_CONTAINER:
    case SmartBarConstants.SCHOOL_SELECTION_SUCCESS:
    case SmartBarConstants.GRADE_SELECTION_SUCCESS:
    case SmartBarConstants.TEACHER_SELECTION_SUCCESS:
    case SmartBarConstants.CLASS_SELECTION_SUCCESS:
    case SmartBarConstants.GROUP_SELECTION_SUCCESS:
    case SmartBarConstants.STUDENT_SELECTION_SUCCESS:
      return initialState.set('loading', true);
    case Constants.FM_SETTINGS_CONTAINER_SUCCESS:
      return state.set('loading', false);
    case Constants.FM_GET_SETTINGS_SUCCESS:
      return state.set('settings', fromJS(action.settings));
    case Constants.FM_GET_ADVANCED_SETTINGS_SUCCESS:
      return state.set('advancedSettings', fromJS(action.advancedSettings));
    case Constants.FM_SETTINGS_SAVE:
    case Constants.FM_ADVANCED_SETTINGS_SAVE:
      return state.set('loading', true);
    default:
      return state;
  }
}

export default fmSettingContainerReducer;
