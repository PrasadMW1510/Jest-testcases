/*
 *
 * DeactivateStudentModalContainer actions
 *
 */

import * as Constants from './constants';
/**
 * Deactivate the Student
 *
 * @returns {{type}}
 */
export function deactivateStudentRequest() {
  return {
    type: Constants.DEACTIVATE_STUDENT_REQUEST,
  };
}

/**
 * Dispatched when we get the Deactivate Student Request successfully
 * @param deactivateStudent
 * @returns {{type, deactivateStudent: *}}
 */
export function deactivateStudentRequestSuccess(deactivateStudent = {}) {
  return {
    type: Constants.DEACTIVATE_STUDENT_REQUEST_SUCCESS,
    deactivateStudent,
  };
}

/**
 * Dispatched when the Deactivate Student request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function deactivateStudentRequestFailure(error) {
  return {
    type: Constants.DEACTIVATE_STUDENT_REQUEST_FAILURE,
    error,
  };
}
