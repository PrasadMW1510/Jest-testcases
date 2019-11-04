import { call, put, select, takeLatest } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import { makeSelectProfileSessionId, makeSelectProfileUserId } from '../App/selectors';

import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';

export function* getRead180StudentWorkList(read180ninfo) {
  try {
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());

    const read180Response = yield call(
      Request.getRead180StudentWorksAction,
      read180ninfo.read180nData,
      sessionId,
      userId
    );

    yield put(Actions.getRead180StudentWorkRequestSuccess(read180Response));
    yield put(hideLoading());
  } catch (err) {
    yield put(hideLoading());
  }
}

export function* setRead180StudentWorkData(postData) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());

    const read180Response = yield call(
      Request.setRead180SwDataRequestAction,
      postData.read180ngData,
      sessionId
    );
    yield put(Actions.setRead180StudentWorkRequestSuccess(read180Response));
  } catch (err) {
    yield put(hideLoading());
  }
}

export default function* defaultSaga() {
  yield takeLatest(Constants.READ_180_STUDENT_WORK_REQUEST, getRead180StudentWorkList);
  yield takeLatest(Constants.SET_READ_180_STUDENT_WORK_DATA, setRead180StudentWorkData);
}
