/*
 *
 * ResourcesActivity actions
 *
 */

import * as Constants from './constants';

/**
 * Handle request based on the application Id provided
 * @param app
 * @returns {{type, app: *}}
 */
export function getAppBasedResource(app) {
  return {
    type: Constants.GET_APP_BASED_RESOURCE,
    app,
  };
}

/**
 * Dispatch Sam Resources for the application Id provided
 * @param resource
 * @returns {{type, resource: *}}
 */
export function getAppBasedResourceSuccess(resource) {
  return {
    type: Constants.GET_APP_BASED_RESOURCE_SUCCESS,
    resource,
  };
}

/**
 * Dispatch error Sam Resources fail
 * @param errResources
 * @returns {{type, errResources: *}}
 */
export function getAppBasedResourceFailure(errResources) {
  return {
    type: Constants.GET_APP_BASED_RESOURCE_FAILURE,
    errResources,
  };
}

/**
 * Handle request to get the list of application Id's that has the ITS enabled
 * @returns {{type}}
 */
export function getITSApps() {
  return {
    type: Constants.GET_ITS_APPS,
  };
}

/**
 * Dispatch List of ITS applications
 * @param its
 * @returns {{type, its: *}}
 */
export function getITSAppsSuccess(its) {
  return {
    type: Constants.GET_ITS_APPS_SUCCESS,
    its,
  };
}

/**
 * Dispatch error message with the ITS request fails
 * @param err
 * @returns {{type, err: *}}
 */
export function getITSAppsFailure(err) {
  return {
    type: Constants.GET_ITS_APPS_FAILURE,
    err,
  };
}

/**
 * Store the value of the App Id selected.
 * @param app
 * @returns {{type, app: *}}
 */
export function updateAppSelected(app) {
  return {
    type: Constants.UPDATE_RESOURCES_APP_ID_SELECTED,
    app,
  };
}

/**
 * Handle the request based on the Object ID selected in 'ResourcesBrowseTab', 'ResourcesAdvancedView' or 'ResourcesStandardsView'.
 * @param browse
 * @returns {{type, browse: *}}
 */
export function postResourcesBasedOnId(resource, activity) {
  return {
    type: Constants.POST_RESOURCE_TYPE,
    resource,
    activity,
  };
}

/**
 * Dispatch the response for the Object Id selected.
 * @param resourceModal
 * @returns {{type, resourceModal: *}}
 */
export function postResourcesBasedOnIdSuccess(resource) {
  return {
    type: Constants.POST_RESOURCE_TYPE_SUCCESS,
    resource,
  };
}

/**
 * Dispatch error message incase the postResourcesBasedOnIdSuccess fails.
 * @param errResourcesBased
 * @returns {{type, errResourcesBased: *}}
 */
export function postResourcesBasedOnIdFailure(errResourcesBased) {
  return {
    type: Constants.POST_RESOURCE_TYPE_FAILURE,
    errResourcesBased,
  };
}

export function updateResourcesSearchModalStatus(status) {
  return {
    type: Constants.UPDATE_RESOURCES_SEARCH_MODAL_STATUS,
    status,
  };
}
