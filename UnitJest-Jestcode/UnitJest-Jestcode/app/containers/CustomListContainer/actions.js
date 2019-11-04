/*
 *
 * CustomListContainer actions
 *
 */

import * as Constants from './constants';

export function exportCustomQuizRequest(quizListexportData = []) {
  return {
    type: Constants.EXPORT_CUSTOM_QUIZ_LIST,
    quizListexportData,
  };
}

export function getExportDataFailure(error) {
  return {
    type: Constants.FETECHING_EXPORT_DATA_FAILURE,
    error,
  };
}
