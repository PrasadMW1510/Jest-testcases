/*
 *
 * S44SettingContainer actions
 *
 */
import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

/**
 * Handles API logic for getting S44 settings
 *
 * @returns {{type: string}}
 */
export function s44SettingsContainerRequest() {
  return {
    type: Constants.S44_SETTINGS_CONTAINER,
  };
}

/**
 * Handles API logic for getting S44 settings are successful
 *
 * @param settings
 * @returns {{type: string, settings}}
 */
export function s44SettingsContainerSuccess(settings = {}) {
  return {
    type: Constants.S44_SETTINGS_CONTAINER_SUCCESS,
    settings,
  };
}

/**
 * Handles API logic for getting S44 settings are a failure
 *
 * @param error
 * @returns {*}
 */
export function s44SettingsContainerFailure(error) {
  return generalFailure({
    type: Constants.S44_SETTINGS_CONTAINER_FAILURE,
    error,
  });
}

/**
 * Handles API logic for saving S44 settings
 *
 * @param settingsData
 * @returns {{type: string, settingsData: *}}
 */
export function s44SettingsSave(settingsData) {
  return {
    type: Constants.S44_SETTINGS_SAVE,
    settingsData,
  };
}

/**
 * Handles API logic for saving S44 settings are successful
 *
 * @returns {{type: string}}
 */
export function s44SettingsSaveSuccess() {
  return {
    type: Constants.S44_SETTINGS_SAVE_SUCCESS,
  };
}

/**
 * Handles API logic for saving S44 settings are a failure
 *
 * @param error
 * @returns {*}
 */
export function s44SettingsSaveFailure(error) {
  return generalFailure({
    type: Constants.S44_SETTINGS_SAVE_FAILURE,
    error,
  });
}
