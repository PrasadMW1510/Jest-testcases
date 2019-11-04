/*
 *
 * S44NGSettingContainer reducer
 *
 */

import { fromJS } from 'immutable';

import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as Constants from './constants';

const initialState = fromJS({
  settings: {},
  loading: false,
});

function s44NGSettingContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.S44NG_SETTINGS_CONTAINER_SUCCESS:
      return state.set('settings', fromJS(action.settings)).set('loading', false);
    case Constants.S44NG_SETTINGS_CONTAINER:
    case SmartBarConstants.GRADE_SELECTION_SUCCESS:
    case SmartBarConstants.TEACHER_SELECTION_SUCCESS:
    case SmartBarConstants.CLASS_SELECTION_SUCCESS:
    case SmartBarConstants.GROUP_SELECTION_SUCCESS:
    case SmartBarConstants.STUDENT_SELECTION_SUCCESS:
      return state.set('loading', true);
    default:
      return state;
  }
}

export default s44NGSettingContainerReducer;
