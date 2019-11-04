/*
 *
 * MessageContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  loading: false,
  messages: [],
});

function messageContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_MESSAGES_REQUEST:
      return state.set('loading', true);
    case Constants.GET_MESSAGES_REQUEST_SUCCESS:
      return state.set('messages', fromJS(action.messages.message)).set('loading', false);
    case Constants.GET_MESSAGES_REQUEST_FAILURE:
    case Constants.POST_DELETE_REQUEST_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default messageContainerReducer;
