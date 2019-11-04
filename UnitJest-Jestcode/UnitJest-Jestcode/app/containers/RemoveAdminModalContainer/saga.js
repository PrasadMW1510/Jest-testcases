import { call, put, takeLatest, select } from 'redux-saga/effects';
import { makeSelectProfileSessionId } from 'containers/App/selectors';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';

import { hideModal } from 'containers/ModalController/actions';
import { getAdminsRequest } from 'containers/ManageAdminAccountsContainer/actions';

import * as Request from './request';
import * as Actions from './actions';
import * as Constants from './constants';

export function* disableAdminFlow(action) {
  try {
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());

    yield call(Request.disableAdmin, sessionId, action.adminId);
    yield put(Actions.disableAdminRequestSuccess());
    yield put(hideLoading());
    yield put(getAdminsRequest());
    yield put(hideModal());
  } catch (err) {
    yield put(Actions.disableAdminRequestFailure(err));
    yield put(hideLoading());
    yield put(hideModal());
  }
}

export default function* defaultSaga() {
  yield takeLatest(Constants.DISABLE_ADMIN_REQUEST, disableAdminFlow);
}
