/*
 *
 * DeactivateClassModalContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  deactivateClass: [],
});

function deactivateClassModalContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.DEACTIVATE_CLASS_REQUEST_SUCCESS:
      return state.set('deactivateClass', fromJS(action.deactivateClass));
    case Constants.DEACTIVATE_CLASS_REQUEST_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default deactivateClassModalContainerReducer;
