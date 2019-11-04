import { call, put, select, takeLatest } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import { makeSelectProfileSessionId, makeSelectProfileUserId } from '../App/selectors';

import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';

export function* getRead180DataRequest(read180ninfo) {
  try {
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());

    const read180Response = yield call(
      Request.getRead180DataRequestAction,
      read180ninfo.read180nData,
      sessionId,
      userId
    );
    yield put(Actions.getRead180DataRequestSuccess(read180Response));
    yield put(hideLoading());
  } catch (err) {
    yield put(hideLoading());
  }
}

export function* setRead180Data(read180ninfo) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());

    const read180Response = yield call(
      Request.setRead180DataRequestAction,
      read180ninfo.read180ngData,
      sessionId,
      read180ninfo.workItemId
    );
    yield put(Actions.setRead180DataRequestSuccess(read180Response));
  } catch (err) {
    yield put(hideLoading());
  }
}
export function* deleteAssignmentData(workItemId) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const messageobj = `<>`;

    const read180Response = yield call(
      Request.deleteRead180DataRequestAction,
      messageobj,
      sessionId,
      workItemId.Data
    );
    yield put(Actions.setRead180DataRequestSuccess(read180Response));
  } catch (err) {
    yield put(hideLoading());
  }
}

export default function* defaultSaga() {
  yield takeLatest(Constants.READ_180_NG_DATA_REQUEST, getRead180DataRequest);
  yield takeLatest(Constants.SET_READ_180_NG_DATA, setRead180Data);
  yield takeLatest(Constants.DELETE_ASSIGNMENT_DATA, deleteAssignmentData);
}
