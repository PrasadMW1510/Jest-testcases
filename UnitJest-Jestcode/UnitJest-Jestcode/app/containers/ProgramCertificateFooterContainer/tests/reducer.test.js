import { fromJS } from 'immutable';

import certificatePrintPdfContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('ProgramCertificateFooterContainer', () => {
  const initialState = fromJS({
    error: false,
    certificatePrint: [],
  });
  it('returns the initial state', () => {
    expect(certificatePrintPdfContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle certificate Info request success actions', () => {
    expect(
      certificatePrintPdfContainerReducer(undefined, Actions.certificatePrintRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle certificate Info request failure actions', () => {
    expect(
      certificatePrintPdfContainerReducer(undefined, Actions.certificatePrintRequestFailure('err'))
    ).toMatchSnapshot();
  });
});
