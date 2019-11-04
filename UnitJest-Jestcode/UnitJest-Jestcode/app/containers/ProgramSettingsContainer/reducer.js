/*
 *
 * ProgramSettingsContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  loading: false,
  enrollmentList: [],
});

function programSettingsContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.PROGRAM_SETTINGS_ENROLLMENT_LIST:
      return state.set('loading', true);
    case Constants.PROGRAM_SETTINGS_ENROLLMENT_LIST_SUCCESS:
      return state.set('enrollmentList', fromJS(action.enrollmentList)).set('loading', false);
    default:
      return state;
  }
}

export default programSettingsContainerReducer;
