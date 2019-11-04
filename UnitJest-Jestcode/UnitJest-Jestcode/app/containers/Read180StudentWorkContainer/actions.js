/*
 *
 * Read180StudentWorkContainer actions
 *
 */

import * as Constants from './constants';

export function read180StudentWorkRequest(read180StudentWorkPreviewData) {
  return {
    type: Constants.READ_180_STUDENT_WORK_LIST,
    read180StudentWorkPreviewData,
  };
}
export function getRead180StudentWorkRequest(read180nData) {
  return {
    type: Constants.READ_180_STUDENT_WORK_REQUEST,
    read180nData,
  };
}

export function getRead180StudentWorkRequestSuccess(resultsData) {
  return {
    type: Constants.READ_180_STUDENT_WORK_REQUEST_SUCCESS,
    resultsData,
  };
}

export function setRead180StudentWorkData(read180ngData) {
  return {
    type: Constants.SET_READ_180_STUDENT_WORK_DATA,
    read180ngData,
  };
}

export function setRead180StudentWorkRequestSuccess(resultsData) {
  return {
    type: Constants.SET_180_STUDENT_WORK_REQUEST_SUCCESS,
    resultsData,
  };
}

export function defaultAction() {
  return {
    type: Constants.DEFAULT_ACTION,
  };
}
