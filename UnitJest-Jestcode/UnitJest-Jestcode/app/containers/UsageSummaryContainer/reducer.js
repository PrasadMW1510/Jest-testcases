/**
 * UsageSummary reducer
 */

import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  loading: false,
  usageSummary: [],
});

function usageSummaryReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.USAGE_SUMMARY_REQUEST:
      return state.set('loading', true);
    case Constants.USAGE_SUMMARY_REQUEST_SUCCESS:
      return state.set('usageSummary', fromJS(action.usageSummary)).set('loading', false);
    case Constants.USAGE_SUMMARY_REQUEST_FAILURE:
      return state.set('error', action.error);
    case LOCATION_CHANGE:
      return action.payload.pathname === '/' ? initialState : state;
    default:
      return state;
  }
}

export default usageSummaryReducer;
