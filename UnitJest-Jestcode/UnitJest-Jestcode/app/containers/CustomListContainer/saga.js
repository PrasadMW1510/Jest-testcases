import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as Constants from './constants';
import { makeSelectProfileSessionId } from '../App/selectors';
import * as Request from './request';
import * as Actions from './actions';

export function* exportCustomQuizRequest(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const exportRequest = action.quizListexportData;
    yield call(Request.getExportCustomQuizListData, sessionId, exportRequest);
  } catch (err) {
    yield put(Actions.getExportDataFailure(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(Constants.EXPORT_CUSTOM_QUIZ_LIST, exportCustomQuizRequest);
}
