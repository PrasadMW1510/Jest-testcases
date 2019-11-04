/*
 *
 * IreadSettingContainer actions
 *
 */

import * as Constants from './constants';

/**
 * Get the iRead Program Settings
 *
 * @returns {{type}}
 * @constructor
 */
export function IreadProgramSettingsRequest() {
  return {
    type: Constants.IREAD_PROGRAM_SETTINGS_REQUEST,
  };
}

/**
 * Dispatched when we get the Program Settings successfully
 *
 * @param programSetting
 * @returns {{type, programSetting: *}}
 */
export function IreadProgramSettingsRequestSuccess(programSetting = {}) {
  return {
    type: Constants.IREAD_PROGRAM_SETTINGS_REQUEST_SUCCESS,
    programSetting,
  };
}

/**
 * Dispatched when the Program Settings request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function IreadProgramSettingsRequestFailure(error) {
  return {
    type: Constants.IREAD_PROGRAM_SETTINGS_REQUEST_FAILURE,
    error,
  };
}

/**
 * Handles API Logic for Changing  Program Settings for Iread
 *
 * @param settings
 * @returns {{type, messageIdsChecked: *}}
 */
export function IreadSaveRequest(settings = {}) {
  return {
    type: Constants.IREAD_SAVE_REQUEST,
    settings,
  };
}

/**
 * Handles API logic for when Changing  Program Settings for Iread are successful
 *
 * @returns {{type}}
 */
export function IreadSaveRequestSuccess() {
  return {
    type: Constants.IREAD_SAVE_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for when Changing  Program Settings for Iread are a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function IreadSaveRequestFailure(error) {
  return {
    type: Constants.IREAD_SAVE_REQUEST_FAILURE,
    error,
  };
}
