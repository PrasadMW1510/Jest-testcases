/*
 *
 * SRC GradingToolsContainer actions
 *
 */

import * as Constants from './constants';

/**
 * Get the Program Grading tool
 * @param programGradingTool
 * @returns {{type}}
 */
export function SRCGradingToolsRequest() {
  return {
    type: Constants.SRC_GRADING_TOOLS_REQUEST,
  };
}

/**
 * Dispatched when we get the Program Grading tool successfully
 * @param programGradingTool
 * @returns {{type, Student Grade Data: *}}
 */
export function SRCGradingToolsRequestSuccess(
  srcGradingToolsPoints = {},
  srcGradingToolsScores = {}
) {
  return {
    type: Constants.SRC_GRADING_TOOLS_REQUEST_SUCCESS,
    srcGradingToolsPoints,
    srcGradingToolsScores,
  };
}

/**
 * Dispatched when the Program Grading tool request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function SRCGradingToolsRequestFailure(error) {
  return {
    type: Constants.SRC_GRADING_TOOLS_REQUEST_FAILURE,
    error,
  };
}

//  ---------------------------

/**
 * Hit "Go" on the src grading tools screen"
 * @returns {{type}}
 */
export function SRCQuizzesForTeacherRequest(term, order, name, curPg) {
  return {
    type: Constants.SRC_QUIZZES_FOR_TEACHER_REQUEST,
    term,
    order,
    name,
    curPg,
  };
}

/**
 * Dispatched when we get the quiz results successfully
 * @param programGradingToolSearch
 * @returns {{type, Quiz Data: *}}
 */
export function SRCQuizzesForTeacherRequestSuccess(
  srcQuizSearchResults = [],
  paginationData = {},
  itemCount
) {
  return {
    type: Constants.SRC_QUIZZES_FOR_TEACHER_REQUEST_SUCCESS,
    srcQuizSearchResults,
    paginationData,
    itemCount,
  };
}

/**
 * Dispatched when the quiz results tool request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function SRCQuizzesForTeacherRequestFailure(error) {
  return {
    type: Constants.SRC_QUIZZES_FOR_TEACHER_REQUEST_FAILURE,
    error,
  };
}

// Clears the searchedQuizzesState when called

export function SRCClearSearchedQuizzes() {
  return {
    type: Constants.SRC_CLEAR_SEARCHED_QUIZZES,
  };
}

export function SRCSaveRemovedQuizzesRequest(quizInfo) {
  return {
    type: Constants.SRC_SAVE_REMOVED_QUIZZES_REQUEST,
    quizInfo,
  };
}

export function SRCSaveRemovedQuizzesRequestFailure(error) {
  return {
    type: Constants.SRC_SAVE_REMOVED_QUIZZES_FAILURE,
    error,
  };
}
