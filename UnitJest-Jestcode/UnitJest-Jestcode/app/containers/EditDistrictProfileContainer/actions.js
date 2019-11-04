/*
 *
 * EditDistrictProfileContainer actions
 *
 */

import * as Constants from './constants';

export function getTimeZonesRequest(profile) {
  return {
    type: Constants.GET_TIME_ZONES_REQUEST,
    profile,
  };
}

export function getTimeZonesRequestSuccess(timeZones) {
  return {
    type: Constants.GET_TIME_ZONES_REQUEST_SUCCESS,
    timeZones,
  };
}

export function getTimeZonesRequestFailure(error) {
  return {
    type: Constants.GET_TIME_ZONES_REQUEST_FAILURE,
    error,
  };
}

export function updateDistrictProfileRequest(profileData) {
  return {
    type: Constants.UPDATE_DISTRICT_PROFILE_REQUEST,
    profileData,
  };
}

export function updateDistrictProfileSuccess(timeZones) {
  return {
    type: Constants.UPDATE_DISTRICT_PROFILE_SUCCESS,
    timeZones,
  };
}

export function updateDistrictProfileFailure(error) {
  return {
    type: Constants.UPDATE_DISTRICT_PROFILE_FAILURE,
    error,
  };
}

export function updateCustomDemographics(demographics) {
  return {
    type: Constants.UPDATE_CUSTOM_DEMOGRAPHICS,
    demographics,
  };
}
