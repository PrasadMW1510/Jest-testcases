/*
 *
 * System44SuccessRecordContainer actions
 *
 */

import * as Constants from './constants';

export function getAssignmentSuccessRecordRequest(payload) {
  return {
    type: Constants.GET_ASSIGNMENT_SUCCESS_RECORD_REQUEST,
    payload,
  };
}

export function getAssignmentSuccessRecordSuccess(getAssignmentSuccessRecordData = []) {
  return {
    type: Constants.GET_ASSIGNMENT_SUCCESS_RECORD_SUCCESS,
    getAssignmentSuccessRecordData,
  };
}

export function assignmentSuccessRecordSaveRequest(payload) {
  return {
    type: Constants.ASSIGNMENT_SUCCESS_RECORD_SAVE_REQUEST,
    payload,
  };
}

export function assignmentSuccessRecordSaveSuccess(successData) {
  return {
    type: Constants.ASSIGNMENT_SUCCESS_RECORD_SAVE_SUCCESS,
    successData,
  };
}

export function getAssignmentSuccessRecordFailure(err) {
  return {
    type: Constants.GET_ASSIGNMENT_SUCCESS_RECORD_FAILURE,
    err,
  };
}
