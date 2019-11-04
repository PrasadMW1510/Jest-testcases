/*
 *
 * PrintCustomQuizList actions
 *
 */

import * as Constants from './constants';

export function printBookLabelRequest(bookLabelPreviewData, bookId) {
  return {
    type: Constants.PRINT_BOOK_LABEL,
    bookLabelPreviewData,
    bookId,
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
