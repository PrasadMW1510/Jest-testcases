/**
 * Certificate Info reducer
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  certificateInfo: [],
});

function certificateInfoReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.CERTIFICATE_INFO_REQUEST_SUCCESS:
      return state.set('certificateInfo', fromJS(action.certificateInfo));
    case Constants.CERTIFICATE_INFO_REQUEST_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default certificateInfoReducer;
