import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as Request from './request';
import * as Actions from './actions';
import { makeSelectLoginData } from '../App/selectors';
import * as Constants from './constants';

export function* certificatePrintRequestFlow(requestParams) {
  try {
    const loginData = yield select(makeSelectLoginData());

    const certificatePrint = yield call(
      Request.getCertificatePrintPdf,
      loginData.getIn(['session_id', 0]),
      requestParams.requestParams
    );

    yield put(Actions.certificatePrintRequestSuccess(certificatePrint));
  } catch (err) {
    yield put(Actions.certificatePrintRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(Constants.CERTIFICATE_PRINT_REQUEST, certificatePrintRequestFlow);
}
