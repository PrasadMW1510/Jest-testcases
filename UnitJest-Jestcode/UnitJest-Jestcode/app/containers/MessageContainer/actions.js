/*
 *
 * MessageContainer actions
 *
 */

import * as Constants from './constants';

/**
 * Handles API logic for getting messages
 *
 * @returns {{type}}
 */
export function getMessageRequest() {
  return {
    type: Constants.GET_MESSAGES_REQUEST,
  };
}

/**
 * Handles API logic for when getting messages are successful
 *
 * @param messages
 * @returns {{type, messages: Array}}
 */
export function getMessagesRequestSuccess(messages = []) {
  return {
    type: Constants.GET_MESSAGES_REQUEST_SUCCESS,
    messages,
  };
}

/**
 * Handles API logic for when getting messages are a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function getMessagesRequestFailure(error) {
  return {
    type: Constants.GET_MESSAGES_REQUEST_FAILURE,
    error,
  };
}

/**
 * Handles API Logic for deleting messages
 *
 * @param messageIdsChecked
 * @returns {{type, messageIdsChecked: *}}
 */
export function postDeleteRequest(messageIdsChecked = []) {
  return {
    type: Constants.POST_DELETE_REQUEST,
    messageIdsChecked,
  };
}

/**
 * Handles API logic for when deleting messages are successful
 *
 * @returns {{type}}
 */
export function postDeleteRequestSuccess() {
  return {
    type: Constants.POST_DELETE_REQUEST_SUCCESS,
  };
}

/**
 * Handles API logic for when deleting messages are a failure
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function postDeleteRequestFailure(error) {
  return {
    type: Constants.POST_DELETE_REQUEST_FAILURE,
    error,
  };
}
