/*
 *
 * EditAdminContainer actions
 *
 */

import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

/**
 * Handles API logic for making calls needed for
 * edit admin modal
 *
 * @returns {{type}}
 */
export function editAdminContainerRequest() {
  return {
    type: Constants.EDIT_ADMIN_CONTAINER_REQUEST,
  };
}

/**
 * Handles API logic for making calls needed for
 * edit admin modal are successful
 *
 * @returns {{type}}
 */
export function editAdminContainerRequestSuccess() {
  return {
    type: Constants.EDIT_ADMIN_CONTAINER_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for making calls needed for
 * edit admin modal are a failure
 *
 * @param error
 * @returns {*}
 */
export function editAdminContainerRequestFailure(error) {
  return generalFailure({
    type: Constants.EDIT_ADMIN_CONTAINER_REQUEST_FAILURE,
    error,
  });
}

/**
 * handles API logic for adding profile data
 *
 * @param profileData
 * @param permissionIds
 * @returns {{type, profileData, permissionIds}}
 */
export function postAddAdminRequest(profileData, permissionIds) {
  return {
    type: Constants.POST_ADD_ADMIN_REQUEST,
    profileData,
    permissionIds,
  };
}

/**
 * handles API logic for adding profile data are successful
 *
 * @returns {{type}}
 */
export function postAddAdminRequestSuccess() {
  return {
    type: Constants.POST_ADD_ADMIN_REQUEST_SUCCESS,
  };
}

/**
 * handles API logic for adding profile data are a failure
 *
 * @returns {{type}}
 */
export function postAddAdminRequestFailure() {
  return {
    type: Constants.POST_ADD_ADMIN_REQUEST_FAILURE,
  };
}

/**
 * handles API logic for updating profile data
 *
 * @param profileData
 * @param permissionIds
 * @param editingSameAccount
 * @returns {{type, profileData: {}}}
 */
export function postSaveAdminRequest(profileData = {}, permissionIds, editingSameAccount = true) {
  return {
    type: Constants.POST_SAVE_ADMIN_REQUEST,
    profileData,
    permissionIds,
    editingSameAccount,
  };
}

/**
 * handles API logic for updating profile data are successful
 *
 * @returns {{type}}
 */
export function postSaveAdminRequestSuccess() {
  return {
    type: Constants.POST_SAVE_ADMIN_REQUEST_SUCCESS,
  };
}

/**
 * handles API logic for updating profile data are a failure
 *
 * @returns {{type}}
 */
export function postSaveAdminRequestFailure() {
  return {
    type: Constants.POST_SAVE_ADMIN_REQUEST_FAILURE,
  };
}
