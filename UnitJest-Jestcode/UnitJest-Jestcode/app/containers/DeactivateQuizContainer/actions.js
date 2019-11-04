/*
 *
 * DeactivateQuizContainer actions
 *
 */

import * as Constants from './constants';

export function deactivateQuizRequest(tableData, searchOpts) {
  return {
    type: Constants.DEACTIVATE_QUIZ_LIST,
    tableData,
    searchOpts,
  };
}

export function getPostDeactivateRequestFailure(error) {
  return {
    type: Constants.DEACTIVATE_QUIZ_LIST_FAILURE,
    error,
  };
}

export function defaultAction() {
  return {
    type: Constants.DEFAULT_ACTION,
  };
}
