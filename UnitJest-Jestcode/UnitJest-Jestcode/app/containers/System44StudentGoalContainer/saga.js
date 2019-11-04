import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';
import { makeSelectProfileSessionId, makeSelectProfileUserId } from '../App/selectors';

export function* getCombinedStudentGoalsRequest(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const getCombinedStudentGoalsData = yield call(
      Request.getCombinedStudentGoalsData,
      action.studentId,
      sessionId
    );
    yield put(Actions.getCombinedStudentGoalsRequestSuccess(getCombinedStudentGoalsData));
  } catch (err) {
    yield put(Actions.getCombinedStudentGoalsRequestFailure(err));
  }
}

export function* getAllStudentGoalsRequest() {
  try {
    const userId = yield select(makeSelectProfileUserId());
    const sessionId = yield select(makeSelectProfileSessionId());
    const getAllStudentGoalsData = yield call(Request.getAllStudentGoalsData, userId, sessionId);
    yield put(Actions.getAllStudentGoalsRequestSuccess(getAllStudentGoalsData));
  } catch (err) {
    yield put(Actions.getAllStudentGoalsRequestFailure(err));
  }
}

export function* setStudentAcademicGoals(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const goalObj = yield action.value;
    const userId = yield action.studentId;
    const data = yield call(Request.setStudentAcademicGoals, userId, sessionId, goalObj);
    yield put(Actions.setStudentAcademicGoalsSuccess(data.output_data[0]));
  } catch (err) {
    yield put(Actions.setStudentAcademicGoalsError(err));
  }
}

export function* setStudentBehaviourGoals(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const goalObj = yield action.value;
    const userId = yield action.studentId;
    const isUpdate = yield action.isUpdate;
    const data = yield call(Request.setStudentBehaviourGoals, userId, sessionId, isUpdate, goalObj);
    yield put(Actions.setStudentBehaviourGoalsSuccess(data.output_data[0]));
  } catch (err) {
    yield put(Actions.setStudentBehaviourGoalsError(err));
  }
}

export function* updateStudentBehaviourGoals(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const goalObj = yield action.value;
    const userId = yield action.studentId;
    const isUpdate = yield action.isUpdate;
    const workItemId = yield action.workItemId;
    const data = yield call(
      Request.updateStudentBehaviourGoals,
      userId,
      sessionId,
      isUpdate,
      workItemId,
      goalObj
    );
    yield put(Actions.updateStudentBehaviourGoalsSuccess(data.output_data[0]));
  } catch (err) {
    yield put(Actions.updateStudentBehaviourGoalsError(err));
  }
}

export function* getStudentSubmissionsRequest(action) {
  const xmlPayload = `<workItemsSubset>
  <workItemInfo
      workItemId="${action.payload.metaData[action.payload.selectedIndex].workItemId}"
      communityId="${action.payload.metaData[action.payload.selectedIndex].communityId}"
      studentId="${action.payload.metaData[action.payload.selectedIndex].id}"
      assignment="${action.payload.metaData[action.payload.selectedIndex].assignment}"
      kind="${action.payload.metaData[action.payload.selectedIndex].kind}"/>
      </workItemsSubset>`;
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const cohortId = yield select(makeSelectProfileUserId());
    const communityIds = yield 'R180NG,S44NG,S44JR,M180,M180Y2';
    const cohortType = yield 'teacher';
    const data = yield call(
      Request.getStudentSubmissions,
      sessionId,
      cohortId,
      communityIds,
      cohortType,
      xmlPayload
    );
    yield put(Actions.getStudentSubmissionsRequestSuccess(data));
  } catch (err) {
    yield put(Actions.getStudentSubmissionsRequestError(err));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.GET_COMBINED_STUDENT_GOALS_REQUEST, getCombinedStudentGoalsRequest),
    takeLatest(Constants.GET_ALL_STUDENT_GOALS_REQUEST, getAllStudentGoalsRequest),
    takeLatest(Constants.SET_STUDENT_ACADEMIC_GOALS, setStudentAcademicGoals),
    takeLatest(Constants.SET_STUDENT_BEHAVIOURAL_GOALS, setStudentBehaviourGoals),
    takeLatest(Constants.UPDATE_STUDENT_BEHAVIOURAL_GOALS, updateStudentBehaviourGoals),
    takeLatest(Constants.GET_STUDENT_SUBMISSIONS_REQUEST, getStudentSubmissionsRequest),
  ]);
}
