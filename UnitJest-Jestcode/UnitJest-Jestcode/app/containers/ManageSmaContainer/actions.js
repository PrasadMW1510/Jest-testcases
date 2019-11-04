import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

/**
 * Handles API logic for making calls needed for
 * getting media servers
 * @returns {{type}}
 */
export function getMediaServersRequest() {
  return {
    type: Constants.GET_MEDIA_SERVERS_REQUEST,
  };
}

/**
 * Handles successful fetch of media servers
 * @returns {{type}}
 */
export function handleMediaServersRequestSuccess(mediaServers) {
  return {
    mediaServers,
    type: Constants.GET_MEDIA_SERVERS_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for making calls needed for
 * Add Edit Teacher Modal are a failure
 *
 * @param error
 * @returns {*}
 */
export function handleMediaServersRequestFailure(error) {
  return generalFailure({
    type: Constants.GET_MEDIA_SERVERS_REQUEST_FAILURE,
    error,
  });
}
