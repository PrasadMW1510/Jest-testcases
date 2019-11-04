import { call, all, put, select, takeLatest } from 'redux-saga/effects';
import * as Constants from './constants';
import { makeSelectProfileSessionId } from '../App/selectors';
import * as Actions from './actions';
import * as PortfolioActions from '../PortfolioPageContainer/actions';
import * as Request from './request';

export function* getAssignmentDataRequest(assignmentData) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const requestData = `<workItemsSubset><workItemInfo workItemId="${
      assignmentData.data.classId.workItemId
    }" communityId= "${
      assignmentData.data.classId.workItemId.community_id
    }" studentId="null" assignment="${
      assignmentData.data.classId.assignment
    }" kind="ClassAssignment"/></workItemsSubset>`;
    const assignmentResultData = yield call(
      Request.postAssignmentData,
      sessionId,
      assignmentData.data.classId,
      requestData
    );
    yield put(Actions.getAssignmentDataSuccess(assignmentResultData));
    const studentDetails = yield call(
      Request.getStudentDetails,
      sessionId,
      assignmentData.data.classId.classId
    );

    yield put(Actions.getStudentDetailsSuccess(studentDetails));
  } catch (err) {
    yield put(Actions.getAssignmentDataFailure(err));
  }
}

export function* getStudentDetailsRequest(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const classId = yield action.data;
    const studentDetails = yield call(Request.getStudentDetails, sessionId, classId);

    yield put(Actions.getStudentDetailsSuccess(studentDetails));
  } catch (err) {
    yield put(Actions.getStudentDetailsFailure(err));
  }
}

const generateSaveAssignmentPayload = data => {
  const { students, assignmentName, assignmentType, dueDate, description, communityId } = data;
  let tags;
  const studentsTags = students.map(student => {
    if (communityId === 'R180NG' || communityId === 'S44NG') {
      tags = `<student>
      <userId>${student.userId[0]}</userId>
      <average>${student.average[0]}</average>
      <comment>${student.comment[0]}</comment>
      <score>${student.score[0]}</score>
      <total>${student.total[0]}</total>
    </student>`;
    } else {
      tags = `<student>
                <userId>${student.userId[0]}</userId>
                <average>${student.average[0]}</average>
                <comment>${student.comment[0]}</comment>
              </student>`;
    }
    return tags;
  });
  const payload = `<classAssignmentGroup wholeClass="false">
      <assignmentName>${assignmentName}</assignmentName>
      <assignmentType>${assignmentType}</assignmentType>
      <dueDate>${dueDate}</dueDate> 
      <description>${description || ''}</description>
      <classAssignment communityId="${communityId}">
        <studentAssignments>
        ${studentsTags.join('\n')}
        </studentAssignments>
      </classAssignment>
    </classAssignmentGroup>`;
  return payload;
};

export function* saveAssignmentRequest(action) {
  const workItemId = yield action.data.metaData[action.data.currentIndex].workItemId;
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const payload = yield generateSaveAssignmentPayload(action.data);
    const saveAssignmentResponse = yield call(
      Request.saveAssignmentRequest,
      sessionId,
      false,
      workItemId,
      payload
    );
    yield put(Actions.saveAssignmentRequestSuccess(saveAssignmentResponse));
    yield put(PortfolioActions.getStudentSubmissions());
  } catch (err) {
    yield put(Actions.saveAssignmentRequestError(err));
  }
}

export function* deleteAssignmentRequest(action) {
  const sessionId = yield select(makeSelectProfileSessionId());
  const { workItemId } = action.data;
  try {
    const deleteResponse = yield call(
      Request.deleteAssignmentRequest,
      sessionId,
      false,
      workItemId
    );
    yield put(Actions.deleteAssignmentRequestSuccess(deleteResponse));
  } catch (error) {
    yield put(Actions.deleteAssignmentRequestError(error));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.GET_ASSIGNMENT_REQUEST, getAssignmentDataRequest),
    takeLatest(Constants.GET_STUDENT_DETAILS, getStudentDetailsRequest),
    takeLatest(Constants.SAVE_ASSGINMENT_REQUEST, saveAssignmentRequest),
    takeLatest(Constants.DELETE_ASSIGNMENT_REQUEST, deleteAssignmentRequest),
  ]);
}
