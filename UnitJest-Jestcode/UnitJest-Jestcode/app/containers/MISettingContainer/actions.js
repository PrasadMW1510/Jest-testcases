/*
 *
 * MISettingContainer actions
 *
 */

import * as Constants from './constants';

/**
 * Get the Program Settings
 * @param programSetting
 * @returns {{type}}
 */
export function MIProgramSettingsRequest() {
  return {
    type: Constants.MI_PROGRAM_SETTINGS_REQUEST,
  };
}

/**
 * Dispatched when we get the Program Settings successfully
 * @param programSetting
 * @returns {{type, programSetting: *}}
 */
export function MIProgramSettingsRequestSuccess(programSetting = {}, proficiencyBandData = {}) {
  return {
    type: Constants.MI_PROGRAM_SETTINGS_REQUEST_SUCCESS,
    programSetting,
    proficiencyBandData,
  };
}

/**
 * Dispatched when the Program Settings request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function MIProgramSettingsRequestFailure(error) {
  return {
    type: Constants.MI_PROGRAM_SETTINGS_REQUEST_FAILURE,
    error,
  };
}

/**
 * Handles API Logic for Changing Program Settings for MI
 *
 * @param programSettingsToSave
 * @returns {{type, messageIdsChecked: *}}
 */
export function MISaveRequest(activeTabId, programSettingsToSave) {
  return {
    type: Constants.MI_SAVE_REQUEST,
    activeTabId,
    programSettingsToSave,
  };
}

/**
 * Handles API logic for when Changing Program Settings for MI are successful
 *
 * @returns {{type}}
 */
export function MISaveRequestSuccess(activeTabId, immFormProgramSettingsSaved) {
  return {
    type: Constants.MI_SAVE_REQUEST_SUCCESS,
    activeTabId,
    immFormProgramSettingsSaved,
  };
}

/**
 * Handles API logic for when Changing Program Settings for MI are a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function MISaveRequestFailure(error) {
  return {
    type: Constants.MI_SAVE_REQUEST_FAILURE,
    error,
  };
}

/**
 * Signals a cancel of the MI "Settings" tab form
 */
export function MICancel() {
  return {
    type: Constants.MI_CANCEL,
  };
}
