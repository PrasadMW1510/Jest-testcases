import * as Constants from './constants';

/**
 * Get the R180NG topics
 * @param programSetting
 * @returns {{type}}
 */
export function R180NGTopicsRequest(r180ngTopics) {
  return {
    type: Constants.R180NG_TOPICS_REQUEST,
    r180ngTopics,
  };
}

/**
 * Dispatched when we get the R180NG topics request pass successfully
 * @param r180ngTopics
 * @returns {{type, programSetting: *}}
 */
export function R180NGTopicsRequestSuccess(r180ngTopics = {}) {
  return {
    type: Constants.R180NG_TOPICS_REQUEST_SUCCESS,
    r180ngTopics,
  };
}

/**
 * Dispatched when the R180NG topics request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function R180NGTopicsRequestFailure(error) {
  return {
    type: Constants.R180NG_TOPICS_REQUEST_FAILURE,
    error,
  };
}
/**
 * Get the R180NG Installed Stages
 * @param stages
 * @returns {{type}}
 */
export function R180NGTopicsInstalledStagesRequest() {
  return {
    type: Constants.R180NG_TOPICS_INSTALLED_STAGES_REQUEST,
  };
}

/**
 * Dispatched when we get the R180NG Installed Stagesrequest pass successfully
 * @param stages
 * @returns {{type, programSetting: *}}
 */
export function R180NGTopicsInstalledStagesRequestSuccess(r180ngTopicsInstalledStages = {}) {
  return {
    type: Constants.R180NG_TOPICS_INSTALLED_STAGES_REQUEST_SUCCESS,
    r180ngTopicsInstalledStages,
  };
}

/**
 * Dispatched when the R180NG Installed Stages request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function R180NGTopicsInstalledStagesRequestFailure(error) {
  return {
    type: Constants.R180NG_TOPICS_INSTALLED_STAGES_REQUEST_FAILURE,
    error,
  };
}
/**
 * Get the R180NG topics
 * @param programSetting
 * @returns {{type}}
 */
export function R180NGTopicsSaveRequest(r180ngTopics) {
  return {
    type: Constants.R180NG_TOPICS_SAVE_REQUEST,
    r180ngTopics,
  };
}

/**
 * Dispatched when we get the R180NG topics request pass successfully
 * @param r180ngTopics
 * @returns {{type, programSetting: *}}
 */
export function R180NGTopicsSaveRequestSuccess(r180ngTopics = {}) {
  return {
    type: Constants.R180NG_TOPICS_SAVE_REQUEST_SUCCESS,
    r180ngTopics,
  };
}

/**
 * Dispatched when the R180NG topics request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function R180NGTopicsSaveRequestFailure(error) {
  return {
    type: Constants.R180NG_TOPICS_SAVE_REQUEST_FAILURE,
    error,
  };
}
/**
 * Handles API logic for updating topics request
 * @param setting
 * @returns {{type, setting: {}}}
 */
export function updateR180NGTopicsRequestSuccess(r180ngTopics = {}) {
  return {
    type: Constants.UPDATE_R180NG_TOPICS_REQUEST_SUCCESS,
    r180ngTopics,
  };
}

/**
 * Handles API logic for when updating  topics stage selection for R180NG are a
 * @param setting
 * @returns {{type, setting: {}}}
 */
export function updateR180NGTopicsSelectedStageRequestSuccess(activeStage = '') {
  return {
    type: Constants.UPDATE_R180NG_TOPICS_STAGE_SELECTED_REQUEST_SUCCESS,
    activeStage,
  };
}
