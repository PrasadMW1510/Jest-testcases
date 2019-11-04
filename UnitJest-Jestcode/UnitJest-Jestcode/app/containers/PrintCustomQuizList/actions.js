/*
 *
 * PrintCustomQuizList actions
 *
 */

import * as Constants from './constants';

export function printCustomQuizRequest(quizListPreviewData, quizId) {
  return {
    type: Constants.PRINT_CUSTOM_QUIZ_LIST,
    quizListPreviewData,
    quizId,
  };
}

export function getPreviewDataFailure(error) {
  return {
    type: Constants.FETECHING_PREVIEW_DATA_FAILURE,
    error,
  };
}

export function defaultAction() {
  return {
    type: Constants.DEFAULT_ACTION,
  };
}
