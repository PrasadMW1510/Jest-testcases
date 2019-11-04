/*
 *
 * ActivateQuizContainer actions
 *
 */

import * as Constants from './constants';

export function activateQuizRequest(activateQuizPreviewData, searchOpts, searchDataChecked) {
  return {
    type: Constants.ACTIVATE_QUIZ_LIST,
    activateQuizPreviewData,
    searchOpts,
    searchDataChecked,
  };
}

export function getPostActivateRequestFailure(error) {
  return {
    type: Constants.ACTIVATE_QUIZ_LIST_FAILURE,
    error,
  };
}

export function defaultAction() {
  return {
    type: Constants.DEFAULT_ACTION,
  };
}

export function initialiseModalFlag() {
  return {
    type: Constants.INITIALIZE_MODAL_FLAG,
  };
}
