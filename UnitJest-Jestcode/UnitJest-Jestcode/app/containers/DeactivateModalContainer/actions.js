/*
 *
 * DeactivateModalContainer actions
 *
 */

import * as Constants from './constants';
/**
 * Deactivate the User
 *
 * @returns {{type}}
 */
export function deactivateUserRequest() {
  return {
    type: Constants.DEACTIVATE_USER_REQUEST,
  };
}

/**
 * Dispatched when we get the Deactivate Request successfully
 * @param deactivateUser
 * @returns {{type, deactivateUser: *}}
 */
export function deactivateUserRequestSuccess(deactivateUser = {}) {
  return {
    type: Constants.DEACTIVATE_USER_REQUEST_SUCCESS,
    deactivateUser,
  };
}

/**
 * Dispatched when the Deactivate request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function deactivateUserRequestFailure(error) {
  return {
    type: Constants.DEACTIVATE_USER_REQUEST_FAILURE,
    error,
  };
}
