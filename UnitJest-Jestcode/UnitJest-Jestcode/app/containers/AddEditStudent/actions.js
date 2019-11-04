/*
 *
 * AddEditStudent actions
 *
 */

import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

/**
 * Handles API Logic for saving student data
 *
 * @param studentObj
 * @returns {{type, studentObj: *}}
 */
export function saveStudentRequest(studentObj, data = {}) {
  return {
    type: Constants.SAVE_STUDENT_REQUEST,
    studentObj,
    isEdit: !!data.edit,
  };
}

/**
 * Handles API logic for when saving student data is successful
 *
 * @returns {{type}}
 */
export function saveStudentRequestSuccess() {
  return {
    type: Constants.SAVE_STUDENT_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for when saving student data is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function saveStudentRequestFailure(error) {
  return {
    type: Constants.SAVE_STUDENT_REQUEST_FAILURE,
    error,
  };
}

/**
 * Handles API Logic for initializing student form
 *
 * @param data
 * @returns {{type, studentObject: *}}
 */
export function initializeStudentFormRequest(data) {
  return {
    type: Constants.INITIALIZE_STUDENT_FORM_REQUEST,
    data,
  };
}

/**
 * Handles API logic for initializing student form success
 *
 * @returns {{type}}
 */
export function initializeStudentFormRequestSuccess() {
  return {
    type: Constants.INITIALIZE_STUDENT_FORM_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for initializing student form failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function initializeStudentFormRequestFailure(error) {
  return generalFailure({
    type: Constants.INITIALIZE_STUDENT_FORM_REQUEST_FAILURE,
    error,
  });
}
