/*
 *
 * Read180NgContainer reducer
 *
 */

import { fromJS } from 'immutable';

import * as Constants from './constants';

const initialState = fromJS({
  read180Program: {
    loading: false,
    results: [],
    itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
    paginationData: {},
  },
  read180PostProgram: {
    loading: false,
    results: [],
    itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
    paginationData: {},
  },
});

function read180NgContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.READ_180_NG_DATA_REQUEST_SUCCESS:
      return state
        .setIn(['read180Program', 'loading'], false)
        .setIn(['read180Program', 'itemCount'], fromJS(action.resultsData.item_count[0]))
        .setIn(['read180Program', 'results'], fromJS(action.resultsData.output_data[0]))
        .setIn(['read180Program', 'paginationData'], fromJS(action.resultsData.pagination_data[0]));
    case Constants.SET_180_NG_DATA_REQUEST_SUCCESS:
      return state
        .setIn(['read180PostProgram', 'loading'], false)
        .setIn(['read180PostProgram', 'itemCount'], fromJS(action.resultsData.item_count[0]))
        .setIn(['read180PostProgram', 'results'], fromJS(action.resultsData.output_data[0]))
        .setIn(
          ['read180PostProgram', 'paginationData'],
          fromJS(action.resultsData.pagination_data[0])
        );
    case Constants.DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default read180NgContainerReducer;
