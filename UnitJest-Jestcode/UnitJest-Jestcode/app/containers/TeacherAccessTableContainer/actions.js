/*
 *
 * TeacherAccessTableContainer actions
 *
 */

import * as Constants from './constants';
/**
 * Get the Teacher enrollment
 *
 * @returns {{type}}
 */
export function teacherEnrollRequest(payload) {
  return {
    payload,
    type: Constants.TEACHER_ENROLL_REQUEST,
  };
}

/**
 * Dispatched when we get the Teacher enrollment successfully
 * @param teacherEnroll
 * @returns {{type, teacherEnroll: *}}
 */
export function teacherEnrollRequestSuccess(teacherEnroll = {}) {
  return {
    type: Constants.TEACHER_ENROLL_REQUEST_SUCCESS,
    teacherEnroll,
  };
}

/**
 * Dispatched when the Teacher enrollment request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function teacherEnrollRequestFailure(error) {
  return {
    type: Constants.TEACHER_ENROLL_REQUEST_FAILURE,
    error,
  };
}

/**
 * Get the Teacher Apps Usage Request
 *teacherAppsUsageRequest
 * @returns {{type}}
 */
export function teacherAppsUsageRequest() {
  return {
    type: Constants.TEACHER_APPS_USAGE_REQUEST,
  };
}

/**
 * Dispatched when we get the Teacher Apps Usage successfully
 * @param teacherAppsUsage
 * @returns {{type, teacherAppsUsage: *}}
 */
export function teacherAppsUsageRequestSuccess(teacherAppsUsage = {}) {
  return {
    type: Constants.TEACHER_APPS_USAGE_REQUEST_SUCCESS,
    teacherAppsUsage,
  };
}

/**
 * Dispatched when the Teacher Apps Usage request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function teacherAppsUsageRequestFailure(error) {
  return {
    type: Constants.TEACHER_APPS_USAGE_REQUEST_FAILURE,
    error,
  };
}

/**
 * Get the Teacher Access Save Request
 *teacherAccessSaveRequest
 * @returns {{type}}
 */
export function teacherAccessSaveRequest(teacherEnroll, shouldReturn, currentPage) {
  return {
    type: Constants.TEACHER_ACCESS_SAVE_REQUEST,
    teacherEnroll,
    shouldReturn,
    currentPage,
  };
}

/**
 * Dispatched when we get the Teacher Access Save successfully
 * @param teacherEnroll
 * @returns {{type, teacherEnroll: *}}
 */
export function teacherAccessSaveRequestSuccess(teacherEnroll = {}) {
  return {
    type: Constants.TEACHER_ACCESS_SAVE_REQUEST_SUCCESS,
    teacherEnroll,
  };
}

/**
 * Dispatched when the Teacher Access Save request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function teacherAccessSaveRequestFailure(error) {
  return {
    type: Constants.TEACHER_ACCESS_SAVE_REQUEST_FAILURE,
    error,
  };
}

/**
 * Show the view level loading
 *
 * @returns {{type}}
 */
export function showTeacherAccessLoading() {
  return {
    type: Constants.TEACHER_ACCESS_LOADING,
  };
}

/**
 * Show the view level loading
 *
 * @returns {{type}}
 */
export function showTeacherAccessLoadingSuccess() {
  return {
    type: Constants.TEACHER_ACCESS_LOADING_SUCCESS,
  };
}

/**
 * Show the view level loading
 *
 * @returns {{type}}
 */
export function showTeacherAccessLoadingFailure() {
  return {
    type: Constants.TEACHER_ACCESS_LOADING_FAILURE,
  };
}
