import { makeSelectedbookresults } from 'containers/SearchResultsContainer/actions';
import { hideModal } from 'containers/ModalController/actions';
import { all, call, select, takeLatest, put } from 'redux-saga/effects';
import * as Constants from './constants';
import { makeSelectProfileSessionId } from '../App/selectors';
import * as Request from './request';
import * as Actions from './actions';

export function* postDeactivateQuizRequest(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const tableData = action.tableData;
    // const rootElm = {
    //   SetQuizActivationReq: {
    //     ActiveState: false,
    //     Quizzes: { QuizID: tableData.map(id => id.QuizID[0]) },
    //   },
    // };
    let rootElm = '<SetQuizActivationReq><ActiveState>false</ActiveState><Quizzes>';
    tableData.map(id => {
      rootElm += `<QuizId>${id.QuizID[0]}</QuizId>`;
      return rootElm;
    });
    rootElm += '</Quizzes></SetQuizActivationReq>';
    yield call(Request.postDeactivateQuizRequest, sessionId, rootElm);
    const mappedVal = tableData.map(val => {
      const value = val;
      value.QuizActive = ['false'];
      return val;
    });
    yield put(makeSelectedbookresults(mappedVal));
    yield put(hideModal());
  } catch (err) {
    yield put(Actions.getPostDeactivateRequestFailure(err));
    yield put(hideModal());
  }
}

export default function* defaultSaga() {
  yield all([takeLatest(Constants.DEACTIVATE_QUIZ_LIST, postDeactivateQuizRequest)]);
}
