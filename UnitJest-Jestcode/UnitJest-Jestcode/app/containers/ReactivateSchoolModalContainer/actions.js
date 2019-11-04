/*
 *
 * ReactivateSchoolModalContainer actions
 *
 */
import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

/**
 * Handles API logic for reactivating school
 *
 * @param accountReactivatePayload
 * @returns {{type}}
 */
export function postReactivateSchoolRequest(accountReactivatePayload) {
  // payload contains (1)list of accts to delete, (2) searchOpts used to refresh
  return {
    type: Constants.POST_REACTIVATE_SCHOOL_REQUEST,
    payload: accountReactivatePayload,
  };
}

/**
 * Handles API logic for reactivating school is a success
 *
 *  @returns {{type}}
 */
export function postReactivateSchoolRequestSuccess() {
  return {
    type: Constants.POST_REACTIVATE_SCHOOL_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for when reactivating school is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function postReactivateSchoolRequestFailure(error) {
  return generalFailure({
    type: Constants.POST_REACTIVATE_SCHOOL_REQUEST_FAILURE,
    error,
  });
}
