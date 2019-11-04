/*
 *
 * AddEditTeacher actions
 *
 */

import { generalFailure } from 'containers/App/actions';
import * as Constants from './constants';

/**
 * Handles API logic for making calls needed for
 * Add Edit Teacher Modal
 *
 * @returns {{type}}
 */
export function addEditTeacherRequest(editTeacherId) {
  return {
    editTeacherId,
    type: Constants.ADD_EDIT_TEACHER_REQUEST,
  };
}

/**
 * Handles API logic for making calls needed for
 * Add Edit Teacher Modal are successful
 *
 * @returns {{type}}
 */
export function addEditTeacherRequestSuccess() {
  return {
    type: Constants.ADD_EDIT_TEACHER_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for making calls needed for
 * Add Edit Teacher Modal are a failure
 *
 * @param error
 * @returns {*}
 */
export function addEditTeacherRequestFailure(error) {
  return generalFailure({
    type: Constants.ADD_EDIT_TEACHER_REQUEST_FAILURE,
    error,
  });
}

/**
 * handles API logic for adding a new teacher
 *
 * @param profileData
 * @param permissionIds
 * @returns {{type, profileData, permissionIds}}
 */
export function postAddTeacherRequest(profileData = {}, permissionIds = []) {
  return {
    type: Constants.POST_ADD_TEACHER_REQUEST,
    profileData,
    permissionIds,
  };
}

/**
 * handles API logic for adding a new teacher are successful
 *
 * @returns {{type}}
 */
export function postAddTeacherRequestSuccess() {
  return {
    type: Constants.POST_ADD_TEACHER_REQUEST_SUCCESS,
  };
}

/**
 * handles API logic for adding a new teacher failure case
 *
 * @returns {{type}}
 */
export function postAddTeacherRequestFailure() {
  return {
    type: Constants.POST_ADD_TEACHER_REQUEST_FAILURE,
  };
}

/**
 * Handles API logic for updating profile data
 *
 * @param profileData
 * @returns {{type, profileData: {}}}
 */
export function postSaveTeacherRequest(profileData = {}, permissionIds = []) {
  return {
    type: Constants.POST_SAVE_TEACHER_REQUEST,
    profileData,
    permissionIds,
  };
}

/**
 * Handles API logic for updating profile data are successful
 *
 * @returns {{type}}
 */
export function postSaveTeacherRequestSuccess() {
  return {
    type: Constants.POST_SAVE_TEACHER_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for updating profile data are a failure
 *
 * @returns {{type}}
 */
export function postSaveTeacherRequestFailure() {
  return {
    type: Constants.POST_SAVE_TEACHER_REQUEST_FAILURE,
  };
}

/**
 * Handles API logic for saving teacher MIA
 *
 * @param profileData
 * @returns {{type, profileData: {}}}
 */
export function postSaveTeacherMIARequest(profileData = {}, permissionIds = [], data = {}) {
  return {
    type: Constants.POST_SAVE_TEACHER_MIA_REQUEST,
    profileData,
    permissionIds,
    editTeacherId: data.editTeacherId,
    searchOpts: data.searchOpts,
  };
}

/**
 * Dispatched when the profile details were retrieved successfully
 * is complete (and successful).
 */
export function addEditTeacherRequestProfileDetailsSuccess(profileDetails) {
  return {
    profileDetails,
    type: Constants.ADD_EDIT_TEACHER_REQUEST_PROFILE_DETAILS_SUCCESS,
  };
}

/**
 * Dispatched when the permissions details were retrieved successfully
 * is complete (and successful).
 */
export function addEditTeacherRequestPermissionsSuccess(permissionsData) {
  return {
    permissionsData,
    type: Constants.ADD_EDIT_TEACHER_REQUEST_PERMISSIONS_SUCCESS,
  };
}

/**
 * Dispatched when the permissions details were retrieved successfully
 * is complete (and successful).
 */
export function addEditTeacherRequestSchoolsAndClassesSuccess(schoolsAndClassesDetails) {
  return {
    schoolsAndClassesDetails,
    type: Constants.ADD_EDIT_TEACHER_REQUEST_SCHOOL_AND_CLASSES_SUCCESS,
  };
}

/**
 * Dispatched when the permissions details were retrieved successfully
 * is complete (and successful).
 */
export function addEditTeacherRequestPasswordConfigSuccess(passwordConfig) {
  return {
    passwordConfig,
    type: Constants.ADD_EDIT_TEACHER_REQUEST_PASSWORD_CONFIG_SUCCESS,
  };
}
