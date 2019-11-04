/*
 *
 * ClearRosterModal reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({});

function clearRosterModalReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.DEACTIVATE_ALL_CLASSES_REQUEST_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default clearRosterModalReducer;
