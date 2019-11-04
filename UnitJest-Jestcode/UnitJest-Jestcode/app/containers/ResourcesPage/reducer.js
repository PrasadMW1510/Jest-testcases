/*
 *
 * ResourcesProgram reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  output: {},
  buildInfo: {},
  errBuildInfo: false,
  modalQuickStatus: false,
  quickSearch: {},
  errQuickSearch: false,
});

function resourcesPageReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_PRODUCT_SEARCH_SUCCESS:
      return state.set('loaded', true).set('output', fromJS(action.output));
    case Constants.GET_PRODUCT_SEARCH_FAILURE:
      return state.set('error', action.error).set('loaded', false);
    case Constants.GET_BUILD_INFO_SUCCESS:
      return state.set('buildInfo', fromJS(action.buildInfo));
    case Constants.GET_BUILD_INFO_FAILURE:
      return state.set('errBuildInfo', action.errBuildInfo);
    case Constants.UPDATE_RESOURCES_QUICK_MODAL_STATUS:
      return state.set('modalQuickStatus', action.status);
    case Constants.POST_RESOURCES_QUICK_SEARCH_SUCCESS:
      return state.set('quickSearch', fromJS(action.resource));
    case Constants.POST_RESOURCES_QUICK_SEARCH_FAILURE:
      return state.set('errQuickSearch', action.errResources);
    default:
      return state;
  }
}

export default resourcesPageReducer;
