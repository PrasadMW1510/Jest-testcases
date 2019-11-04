/*
 *
 * ResourcesActivity reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  SamResourcesError: false,
  SamResources: {},
  ITSAppsError: false,
  ITSApps: {},
  AppId: '',
  resourcesObject: {},
  resourcesObjectFalse: false,
  modalSearchStatus: false,
});

function samResourceReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_APP_BASED_RESOURCE_SUCCESS:
      return state.set('SamResources', fromJS(action.resource));
    case Constants.GET_APP_BASED_RESOURCE_FAILURE:
      return state.set('SamResourcesError', action.error);
    case Constants.GET_ITS_APPS_SUCCESS:
      return state.set('ITSApps', fromJS(action.its));
    case Constants.GET_ITS_APPS_FAILURE:
      return state.set('ITSAppsError', action.error);
    case Constants.UPDATE_RESOURCES_APP_ID_SELECTED:
      return state.set('AppId', action.app);
    case Constants.POST_RESOURCE_TYPE_SUCCESS:
      return state.set('resourcesObject', fromJS(action.resource));
    case Constants.POST_RESOURCE_TYPE_FAILURE:
      return state.set('resourcesObjectFalse', action.errResourcesBased);
    case Constants.UPDATE_RESOURCES_SEARCH_MODAL_STATUS:
      return state.set('modalSearchStatus', action.status);
    default:
      return state;
  }
}

export default samResourceReducer;
