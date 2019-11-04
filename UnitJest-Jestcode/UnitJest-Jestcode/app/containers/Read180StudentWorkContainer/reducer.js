/*
 *
 * Read180StudentWorkContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({});

function read180StudentWorkContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.READ_180_STUDENT_WORK_REQUEST_SUCCESS:
      return state
        .setIn(['read180Program', 'loading'], false)
        .setIn(['read180Program', 'itemCount'], fromJS(action.resultsData.item_count[0]))
        .setIn(['read180Program', 'results'], fromJS(action.resultsData.output_data[0]))
        .setIn(['read180Program', 'paginationData'], fromJS(action.resultsData.pagination_data[0]));
    case Constants.DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default read180StudentWorkContainerReducer;
