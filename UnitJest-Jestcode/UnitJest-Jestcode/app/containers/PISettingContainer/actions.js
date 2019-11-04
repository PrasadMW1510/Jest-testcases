/*
 *
 * PISettingContainer actions
 *
 */

import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

/**
 * Handles API logic for PI settings data
 *
 * @returns {{type: string}}
 */
export function piSettingsContainerRequest() {
  return {
    type: Constants.PI_SETTINGS_CONTAINER,
  };
}

/**
 * Handles API logic for PI settings data are successful
 *
 * @param settings
 * @returns {{type: string, settings}}
 */
export function piSettingsContainerSuccess(settings = {}) {
  return {
    type: Constants.PI_SETTINGS_CONTAINER_SUCCESS,
    settings,
  };
}

/**
 * Handles API logic for PI settings data are a failure
 *
 * @param error
 * @returns {*}
 */
export function piSettingsContainerFailure(error) {
  return generalFailure({
    type: Constants.PI_SETTINGS_CONTAINER_FAILURE,
    error,
  });
}

/**
 * Handles API logic for saving PI settings data
 *
 * @param settingsData
 * @returns {{type: string, settingsData: *}}
 */
export function piSettingsSave(settingsData) {
  return {
    type: Constants.PI_SETTINGS_SAVE,
    settingsData,
  };
}

/**
 * Handles API logic for saving PI settings data is successful
 *
 * @returns {{type: string}}
 */
export function piSettingsSaveSuccess() {
  return {
    type: Constants.PI_SETTINGS_SAVE_SUCCESS,
  };
}

/**
 * Handles API logic for saving PI settings data are a failure
 *
 * @param error
 * @returns {*}
 */
export function piSettingsSaveFailure(error) {
  return generalFailure({
    type: Constants.PI_SETTINGS_SAVE_FAILURE,
    error,
  });
}
