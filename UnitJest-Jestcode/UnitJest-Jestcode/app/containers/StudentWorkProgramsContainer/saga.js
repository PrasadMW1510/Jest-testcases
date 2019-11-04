import { all, call, takeLatest, select, put } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import { hideModal } from 'containers/ModalController/actions';
import moment from 'moment';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';
import { makeSelectProfileSessionId, makeSelectProfileUserId } from '../App/selectors';

export function* getIreadStudentWorkDataRequest(studentData) {
  let studentObj = '';
  studentObj = `<workItemsSubset>
    <workItemInfo
      workItemId="${studentData.data.workItemId}"
      communityId="${studentData.data.communityId}"
      studentId="${studentData.data.id}"
      assignment="${studentData.data.assignment}"
      kind="ClassAssignment"/>
    </workItemsSubset>`;
  try {
    yield put(showLoading());
    const userId = yield select(makeSelectProfileUserId());
    const sessionId = yield select(makeSelectProfileSessionId());
    const iReadStudentWorkData = yield call(
      Request.getIReadStudentWorkDataRequest,
      sessionId,
      userId,
      studentObj
    );
    yield put(Actions.getIReadStudentWorkDataRequestSuccess(iReadStudentWorkData));
    yield put(hideLoading());
  } catch (err) {
    yield put(Actions.getIReadStudentWorkDataRequestFailure(err));
    yield put(hideLoading());
  }
}

export function* saveIreadStudentWorkDataRequest(obj) {
  const studData = obj.data;
  const userId = yield select(makeSelectProfileUserId());
  const dueDate = moment(studData.date).format('YYYY-MM-DD');
  let studentObj = '';
  studentObj = `<classAssignmentGroup wholeClass="false">
    <assignmentName>${studData.assignment}</assignmentName>
    <assignmentType>${studData.from}</assignmentType>
    <dueDate>${dueDate}</dueDate>
    <description/>
    <classAssignment communityId="${studData.communityId}">
      <studentAssignments>
        <student>
          <userId>${userId}</userId>
          <score/>
          <total/>
          <average>${obj.formState.dataOfWCPM}</average>
          <comment>${obj.formState.commentsVal}</comment>
        </student>
      </studentAssignments>
    </classAssignment>
  </classAssignmentGroup>`;
  try {
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());
    const iReadStudentWorkData = yield call(
      Request.postIReadStudentWorkData,
      sessionId,
      studData.workItemId,
      studentObj
    );
    yield put(Actions.saveIReadStudentWorkDataRequestSuccess(iReadStudentWorkData));
    yield put(hideLoading());
  } catch (err) {
    yield put(Actions.saveIReadStudentWorkDataRequestFailure(err));
    yield put(hideLoading());
  }
}

export function* deleteIreadStudentWorkDataRequest(studentData) {
  const studentObj = '<>';
  try {
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());
    const iReadStudentWorkData = yield call(
      Request.delIReadStudentWorkData,
      sessionId,
      studentData.data.workItemId,
      studentObj
    );
    yield put(Actions.delIReadStudentWorkDataSuccess(iReadStudentWorkData));
    yield put(hideLoading());
    yield put(hideModal());
  } catch (err) {
    yield put(Actions.delIReadStudentWorkDataFailure(err));
    yield put(hideLoading());
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.GET_IREAD_STUDENT_WORK_DATA, getIreadStudentWorkDataRequest),
    takeLatest(Constants.DELETE_IREAD_STUDENT_WORK, deleteIreadStudentWorkDataRequest),
    takeLatest(Constants.POST_IREAD_STUDENT_WORK_DATA, saveIreadStudentWorkDataRequest),
  ]);
}
