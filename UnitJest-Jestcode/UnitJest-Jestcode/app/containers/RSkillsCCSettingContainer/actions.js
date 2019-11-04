/*
 *
 * RSkillsCCSettingContainer actions
 *
 */

import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

export function rSkillsCCSettingsContainerLoading() {
  return {
    type: Constants.RSKILLSCC_SETTINGS_CONTAINER_LOADING,
  };
}

/**
 * Dispatched when the settings Save Request is made
 *
 * @param data
 * @returns {{type, data: *}}
 */
export function rSkillsCCSettingsSaveRequest(data) {
  return {
    type: Constants.RSKILLSCC_SETTINGS_SAVE_REQUEST,
    data,
  };
}

/**
 * Dispatched when the settings Save Request is made successfully
 *
 * @param results
 * @returns {{type: string, results}}
 */
export function rSkillsCCSettingsSaveRequestSuccess() {
  return {
    type: Constants.RSKILLSCC_SETTINGS_SAVE_REQUEST_SUCCESS,
  };
}

/**
 * Dispatched when the settings Save Request fails
 *
 * @param error
 * @returns {*}
 */
export function rSkillsCCSettingsSaveRequestFailure(error) {
  return generalFailure({
    type: Constants.RSKILLSCC_SETTINGS_SAVE_REQUEST_FAILURE,
    error,
  });
}

/**
 * Dispatched when the Program Settings and testAssignment request is made
 *
 * @returns {{type: string}}
 * @constructor
 */
export function rSkillsCCSettingsTestAssignmentRequest() {
  return {
    type: Constants.RSKILLSCC_SETTINGS_TEST_ASSIGNMENT_REQUEST,
  };
}

/**
 * Dispatched when we get the Program Settings and TestAssignment metadata successfully
 *
 * @param programSettings
 * @param testAssignmentMeta
 * @returns {{type: string, programSettings, testAssignmentMeta}}
 */
export function rSkillsCCSettingsTestAssignmentRequestSuccess(
  programSettings = {},
  testAssignmentMeta = {}
) {
  return {
    type: Constants.RSKILLSCC_SETTINGS_TEST_ASSIGNMENT_REQUEST_SUCCESS,
    programSettings,
    testAssignmentMeta,
  };
}

/**
 * Dispatched when the Program Settings and TestAssignment request fails
 *
 * @param error
 * @returns {*}
 * @constructor
 */
export function rSkillsCCSettingsTestAssignmentRequestFailure(error) {
  return generalFailure({
    type: Constants.RSKILLSCC_SETTINGS_TEST_ASSIGNMENT_REQUEST_FAILURE,
    error,
  });
}

/**
 * Dispatched when the testAssignment Save Request is made
 *
 * @param data
 * @returns {{type, data: *}}
 */
export function rSkillsCCTestAssignmentSaveRequest(data) {
  return {
    type: Constants.RSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST,
    data,
  };
}

/**
 * Dispatched when the testAssignment Save Request is made successfully
 *
 * @param results
 * @returns {{type: string, results}}
 */
export function rSkillsCCTestAssignmentSaveRequestSuccess(results = {}) {
  return {
    type: Constants.RSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST_SUCCESS,
    results,
  };
}

/**
 * Dispatched when the testAssignment Save Request fails
 *
 * @param error
 * @returns {*}
 */
export function rSkillsCCTestAssignmentSaveRequestFailure(error) {
  return generalFailure({
    type: Constants.RSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST_FAILURE,
    error,
  });
}

/**
 * Dispatched when the RSkillsCC default settings request is made
 *
 * @returns {{type}}
 */
export function rSkillsCCDefaultSettingsRequest() {
  return {
    type: Constants.RSKILLSCC_DEFAULT_SETTINGS_REQUEST,
  };
}

/**
 * Dispatched when the RSkillsCC default settings Request is made successfully
 *
 * @param results
 * @returns {{type: string, results}}
 */
export function rSkillsCCDefaultSettingsRequestSuccess(defaultProgramSettings = {}) {
  return {
    type: Constants.RSKILLSCC_DEFAULT_SETTINGS_REQUEST_SUCCESS,
    defaultProgramSettings,
  };
}

/**
 * Dispatched when the the RSkillsCC default settings Request fails
 *
 * @param error
 * @returns {*}
 */
export function rSkillsCCDefaultSettingsRequestFailure(error) {
  return generalFailure({
    type: Constants.RSKILLSCC_DEFAULT_SETTINGS_REQUEST_FAILURE,
    error,
  });
}
