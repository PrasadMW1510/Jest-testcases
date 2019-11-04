/*
 *
 * FadsettingsContainer actions
 *
 */

import * as Constants from './constants';

export function setSettingsSuccess(result) {
  return {
    type: Constants.FAD_SET_SETTINGS_SUCCESS,
    result,
  };
}

export function setSettingsFailure(err) {
  return {
    type: Constants.FAD_SET_SETTINGS_FAILURE,
    err,
  };
}

export function setSettingsRequest(retake, reset) {
  return {
    retake,
    reset,
    type: Constants.FAD_SET_SETTINGS_REQUEST,
  };
}

export function getSettingsRequest() {
  return {
    type: Constants.FAD_GET_SETTINGS_REQUEST,
  };
}

export function getSettingsSuccess(result) {
  return {
    type: Constants.FAD_GET_SETTINGS_SUCCESS,
    result,
  };
}

export function getSettingsFailure(err) {
  return {
    type: Constants.FAD_GET_SETTINGS_FAILURE,
    err,
  };
}
