/*
 *
 * TeacherMadeQuizContainer actions
 *
 */

import * as Constants from './constants';

export function getInstalledQuizDataRequest() {
  return {
    type: Constants.GET_INSTALLEDQUIZDATA_REQUEST,
  };
}

export function getInstalledQuizDataRequestSuccess(installedQuizData = []) {
  return {
    type: Constants.GET_INSTALLEDQUIZDATA_REQUEST_SUCCESS,
    installedQuizData,
  };
}

export function getInstalledQuizDataRequestFailure(error) {
  return {
    type: Constants.GET_INSTALLEDQUIZDATA_REQUEST_FAILURE,
    error,
  };
}

export function postTeacherMadeQuizRequest(quizObject) {
  return {
    type: Constants.POST_ADD_TEACHERMADEQUIZ_REQUEST,
    quizObject,
  };
}

export function postTeacherMadeQuizRequestSuccess() {
  return {
    type: Constants.POST_ADD_TEACHERMADEQUIZ_REQUEST_SUCCESS,
  };
}

export function postTeacherMadeQuizRequestFailure(error) {
  return {
    type: Constants.POST_ADD_TEACHERMADEQUIZ_REQUEST_FAILURE,
    error,
  };
}
export function getTeacherMadeQuizDetailsRequest(key) {
  return {
    type: Constants.GET_ADD_TEACHERMADEQUIZ_DETAILS_REQUEST,
    key,
  };
}

export function getInstalledQuizDetailDataRequestSuccess(quizQuestions = []) {
  return {
    type: Constants.GET_ADD_TEACHERMADEQUIZ_DETAILS_REQUEST_SUCCESS,
    quizQuestions,
  };
}
export function deleteQuiz(quizId) {
  return {
    type: Constants.DELETE_TEACHERMADEQUIZ_REQUEST,
    quizId,
  };
}

export function deleteTeacherMadeQuizRequestFailure(error) {
  return {
    type: Constants.DELETE_TEACHERMADEQUIZ_REQUEST_FAILURE,
    error,
  };
}

export function deleteTeacherMadeQuizRequestSuccess(delSuccess = []) {
  return {
    type: Constants.DELETE_TEACHERMADEQUIZ_REQUEST_SUCCESS,
    delSuccess,
  };
}

export function clearTeacherMadeOldQuestions(delSuccess = []) {
  return {
    type: Constants.DELETE_TEACHERMADEQUIZ_OLD_QUESTIONS,
    delSuccess,
  };
}
