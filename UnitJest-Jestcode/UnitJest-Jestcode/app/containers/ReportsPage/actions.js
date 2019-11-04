/*
 *
 * ReportsPage actions
 *
 */
import * as Constants from './constants';

/**
 * Get the report list
 *
 * @returns {{type}}
 */
export function reportListRequest() {
  return {
    type: Constants.REPORT_LIST_REQUEST,
  };
}
/**
 * Report list request has worked
 *
 * @returns {{type, list}}
 */
export function reportListRequestSuccess(list) {
  return {
    type: Constants.REPORT_LIST_SUCCESS,
    list,
  };
}
/**
 * Report list request has not worked
 *
 * @returns {{type, error}}
 */
export function reportListRequestFailure(error) {
  return {
    type: Constants.REPORT_LIST_FAILURE,
    error,
  };
}
