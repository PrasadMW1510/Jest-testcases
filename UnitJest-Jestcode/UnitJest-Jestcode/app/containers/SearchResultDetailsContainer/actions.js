/*
 *
 * SearchResultDetailsContainer actions
 *
 */

import * as Constants from './constants';

export function getSearchResultDetailsDataRequest(bookId, flag) {
  const data = { id: bookId, teacherMadeQuiz: flag };
  return {
    type: Constants.GET_SEARCH_RESULT_DETAILS_DATA_REQUEST,
    data,
  };
}
export function getSearchResultDetailsSuccess(searchDetails = [], detailsID = {}) {
  return {
    type: Constants.GET_SEARCH_RESULT_DETAILS_DATA_REQUEST_SUCCESS,
    searchDetails,
    detailsID,
  };
}

export function getSearchQuizResultsSuccess(searchDetails = [], detailsID = {}) {
  return {
    type: Constants.GET_SEARCH_QUIZ_RESULT_DETAILS_DATA_REQUEST_SUCCESS,
    searchDetails,
    detailsID,
  };
}

export function getSearchResultDetailsFailure() {
  return {
    type: Constants.GET_SEARCH_RESULT_DETAILS_DATA_REQUEST__FAILURE,
  };
}

export function saveSearchResultDetailsDataRequest(data, flag) {
  return {
    type: Constants.SAVE_SEARCH_RESULT_DETAILS_DATA_REQUEST,
    data,
    flag,
  };
}

export function saveTeacherMadeQuizDataRequest(data, flag) {
  return {
    type: Constants.SAVE_TEACHER_MADE_QUIZ_DATA,
    data,
    flag,
  };
}
export function saveSearchResultDetailsSuccess(searchDetails = []) {
  return {
    type: Constants.SAVE_SEARCH_RESULT_DETAILS_DATA_REQUEST_SUCCESS,
    searchDetails,
  };
}

export function saveSearchResultDetailsDataFailure() {
  return {
    type: Constants.SAVE_SEARCH_RESULT_DETAILS_DATA_REQUEST__FAILURE,
  };
}
