/*
 *
 * DeactivateModalContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from '../DeactivateModalContainer/constants';

const initialState = fromJS({
  error: false,
  deactivateUser: [],
});

function deactivateModalContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.DEACTIVATE_USER_REQUEST_SUCCESS:
      return state.set('deactivateUser', fromJS(action.deactivateUser));
    case Constants.DEACTIVATE_USER_REQUEST_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default deactivateModalContainerReducer;
