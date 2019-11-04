/*
 *
 * BookQuizContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as AppConstants from 'containers/App/constants';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  searchResults: [],
  searchOpts: {},
  searchTerm: '',
});

function bookQuizContainerReducer(state = initialState, action) {
  const emptyString = '';

  switch (action.type) {
    case Constants.RESET_SEARCH_RESULTS_REQUEST:
      return initialState;
    case Constants.GET_SEARCH_RESULTS_REQUEST_SUCCESS:
      return state.set('searchResults', fromJS(action.searchResults.SrcSearchResp[0].Book));
    case Constants.SET_SEARCH_TERM:
      return state.set('searchTerm', action.term);
    case Constants.CLEAR_SEARCH_TERM:
      return state.set('searchTerm', emptyString);
    case AppConstants.LOGOUT_REQUEST_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default bookQuizContainerReducer;
