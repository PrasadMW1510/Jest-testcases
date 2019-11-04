// import { take, call, put, select } from 'redux-saga/effects';
import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';
import { makeSelectProfileSessionId, makeSelectProfileUserId } from '../App/selectors';

export function* getAssignmentSuccessRecordRequest(action) {
  const xmlPayload = `<workItemsSubset><workItemInfo workItemId="${
    action.payload.workItemId
  }" communityId="${action.payload.communityId}" studentId="${
    action.payload.studentId
  }" assignment="${action.payload.assignment}" kind="${action.payload.kind}"/></workItemsSubset>`;
  try {
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());
    const cohortId = yield select(makeSelectProfileUserId());
    const communityIds = 'R180NG,S44NG,S44JR,M180,M180Y2';
    const cohortType = 'teacher';
    const getAssignmentSuccessRecordData = yield call(
      Request.getAssignmentSuccessRecordData,
      sessionId,
      cohortId,
      communityIds,
      cohortType,
      xmlPayload
    );
    yield put(Actions.getAssignmentSuccessRecordSuccess(getAssignmentSuccessRecordData));
    yield put(hideLoading());
  } catch (err) {
    yield put(Actions.getAssignmentSuccessRecordFailure(err));
    yield put(hideLoading());
  }
}

export function* assignmentSaveSuccessRecordRequest(action) {
  const userId = yield select(makeSelectProfileUserId());
  const xmlPayload = `<evaluationUpdate submissionType="SUCCESS_PASSAGE_REC" studentId="${
    action.payload.studentId
  }" teacherId="${userId}" rubricType="SuccessPassageRec" workItemId="${action.payload.workItemId}">
  <questionNum>${action.payload.questionNum}</questionNum>
  <comment>${action.payload.comment}</comment>
</evaluationUpdate>`;
  try {
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());
    const cohortId = action.payload.communityId;
    const assignmentSaveSuccessRecordData = yield call(
      Request.assignmentSaveSuccessRecordData,
      sessionId,
      cohortId,
      xmlPayload
    );
    yield put(Actions.assignmentSuccessRecordSaveSuccess(assignmentSaveSuccessRecordData));
    yield put(hideLoading());
  } catch (err) {
    yield put(Actions.getAssignmentSuccessRecordFailure(err));
    yield put(hideLoading());
  }
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(Constants.GET_ASSIGNMENT_SUCCESS_RECORD_REQUEST, getAssignmentSuccessRecordRequest),
    takeLatest(
      Constants.ASSIGNMENT_SUCCESS_RECORD_SAVE_REQUEST,
      assignmentSaveSuccessRecordRequest
    ),
  ]);
}
