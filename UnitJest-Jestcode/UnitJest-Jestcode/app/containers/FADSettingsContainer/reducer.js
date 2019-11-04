/*
 *
 * FadsettingsContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  settings: [],
  loading: true,
  error: null,
});

function FADSettingsContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.FAD_GET_SETTINGS_REQUEST:
      return state.set('loading', true);
    case Constants.FAD_GET_SETTINGS_SUCCESS:
      return state.set('loading', false).set('settings', fromJS(action.result));
    case Constants.FAD_GET_SETTINGS_FAILURE:
      return state.set('loading', false).set('error', action.err);
    case Constants.FAD_SET_SETTINGS_REQUEST:
      return state.set('loading', true);
    case Constants.FAD_SET_SETTINGS_SUCCESS:
      return state.set('loading', false);
    case Constants.FAD_SET_SETTINGS_FAILURE:
      return state.set('loading', false).set('error', action.err);
    case Constants.DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default FADSettingsContainerReducer;
