/*
 *
 * DeactivateSchoolModalContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  deactivateSchool: [],
});

function deactivateSchoolModalContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.DEACTIVATE_SCHOOL_REQUEST_SUCCESS:
      return state.set('deactivateSchool', fromJS(action.deactivateSchool));
    case Constants.DEACTIVATE_SCHOOL_REQUEST_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default deactivateSchoolModalContainerReducer;
