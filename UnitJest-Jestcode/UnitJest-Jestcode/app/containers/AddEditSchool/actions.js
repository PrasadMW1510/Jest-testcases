/*
 *
 * AddSchoolContainer actions
 *
 */

import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

/**
 * Dispatched when the "Add a School" form is first opened
 * to retrieve whatever meta data is needed to populate it.
 */
export function getMetaDataRequest() {
  return {
    type: Constants.GET_META_DATA_REQUEST,
  };
}

/**
 * Dispatched when the retrieval of all meta data for the
 * "Add a School" form is complete (and successful).
 */
export function getMetaDataRequestSuccess() {
  return {
    type: Constants.GET_META_DATA_REQUEST_SUCCESS,
  };
}

/**
 * Dispatched when there's a failure during the retrieval
 * of meta data for the "Add a School" form.
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function getMetaDataRequestFailure(error) {
  return {
    type: Constants.GET_META_DATA_REQUEST_FAILURE,
    error,
  };
}

/**
 * Dispatched when the list of grades for the whole district is available.
 *
 * @param grades
 * @returns {{type, grades: *}}
 */
export function gradeListForDistrict(gradeList = []) {
  return {
    type: Constants.GRADE_LIST_FOR_DISTRICT,
    gradeList,
  };
}

/**
 * Handles API Logic for initializing school form
 *
 * @param id
 * @returns {{type, schoolObject: *}}
 */
export function initializeSchoolFormRequest(data) {
  return {
    type: Constants.INITIALIZE_SCHOOL_FORM_REQUEST,
    data,
  };
}

/**
 * Handles API logic for initializing school form success
 *
 * @returns {{type}}
 */
export function initializeSchoolFormRequestSuccess() {
  return {
    type: Constants.INITIALIZE_SCHOOL_FORM_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for initializing school form failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function initializeSchoolFormRequestFailure(error) {
  return generalFailure({
    type: Constants.INITIALIZE_SCHOOL_FORM_REQUEST_FAILURE,
    error,
  });
}

/**
 * Handles API logic for adding school
 *
 * @param schoolObject
 * @returns {{type, schoolObject: *}}
 */
export function saveSchoolRequest(schoolObject, data = {}) {
  return {
    type: Constants.SAVE_SCHOOL_REQUEST,
    schoolObject,
    isEdit: !!data.edit,
  };
}

/**
 * Handles API logic for adding MIA school
 *
 * @param schoolObject
 * @returns {{type, schoolObject: *}}
 */
export function saveSchoolMIARequest(schoolObject, data = {}) {
  return {
    type: Constants.SAVE_SCHOOL_MIA_REQUEST,
    schoolObject,
    isEdit: !!data.edit,
    editSchoolId: data.editSchoolId,
    searchOpts: data.searchOpts,
  };
}

/**
 * Handles API logic for when adding school is successful
 *
 * @returns {{type}}
 */
export function saveSchoolRequestSuccess() {
  return {
    type: Constants.SAVE_SCHOOL_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for when adding school is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function saveSchoolRequestFailure(error) {
  return {
    type: Constants.SAVE_SCHOOL_REQUEST_FAILURE,
    error,
  };
}
