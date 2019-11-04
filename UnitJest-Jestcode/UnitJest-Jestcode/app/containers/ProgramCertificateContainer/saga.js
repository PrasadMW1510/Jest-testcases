import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as Request from './request';
import * as Actions from './actions';
import { makeSelectLoginData } from '../App/selectors';
import * as Constants from './constants';

export function* CertificateInfoFlow() {
  try {
    const loginData = yield select(makeSelectLoginData());

    const certificateInfo = yield call(
      Request.getCertificateInfo,
      loginData.getIn(['session_id', 0]),
      loginData.getIn(['user_id', 0]),
      loginData.getIn(['user_type', 0])
    );

    yield put(Actions.certificateInfoRequestSuccess(certificateInfo));
  } catch (err) {
    yield put(Actions.certificateInfoRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(Constants.CERTIFICATE_INFO_REQUEST, CertificateInfoFlow);
}
