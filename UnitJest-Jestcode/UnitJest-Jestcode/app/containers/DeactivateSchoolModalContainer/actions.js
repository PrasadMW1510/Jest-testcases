/*
 *
 * DeactivateSchoolModalContainer actions
 *
 */

import * as Constants from './constants';
/**
 * Deactivate the School
 *
 * @returns {{type}}
 */
export function deactivateSchoolRequest() {
  return {
    type: Constants.DEACTIVATE_SCHOOL_REQUEST,
  };
}

/**
 * Dispatched when we get the Deactivate School Request successfully
 * @param deactivateSchool
 * @returns {{type, deactivateSchool: *}}
 */
export function deactivateSchoolRequestSuccess(deactivateSchool = {}) {
  return {
    type: Constants.DEACTIVATE_SCHOOL_REQUEST_SUCCESS,
    deactivateSchool,
  };
}

/**
 * Dispatched when the Deactivate School request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function deactivateSchoolRequestFailure(error) {
  return {
    type: Constants.DEACTIVATE_SCHOOL_REQUEST_FAILURE,
    error,
  };
}
