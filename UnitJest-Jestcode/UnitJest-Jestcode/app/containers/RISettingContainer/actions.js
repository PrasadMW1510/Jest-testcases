/*
 *
 * RISettingContainer actions
 *
 */

import * as Constants from './constants';

/**
 * Get the Program Settings
 * @param programSetting
 * @returns {{type}}
 */
export function RIProgramSettingsRequest() {
  return {
    type: Constants.RI_PROGRAM_SETTINGS_REQUEST,
  };
}

/**
 * Dispatched when we get the Program Settings successfully
 * @param programSetting
 * @returns {{type, programSetting: *}}
 */
export function RIProgramSettingsRequestSuccess(programSetting = {}, proficiencyBandData = {}) {
  return {
    type: Constants.RI_PROGRAM_SETTINGS_REQUEST_SUCCESS,
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
export function RIProgramSettingsRequestFailure(error) {
  return {
    type: Constants.RI_PROGRAM_SETTINGS_REQUEST_FAILURE,
    error,
  };
}

/**
 * Handles API Logic for Changing  Program Settings for RI
 *
 * @param programSettingsToSave
 * @returns {{type, messageIdsChecked: *}}
 */
export function RISaveRequest(activeTabId, programSettingsToSave) {
  return {
    type: Constants.RI_SAVE_REQUEST,
    activeTabId,
    programSettingsToSave,
  };
}

/**
 * Handles API logic for when Changing  Program Settings for RI are successful
 *
 * @returns {{type}}
 */
export function RISaveRequestSuccess(activeTabId, immFormProgramSettingsSaved) {
  return {
    type: Constants.RI_SAVE_REQUEST_SUCCESS,
    activeTabId,
    immFormProgramSettingsSaved,
  };
}

/**
 * Handles API logic for when Changing  Program Settings for RI are a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function RISaveRequestFailure(error) {
  return {
    type: Constants.RI_SAVE_REQUEST_FAILURE,
    error,
  };
}

/**
 * Signals a cancel of the RI "Settings" tab form
 */
export function RICancel() {
  return {
    type: Constants.RI_CANCEL,
  };
}
