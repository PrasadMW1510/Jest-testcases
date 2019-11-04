/*
 *
 * PrintQuizAndAnswerKeyContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  showError: false,
});

function printQuizAndAnswerKeyContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.PRINT_QUIZ_PREVIEW_FAILURE:
      return state.set('showError', true);
    case Constants.PRINT_QUIZ_AND_ANSWER_KEY:
      return state.set('showError', false);
    default:
      return state;
  }
}

export default printQuizAndAnswerKeyContainerReducer;
