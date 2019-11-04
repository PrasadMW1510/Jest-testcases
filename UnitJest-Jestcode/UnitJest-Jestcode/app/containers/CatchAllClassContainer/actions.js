/*
 *
 * CatchAllClassContainer actions
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

export function setRead180ngAssignmentRequest(postData) {
  return {
    type: Constants.SET_180_NG_ASSIGNMENT_DATA,
    postData,
  };
}

export function getStudentDetailsFailure(err) {
  return {
    type: Constants.GET_STUDENTDETAIL_FAILURE,
    err,
  };
}

export function postSaveNewAssignmentFailure(err) {
  return {
    type: Constants.POST_NEW_ASSIGNMENT_FAILURE,
    err,
  };
}

export function setRead180DataRequestFailure(err) {
  return {
    type: Constants.SET_180_NG_ASSIGNMENT_DATA_FAILURE,
    err,
  };
}

export function defaultAction() {
  return {
    type: Constants.DEFAULT_ACTION,
  };
}
