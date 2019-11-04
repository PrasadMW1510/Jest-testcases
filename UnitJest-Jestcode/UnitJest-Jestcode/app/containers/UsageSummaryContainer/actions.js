/*
 *
 * UsageSummary actions
 *
 */
import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';
/**
 * Get the usage summary
 *
 * @returns {{type}}
 */
export function usageSummaryRequest() {
  return {
    type: Constants.USAGE_SUMMARY_REQUEST,
  };
}

/**
 * Dispatched when we get the usage summary successfully
 * @param usageSummary
 * @returns {{type, usageSummary: *}}
 */
export function usageSummaryRequestSuccess(usageSummary = {}) {
  return {
    type: Constants.USAGE_SUMMARY_REQUEST_SUCCESS,
    usageSummary,
  };
}

/**
 * Dispatched when the usage summary request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function usageSummaryRequestFailure(error) {
  return generalFailure({
    type: Constants.USAGE_SUMMARY_REQUEST_FAILURE,
    error,
  });
}

/**
 * Get the usage summary
 *
 * @returns {{type}}
 */
export function schoolUsageSummaryRequest(schoolId) {
  return {
    type: Constants.USAGE_SUMMARY_SCHOOL_REQUEST,
    schoolId,
  };
}
