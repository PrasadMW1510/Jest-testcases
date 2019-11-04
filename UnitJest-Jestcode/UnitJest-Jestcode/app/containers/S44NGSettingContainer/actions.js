/*
 *
 * S44NGSettingContainer actions
 *
 */
import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

/**
 * Handles API logic for getting S44NG settings
 *
 * @returns {{type}}
 */
export function s44NGSettingsContainerRequest() {
  return {
    type: Constants.S44NG_SETTINGS_CONTAINER,
  };
}

/**
 * Handles API logic for getting S44NG settings are successful
 *
 * @returns {{type}}
 */
export function s44NGSettingsContainerSuccess(settings = {}) {
  return {
    type: Constants.S44NG_SETTINGS_CONTAINER_SUCCESS,
    settings,
  };
}

/**
 * Handles API logic for getting S44NG settings are a failure
 *
 * @param error
 * @returns {*}
 */
export function s44NGSettingsContainerFailure(error) {
  return generalFailure({
    type: Constants.S44NG_SETTINGS_CONTAINER_FAILURE,
    error,
  });
}

/**
 * Handles API logic for saving S44NG settings
 *
 * @param settingsData
 * @returns {{type, settingsData: *}}
 */
export function s44NGSettingsSave(settingsData) {
  return {
    type: Constants.S44NG_SETTINGS_SAVE,
    settingsData,
  };
}

/**
 * Handles API logic for saving S44NG settings are successful
 *
 * @returns {{type}}
 */
export function s44NGSettingsSaveSuccess() {
  return {
    type: Constants.S44NG_SETTINGS_SAVE_SUCCESS,
  };
}

/**
 * Handles API logic for saving S44NG settings are a failure
 *
 * @param error
 * @returns {*}
 */
export function s44NGSettingsSaveFailure(error) {
  return generalFailure({
    type: Constants.S44NG_SETTINGS_SAVE_FAILURE,
    error,
  });
}
