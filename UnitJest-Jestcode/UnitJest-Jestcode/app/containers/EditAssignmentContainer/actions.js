/*
 *
 * EditAssignmentContainer actions
 *
 */

import * as Constants from './constants';

export function getAssignmentData(data) {
  return {
    type: Constants.GET_ASSIGNMENT_REQUEST,
    data,
  };
}

export function getAssignmentDataSuccess(data) {
  return {
    type: Constants.GET_ASSIGNMENT_SUCCESS,
    data,
  };
}

export function getStudentDetails(data) {
  return {
    type: Constants.GET_STUDENT_DETAILS,
    data,
  };
}
export function getStudentDetailsSuccess(data) {
  return {
    type: Constants.GET_STUDENTDETAIL_SUCCESS,
    data,
  };
}

export function saveAssignmentRequest(data) {
  return {
    type: Constants.SAVE_ASSGINMENT_REQUEST,
    data,
  };
}

export function saveAssignmentRequestSuccess(data) {
  return {
    type: Constants.SAVE_ASSGINMENT_REQUEST_SUCCESS,
    data,
  };
}

export function saveAssignmentRequestError(error) {
  return {
    type: Constants.SAVE_ASSGINMENT_REQUEST_ERROR,
    error,
  };
}

export function deleteAssignmentRequest(data) {
  return {
    type: Constants.DELETE_ASSIGNMENT_REQUEST,
    data,
  };
}

export function deleteAssignmentRequestSuccess(data) {
  return {
    type: Constants.DELETE_ASSIGNMENT_REQUEST_SUCCESS,
    data,
  };
}

export function deleteAssignmentRequestError(error) {
  return {
    type: Constants.DELETE_ASSIGNMENT_REQUEST_ERROR,
    error,
  };
}

export function clearState() {
  return {
    type: Constants.CLEAR_STATE,
  };
}

export function clearResponseStatus() {
  return {
    type: Constants.CLEAR_RESPONSE_STATUS,
  };
}

export function getStudentDetailsFailure(error) {
  return {
    type: Constants.GET_STUDENTDETAIL_FAILURE,
    error,
  };
}

export function getAssignmentDataFailure(error) {
  return {
    type: Constants.GET_ASSIGNMENT_FAILURE,
    error,
  };
}
