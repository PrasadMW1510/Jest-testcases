/*
 *
 * DeactivateClassModalContainer actions
 *
 */

import * as Constants from './constants';
/**
 * Deactivate the Class
 *
 * @returns {{type}}
 */
export function deactivateClassRequest() {
  return {
    type: Constants.DEACTIVATE_CLASS_REQUEST,
  };
}

/**
 * Dispatched when we get the Deactivate Class Request successfully
 * @param deactivateClass
 * @returns {{type, deactivateClass: *}}
 */
export function deactivateClassRequestSuccess(deactivateClass = {}) {
  return {
    type: Constants.DEACTIVATE_CLASS_REQUEST_SUCCESS,
    deactivateClass,
  };
}

/**
 * Dispatched when the Deactivate Class request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function deactivateClassRequestFailure(error) {
  return {
    type: Constants.DEACTIVATE_CLASS_REQUEST_FAILURE,
    error,
  };
}
