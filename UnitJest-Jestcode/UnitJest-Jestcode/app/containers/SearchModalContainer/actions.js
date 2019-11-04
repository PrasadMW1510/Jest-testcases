/*
 *
 * SearchModalContainer actions
 *
 */

import * as Constants from './constants';

export function resetSearchMetaData() {
  return {
    type: Constants.RESET_SEARCH_META_DATA_REQUEST,
  };
}

export function resetSearchResultsData() {
  return {
    type: Constants.RESET_SEARCH_RESULTS_REQUEST,
  };
}

/**
 * Handles API logic for getting Search Data
 *
 * @returns {{type}}
 */
export function getSearchMetaDataRequest() {
  return {
    type: Constants.GET_SEARCH_META_DATA_REQUEST,
  };
}

/**
 * Handles API logic for when getting search meta data are successful
 *
 */
export function getSearchMetaDataRequestSuccess() {
  return {
    type: Constants.GET_SEARCH_META_DATA_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for when getting search meta data is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function getSearchMetaDataRequestFailure(error) {
  return {
    type: Constants.GET_SEARCH_META_DATA_REQUEST_FAILURE,
    error,
  };
}

/**
 * Handles API logic for when getting schools for search are successful
 *
 * @param schoolsForSearch
 * @returns {{type, schoolsForSearch: Array}}
 */
export function getSchoolsForSearchRequestSuccess(schoolsForSearch = []) {
  return {
    type: Constants.GET_SCHOOLS_FOR_SEARCH_REQUEST_SUCCESS,
    schoolsForSearch,
  };
}

/**
 * Handles API logic for when getting schools for search is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function getSchoolsForSearchRequestFailure(error) {
  return {
    type: Constants.GET_SCHOOLS_FOR_SEARCH_REQUEST_FAILURE,
    error,
  };
}

/**
 * Handles API logic for when getting apps for search are successful
 *
 * @param appsForSearch
 * @returns {{type, appsForSearch: Array}}
 */
export function getAppsForSearchRequestSuccess(appsForSearch = []) {
  return {
    type: Constants.GET_APPS_FOR_SEARCH_REQUEST_SUCCESS,
    appsForSearch,
  };
}

/**
 * Handles API logic for when getting apps for search is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function getAppsForSearchRequestFailure(error) {
  return {
    type: Constants.GET_APPS_FOR_SEARCH_REQUEST_FAILURE,
    error,
  };
}

/**
 * Handles API logic for when getting classes for search are successful
 *
 * @param messages
 * @returns {{type, classesForSearch: Array}}
 */
export function getClassesForSearchRequestSuccess(classesForSearch = []) {
  return {
    type: Constants.GET_CLASSES_FOR_SEARCH_REQUEST_SUCCESS,
    classesForSearch,
  };
}

/**
 * Handles API logic for when getting classes for search is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function getClassesForSearchRequestFailure(error) {
  return {
    type: Constants.GET_CLASSES_FOR_SEARCH_REQUEST_FAILURE,
    error,
  };
}

/**
 * Handles API logic for when getting grades for search are successful
 *
 * @param gradesForSearch
 * @returns {{type, gradesForSearch: Array}}
 */
export function getGradesForSearchRequestSuccess(gradesForSearch = []) {
  return {
    type: Constants.GET_GRADES_FOR_SEARCH_REQUEST_SUCCESS,
    gradesForSearch,
  };
}

/**
 * Handles API logic for when getting grades for search is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function getGradesForSearchRequestFailure(error) {
  return {
    type: Constants.GET_GRADES_FOR_SEARCH_REQUEST_FAILURE,
    error,
  };
}

/**
 * Handles API logic for when getting teachers for search are successful
 *
 * @param teachersForSearch
 * @returns {{type, teachersForSearch: Array}}
 */
export function getTeachersForSearchRequestSuccess(teachersForSearch = []) {
  return {
    type: Constants.GET_TEACHERS_FOR_SEARCH_REQUEST_SUCCESS,
    teachersForSearch,
  };
}

/**
 * Handles API logic for when getting teachers for search is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function getTeachersForSearchRequestFailure(error) {
  return {
    type: Constants.GET_TEACHERS_FOR_SEARCH_REQUEST_FAILURE,
    error,
  };
}

/**
 * Handles API logic for getting Search results
 *
 * @returns {{type}}
 */
export function getSearchResultsRequest(searchOpts = {}) {
  return {
    type: Constants.GET_SEARCH_RESULTS_REQUEST,
    payload: searchOpts,
  };
}

/**
 * Handles API logic for when getting search results is a success
 *
 * @param searchResults
 * @returns {{type, searchResults: []}}
 */
export function getSearchResultsRequestSuccess(searchResults = []) {
  return {
    type: Constants.GET_SEARCH_RESULTS_REQUEST_SUCCESS,
    searchResults,
  };
}
/**
 * Handles API logic for when getting search results is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function getSearchResultsRequestFailure(error) {
  return {
    type: Constants.GET_SEARCH_RESULTS_REQUEST_FAILURE,
    error,
  };
}

export function resetForSearchByChange() {
  return {
    type: Constants.RESET_FOR_SEARCH_BY_CHANGE_REQUEST,
  };
}
