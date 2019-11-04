/*
 *
 * RCSettingContainer actions
 *
 */

import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

/**
 * Handles all API logic for RC settings
 *
 * @returns {{type: string}}
 */
export function rcSettingsContainerRequest() {
  return {
    type: Constants.RC_SETTINGS_CONTAINER,
  };
}

/**
 * Handles when all API logic for getting RC settings are successful
 *
 * @returns {{type: string, settings}}
 */
export function rcSettingsContainerSuccess() {
  return {
    type: Constants.RC_SETTINGS_CONTAINER_SUCCESS,
  };
}

/**
 * Handles when all API logic for getting RC settings are a failure
 *
 * @param error
 * @returns {*}
 */
export function rcSettingsContainerFailure(error) {
  return generalFailure({
    type: Constants.RC_SETTINGS_CONTAINER_FAILURE,
    error,
  });
}

/**
 * Handles API logic for RC settings data are successful
 *
 * @param settings
 * @returns {{type: string, settings}}
 */
export function rcGetSettingsSuccess(settings = {}) {
  return {
    type: Constants.RC_GET_SETTINGS_SUCCESS,
    settings,
  };
}

/**
 * Handles API logic for RC settings data are a failure
 *
 * @param error
 * @returns {*}
 */
export function rcGetSettingsFailure(error) {
  return generalFailure({
    type: Constants.RC_GET_SETTINGS_FAILURE,
    error,
  });
}

/**
 * Handles API logic for saving RC Settings data
 *
 * @param immSettings
 * @param shouldRedirect
 * @returns {{type: string, immSettings: *}}
 */
export function rcSettingsSave(immSettings, shouldRedirect = false) {
  return {
    immSettings,
    shouldRedirect,
    type: Constants.RC_SETTINGS_SAVE,
  };
}

/**
 * Handles API logic for saving RC Settings data is successful
 *
 * @returns {{type: string}}
 */
export function rcSettingsSaveSuccess() {
  return {
    type: Constants.RC_SETTINGS_SAVE_SUCCESS,
  };
}

/**
 * Handles API logic for saving RC Settings data are a failure
 *
 * @param error
 * @returns {*}
 */
export function rcSettingsSaveFailure(error) {
  return generalFailure({
    type: Constants.RC_SETTINGS_SAVE_FAILURE,
    error,
  });
}

// TODO: The following set of actions deal with a selected subproduct (stage).
// If your settings have a stage to choose from, uncomment and edit accordingly.

/**
 * Handles API logic for getting installed RC stages are successful
 *
 * @param installStages
 * @returns {{type: string, installStages: *}}
 */
/* export function rcGetInstallStagesSuccess(installStages) {
  return {
    type: Constants.RC_GET_INSTALL_STAGES_SUCCESS,
    installStages,
  };
} */

/**
 * Handles API logic for getting installed RC stages are a failure
 *
 * @param error
 * @returns {*}
 */
/* export function rcGetInstallStagesFailure(error) {
  return generalFailure({
    type: Constants.RC_GET_INSTALL_STAGES_FAILURE,
    error,
  });
} */

/**
 * Handles when user has selected a stage
 *
 * @param selectedStage
 * @returns {{type: string, selectedStage: *}}
 */
/* export function rcSetSelectedStage(selectedStage) {
  return {
    type: Constants.RC_SET_SELECTED_STAGE,
    selectedStage,
  };
} */

// TODO: The following actions all deal with a second tab.
// If your settings have a second tab, uncomment and rename
// these actions accordingly.

/**
 * Handles API logic for getting RC topic data is a success
 *
 * @param topics
 * @returns {{type: string, topics: *}}
 */
/* export function rcGetTopicsSuccess(topics) {
  return {
    type: Constants.RC_GET_TOPICS_SUCCESS,
    topics,
  };
} */

/**
 * Handles API logic for getting RC topic data is a failure
 *
 * @param error
 * @returns {*}
 */
/* export function rcGetTopicsFailure(error) {
  return generalFailure({
    type: Constants.RC_GET_TOPICS_FAILURE,
    error,
  });
} */

/**
 * Handles API logic for saving RC topic data
 *
 * @param topicData
 * @returns {{type: string, topicData: *}}
 */
/* export function rcTopicSave(topicData) {
  return {
    type: Constants.RC_TOPIC_SAVE,
    topicData,
  };
} */

/**
 * Handles API logic for saving RC topic data is a success
 *
 * @returns {{type: string}}
 */
/* export function rcTopicSaveSuccess() {
  return {
    type: Constants.RC_TOPIC_SAVE_SUCCESS,
  };
} */

/**
 * Handles API logic for saving RC topic data is a failure
 *
 * @param error
 * @returns {*}
 */
/* export function rcTopicSaveFailure(error) {
  return generalFailure({
    type: Constants.RC_TOPIC_SAVE_FAILURE,
    error,
  });
} */
