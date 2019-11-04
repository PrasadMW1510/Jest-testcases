/*
 *
 * SearchResultsContainer actions
 *
 */

import * as Constants from './constants';

export function getAllTeacherMadeQuizDataRequest(searchOpts) {
  return {
    type: Constants.GET_ALL_TEACHER_MADE_QUIZ_DATA_REQUEST,
    payload: searchOpts,
  };
}

export function getAllTeacherMadeQuizDataRequestSuccess(searchResults = []) {
  return {
    type: Constants.GET_ALL_TEACHER_MADE_QUIZ_DATA_REQUEST_SUCCESS,
    searchResults,
  };
}

export function getAllTeacherMadeQuizDataRequestFailure(error) {
  return {
    type: Constants.GET_ALL_TEACHER_MADE_QUIZ_DATA_REQUEST_FAILURE,
    error,
  };
}

export function getCollectionsNameRequest() {
  return {
    type: Constants.GET_COLLECTIONSNAME_REQUEST,
  };
}

export function getCollectionsNameRequestSuccess(collectionName = []) {
  return {
    type: Constants.GET_COLLECTIONSNAME_REQUEST_SUCCESS,
    collectionName,
  };
}

export function getCollectionsNameRequestFailure(error) {
  return {
    type: Constants.GET_COLLECTIONSNAME_REQUEST_FAILURE,
    error,
  };
}

export function getChangeCollectionResultsRequest(collectionOpts) {
  return {
    type: Constants.GET_CHANGE_COLLECTION_RESULTS_REQUEST,
    payload: collectionOpts,
  };
}

export function getChangeCollectionResultsRequestSuccess(searchResults = []) {
  return {
    type: Constants.GET_CHANGE_COLLECTION_RESULTS_REQUEST_SUCCESS,
    searchResults,
  };
}

export function getChangeCollectionResultsRequestFailure(error) {
  return {
    type: Constants.GET_CHANGE_COLLECTION_RESULTS_REQUEST_FAILURE,
    error,
  };
}

/**
 * Handles API Logic for deleting messages
 *
 * @param searchResultsIdsChecked
 * @returns {{type, searchResultsIdsChecked: *}}
 */
export function postSaveRequest(searchResultsIdsChecked) {
  return {
    type: Constants.POST_SAVE_REQUEST,
    searchResultsIdsChecked,
  };
}

/**
 * Handles API logic for when deleting messages are successful
 *
 * @returns {{type}}
 */
export function postSaveRequestSuccess() {
  return {
    type: Constants.POST_SAVE_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for when deleting messages are a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function postSaveRequestFailure(error) {
  return {
    type: Constants.POST_SAVE_REQUEST_FAILURE,
    error,
  };
}

export function makeSelectedbookresults(selectedrows, selectedIds) {
  return {
    type: Constants.BOOK_SELECTED_ROWS,
    selectedrows,
    selectedIds,
  };
}

export function clearSelectedCustomList() {
  return {
    type: Constants.DELETE_SELECTED_ROWS,
  };
}

/**
 * Handles API logic for when deleting messages are a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */

export function putAllTeacherMadeQuizDataRequest(searchOpts) {
  return {
    type: Constants.PUT_ALL_TEACHER_MADE_QUIZ_DATA_REQUEST,
    searchOpts,
  };
}

/**
 * Clears Search Options
 *
 * @returns {{type,}}
 */
export function clearSearchOptions() {
  return {
    type: Constants.CLEAR_SEARCH_OPTIONS,
  };
}
