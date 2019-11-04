/*
 *
 * DeactivateGroupModalContainer actions
 *
 */

import * as Constants from './constants';
/**
 * Deactivate the Group
 *
 * @returns {{type}}
 */
export function deactivateGroupRequest() {
  return {
    type: Constants.DEACTIVATE_GROUP_REQUEST,
  };
}

/**
 * Dispatched when we get the Deactivate Group Request successfully
 * @param deactivateUser
 * @returns {{type, deactivateUser: *}}
 */
export function deactivateGroupRequestSuccess(deactivateUser = {}) {
  return {
    type: Constants.DEACTIVATE_GROUP_REQUEST_SUCCESS,
    deactivateUser,
  };
}

/**
 * Dispatched when the Deactivate Group request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function deactivateGroupRequestFailure(error) {
  return {
    type: Constants.DEACTIVATE_GROUP_REQUEST_FAILURE,
    error,
  };
}
