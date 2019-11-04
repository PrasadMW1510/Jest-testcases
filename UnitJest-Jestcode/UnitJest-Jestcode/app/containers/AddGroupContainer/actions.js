/*
 *
 * AddGroupContainer actions
 *
 */

import * as Constants from './constants';

export function getClassesWithStudentInfo() {
  return {
    type: Constants.GET_CLASSES_WITH_STUDENT_INFO,
  };
}

export function getClassesWithStudentInfoSuccess(classInfo) {
  return {
    type: Constants.GET_CLASSES_WITH_STUDENT_INFO_SUCCESS,
    classInfo,
  };
}

export function getClassesWithStudentInfoFailure(error) {
  return {
    type: Constants.GET_CLASSES_WITH_STUDENT_INFO_FAILURE,
    error,
  };
}

export function postGroup(group) {
  return {
    type: Constants.POST_GROUP,
    group,
  };
}

export function postGroupSuccess(groupInfo) {
  return {
    type: Constants.POST_GROUP_SUCCESS,
    groupInfo,
  };
}

export function postGroupFailure(error) {
  return {
    type: Constants.POST_GROUP_FAILURE,
    error,
  };
}

export function resetGroupStatus() {
  return {
    type: Constants.RESET_GROUP_STATUS,
  };
}

export function getGroupInfo() {
  return {
    type: Constants.GET_GROUP_INFO,
  };
}

export function getGroupInfoSuccess(groupDetails) {
  return {
    type: Constants.GET_GROUP_INFO_SUCCESS,
    groupDetails,
  };
}

export function getGroupInfoFailure(error) {
  return {
    type: Constants.GET_GROUP_INFO_FAILURE,
    error,
  };
}
