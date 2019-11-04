/*
 *
 * BookQuizContainer actions
 *
 */

import * as Constants from './constants';

export function resetSearchResultsData() {
  return {
    type: Constants.RESET_SEARCH_RESULTS_REQUEST,
  };
}

/**
 * Handles API logic for getting Search results
 *
 * @returns {{type}}
 */
export function getSearchResultsRequest(searchOpts) {
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
export function getSearchResultsRequestSuccess(searchResults = [], searchOpts = {}) {
  return {
    type: Constants.GET_SEARCH_RESULTS_REQUEST_SUCCESS,
    searchResults,
    searchOpts,
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

/**
 * Sets the Search term key
 *
 * @param term
 * @returns {{type, term: *}}
 */
export function setSearchTerm(term) {
  return {
    type: Constants.SET_SEARCH_TERM,
    term,
  };
}

/**
 * Clears the Search term key
 *
 * @returns {{type,}}
 */
export function clearSearchTerm() {
  return {
    type: Constants.CLEAR_SEARCH_TERM,
  };
}
