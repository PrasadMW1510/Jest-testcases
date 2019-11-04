/*
 *
 * Read180RespondWriteContainer actions
 *
 */

import * as Constants from './constants';

export function getRespondWriteRequest(data) {
  return {
    type: Constants.GET_RESPOND_WRITE_REQUEST,
    data,
  };
}

export function setRespondWriteRequest(data, rowItem) {
  return {
    type: Constants.SET_RESPOND_WRITE_REQUEST,
    data,
    rowItem,
  };
}

export function setRespondWrites44Request(data, rowItem) {
  return {
    type: Constants.SET_RESPOND_WRITE_REQUEST_S44,
    data,
    rowItem,
  };
}

export function saveRespondData(data) {
  return {
    type: Constants.SET_RESPOND_WRITE_DATA_REQUEST,
    data,
  };
}
