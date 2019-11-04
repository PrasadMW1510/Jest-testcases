import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';
import makeSelectInboxContainer from './selectors';
import { makeSelectProfileSessionId, makeSelectProfileUserId } from '../App/selectors';

export function* getInBoxClassDataRequest() {
  const state = yield select(makeSelectInboxContainer());
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const messageObj = '<>';
    const getInboxClassData = yield call(
      Request.getInBoxGridRequest,
      sessionId,
      userId,
      messageObj
    );
    const inboxClassList = getInboxClassData.output_data[0].classes[0].class;

    if (inboxClassList !== undefined) {
      inboxClassList.map(item => {
        const classObj = {
          name: item.name[0],
          class_id: item.class_id[0],
        };
        state.inBoxClassData[0].children.push(classObj);
        return classObj;
      });
      yield put(Actions.setInBoxGridRequestSuccess(state.inBoxClassData));
    } else {
      yield put(Actions.setInBoxGridRequestSuccess([]));
    }
  } catch (err) {
    yield put(Actions.setInBoxGridRequestSuccess([]));
  }
}

export function* getStudentSubmissionMetaData(data) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const classId = data.classId;
    const messageObj = '<>';
    const getStudentSubmissionData = yield call(
      Request.getStudentSubmissionDataRequest,
      sessionId,
      userId,
      classId,
      messageObj
    );
    if (getStudentSubmissionData.output_data[0].workItemsMetadata[0] !== '') {
      const studentSubmissionList = getStudentSubmissionData.output_data[0].workItemsMetadata[0].workItemMetadata.map(
        item => ({
          id: item.$.studentId,
          date: item.$.dateSubmitted,
          student: `${item.$.studentFirstName} ${item.$.studentLastName}`,
          assignment: item.$.assignment,
          from: item.$.from,
          workItemId: item.$.workItemId,
          link: ' ',
        })
      );
      yield put(Actions.setStudentRequestSuccess(studentSubmissionList));
    } else {
      yield put(Actions.setStudentRequestSuccess([]));
    }
  } catch (err) {
    yield put(Actions.setStudentRequestSuccess([]));
  }
}

export function* getStudentListForClass(classId) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userID = yield select(makeSelectProfileUserId());
    const messageObj = '<>';
    const getstudentlistData = yield call(
      Request.getStudentListClassData,
      sessionId,
      classId,
      userID,
      messageObj
    );
    if (getstudentlistData.output_data[0].workItemsMetadata[0] !== '') {
      const studentSubmissionList = getstudentlistData.output_data[0].workItemsMetadata[0].workItemMetadata.map(
        item => ({
          id: item.$.studentId,
          date: item.$.dateSubmitted,
          student: `${item.$.studentLastName} ${item.$.studentFirstName}`,
          assignment: item.$.assignment,
          from: item.$.from,
          workItemId: item.$.workItemId,
          link: ' ',
        })
      );
      yield put(Actions.setStudentRequestSuccess(studentSubmissionList));
    } else {
      yield put(Actions.setStudentRequestSuccess([]));
    }
  } catch (err) {
    yield put(Actions.setStudentRequestSuccess([]));
  }
}

export function* setTreeAndGridData(data) {
  const state = yield select(makeSelectInboxContainer());
  Object.assign(state.inBoxClassData[1], { toggled: true });
  yield put(Actions.setAssignmentClassSuccess(state.inBoxClassData, data.newGridData));
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.GET_INBOX_CLASS_TREELIST, getInBoxClassDataRequest),
    takeLatest(Constants.GET_STUDENT_SUBMISSION_META_DATA, getStudentSubmissionMetaData),
    takeLatest(Constants.GET_STUDENT_LIST_CLASS, getStudentListForClass),
    takeLatest(Constants.SET_TEMP_GRIDDATA_WITH_TREE, setTreeAndGridData),
  ]);
}
