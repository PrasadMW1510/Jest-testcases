/*
 *
 * DeactivateGroupModalContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  deactivateGroup: [],
});

function deactivateGroupModalContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.DEACTIVATE_GROUP_REQUEST_SUCCESS:
      return state.set('deactivateGroup', fromJS(action.deactivateGroup));
    case Constants.DEACTIVATE_GROUP_REQUEST_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default deactivateGroupModalContainerReducer;
