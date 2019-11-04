// import { take, call, put, select } from 'redux-saga/effects';
import { call, all, put, select, takeLatest } from 'redux-saga/effects';
import * as Constants from './constants';
import { makeSelectProfileSessionId } from '../App/selectors';
import * as Actions from './actions';
import * as PortfolioActions from '../PortfolioPageContainer/actions';
import * as Request from './request';

// Individual exports for testing
export function* getStudentDetailsRequest(stuClassID) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const studentDetails = yield call(Request.getStudentDetails, sessionId, stuClassID.data);

    yield put(Actions.getStudentDetailsSuccess(studentDetails));
  } catch (err) {
    yield put(Actions.getStudentDetailsFailure(err));
  }
}

export function* postNewAssignmentRequest(assignmentData) {
  try {
    // console.log(assignmentData, ' Request Assignment Data');
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
    // error
  }
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(Constants.GET_STUDENT_DETAILS, getStudentDetailsRequest),
    takeLatest(Constants.POST_NEW_ASSIGNMENT, postNewAssignmentRequest),
  ]);
}
