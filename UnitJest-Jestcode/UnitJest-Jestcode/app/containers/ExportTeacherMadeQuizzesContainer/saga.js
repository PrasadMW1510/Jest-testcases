import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import { all, call, select, takeLatest, put } from 'redux-saga/effects';
import * as Constants from './constants';
import { makeSelectProfileSessionId } from '../App/selectors';
// import { hideModal } from 'containers/ModalController/actions';
import * as Request from './request';
import * as Actions from './actions';

export function* postExportTeacherMadeQuizRequest(action) {
  try {
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());
    const tableData = action.quizData;
    // const rootElm = {
    //   ExportTeacherMadeQuizReq: {
    //     Export: {
    //       QuizID: tableData.map(id => id.QuizID[0]),
    //     },
    //   },
    // };
    let rootElm = '<ExportTeacherMadeQuizReq><Export>';
    tableData.map(id => {
      rootElm += `<QuizId>${id.QuizID[0]}</QuizId>`;
      return rootElm;
    });
    rootElm += '</Export></ExportTeacherMadeQuizReq>';
    yield call(Request.postExportTeacherMadeQuizReq, sessionId, rootElm);
    yield put(Actions.postExportTeacherMadeQuizRequestSuccess());
    yield put(hideLoading());
  } catch (err) {
    yield put(Actions.postExportTeacherMadeQuizRequestFailure(err));
    yield put(hideLoading());
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.EXPORT_TEACHER_MADE_QUIZZES_LIST, postExportTeacherMadeQuizRequest),
  ]);
}
