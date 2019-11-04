/*
 *
 * EditQuizCollectionNamesContainer actions
 *
 */

import * as Constants from './constants';

export function initialRequest() {
  return {
    type: Constants.INITIAL_REQUEST,
  };
}
export function getEditQuizCollectionNamesDataRequest() {
  return {
    type: Constants.GET_EDITQUIZCOLLECTIONNAMESDATA_REQUEST,
  };
}

export function initializeQuizNameRequest() {
  return {
    type: Constants.GET_EDIT_QUIZ_NAMES_DATA_REQUEST,
  };
}

export function getEditQuizCollectionNamesDataRequestSuccess(editQuizCollectionNamesData = []) {
  return {
    type: Constants.GET_EDITQUIZCOLLECTIONNAMESDATA_REQUEST_SUCCESS,
    editQuizCollectionNamesData,
  };
}

export function getEditQuizCollectionNamesDataRequestFailure(error) {
  return {
    type: Constants.GET_EDITQUIZCOLLECTIONNAMESDATA_REQUEST_FAILURE,
    error,
  };
}

export function postEditQuizCollectionNamesRequest(nameObject) {
  return {
    type: Constants.POST_EDIT_QUIZ_COLLECTION_NAMES_DATA_REQUEST,
    nameObject,
  };
}

/**
 * Handles API logic for initializing class form success
 *
 * @returns {{type}}
 */
export function initializeClassFormResponseSuccess() {
  return {
    type: Constants.INITIALIZE_CLASS_FORM_RESPONSE_SUCCESS,
  };
}

/**
 * Handles API logic for initializing class form success
 *
 * @returns {{type}}
 */
export function saveEditQuizCollectionNamesFailure() {
  return {
    type: Constants.SAVE_EDIT_QUIZ_COLLECTION_NAMES_FAILURE,
  };
}
