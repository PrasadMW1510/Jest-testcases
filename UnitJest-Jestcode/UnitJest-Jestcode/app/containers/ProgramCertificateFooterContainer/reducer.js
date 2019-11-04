/*
 *
 * CertificatePrintPdfContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from '../ProgramCertificateFooterContainer/constants';

const initialState = fromJS({
  error: false,
  certificatePrint: [],
});

function certificatePrintPdfContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.CERTIFICATE_PRINT_REQUEST_SUCCESS:
      return state.set('certificatePrint', fromJS(action.certificatePrint));
    case Constants.CERTIFICATE_PRINT_REQUEST_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default certificatePrintPdfContainerReducer;
