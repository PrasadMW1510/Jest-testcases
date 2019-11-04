/*
 *
 * ClassAssignModalContainer actions
 *
 */

import * as Constants from './constants';

export function getClassesAndGroupsRequest() {
  return {
    type: Constants.GET_CLASSES_AND_GROUPS_REQUEST,
  };
}

/**
 * Handles API logic for when getting classesand groups for search
 *
 * @param schoolsAndGroups
 * @returns {{type, schoolsAndGroups: Array}}
 */
export function getClassesAndGroupsRequestSuccess(classesAndGroups = []) {
  return {
    type: Constants.GET_CLASSES_AND_GROUPS_REQUEST_SUCCESS,
    classesAndGroups,
  };
}

/**
 * Handles API logic for when getting classes and gruoups is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function getClassesAndGroupsRequestFailure(error) {
  return {
    type: Constants.GET_CLASSES_AND_GROUPS_REQUEST_FAILURE,
    error,
  };
}

export function openClassAssignModal() {
  return {
    type: Constants.OPEN_CLASS_ASSIGN_MODAL,
  };
}

export function closeClassAssignModal() {
  return {
    type: Constants.CLOSE_CLASS_ASSIGN_MODAL,
  };
}

/**
 * Handles API logic for assigning to Class
 *
 * @returns {{type}}
 */
export function postAssignToClassRequest(assignPayload) {
  return {
    type: Constants.POST_ASSIGN_TO_CLASS_REQUEST,
    payload: assignPayload,
  };
}

/**
 * Handles API logic for assign to class is a success
 *
 *  @returns {{type}}
 */
export function postAssignToClassRequestSuccess() {
  return {
    type: Constants.POST_ASSIGN_TO_CLASS_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for when assign to class is a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function postAssignToClassRequestFailure(error) {
  return {
    type: Constants.POST_ASSIGN_TO_CLASS_REQUEST_FAILURE,
    error,
  };
}

/**
 * Handles API logic for assigning to Class (MIA)
 *
 * @returns {{type}}
 */
export function postAssignToClassMIARequest(assignPayload, searchOpts) {
  return {
    type: Constants.POST_ASSIGN_TO_CLASS_MIA_REQUEST,
    payload: assignPayload,
    searchOpts,
  };
}

/**
 * Handles API logic for assign to class is a success (MIA)
 *
 *  @returns {{type}}
 */
export function postAssignToClassMIARequestSuccess() {
  return {
    type: Constants.POST_ASSIGN_TO_CLASS_MIA_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for when assign to class is a failure (MIA)
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function postAssignToClassMIARequestFailure(error) {
  return {
    type: Constants.POST_ASSIGN_TO_CLASS_MIA_REQUEST_FAILURE,
    error,
  };
}
