/*
 *
 * Certificate actions
 *
 */
import * as Constants from './constants';
/**
 * Get the Certificate Info
 *
 * @returns {{type}}
 */
export function certificateInfoRequest() {
  return {
    type: Constants.CERTIFICATE_INFO_REQUEST,
  };
}

/**
 * Dispatched when we get the certificate Info successfully
 * @param certificateInfo
 * @returns {{type, certificateInfo: *}}
 */
export function certificateInfoRequestSuccess(certificateInfo = {}) {
  return {
    type: Constants.CERTIFICATE_INFO_REQUEST_SUCCESS,
    certificateInfo,
  };
}

/**
 * Dispatched when the certificate Info request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function certificateInfoRequestFailure(error) {
  return {
    type: Constants.CERTIFICATE_INFO_REQUEST_FAILURE,
    error,
  };
}
