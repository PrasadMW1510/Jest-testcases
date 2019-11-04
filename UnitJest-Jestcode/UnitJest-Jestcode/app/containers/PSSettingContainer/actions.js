/*
 *
 * PSSettingContainer actions
 *
 */

import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

/**
 * Handles API logic for PS test assignment data
 *
 * @returns {{type: string}}
 */
export function psGetDtmSubProductRequest() {
  return {
    type: Constants.PS_TEST_ASSIGNMENT_SUBPRODUCT_REQUEST,
  };
}

/**
 * Handles API logic for PS test assignment data are successful
 *
 * @param settings
 * @returns {{type: string, settings}}
 */
export function psGetDtmSubProductSuccess(settings = {}) {
  return {
    type: Constants.PS_TEST_ASSIGNMENT_SUBPRODUCT_SUCCESS,
    settings,
  };
}

/**
 * Handles API logic for PS test assignment data are a failure
 *
 * @param error
 * @returns {*}
 */
export function psGetDtmSubProductFailure(error) {
  return generalFailure({
    type: Constants.PS_TEST_ASSIGNMENT_SUBPRODUCT_FAILURE,
    error,
  });
}

/**
 * Handles API logic for PS test assignment data
 *
 * @returns {{type: string}}
 */
export function psGetDtmModulesRequest() {
  return {
    type: Constants.PS_TEST_ASSIGNMENT_MODULE_REQUEST,
  };
}

/**
 * Handles API logic for PS test assignment data are successful
 *
 * @param testAssignment
 * @returns {{type: string, settings}}
 */
export function psGetDtmModulesSuccess(testAssignment = {}) {
  return {
    type: Constants.PS_TEST_ASSIGNMENT_MODULE_SUCCESS,
    testAssignment,
  };
}

/**
 * Handles API logic for PS test assignment data are a failure
 *
 * @param error
 * @returns {*}
 */
export function psGetDtmModulesFailure(error) {
  return generalFailure({
    type: Constants.PS_TEST_ASSIGNMENT_MODULE_FAILURE,
    error,
  });
}

/**
 * Handles API logic for PS test assignment data
 *
 * @returns {{type: string}}
 */
export function psGetDtmTestsRequest() {
  return {
    type: Constants.PS_TEST_ASSIGNMENT_TEST_REQUEST,
  };
}

/**
 * Handles API logic for PS test assignment data are successful
 *
 * @param settings
 * @returns {{type: string, settings}}
 */
export function psGetDtmTestsSuccess(settings = {}) {
  return {
    type: Constants.PS_TEST_ASSIGNMENT_TEST_SUCCESS,
    settings,
  };
}

/**
 * Handles API logic for PS test assignment data are a failure
 *
 * @param error
 * @returns {*}
 */
export function psGetDtmTestsFailure(error) {
  return generalFailure({
    type: Constants.PS_TEST_ASSIGNMENT_TEST_FAILURE,
    error,
  });
}

export function psTestAssignmentRequest() {
  return {
    type: Constants.PS_TEST_ASSIGNMENT,
  };
}

/**
 * Handles API logic for PS settings data are successful
 *
 * @returns {{type: string, settings}}
 */
export function psTestAssignmentSuccess() {
  return {
    type: Constants.PS_TEST_ASSIGNMENT_SUCCESS,
  };
}

/**
 * Handles API logic for PS settings data are a failure
 *
 * @param error
 * @returns {*}
 */
export function psTestAssignmentFailure(error) {
  return generalFailure({
    type: Constants.PS_TEST_ASSIGNMENT_FAILURE,
    error,
  });
}

export function psSettingsContainerRequest() {
  return {
    type: Constants.PS_SETTINGS_CONTAINER,
  };
}

/**
 * Handles API logic for PS settings data are successful
 *
 * @param settings
 * @returns {{type: string, settings}}
 */
export function psSettingsContainerSuccess(settings = {}) {
  return {
    type: Constants.PS_SETTINGS_CONTAINER_SUCCESS,
    settings,
  };
}

/**
 * Handles API logic for PS settings data are a failure
 *
 * @param error
 * @returns {*}
 */
export function psSettingsContainerFailure(error) {
  return generalFailure({
    type: Constants.PS_SETTINGS_CONTAINER_FAILURE,
    error,
  });
}

/**
 * Handles API logic for saving PS settings data
 *
 * @param settingsData
 * @returns {{type: string, settingsData: *}}
 */
export function psSettingsSave(settingsData) {
  return {
    type: Constants.PS_SETTINGS_SAVE,
    settingsData,
  };
}

/**
 * Handles API logic for saving PI settings data is successful
 *
 * @returns {{type: string}}
 */
export function psSettingsSaveSuccess() {
  return {
    type: Constants.PS_SETTINGS_SAVE_SUCCESS,
  };
}

/**
 * Handles API logic for saving PI settings data are a failure
 *
 * @param error
 * @returns {*}
 */
export function psSettingsSaveFailure(error) {
  return generalFailure({
    type: Constants.PS_SETTINGS_SAVE_FAILURE,
    error,
  });
}
