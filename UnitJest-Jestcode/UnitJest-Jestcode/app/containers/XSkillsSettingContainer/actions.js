/*
 *
 * XSkillsSettingContainer actions
 *
 */
import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

export function xSkillsSettingContainerRequest() {
  return {
    type: Constants.XSKILLS_SETTING_CONTAINER_REQUEST,
  };
}

/**
 *
 * Handles API logic for getting XSkills programSettings, testAssignmentMeta are successful
 *
 * @param programSettings, testAssignmentMeta
 * @returns {{type: *, programSetting: {}}}
 */
export function xSkillsSettingContainerRequestSuccess(
  programSettings = {},
  testAssignmentMeta = {}
) {
  return {
    type: Constants.XSKILLS_SETTING_CONTAINER_REQUEST_SUCCESS,
    programSettings,
    testAssignmentMeta,
  };
}

export function xSkillsSettingContainerRequestFailure(error) {
  return generalFailure({
    type: Constants.XSKILLS_SETTING_CONTAINER_REQUEST_FAILURE,
    error,
  });
}

// ############### TEST ASSIGNMENT CODE
export function xSkillsTestAssignmentRequest() {
  return {
    type: Constants.XSKILLS_TEST_ASSIGNMENT_REQUEST,
  };
}

/**
 *
 * Handles API logic for getting XSkills testAssignmentMeta is successful
 *
 * @param testAssignmentMeta
 * @returns {{type: *, testAssignmentMeta: {}}}
 */
export function xSkillsTestAssignmentRequestSuccess(testAssignmentMeta = {}) {
  return {
    type: Constants.XSKILLS_TEST_ASSIGNMENT_REQUEST_SUCCESS,
    testAssignmentMeta,
  };
}

export function xSkillsTestAssignmentRequestFailure(error) {
  return generalFailure({
    type: Constants.XSKILLS_TEST_ASSIGNMENT_REQUEST_FAILURE,
    error,
  });
}

export function xSkillsTestAssignmentLoading() {
  return {
    type: Constants.XSKILLS_TEST_ASSIGNMENT_LOADING,
  };
}

export function xSkillsTestAssignmentSaveRequest(data) {
  return {
    type: Constants.XSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST,
    data,
  };
}

export function xSkillsTestAssignmentSaveRequestSuccess(results = {}) {
  return {
    type: Constants.XSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST_SUCCESS,
    results,
  };
}

export function xSkillsTestAssignmentSaveRequestFailure(error) {
  return generalFailure({
    type: Constants.XSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST_FAILURE,
    error,
  });
}
// #### END ##### TEST ASSIGNMENT CODE  ##########

// ############### PROGRAM SETTINGS CODE  ########

export function xSkillsSettingsLoading() {
  return {
    type: Constants.XSKILLS_SETTINGS_LOADING,
  };
}

export function xSkillsSettingsRequest() {
  return {
    type: Constants.XSKILLS_SETTINGS_REQUEST,
  };
}

/**
 *
 * Handles API logic for getting XSkills Program Settings is successful
 *
 * @param settings
 * @returns {{type: *, settings: {}}}
 */
export function xSkillsSettingsRequestSuccess(settings = {}) {
  return {
    type: Constants.XSKILLS_SETTINGS_REQUEST_SUCCESS,
    settings,
  };
}

export function xSkillsSettingsRequestFailure(error) {
  return generalFailure({
    type: Constants.XSKILLS_SETTINGS_REQUEST_FAILURE,
    error,
  });
}

export function xSkillsSettingsSaveRequest(settings) {
  return {
    type: Constants.XSKILLS_SETTINGS_SAVE_REQUEST,
    settings,
  };
}

// ##### END ###### PROGRAM SETTINGS CODE  ########
