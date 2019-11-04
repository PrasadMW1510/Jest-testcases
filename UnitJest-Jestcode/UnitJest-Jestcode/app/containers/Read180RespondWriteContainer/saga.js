import { call, all, put, select, takeLatest } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import makeSelectRead180RespondWriteContainer from './selectors';
import { makeSelectProfileSessionId, makeSelectProfileUserId } from '../App/selectors';

import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';

export function* getRespondWriteRequest(rowItem) {
  try {
    yield put(showLoading());
    let stid = '';
    stid = rowItem.data.row.studentId ? rowItem.data.row.studentId : rowItem.data.row.id;
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const messageobj = `<workItemsSubset><workItemInfo workItemId="${
      rowItem.data.row.workItemId
    }" communityId="${
      rowItem.data.row.community_id
    }" studentId="${stid}" assignment="${rowItem.data.row.assignment.replace(
      '&',
      '&amp;'
    )}" kind="${rowItem.data.row.kind}"/></workItemsSubset>`;
    const read180ResponseWrite = yield call(
      Request.getRead180ResponseWrite,
      messageobj,
      sessionId,
      userId,
      `workItemId: ${rowItem.data.row.workItemId}`
    );
    if (rowItem.data.row.community_id === 'S44NG') {
      yield put(Actions.setRespondWrites44Request(read180ResponseWrite, rowItem.data.row));
      yield put(hideLoading());
    } else {
      yield put(Actions.setRespondWriteRequest(read180ResponseWrite, rowItem.data.row));
      yield put(hideLoading());
    }
  } catch (err) {
    yield put(Actions.setRespondWriteRequest([], []));
    yield put(hideLoading());
  }
}

export function* setRespondWriteDataRequest(dataArr) {
  const state = yield select(makeSelectRead180RespondWriteContainer());
  let submissionType = 'RESPOND_WRITE';
  let rubricType = 'RespondWrite';
  if (
    state.respondWrite &&
    state.respondWrite.writingActivitySubmission &&
    state.respondWrite.writingActivitySubmission[0].evaluation &&
    state.respondWrite.writingActivitySubmission[0].evaluation[0].$.submissionType
  ) {
    submissionType = state.respondWrite.writingActivitySubmission[0].evaluation[0].$.submissionType;
  }
  if (
    state.respondWrite &&
    state.respondWrite.writingActivitySubmission &&
    state.respondWrite.writingActivitySubmission[0].evaluation &&
    state.respondWrite.writingActivitySubmission[0].evaluation[0].$.rubricType
  ) {
    rubricType = state.respondWrite.writingActivitySubmission[0].evaluation[0].$.rubricType;
  }
  try {
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    let messageobj = `<evaluationUpdate submissionType="${submissionType}" studentId="${
      state.studentId
    }" teacherId="${userId}" rubricType="${rubricType}" workItemId="${state.workItemId}">
    <questionNum>NaN</questionNum>`;
    const data = dataArr.data;
    if (
      data.teacherScore1 ||
      data.teacherScore2 ||
      data.teacherScore3 ||
      data.teacherScore4 ||
      data.teacherScore5
    ) {
      messageobj += '<rubricScores>';
      if (data.teacherScore1 !== '') {
        messageobj += `<score rubricOrder="1">
        <teacherScore>${data.teacherScore1}</teacherScore>
      </score>`;
      }

      if (data.teacherScore2 !== '') {
        messageobj += `<score rubricOrder="2">
        <teacherScore>${data.teacherScore2}</teacherScore>
      </score>`;
      }

      if (data.teacherScore3 !== '') {
        messageobj += `<score rubricOrder="3">
        <teacherScore>${data.teacherScore3}</teacherScore>
      </score>`;
      }

      if (data.teacherScore4 !== '') {
        messageobj += `<score rubricOrder="4">
        <teacherScore>${data.teacherScore4}</teacherScore>
      </score>`;
      }

      if (data.teacherScore5 !== '') {
        messageobj += `<score rubricOrder="5">
        <teacherScore>${data.teacherScore5}</teacherScore>
      </score>`;
      }
      messageobj += '</rubricScores>';
    }
    if (data.comment !== '') {
      messageobj += `<comment>${data.comment}</comment>`;
    }
    messageobj += '</evaluationUpdate>';
    const appId = state.community_id;
    yield call(Request.setRead180ResponseWrite, messageobj, sessionId, appId);
    yield put(hideLoading());
  } catch (err) {
    yield put(hideLoading());
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.SET_RESPOND_WRITE_DATA_REQUEST, setRespondWriteDataRequest),
    takeLatest(Constants.GET_RESPOND_WRITE_REQUEST, getRespondWriteRequest),
  ]);
}
