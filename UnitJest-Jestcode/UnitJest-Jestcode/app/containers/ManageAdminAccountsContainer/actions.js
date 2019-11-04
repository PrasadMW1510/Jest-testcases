/*
 *
 * ManageAdminAccountsContainer actions
 *
 */

import * as Constants from './constants';

export function getAdminRequest(userId) {
  return {
    type: Constants.GET_ADMIN_REQUEST,
    userId,
  };
}

/**
 * Handles API logic for getting Admin data to edit
 *
 * @param admin
 * @returns {{type, admins: Array}}
 */
export function getAdminRequestSuccess(admin) {
  return {
    type: Constants.GET_ADMIN_REQUEST_SUCCESS,
    admin,
  };
}

/**
 * Handles API logic for when getting admin data to edit is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function getAdminRequestFailure(error) {
  return {
    type: Constants.GET_ADMIN_REQUEST_FAILURE,
    error,
  };
}

export function getAdminsRequest() {
  return {
    type: Constants.GET_ADMINS_REQUEST,
  };
}

/**
 * Handles API logic for when getting admins is successful
 *
 * @param admins
 * @returns {{type, admins: Array}}
 */
export function getAdminsRequestSuccess(admins = []) {
  return {
    type: Constants.GET_ADMINS_REQUEST_SUCCESS,
    admins,
  };
}

/**
 * Handles API logic for when getting admins is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function getAdminsRequestFailure(error) {
  return {
    type: Constants.GET_ADMINS_REQUEST_FAILURE,
    error,
  };
}

/**
 * reset Admin list
 *
 *
 */
export function resetAdminsList() {
  return {
    type: Constants.RESET_ADMINS_LIST,
  };
}
