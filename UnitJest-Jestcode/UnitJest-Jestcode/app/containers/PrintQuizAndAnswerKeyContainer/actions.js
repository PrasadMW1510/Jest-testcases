/*
 *
 * PrintQuizAndAnswerKey actions
 *
 */

import * as Constants from './constants';

export function printQuizAndAnswerKeyRequest(data) {
  return {
    type: Constants.PRINT_QUIZ_AND_ANSWER_KEY,
    data,
  };
}

export function getPreviewDataFailure(err) {
  return {
    type: Constants.PRINT_QUIZ_PREVIEW_FAILURE,
    err,
  };
}
