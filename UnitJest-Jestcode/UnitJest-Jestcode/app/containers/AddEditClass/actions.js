/*
 *
 * AddEditClass actions
 *
 */

import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

/**
 * Handles API Logic for saving class data
 *
 * @param classObject
 * @returns {{type, classObject: *}}
 */
export function saveClassRequest(classObject, data = {}) {
  return {
    type: Constants.SAVE_CLASS_REQUEST,
    classObject,
    isEdit: !!data.edit,
  };
}

/**
 * Handles API logic for when saving class data is successful
 *
 * @returns {{type}}
 */
export function saveClassRequestSuccess() {
  return {
    type: Constants.SAVE_CLASS_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for when saving class data is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function saveClassRequestFailure(error) {
  return {
    type: Constants.SAVE_CLASS_REQUEST_FAILURE,
    error,
  };
}

/**
 * Handles API Logic for saving class data
 *
 * @param classObject
 * @returns {{type, classObject: *}}
 */
export function saveClassMIARequest(classObject, data = {}) {
  return {
    type: Constants.SAVE_CLASS_MIA_REQUEST,
    classObject,
    isEdit: !!data.edit,
    editClassId: data.editClassId,
    schoolIdForClass: data.schoolIdForClass,
    searchOpts: data.searchOpts,
  };
}

/**
 * Handles API logic for when saving class data is successful
 *
 * @returns {{type}}
 */
export function saveClassMIARequestSuccess() {
  return {
    type: Constants.SAVE_CLASS_MIA_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for when saving class data is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function saveClassMIARequestFailure(error) {
  return {
    type: Constants.SAVE_CLASS_MIA_REQUEST_FAILURE,
    error,
  };
}

/**
 * Handles API Logic for initializing class form
 *
 * @param id
 * @returns {{type, classObject: *}}
 */
export function initializeClassFormRequest(data) {
  return {
    type: Constants.INITIALIZE_CLASS_FORM_REQUEST,
    data,
  };
}

/**
 * Handles API logic for initializing class form success
 *
 * @returns {{type}}
 */
export function initializeClassFormRequestSuccess() {
  return {
    type: Constants.INITIALIZE_CLASS_FORM_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for initializing class form failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function initializeClassFormRequestFailure(error) {
  return generalFailure({
    type: Constants.INITIALIZE_CLASS_FORM_REQUEST_FAILURE,
    error,
  });
}
