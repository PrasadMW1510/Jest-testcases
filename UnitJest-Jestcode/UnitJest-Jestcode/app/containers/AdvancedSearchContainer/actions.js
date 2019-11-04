/*
 *
 * AdvancedSearchContainer actions
 *
 */

import * as Constants from './constants';

export function getAwardsDataRequest() {
  return {
    type: Constants.GET_AWARDS_REQUEST,
  };
}

export function getAwardsRequestSuccess(awards = []) {
  return {
    type: Constants.GET_AWARDS_REQUEST_SUCCESS,
    awards,
  };
}

export function getComskillDataRequest() {
  return {
    type: Constants.GET_COMSKILL_REQUEST,
  };
}

export function getComskillRequestSuccess(comskill = []) {
  return {
    type: Constants.GET_COMSKILL_REQUEST_SUCCESS,
    comskill,
  };
}

export function getCultureDataRequest() {
  return {
    type: Constants.GET_CULTURE_REQUEST,
  };
}

export function getCultureRequestSuccess(culture = []) {
  return {
    type: Constants.GET_CULTURE_REQUEST_SUCCESS,
    culture,
  };
}

export function getGenreDataRequest() {
  return {
    type: Constants.GET_GENRE_REQUEST,
  };
}

export function getGenreRequestSuccess(genre = []) {
  return {
    type: Constants.GET_GENRE_REQUEST_SUCCESS,
    genre,
  };
}

export function getInterestLevelDataRequest() {
  return {
    type: Constants.GET_INTERESTLEVEL_REQUEST,
  };
}

export function getInterestLevelRequestSuccess(interestLevel = []) {
  return {
    type: Constants.GET_INTERESTLEVEL_REQUEST_SUCCESS,
    interestLevel,
  };
}

export function getProgramSeriesDataRequest() {
  return {
    type: Constants.GET_PROGRAM_SERIES_REQUEST,
  };
}

export function getProgramSeriesRequestSuccess(programSeries = []) {
  return {
    type: Constants.GET_PROGRAM_SERIES_REQUEST_SUCCESS,
    programSeries,
  };
}

export function getTopicsDataRequest() {
  return {
    type: Constants.GET_TOPICS_REQUEST,
  };
}

export function getTopicsRequestSuccess(topics = []) {
  return {
    type: Constants.GET_TOPICS_REQUEST_SUCCESS,
    topics,
  };
}

export function getThemesDataRequest() {
  return {
    type: Constants.GET_THEMES_REQUEST,
  };
}

export function getThemesRequestSuccess(themes = []) {
  return {
    type: Constants.GET_THEMES_REQUEST_SUCCESS,
    themes,
  };
}

export function getAwardsRequestFailure(error) {
  return {
    type: Constants.GET_AWARDS_REQUEST_FAILURE,
    error,
  };
}

export function getComskillRequestFailure(error) {
  return {
    type: Constants.GET_COMSKILL_REQUEST_FAILURE,
    error,
  };
}

export function getCultureRequestFailure(error) {
  return {
    type: Constants.GET_CULTURE_REQUEST_FAILURE,
    error,
  };
}

export function getGenreRequestFailure(error) {
  return {
    type: Constants.GET_GENRE_REQUEST_FAILURE,
    error,
  };
}

export function getInterestLevelRequestFailure(error) {
  return {
    type: Constants.GET_INTERESTLEVEL_REQUEST_FAILURE,
    error,
  };
}

export function getProgramSeriesRequestFailure(error) {
  return {
    type: Constants.GET_PROGRAMSERIES_REQUEST_FAILURE,
    error,
  };
}

export function getTopicsDataRequestFailure(error) {
  return {
    type: Constants.GET_TOPICSDATA_REQUEST_FAILURE,
    error,
  };
}

export function getThemesRequestFailure(error) {
  return {
    type: Constants.GET_THEMES_REQUEST_FAILURE,
    error,
  };
}

export function getInstalledQuizCountDataRequest() {
  return {
    type: Constants.GET_INSTALLEDQUIZCOUNT_REQUEST,
  };
}

export function getInstalledQuizCountRequestSuccess(installedQuizCount = []) {
  return {
    type: Constants.GET_INSTALLEDQUIZCOUNT_REQUEST_SUCCESS,
    installedQuizCount,
  };
}

export function getInstalledQuizCountRequestFailure(error) {
  return {
    type: Constants.GET_INSTALLEDQUIZCOUNT_REQUEST_FAILURE,
    error,
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
export function getBookResult(resultValue = '0') {
  return {
    type: Constants.BOOK_RESULT,
    resultValue,
  };
}

export function getBookSearchFilters(searchfilters = {}) {
  return {
    type: Constants.BOOK_SEARCH_FILTERS,
    searchfilters,
  };
}
