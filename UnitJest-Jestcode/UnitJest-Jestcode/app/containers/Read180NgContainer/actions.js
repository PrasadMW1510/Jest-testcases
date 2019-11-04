/*
 *
 * Read180NgContainer actions
 *
 */
import * as Constants from './constants';

export function read180ngRequest(read180ngPreviewData) {
  return {
    type: Constants.READ_180_NG_LIST,
    read180ngPreviewData,
  };
}

export function getRead180DataRequest(read180nData) {
  return {
    type: Constants.READ_180_NG_DATA_REQUEST,
    read180nData,
  };
}

export function getRead180DataRequestSuccess(resultsData) {
  return {
    type: Constants.READ_180_NG_DATA_REQUEST_SUCCESS,
    resultsData,
  };
}

export function setRead180NgData(read180ngData, workItemId) {
  return {
    type: Constants.SET_READ_180_NG_DATA,
    read180ngData,
    workItemId,
  };
}

export function setRead180DataRequestSuccess(resultsData) {
  return {
    type: Constants.SET_180_NG_DATA_REQUEST_SUCCESS,
    resultsData,
  };
}
export function deleteAssignmentData(Data) {
  return {
    type: Constants.DELETE_ASSIGNMENT_DATA,
    Data,
  };
}
export function defaultAction() {
  return {
    type: Constants.DEFAULT_ACTION,
  };
}
