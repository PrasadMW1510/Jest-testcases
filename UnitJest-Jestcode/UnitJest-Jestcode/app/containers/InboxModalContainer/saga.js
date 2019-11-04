import { call, put, select, takeLatest } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import {
  makeSelectProfileSessionId,
  makeSelectProfileUserId,
  makeSelectLoginData,
} from '../App/selectors';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';

/**
 * No selection, Roster Tab clicked
 */
/*
  Inbox Student Modal Popup information 
  searchOpts - XML Parameters 
*/
export function* getStudentProgramDetailsDataRequest(searchOpts) {
  try {
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const loginData = yield select(makeSelectLoginData());
    const studentSubmissions = yield call(
      Request.getStudentProgramDetailsDataRequestData,
      searchOpts.programdata,
      sessionId,
      userId,
      loginData.getIn(['user_type', 0])
    );
    yield put(Actions.getStudentProgramDetailsDataSuccess(studentSubmissions));
    if (studentSubmissions.output_data[0].workItems[0].mSkillsWorkItem !== undefined) {
      const questions = [];
      const questionPath =
        studentSubmissions.output_data[0].workItems[0].mSkillsWorkItem[0].mSkillsQuestion1[0]
          .question;
      const questionResult = yield call(Request.getStudentQuestionRequestData, questionPath);
      questions.push(questionResult);
      if (
        studentSubmissions.output_data[0].workItems[0].mSkillsWorkItem[0].mSkillsQuestion2 !==
        undefined
      ) {
        const questionPath2 =
          studentSubmissions.output_data[0].workItems[0].mSkillsWorkItem[0].mSkillsQuestion2[0]
            .question;
        const questionResult2 = yield call(Request.getStudentQuestionRequestData, questionPath2);
        questions.push(questionResult2);
      }

      if (
        studentSubmissions.output_data[0].workItems[0].mSkillsWorkItem[0].mSkillsQuestion3 !==
        undefined
      ) {
        const questionPath3 =
          studentSubmissions.output_data[0].workItems[0].mSkillsWorkItem[0].mSkillsQuestion3[0]
            .question;
        const questionResult3 = yield call(Request.getStudentQuestionRequestData, questionPath3);
        questions.push(questionResult3);
      }
      yield put(Actions.getStudentQuestionDataSuccess(questions));
    }
    yield put(hideLoading());
  } catch (err) {
    yield put(hideLoading());
  }
}

export function* getStudentQuestionDataRequest(filepath) {
  try {
    const studentSubmissions = yield call(Request.getStudentQuestionRequestData, filepath.path[0]);

    yield put(Actions.getStudentQuestionDataSuccess(studentSubmissions));
  } catch (err) {
    yield put(Actions.getStudentQuestionDataFailure(err));
  }
}

export function* saveStudentEvaluationData(inputparams) {
  try {
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());

    const evaluationdata = yield call(
      Request.saveStudentEvaluationDataRequest,
      sessionId,
      inputparams.evData.communityID,
      inputparams.postdata
    );
    yield put(Actions.saveStudentEvalulationDataSuccess(evaluationdata));
    yield put(hideLoading());
  } catch (err) {
    yield put(hideLoading());
  }
}

export default function* defaultSaga() {
  yield takeLatest(
    Constants.GET_STUDENT_PROGRAM_DETAIL_REQUEST,
    getStudentProgramDetailsDataRequest
  );
  yield takeLatest(Constants.GET_STUDENT_SKILL_ASSESTMENT_QUESTION, getStudentQuestionDataRequest);
  yield takeLatest(Constants.SAVE_STUDENT_EVALUATION_DATA, saveStudentEvaluationData);
}
