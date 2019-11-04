/*
 *
 * ExportTeacherMadeQuizzesContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  openSuccessModal: false,
});

function exportTeacherMadeQuizzesContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.EXPORT_TEACHER_MADE_QUIZZES_LIST_SUCCESS:
      return state.set('openSuccessModal', true);
    case Constants.EXPORT_TEACHER_MADE_QUIZZES_LIST:
      return state.set('openSuccessModal', false);
    default:
      return state;
  }
}

export default exportTeacherMadeQuizzesContainerReducer;
