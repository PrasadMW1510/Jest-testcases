/*
 *
 * AccountDeleteModalContainer reducer
 *
 */

import { fromJS } from 'immutable';

const initialState = fromJS({ error: false });

function accountDeleteModalContainerReducer(state = initialState, action) {
  // TODO, add other case(s) here
  switch (action.type) {
    default:
      return state;
  }
}

export default accountDeleteModalContainerReducer;
