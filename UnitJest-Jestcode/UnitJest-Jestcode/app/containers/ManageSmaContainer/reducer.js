/*
 *
 * ManageSmaContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  // mediaServers: [],
  error: false,
  loading: true,
});

function manageSmaContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_MEDIA_SERVERS_REQUEST_SUCCESS:
      // console.log('*****ACTION: mediaServers: ', action.mediaServers);
      return state.set('mediaServers', action.mediaServers).set('loading', false);
    case Constants.GET_MEDIA_SERVERS_REQUEST_FAILURE:
      return state.set('error', `${action.error}`);
    case Constants.GET_MEDIA_SERVERS_REQUEST:
      return state.set('loading', true);
    default:
      return state;
  }
}

export default manageSmaContainerReducer;
