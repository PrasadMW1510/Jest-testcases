/*
 *
 * R180EESettingContainer actions
 *
 */

import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

/**
 * Handles all API logic for R180EE settings
 *
 * @returns {{type: string}}
 */
export function r180EESettingsContainerRequest() {
  return {
    type: Constants.R180EE_SETTINGS_CONTAINER,
  };
}

/**
 * Handles when all API logic for getting R180EE settings are successful
 *
 * @returns {{type: string, settings}}
 */
export function r180EESettingsContainerSuccess() {
  return {
    type: Constants.R180EE_SETTINGS_CONTAINER_SUCCESS,
  };
}

/**
 * Handles when all API logic for getting R180EE settings are a failure
 *
 * @param error
 * @returns {*}
 */
export function r180EESettingsContainerFailure(error) {
  return generalFailure({
    type: Constants.R180EE_SETTINGS_CONTAINER_FAILURE,
    error,
  });
}

/**
 * Handles API logic for R180EE settings data are successful
 *
 * @param settings
 * @returns {{type: string, settings}}
 */
export function r180EEGetSettingsSuccess(settings = {}) {
  return {
    type: Constants.R180EE_GET_SETTINGS_SUCCESS,
    settings,
  };
}

/**
 * Handles API logic for R180EE settings data are a failure
 *
 * @param error
 * @returns {*}
 */
export function r180EEGetSettingsFailure(error) {
  return generalFailure({
    type: Constants.R180EE_GET_SETTINGS_FAILURE,
    error,
  });
}

/**
 * Handles API logic for saving R180EE Settings data
 *
 * @param settingsData
 * @returns {{type: string, settingsData: *}}
 */
export function r180EESettingsSave(settingsData) {
  return {
    type: Constants.R180EE_SETTINGS_SAVE,
    settingsData,
  };
}

/**
 * Handles API logic for saving R180EE Settings data is successful
 *
 * @returns {{type: string}}
 */
export function r180EESettingsSaveSuccess() {
  return {
    type: Constants.R180EE_SETTINGS_SAVE_SUCCESS,
  };
}

/**
 * Handles API logic for saving R180EE Settings data are a failure
 *
 * @param error
 * @returns {*}
 */
export function r180EESettingsSaveFailure(error) {
  return generalFailure({
    type: Constants.R180EE_SETTINGS_SAVE_FAILURE,
    error,
  });
}

/**
 * Handles API logic for getting installed R180EE stages are successful
 *
 * @param installStages
 * @returns {{type: string, installStages: *}}
 */
export function r180EEGetInstallStagesSuccess(installStages) {
  return {
    type: Constants.R180EE_GET_INSTALL_STAGES_SUCCESS,
    installStages,
  };
}

/**
 * Handles API logic for getting installed R180EE stages are a failure
 *
 * @param error
 * @returns {*}
 */
export function r180EEGetInstallStagesFailure(error) {
  return generalFailure({
    type: Constants.R180EE_GET_INSTALL_STAGES_FAILURE,
    error,
  });
}

/**
 * Handles when user has selected a stage
 *
 * @param selectedStage
 * @returns {{type: string, selectedStage: *}}
 */
export function r180EESetSelectedStage(selectedStage) {
  return {
    type: Constants.R180EE_SET_SELECTED_STAGE,
    selectedStage,
  };
}

/**
 * Handles API logic for getting R180EE topic data is a success
 *
 * @param topics
 * @returns {{type: string, topics: *}}
 */
export function r180EEGetTopicsSuccess(topics) {
  return {
    type: Constants.R180EE_GET_TOPICS_SUCCESS,
    topics,
  };
}

/**
 * Handles API logic for getting R180EE topic data is a failure
 *
 * @param error
 * @returns {*}
 */
export function r180EEGetTopicsFailure(error) {
  return generalFailure({
    type: Constants.R180EE_GET_TOPICS_FAILURE,
    error,
  });
}

/**
 * Handles API logic for saving R180EE topic data
 *
 * @param topicData
 * @returns {{type: string, topicData: *}}
 */
export function r180EETopicSave(topicData) {
  return {
    type: Constants.R180EE_TOPIC_SAVE,
    topicData,
  };
}

/**
 * Handles API logic for saving R180EE topic data is a success
 *
 * @returns {{type: string}}
 */
export function r180EETopicSaveSuccess() {
  return {
    type: Constants.R180EE_TOPIC_SAVE_SUCCESS,
  };
}

/**
 * Handles API logic for saving R180EE topic data is a failure
 *
 * @param error
 * @returns {*}
 */
export function r180EETopicSaveFailure(error) {
  return generalFailure({
    type: Constants.R180EE_TOPIC_SAVE_FAILURE,
    error,
  });
}
