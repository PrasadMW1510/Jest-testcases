/*
 *
 * ReportsPage reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  reports: [],
  loading: true,
  error: null,
});

function reportsPageReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.REPORT_LIST_SUCCESS:
      return state.set('loading', false).set('reports', fromJS(action.list));
    case Constants.REPORT_LIST_FAILURE:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default reportsPageReducer;
