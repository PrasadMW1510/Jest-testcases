/*
 *
 * Manage Inactive Accounts actions
 *
 */

import * as Constants from 'components/ManageInactiveAccounts/constants';

/**
 * Dispatched when the "Manage Inactive Accounts" page is loaded
 * and whenever the user makes a selection in the cohort
 * selection dropdown.
 */
export function getInactiveCohortMembersRequest(payload) {
  return {
    payload,
    type: Constants.GET_INACTIVE_COHORT_MEMBERS_REQUEST,
  };
}

/**
 * Dispatched when the retrieval of all inactive cohort members
 * is complete (and successful).
 */
export function getInactiveCohortMembersRequestSuccess(inactiveMembersResponse) {
  return {
    inactiveMembersResponse,
    type: Constants.GET_INACTIVE_COHORT_MEMBERS_REQUEST_SUCCESS,
  };
}

/**
 * Dispatched when the retrieval of all inactive cohort members
 * fails for any reason.
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function getInactiveCohortMembersRequestFailure(error) {
  return {
    type: Constants.GET_INACTIVE_COHORT_MEMBERS_REQUEST_FAILURE,
    error,
  };
}
