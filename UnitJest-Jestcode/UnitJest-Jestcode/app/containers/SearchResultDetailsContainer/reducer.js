/*
 *
 * SearchResultDetailsContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  searchResultDetailsData: [],
  detailsID: '',
  data: {},
  showTeacherMadeQuizError: false,
});

function searchResultDetailsContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_SEARCH_RESULT_DETAILS_DATA_REQUEST:
      return state.set('showTeacherMadeQuizError', false);
    case Constants.GET_SEARCH_RESULT_DETAILS_DATA_REQUEST_SUCCESS:
      if (
        action.searchDetails.output_data[0] &&
        action.searchDetails.output_data[0].GetBookInfoResp[0] &&
        action.searchDetails.output_data[0].GetBookInfoResp[0].BookInfo[0]
      ) {
        return state
          .set(
            'searchResultDetailsData',
            fromJS(action.searchDetails.output_data[0].GetBookInfoResp[0].BookInfo[0])
          )
          .set('detailsID', fromJS(action.detailsID));
      }
      return state;
    case Constants.GET_SEARCH_QUIZ_RESULT_DETAILS_DATA_REQUEST_SUCCESS:
      if (
        action.searchDetails.output_data[0] &&
        action.searchDetails.output_data[0].GetQuizWithQuestionsResp[0] &&
        action.searchDetails.output_data[0].GetQuizWithQuestionsResp[0].Book[0]
      )
        return state
          .set(
            'searchResultDetailsData',
            fromJS(action.searchDetails.output_data[0].GetQuizWithQuestionsResp[0].Book[0])
          )
          .set('detailsID', fromJS(action.detailsID));
      return state;
    case Constants.GET_SEARCH_RESULT_DETAILS_DATA_REQUEST__FAILURE:
      return state.set('searchResultDetailsData', fromJS([]));
    case Constants.SAVE_SEARCH_RESULT_DETAILS_DATA_REQUEST__FAILURE:
      return state.set('showTeacherMadeQuizError', true);
    case Constants.SAVE_SEARCH_RESULT_DETAILS_DATA_REQUEST_SUCCESS:
      return state.set(
        'searchResultDetailsData',
        fromJS(action.searchDetails.output_data[0].GetBookInfoResp[0].BookInfo[0])
      );
    default:
      return state;
  }
}

export default searchResultDetailsContainerReducer;
