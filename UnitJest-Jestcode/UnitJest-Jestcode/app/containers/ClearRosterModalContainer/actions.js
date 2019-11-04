/*
 *
 * ClearRosterModal actions
 *
 */

import * as Constants from './constants';

export function deactivateAllClassesRequest() {
  return {
    type: Constants.DEACTIVATE_ALL_CLASSES_REQUEST,
  };
}

/**
 * Handles API logic for when clearing roster is successful
 *
 */

export function deactivateAllClassesRequestSuccess() {
  return {
    type: Constants.DEACTIVATE_ALL_CLASSES_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for when deactivateAllClassesRequestFailure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function deactivateAllClassesRequestFailure(error) {
  return {
    type: Constants.DEACTIVATE_ALL_CLASSES_REQUEST_FAILURE,
    error,
  };
}
