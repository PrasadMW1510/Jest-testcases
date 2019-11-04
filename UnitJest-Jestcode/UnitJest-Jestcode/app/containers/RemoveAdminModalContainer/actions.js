/*
 *
 * RemoveAdminModalContainer actions
 *
 */

import * as Constants from './constants';

export function disableAdminRequest(adminId) {
  return {
    type: Constants.DISABLE_ADMIN_REQUEST,
    adminId,
  };
}

export function disableAdminRequestSuccess() {
  return {
    type: Constants.DISABLE_ADMIN_REQUEST_SUCCESS,
  };
}

export function disableAdminRequestFailure(error) {
  return {
    type: Constants.DISABLE_ADMIN_REQUEST_FAILURE,
    error,
  };
}
