import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';
import { makeSelectProfileSessionId } from '../App/selectors';

export function* getInstalledQuizDataRequest() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const getInstalledQuizData = yield call(Request.getInstalledQuizData, sessionId);
    yield put(Actions.getInstalledQuizDataRequestSuccess(getInstalledQuizData));
  } catch (err) {
    yield put(Actions.getInstalledQuizDataRequestFailure(err));
  }
}

export function* postTeacherMadeQuizRequest(postData) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());

    const postQuizData = yield call(Request.postTeacherMadeQuizRequest, sessionId, postData);
    if (
      postQuizData &&
      postQuizData.output_data[0] &&
      postQuizData.output_data[0].SetQuizResp[0] &&
      postQuizData.output_data[0].SetQuizResp[0].QuizID[0]
    ) {
      yield put(Actions.getInstalledQuizDataRequest());
    } else {
      yield put(Actions.postTeacherMadeQuizRequestFailure({ error: 'post failed' }));
    }
  } catch (err) {
    yield put(Actions.postTeacherMadeQuizRequestFailure(err));
  }
}
export function* postTeacherMadeQuizDetailRequest(value) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const quizId = { GetQuizWithQuestionsReq: { QuizID: value.key[0] } };
    const getQuizDetail = yield call(Request.getQuizDetailData, sessionId, quizId);
    yield put(Actions.getInstalledQuizDetailDataRequestSuccess(getQuizDetail));
  } catch (err) {
    yield put(Actions.getInstalledQuizDataRequestFailure(err));
  }
}

export function* deleteTeacherMadeQuizRequest(quizid) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const quizdelObj = `<DeleteTeacherMadeQuizReq><Delete><QuizID>${
      quizid.quizId[0]
    }</QuizID></Delete></DeleteTeacherMadeQuizReq>`;
    const deleteQuizDetail = yield call(Request.deleteQuizDetailData, sessionId, quizdelObj);
    if (
      deleteQuizDetail &&
      deleteQuizDetail.output_data[0] &&
      deleteQuizDetail.output_data[0].DeleteTeacherMadeQuizResp[0] &&
      deleteQuizDetail.output_data[0].DeleteTeacherMadeQuizResp[0].result[0] &&
      deleteQuizDetail.output_data[0].DeleteTeacherMadeQuizResp[0].result[0] === 'succeed'
    ) {
      yield put(Actions.getInstalledQuizDataRequest());
    } else {
      yield put(Actions.deleteTeacherMadeQuizRequestFailure({ error: 'Quiz not deleted' }));
    }
    yield put(Actions.deleteTeacherMadeQuizRequestSuccess(deleteQuizDetail));
  } catch (err) {
    yield put(Actions.deleteTeacherMadeQuizRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.GET_INSTALLEDQUIZDATA_REQUEST, getInstalledQuizDataRequest),
    takeLatest(Constants.POST_ADD_TEACHERMADEQUIZ_REQUEST, postTeacherMadeQuizRequest),
    takeLatest(Constants.GET_ADD_TEACHERMADEQUIZ_DETAILS_REQUEST, postTeacherMadeQuizDetailRequest),
    takeLatest(Constants.DELETE_TEACHERMADEQUIZ_REQUEST, deleteTeacherMadeQuizRequest),
  ]);
}
