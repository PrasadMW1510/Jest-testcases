/*
 *
 * StudentEnrollmentTableContainer actions
 *
 */

import * as Constants from './constants';
/**
 * Get the Student enrollment
 *
 * @returns {{type}}
 */
export function studentEnrollRequest(payload) {
  return {
    payload,
    type: Constants.STUDENT_ENROLL_REQUEST,
  };
}

/**
 * Dispatched when we get the Student enrollment successfully
 * @param studentEnroll
 * @returns {{type, studentEnroll: *}}
 */
export function studentEnrollRequestSuccess(studentEnroll = {}) {
  return {
    type: Constants.STUDENT_ENROLL_REQUEST_SUCCESS,
    studentEnroll,
  };
}

/**
 * Dispatched when the Student enrollment request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function studentEnrollRequestFailure(error) {
  return {
    type: Constants.STUDENT_ENROLL_REQUEST_FAILURE,
    error,
  };
}

/**
 * Get the student Apps Usage Request
 *studentAppsUsageRequest
 * @returns {{type}}
 */
export function studentAppsUsageRequest() {
  return {
    type: Constants.STUDENT_APPS_USAGE_REQUEST,
  };
}

/**
 * Dispatched when we get the student Apps Usage successfully
 * @param studentAppsUsage
 * @returns {{type, studentAppsUsage: *}}
 */
export function studentAppsUsageRequestSuccess(studentAppsUsage = {}) {
  return {
    type: Constants.STUDENT_APPS_USAGE_REQUEST_SUCCESS,
    studentAppsUsage,
  };
}

/**
 * Dispatched when the student Apps Usage request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function studentAppsUsageRequestFailure(error) {
  return {
    type: Constants.STUDENT_APPS_USAGE_REQUEST_FAILURE,
    error,
  };
}

/**
 * Get the student Enroll Save Request
 *studentEnroll
 * SaveRequest
 * @returns {{type}}
 */
export function studentEnrollSaveRequest(studentEnroll, shouldReturn, currentPage) {
  return {
    type: Constants.STUDENT_ENROLL_SAVE_REQUEST,
    studentEnroll,
    shouldReturn,
    currentPage,
  };
}

/**
 * Dispatched when we get the student Enroll Save successfully
 * @param studentEnroll
 * @returns {{type, studentEnroll: *}}
 */
export function studentEnrollSaveRequestSuccess(studentEnroll = {}) {
  return {
    type: Constants.STUDENT_ENROLL_SAVE_REQUEST_SUCCESS,
    studentEnroll,
  };
}

/**
 * Dispatched when the student Enroll Save request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function studentEnrollSaveRequestFailure(error) {
  return {
    type: Constants.STUDENT_ENROLL_SAVE_REQUEST_FAILURE,
    error,
  };
}

/**
 * Get the student get List Request
 *studentGetList
 * @returns {{type}}
 */
export function studentGetListRequest() {
  return {
    type: Constants.STUDENT_GET_LIST_REQUEST,
  };
}

/**
 * Dispatched when we get the student Enroll Save successfully
 * @param studentGetList
 */
export function studentGetListRequestSuccess(studentGetList = {}) {
  return {
    type: Constants.STUDENT_GET_LIST_REQUEST_SUCCESS,
    studentGetList,
  };
}

/**
 * Dispatched when the student Enroll Save request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function studentGetListRequestFailure(error) {
  return {
    type: Constants.STUDENT_GET_LIST_REQUEST_FAILURE,
    error,
  };
}

/**
 * Get the student get List Request
 *studentGetList
 * @returns {{type}}
 */
export function samCentralStatusRequest() {
  return {
    type: Constants.SAM_CENTRAL_STATUS_REQUEST,
  };
}

/**
 * Dispatched when we get the student Enroll Save successfully
 * @param samCentralStatus
 */
export function samCentralStatusRequestSuccess(samCentralStatus = {}) {
  return {
    type: Constants.SAM_CENTRAL_STATUS_REQUEST_SUCCESS,
    samCentralStatus,
  };
}

/**
 * Dispatched when the student Enroll Save request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function samCentralStatusRequestFailure(error) {
  return {
    type: Constants.SAM_CENTRAL_STATUS_REQUEST_FAILURE,
    error,
  };
}

/**
 * Show the view level loading
 *
 * @returns {{type}}
 */
export function showStudentEnrollmentLoading() {
  return {
    type: Constants.STUDENT_ENROLL_LOADING,
  };
}

/**
 * Show the view level loading
 *
 * @returns {{type}}
 */
export function showStudentEnrollmentLoadingSuccess() {
  return {
    type: Constants.STUDENT_ENROLL_LOADING_SUCCESS,
  };
}

/**
 * Show the view level loading
 *
 * @returns {{type}}
 */
export function showStudentEnrollmentLoadingFailure() {
  return {
    type: Constants.STUDENT_ENROLL_LOADING_FAILURE,
  };
}
