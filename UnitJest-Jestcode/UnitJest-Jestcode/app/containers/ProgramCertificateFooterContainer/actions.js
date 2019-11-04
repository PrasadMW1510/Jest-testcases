/*
 *
 * CertificatePrintPdfContainer actions
 *
 */
import * as Constants from './constants';
/**
 * Get the Certificate Print Pdf
 *
 * @returns {{type}}
 */
export function certificatePrintRequest(requestParams) {
  return {
    type: Constants.CERTIFICATE_PRINT_REQUEST,
    requestParams,
  };
}

/**
 * Dispatched when we get the Certificate Print Pdf request successfully
 * @param certificatePrint
 * @returns {{type, certificatePrint: *}}
 */
export function certificatePrintRequestSuccess(certificatePrint = {}) {
  return {
    type: Constants.CERTIFICATE_PRINT_REQUEST_SUCCESS,
    certificatePrint,
  };
}

/**
 * Dispatched when the Certificate Print Pdf request  fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function certificatePrintRequestFailure(error) {
  return {
    type: Constants.CERTIFICATE_PRINT_REQUEST_FAILURE,
    error,
  };
}
