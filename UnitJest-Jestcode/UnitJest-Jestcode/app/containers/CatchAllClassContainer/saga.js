import { call, all, put, select, takeLatest } from 'redux-saga/effects';
import * as Constants from './constants';
import { makeSelectProfileSessionId } from '../App/selectors';
import * as Actions from './actions';
import * as PortfolioActions from '../PortfolioPageContainer/actions';
import * as Request from './request';

// Individual exports for testing
export function* getStudentDetailsRequest(studentInfo) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const studentDetails = yield call(Request.getStudentDetails, sessionId, studentInfo.data);

    yield put(Actions.getStudentDetailsSuccess(studentDetails));
  } catch (err) {
    yield put(Actions.getStudentDetailsFailure(err));
  }
}

export function* postNewAssignmentRequest(assignmentData) {
  try {
    const requestData = `<classAssignmentGroup wholeClass="false">
    <assignmentName>${assignmentData.data.assignmentName}</assignmentName>
    <assignmentType>${assignmentData.data.assignmentType}</assignmentType>
    <dueDate>${assignmentData.data.dueDate}</dueDate>
    <description/>
    <createdForClass>${assignmentData.data.createdForClass}</createdForClass>
    <classAssignment communityId="${assignmentData.data.communityId}">
      <studentAssignments>
        <student>
          <userId>${assignmentData.data.studentId}</userId>
          <average>${assignmentData.data.average}</average>
          <comment>${assignmentData.data.comment}</comment>
        </student>
      </studentAssignments>
    </classAssignment>
  </classAssignmentGroup>`;
    const sessionId = yield select(makeSelectProfileSessionId());
    const assignmentDetails = yield call(Request.postNewAssignment, sessionId, requestData);
    yield put(Actions.postSaveNewAssignmentSuccess(assignmentDetails));
    yield put(PortfolioActions.getStudentSubmissions());
  } catch (err) {
    yield put(Actions.postSaveNewAssignmentFailure(err));
  }
}

export function* setRead180AssignmentData(read180ninfo) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const payload = yield generateSaveAssignmentPayload(read180ninfo.postData);
    const read180Response = yield call(Request.setRead180DataRequestAction, payload, sessionId);
    yield put(Actions.setRead180ngAssignmentRequest(read180Response));
  } catch (err) {
    yield put(Actions.setRead180DataRequestFailure(err));
  }
}

const generateSaveAssignmentPayload = data => {
  const { students, name, selected, dateValue, desc } = data;
  const studentsTags = students.map(student => {
    if (student.checked === true) {
      let studentData = '';
      studentData = `<student>`;
      if (student.student_id[0] !== '') {
        studentData = `${studentData}
        <userId>${student.student_id[0]}</userId>`;
      }
      if (student.average !== '') {
        studentData = `${studentData}
        <average>${student.average}</average>`;
      }
      if (student.comment !== '') {
        studentData = `${studentData}
        <comment>${student.comment}</comment>`;
      }
      if (student.score !== '') {
        studentData = `${studentData}
        <score>${student.score}</score>`;
      }
      if (student.total !== '') {
        studentData = `${studentData}
        <total>${student.total}</total>`;
      }
      studentData = `${studentData}
      </student>`;

      return studentData;
    }
    return '';
  });
  let assignmentType = selected;

  if (selected === '') assignmentType = 'QuickWrites';

  const payload = `<classAssignmentGroup wholeClass="false">
      <assignmentName>${name}</assignmentName>
      <assignmentType>${assignmentType}</assignmentType>
      <dueDate>${dateValue}</dueDate> 
      <description>${desc || ''}</description>
      <createdForClass>1adfp8k9nkpicco59aigb1b9_2efa7f0</createdForClass>
      <classAssignment communityId="S44NG">
        <studentAssignments>
        ${studentsTags.join('\n')}
        </studentAssignments>
      </classAssignment>
    </classAssignmentGroup>`;
  return payload;
};

// Individual exports for testing
export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.GET_STUDENT_DETAILS, getStudentDetailsRequest),
    takeLatest(Constants.POST_NEW_ASSIGNMENT, postNewAssignmentRequest),
    takeLatest(Constants.SET_180_NG_ASSIGNMENT_DATA, setRead180AssignmentData),
  ]);
  // See example in containers/HomePage/saga.js
}
