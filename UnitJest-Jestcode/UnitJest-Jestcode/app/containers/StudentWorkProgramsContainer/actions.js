/*
 *
 * StudentWorkProgramsContainer actions
 *
 */

import * as Constants from './constants';

export function getIreadStudentWorkData(data) {
  return {
    type: Constants.GET_IREAD_STUDENT_WORK_DATA,
    data,
  };
}

export function getIReadStudentWorkDataRequestSuccess(data) {
  return {
    type: Constants.GET_IREAD_STUDENT_WORK_DATA_SUCCESS,
    data,
  };
}

export function getIReadStudentWorkDataRequestFailure() {
  return {
    type: Constants.GET_IREAD_STUDENT_WORK_DATA_FAILURE,
  };
}

export function postIReadStudentWorkData(formState, data) {
  return {
    type: Constants.POST_IREAD_STUDENT_WORK_DATA,
    formState,
    data,
  };
}

export function saveIReadStudentWorkDataRequestSuccess(data) {
  return {
    type: Constants.SAVE_IREAD_STUDENT_WORK_DATA_REQUEST_SUCCESS,
    data,
  };
}

export function saveIReadStudentWorkDataRequestFailure(data) {
  return {
    type: Constants.SAVE_IREAD_STUDENT_WORK_DATA_REQUEST_FAILURE,
    data,
  };
}

export function delIReadStudentWorkData(data) {
  return {
    type: Constants.DELETE_IREAD_STUDENT_WORK,
    data,
  };
}

export function delIReadStudentWorkDataSuccess(data) {
  return {
    type: Constants.DELETE_IREAD_STUDENT_WORK_SUCCESS,
    data,
  };
}

export function delIReadStudentWorkDataFailure(data) {
  return {
    type: Constants.DELETE_IREAD_STUDENT_WORK_FAILURE,
    data,
  };
}

export function showDeleteModal() {
  return {
    type: Constants.SHOW_DELETE_MODAL,
  };
}
