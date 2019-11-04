/*
 *
 * ResourcesProgram actions
 *
 */

import * as Constants from './constants';

/**
 * Get the list of applications based on sessionID
 * @returns {{type}}
 */
export function getProductList() {
  return {
    type: Constants.GET_PRODUCT_SEARCH,
  };
}

/**
 * Dispatch the list of applications that are enabled for the sessionID
 * @param output
 * @returns {{type, output: *}}
 */
export function getProductListSuccess(output) {
  return {
    type: Constants.GET_PRODUCT_SEARCH_SUCCESS,
    output,
  };
}

/**
 * Dispatch get application failure
 * @param error
 * @returns {{type, error: *}}
 */
export function getProductListFailure(error) {
  return {
    type: Constants.GET_PRODUCT_SEARCH_FAILURE,
    error,
  };
}

/**
 * Handle Build Info
 * @returns {{type}}
 */
export function getBuildInfo() {
  return {
    type: Constants.GET_BUILD_INFO,
  };
}

/**
 * Dispatch the build information version number
 * @param buildInfo
 * @returns {{type, buildInfo: *}}
 */
export function getBuildInfoSuccess(buildInfo) {
  return {
    type: Constants.GET_BUILD_INFO_SUCCESS,
    buildInfo,
  };
}

/**
 * Dispatch build info version number failure
 * @param errBuildInfo
 * @returns {{type, errBuildInfo: *}}
 */
export function getBuildInfoFailure(errBuildInfo) {
  return {
    type: Constants.GET_BUILD_INFO_FAILURE,
    errBuildInfo,
  };
}

export function updateResourcesQuickModalStatus(status) {
  return {
    type: Constants.UPDATE_RESOURCES_QUICK_MODAL_STATUS,
    status,
  };
}

export function postResourcesQuickSearch(resource) {
  return {
    type: Constants.POST_RESOURCES_QUICK_SEARCH,
    resource,
  };
}

export function postResourcesQuickSearchSuccess(resource) {
  return {
    type: Constants.POST_RESOURCES_QUICK_SEARCH_SUCCESS,
    resource,
  };
}

export function postResourcesQuickSearchFailure(errResources) {
  return {
    type: Constants.POST_RESOURCES_QUICK_SEARCH_FAILURE,
    errResources,
  };
}
