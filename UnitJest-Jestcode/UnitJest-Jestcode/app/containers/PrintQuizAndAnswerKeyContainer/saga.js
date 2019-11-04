import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { getBaseUrl } from 'utils/request';
import { makeSelectProfileSessionId } from '../App/selectors';
import * as Constants from './constants';
import * as Actions from './actions';
import * as Request from './request';

export function* printQuizAndAnswerKeyRequest(quizObj) {
  try {
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());
    let initialNumberOfQs = quizObj.data.initialNumberOfQs;
    if (initialNumberOfQs > 30) {
      initialNumberOfQs = 30;
    }
    const quizId = quizObj.data && quizObj.data.initialId[0];
    const rootElm = {
      GetQuizWithQuestionsReq: {
        QuizID: quizId,
      },
    };
    const getQuizWithQsElem = `<PrintQuizReq><IncludeAnswerKey>true</IncludeAnswerKey><QuestionCount>${initialNumberOfQs}</QuestionCount><QuizID>${quizId}</QuizID></PrintQuizReq>`;
    yield call(Request.getQuizWithQuestions, sessionId, rootElm);
    yield call(Request.getPrintQuizAndAnswerData, sessionId, getQuizWithQsElem);
    yield put(hideLoading());
  } catch (err) {
    yield put(Actions.getPreviewDataFailure(err));
    window.open(`${getBaseUrl()}/SlmsReportPdf/undefined/undefined`, '_blank');
    yield put(hideLoading());
  }
}

export default function* defaultSaga() {
  yield all([takeLatest(Constants.PRINT_QUIZ_AND_ANSWER_KEY, printQuizAndAnswerKeyRequest)]);
}
