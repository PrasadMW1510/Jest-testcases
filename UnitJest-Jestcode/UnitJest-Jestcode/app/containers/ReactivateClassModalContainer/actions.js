/*
 *
 * ReactivateClassModalContainer actions
 *
 */
import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

/**
 * Handles API logic for reactivating class
 *
 * @param accountReactivatePayload
 * @returns {{type}}
 */
export function postReactivateClassRequest(accountReactivatePayload) {
  // payload contains (1)list of accts to delete, (2) searchOpts used to refresh
  return {
    type: Constants.POST_REACTIVATE_CLASS_REQUEST,
    payload: accountReactivatePayload,
  };
}

/**
 * Handles API logic for reactivating class is a success
 *
 *  @returns {{type}}
 */
export function postReactivateClassRequestSuccess() {
  return {
    type: Constants.POST_REACTIVATE_CLASS_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for when reactivating class is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function postReactivateClassRequestFailure(error) {
  return generalFailure({
    type: Constants.POST_REACTIVATE_CLASS_REQUEST_FAILURE,
    error,
  });
}
