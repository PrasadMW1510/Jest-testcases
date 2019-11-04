/*
 *
 * FMSettingContainer actions
 *
 */

import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

/**
 * Handles all API logic for FM settings
 *
 * @returns {{type: string}}
 */
export function fmSettingsContainerRequest() {
  return {
    type: Constants.FM_SETTINGS_CONTAINER,
  };
}

/**
 * Handles when all API logic for getting FM settings are successful
 *
 * @returns {{type: string}}
 */
export function fmSettingsContainerSuccess() {
  return {
    type: Constants.FM_SETTINGS_CONTAINER_SUCCESS,
  };
}

/**
 * Handles when all API logic for getting FM settings are a failure
 *
 * @param error
 * @returns {*}
 */
export function fmSettingsContainerFailure(error) {
  return generalFailure({
    type: Constants.FM_SETTINGS_CONTAINER_FAILURE,
    error,
  });
}

/**
 * Handles API logic for FM settings data are successful
 *
 * @param settings
 * @returns {{type: string, settings}}
 */
export function fmGetSettingsSuccess(settings = {}) {
  return {
    type: Constants.FM_GET_SETTINGS_SUCCESS,
    settings,
  };
}

/**
 * Handles API logic for FM settings data are a failure
 *
 * @param error
 * @returns {*}
 */
export function fmGetSettingsFailure(error) {
  return generalFailure({
    type: Constants.FM_GET_SETTINGS_FAILURE,
    error,
  });
}

/**
 * Handles API logic for saving FM Settings data
 *
 * @param settingsData
 * @returns {{type: string, settingsData: *}}
 */
export function fmSettingsSave(settingsData) {
  return {
    type: Constants.FM_SETTINGS_SAVE,
    settingsData,
  };
}

/**
 * Handles API logic for saving FM Settings data is successful
 *
 * @returns {{type: string}}
 */
export function fmSettingsSaveSuccess() {
  return {
    type: Constants.FM_SETTINGS_SAVE_SUCCESS,
  };
}

/**
 * Handles API logic for saving FM Settings data are a failure
 *
 * @param error
 * @returns {*}
 */
export function fmSettingsSaveFailure(error) {
  return generalFailure({
    type: Constants.FM_SETTINGS_SAVE_FAILURE,
    error,
  });
}

/**
 * Handles API logic for FM advanced settings data are successful
 *
 * @param advancedSettings
 * @returns {{type: string, settings}}
 */
export function fmGetAdvancedSettingsSuccess(advancedSettings = {}) {
  return {
    type: Constants.FM_GET_ADVANCED_SETTINGS_SUCCESS,
    advancedSettings,
  };
}

/**
 * Handles API logic for FM advanced settings data are a failure
 *
 * @param error
 * @returns {*}
 */
export function fmGetAdvancedSettingsFailure(error) {
  return generalFailure({
    type: Constants.FM_GET_ADVANCED_SETTINGS_FAILURE,
    error,
  });
}

/**
 * Handles API logic for saving FM advanced settings data
 *
 * @param settingsData
 * @returns {{type: string, settingsData: *}}
 */
export function fmAdvancedSettingsSave(settingsData) {
  return {
    type: Constants.FM_ADVANCED_SETTINGS_SAVE,
    settingsData,
  };
}

/**
 * Handles API logic for saving FM advanced settings data is successful
 *
 * @returns {{type: string}}
 */
export function fmAdvancedSettingsSaveSuccess() {
  return {
    type: Constants.FM_ADVANCED_SETTINGS_SAVE_SUCCESS,
  };
}

/**
 * Handles API logic for saving FM advanced settings data are a failure
 *
 * @param error
 * @returns {*}
 */
export function fmAdvancedSettingsSaveFailure(error) {
  return generalFailure({
    type: Constants.FM_ADVANCED_SETTINGS_SAVE_FAILURE,
    error,
  });
}
