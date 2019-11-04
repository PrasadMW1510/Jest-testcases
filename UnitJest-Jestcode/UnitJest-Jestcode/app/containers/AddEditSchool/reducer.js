/*
 *
 * AddSchoolContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  error: null,
});

function addSchoolContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_META_DATA_REQUEST_FAILURE:
      return state.set('error', `${action.error}`);
    default:
      return state;
  }
}

export default addSchoolContainerReducer;
