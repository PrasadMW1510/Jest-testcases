/*
 *
 * ProgramSettingsContainer actions
 *
 */
import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

/**
 * Handles API logic for getting enrollment list
 *
 * @returns {{type}}
 */
export function programSettingsEnrollmentList() {
  return {
    type: Constants.PROGRAM_SETTINGS_ENROLLMENT_LIST,
  };
}

/**
 * Handles API logic for getting enrollment list are successful
 *
 * @param enrollmentList
 * @returns {{type, enrollmentList: Array}}
 */
export function programSettingsEnrollmentListSuccess(enrollmentList = []) {
  return {
    type: Constants.PROGRAM_SETTINGS_ENROLLMENT_LIST_SUCCESS,
    enrollmentList,
  };
}

/**
 * Handles API logic for getting enrollment list are a failure
 *
 * @param error
 * @returns {*}
 */
export function programSettingsEnrollmentListFailure(error) {
  return generalFailure({
    type: Constants.PROGRAM_SETTINGS_ENROLLMENT_LIST_FAILURE,
    error,
  });
}
