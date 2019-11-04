/*
 *
 * SRCGradingToolsContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  loading: false,
  srcGradingToolsPointsData: {},
  srcGradingToolsScoresData: [],
  srcQuizSearchResults: [],
  itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
  paginationData: {},
});

function srcGradingToolsContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.SRC_GRADING_TOOLS_REQUEST:
      return state
        .set('loading', true)
        .set('srcGradingToolsPointsData', fromJS({}))
        .set('srcGradingToolsScoresData', fromJS([]));

    case Constants.SRC_GRADING_TOOLS_REQUEST_SUCCESS:
      return state
        .set('loading', false)
        .set('srcGradingToolsPointsData', fromJS(action.srcGradingToolsPoints))
        .set('srcGradingToolsScoresData', fromJS(action.srcGradingToolsScores));

    case Constants.SRC_PROGRAM_SETTINGS_REQUEST_FAILURE:
      return state.set('error', action.error);

    case Constants.SRC_QUIZZES_FOR_TEACHER_REQUEST:
      return state.set('loading', true).set('srcQuizSearchResults', fromJS([]));

    case Constants.SRC_QUIZZES_FOR_TEACHER_REQUEST_SUCCESS:
      return state
        .set('loading', false)
        .set('srcQuizSearchResults', fromJS(action.srcQuizSearchResults))
        .set('paginationData', fromJS(action.paginationData))
        .set('itemCount', fromJS(action.itemCount));

    case Constants.SRC_QUIZZES_FOR_TEACHER_REQUEST_FAILURE:
      return state.set('error', action.error);

    case Constants.SRC_CLEAR_SEARCHED_QUIZZES:
      return state
        .set('srcQuizSearchResults', fromJS([]))
        .set('paginationData', fromJS({}))
        .set('itemCount', fromJS(Constants.UNINITIALIZED_ITEM_COUNT));

    case Constants.SRC_SAVE_REMOVED_QUIZZES_REQUEST:
      return state.set('loading', true);

    case Constants.SRC_SAVE_REMOVED_QUIZZES_FAILURE:
      return state.set('error', action.error);

    default:
      return state;
  }
}

export default srcGradingToolsContainerReducer;
