/*
 *
 * AddAssignmentContainer actions
 *
 */

import * as Constants from './constants';

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

export function getStudentDetailsFailure(error) {
  return {
    type: Constants.GET_STUDENTDETAIL_FAILURE,
    error,
  };
}

export function postSaveNewAssignment(data) {
  return {
    type: Constants.POST_NEW_ASSIGNMENT,
    data,
  };
}

export function postSaveNewAssignmentSuccess(data) {
  return {
    type: Constants.POST_NEW_ASSIGNMENT_SUCCESS,
    data,
  };
}

export function defaultAction() {
  return {
    type: Constants.DEFAULT_ACTION,
  };
}
