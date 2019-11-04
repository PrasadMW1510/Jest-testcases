/*
 *
 * ExportTeacherMadeQuizzesContainer actions
 *
 */

import * as Constants from './constants';

export function exportTeacherMadeQuizRequest(quizData) {
  return {
    type: Constants.EXPORT_TEACHER_MADE_QUIZZES_LIST,
    quizData,
  };
}
export function postExportTeacherMadeQuizRequestSuccess() {
  return {
    type: Constants.EXPORT_TEACHER_MADE_QUIZZES_LIST_SUCCESS,
  };
}

export function postExportTeacherMadeQuizRequestFailure() {
  return {
    type: Constants.EXPORT_TEACHER_MADE_QUIZZES_LIST_FAILURE,
  };
}
export function defaultAction() {
  return {
    type: Constants.DEFAULT_ACTION,
  };
}
