import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';
import { makeSelectProfileSessionId, makeSelectProfileUserId } from '../App/selectors';
export function* getPfAssignClassGridDataRequest(classId) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const messageObj = '<>';
    const getPfAsignData = yield call(
      Request.getPfAsignGridRequest,
      sessionId,
      userId,
      classId,
      messageObj
    );
    const assignmentList = getPfAsignData.output_data[0].workItemsMetadata[0].workItemMetadata;
    if (assignmentList !== undefined) {
      const classSubmissionList = assignmentList.map(item => ({
        id: item.$.classId,
        date: item.$.dateSubmitted,
        student: item.$.className,
        assignment: item.$.assignment,
        from: item.$.from,
        link: ' ',
        workItemId: item.$.workItemId,
        community_id: item.$.communityId,
        graded: item.$.graded,
        classId: item.$.classId,
        createdForClass: item.$.createdForClass,
      }));
      yield put(Actions.setClassGridRequestSuccess(classSubmissionList));
    } else {
      yield put(Actions.setClassGridRequestSuccess([]));
    }
  } catch (err) {
    yield put(Actions.setClassGridRequestSuccess([]));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(
      Constants.GET_PORTFOLIO_ASSIGNMENT_CLASSES_ASS_LIST,
      getPfAssignClassGridDataRequest
    ),
  ]);
}
