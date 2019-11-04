import { makeSelectedbookresults } from 'containers/SearchResultsContainer/actions';
import { all, call, select, takeLatest, put } from 'redux-saga/effects';
import { hideModal } from 'containers/ModalController/actions';
import * as Constants from './constants';
import { makeSelectProfileSessionId } from '../App/selectors';
import * as Request from './request';
import * as Actions from './actions';

export function* postactivateQuizRequest(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const tableData = action.activateQuizPreviewData;
    let rootElm = '<SetQuizActivationReq><ActiveState>true</ActiveState><Quizzes>';
    tableData.map(id => {
      rootElm += `<QuizId>${id.QuizID[0]}</QuizId>`;
      return rootElm;
    });
    rootElm += '</Quizzes></SetQuizActivationReq>';
    yield call(Request.postActivateQuizRequest, sessionId, rootElm);
    const mappedVal = tableData.map(val => {
      const value = val;
      value.QuizActive = ['true'];
      return val;
    });
    yield put(makeSelectedbookresults(mappedVal));
    yield put(hideModal());
  } catch (err) {
    yield put(Actions.getPostActivateRequestFailure(err));
    yield put(hideModal());
  }
}

export default function* defaultSaga() {
  yield all([takeLatest(Constants.ACTIVATE_QUIZ_LIST, postactivateQuizRequest)]);
}
