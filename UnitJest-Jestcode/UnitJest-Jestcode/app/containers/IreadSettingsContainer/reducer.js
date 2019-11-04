/*
 *
 * IreadSettingsContainer reducer
 *
 */

import { fromJS } from 'immutable';

import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  programSetting: {},
  loading: false,
});

function ireadSettingsContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.IREAD_PROGRAM_SETTINGS_REQUEST:
    case SmartBarConstants.CLASS_SELECTION_SUCCESS:
    case SmartBarConstants.GROUP_SELECTION_SUCCESS:
    case SmartBarConstants.STUDENT_SELECTION_SUCCESS:
      return state.set('loading', true);
    case Constants.IREAD_SAVE_REQUEST_SUCCESS:
      return state.set('programSetting', fromJS({}));
    case Constants.IREAD_PROGRAM_SETTINGS_REQUEST_SUCCESS:
      return state.set('programSetting', fromJS(action.programSetting)).set('loading', false);
    case Constants.IREAD_PROGRAM_SETTINGS_REQUEST_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default ireadSettingsContainerReducer;
