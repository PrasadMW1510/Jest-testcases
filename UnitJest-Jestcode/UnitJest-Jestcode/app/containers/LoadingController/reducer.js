/*
 *
 * LoadingController reducer
 *
 */

import { fromJS } from 'immutable';
import { SHOW_LOADING, HIDE_LOADING } from './constants';

const initialState = fromJS({
  loadingOpen: false,
});

function loadingControllerReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return state.set('loadingOpen', true);
    case HIDE_LOADING:
      return state.set('loadingOpen', false);
    default:
      return state;
  }
}

export default loadingControllerReducer;
