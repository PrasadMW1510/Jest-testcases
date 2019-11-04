/*
 *
 * R180NGSettingContainer actions
 *
 */

import * as Constants from './constants';

/**
 * Get the Program Settings
 * @param programSetting
 * @returns {{type}}
 */
export function R180NGProgramSettingsRequest() {
  return {
    type: Constants.R180NG_PROGRAM_SETTINGS_REQUEST,
  };
}

/**
 * Dispatched when we get the Program Settings successfully
 * @param programSetting
 * @returns {{type, programSetting: *}}
 */
export function R180NGProgramSettingsRequestSuccess(programSetting = {}) {
  return {
    type: Constants.R180NG_PROGRAM_SETTINGS_REQUEST_SUCCESS,
    programSetting,
  };
}

/**
 * Dispatched when the Program Settings request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function R180NGProgramSettingsRequestFailure(error) {
  return {
    type: Constants.R180NG_PROGRAM_SETTINGS_REQUEST_FAILURE,
    error,
  };
}

/**
 * Get the Program Settings summary
 *
 * @returns {{type}}
 */
export function R180NGProgramSettingsEnrollmentRequest() {
  return {
    type: Constants.R180NG_PROGRAM_SETTINGS_ENROLLMENT_REQUEST,
  };
}

/**
 * Dispatched when we get the Program Settings successfully
 * @param programEnrollmentSetting
 * @returns {[type, programEnrollmentSetting: *]}
 */
export function R180NGProgramSettingsEnrollmentRequestSuccess(programEnrollmentSetting = []) {
  return {
    type: Constants.R180NG_PROGRAM_SETTINGS_ENROLLMENT_REQUEST_SUCCESS,
    programEnrollmentSetting,
  };
}
/**
 * Dispatched when the Program Settings request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function R180NGProgramSettingsEnrollmentRequestFailure(error) {
  return {
    type: Constants.R180NG_PROGRAM_SETTINGS_ENROLLMENT_REQUEST_FAILURE,
    error,
  };
}

/**
 * Handles API Logic for Changing  Program Settings for R180NG
 *
 * @param programsSettingChanged
 * @returns {{type, messageIdsChecked: *}}
 */
export function R180NGSaveRequest(programsSettingChanged = {}) {
  return {
    type: Constants.R180NG_SAVE_REQUEST,
    programsSettingChanged,
  };
}

/**
 * Handles API logic for when Changing  Program Settings for R180NG are successful
 *
 * @returns {{type}}
 */
export function R180NGSaveRequestSuccess() {
  return {
    type: Constants.R180NG_SAVE_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for when Changing  Program Settings for R180NG are a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function R180NGSaveRequestFailure(error) {
  return {
    type: Constants.R180NG_SAVE_REQUEST_FAILURE,
    error,
  };
}

/**
 * Handles API logic for when Changing  Program Settings for R180NG are a failure
 * @param setting
 * @returns {{type, setting: {}}}
 */
export function updateR180NGSettingRequestSuccess(setting = {}) {
  return {
    type: Constants.UPDATE_R180NG_SETTING_REQUEST_SUCCESS,
    setting,
  };
}
