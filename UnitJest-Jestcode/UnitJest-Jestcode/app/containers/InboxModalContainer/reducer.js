/*
 *
 * InboxModalContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  studentProgram: {
    loading: false,
    results: [],
    itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
    paginationData: {},
  },
  evaluationProgram: {
    loading: false,
    results: [],
    itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
    paginationData: {},
  },
  question: [],
  studentfailure: '',
});

function inboxModalContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_STUDENT_PROGRAM_DETAIL_REQUEST_SUCCESS:
      return state
        .setIn(['studentProgram', 'loading'], false)
        .setIn(['studentProgram', 'itemCount'], fromJS(action.resultsData.item_count[0]))
        .setIn(['studentProgram', 'results'], fromJS(action.resultsData.output_data[0]))
        .setIn(['studentProgram', 'paginationData'], fromJS(action.resultsData.pagination_data[0]));
    case Constants.GET_STUDENT_SKILL_ASSESTMENT_QUESTION_SUCCESS:
      return state.set('question', action.data);
    case Constants.SAVE_STUDENT_EVALUATION_DATA_SUCCESS:
      return state
        .setIn(['evaluationProgram', 'results'], fromJS(action.responseData.output_data[0]))
        .setIn(
          ['evaluationProgram', 'paginationData'],
          fromJS(action.responseData.pagination_data[0])
        )
        .setIn(['evaluationProgram', 'itemCount'], fromJS(action.responseData.item_count[0]));
    case Constants.GET_STUDENT_SKILL_ASSESTMENT_QUESTION_FAILURE:
      return state.setIn(['studentfailure', fromJS(action)]);
    case Constants.DEFAULT_ACTION:
      return state;

    default:
      return state;
  }
}

export default inboxModalContainerReducer;
