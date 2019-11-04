/*
 *
 * AccountDeleteModalContainer actions
 *
 */
import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

/**
 * Handles API logic for account delete action
 *
 * @param accountDeletePayload
 * @returns {{type}}
 */
export function postAccountDeleteRequest(accountDeletePayload) {
  // payload contains (1)list of accts to delete, (2) searchOpts used to refresh
  return {
    type: Constants.POST_ACCOUNT_DELETE_REQUEST,
    payload: accountDeletePayload,
  };
}

/**
 * Handles API logic for account delete action
 *
 * @param accountDeletePayload
 * @returns {{type}}
 */
export function postAccountDeleteMIARequest(accountDeletePayload) {
  // payload contains (1)list of accts to delete, (2) searchOpts used to refresh
  return {
    type: Constants.POST_ACCOUNT_DELETE_MIA_REQUEST,
    payload: accountDeletePayload,
  };
}

/**
 * Handles API logic for account delete is a success
 *
 *  @returns {{type}}
 */
export function postAccountDeleteRequestSuccess() {
  return {
    type: Constants.POST_ACCOUNT_DELETE_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for when account delete is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function postAccountDeleteRequestFailure(error) {
  return generalFailure({
    type: Constants.POST_ACCOUNT_DELETE_REQUEST_FAILURE,
    error,
  });
}

/**
 * Handles API logic for account unenroll action
 *
 * @param accountUnenrollPayload
 * @returns {{type}}
 */
export function postAccountUnenrollRequest(accountUnenrollPayload) {
  // payload contains (1)list of accts to delete, (2) searchOpts used to refresh
  return {
    type: Constants.POST_ACCOUNT_UNENROLL_REQUEST,
    payload: accountUnenrollPayload,
  };
}

/**
 * Handles API logic for account unenroll is a success
 *
 *  @returns {{type}}
 */
export function postAccountUnenrollRequestSuccess() {
  return {
    type: Constants.POST_ACCOUNT_UNENROLL_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for when account unenroll is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function postAccountUnenrollRequestFailure(error) {
  return generalFailure({
    type: Constants.POST_ACCOUNT_UNENROLL_REQUEST_FAILURE,
    error,
  });
}
