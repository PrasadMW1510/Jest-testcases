import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import moment from 'moment';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';
import {
  makeSelectProfileSessionId,
  makeSelectProfileUserId,
  makeSelectProfileUserType,
} from '../App/selectors';

export function* getClassDataRequest() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const messageObj = '<>';
    const getClassData = yield call(Request.getPortfolioClassData, sessionId, userId, messageObj);
    const DataList = getClassData.output_data[0].classes[0].class.map(item => ({
      name: item.display_name[0],
      id: item.class_id[0],
      community_id: item.communityIds[0],
    }));
    yield put(Actions.getClassDataRequestSuccess(DataList));
  } catch (err) {
    yield put(Actions.getClassDataRequestSuccess([]));
  }
}

export function* getAssignmentMetaData() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const classId = userId;
    const messageObj = '<>';
    const getStudentAssignmnetData = yield call(
      Request.getAssignmentMetaData,
      sessionId,
      userId,
      classId,
      messageObj
    );

    let studentAssignmentList = [];
    if (getStudentAssignmnetData.output_data[0].workItemsMetadata[0] !== '') {
      studentAssignmentList = getStudentAssignmnetData.output_data[0].workItemsMetadata[0].workItemMetadata.map(
        item => ({
          id: item.$.workItemId,
          date: item.$.dateSubmitted,
          classId: item.$.classId,
          className: item.$.className,
          assignment: item.$.assignment,
          from: item.$.from,
          community_id: item.$.communityId,
          graded: item.$.graded,
          createdForClass: item.$.createdForClass,
          workItemId: item.$.workItemId,
          kind: item.$.kind,
          student: item.$.className,
          read: item.$.read,
        })
      );
    }
    if (studentAssignmentList.length > 0) {
      yield put(Actions.setStudentAssignmentRequestSuccess(studentAssignmentList));
    }
  } catch (err) {
    yield put(Actions.setStudentAssignmentRequestSuccess([]));
  }
}

const REFERENCE = moment();
const A_WEEK_OLD = REFERENCE.clone()
  .subtract(7, 'days')
  .startOf('day');
function isWithinAWeek(momentDate) {
  return momentDate.isAfter(A_WEEK_OLD);
}

export function* getStudentSubmissionMetaData() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const classId = userId;
    const messageObj = '<>';
    const getStudentSubmissionData = yield call(
      Request.getStudentSubmissionDataRequest,
      sessionId,
      userId,
      classId,
      messageObj
    );
    let unreadCount = 0;
    let submissions = 0;
    let newThisWeek = 0;
    let assunreadCount = 0;
    let asssubmissions = 0;
    let assnewThisWeek = 0;

    const studentSubmissionList = getStudentSubmissionData.output_data[0].workItemsMetadata[0].workItemMetadata.map(
      item => {
        moment.locale('en');
        const formattedDT = moment(`${item.$.dateSubmitted}`).format('YYYY-MM-DD');
        const checkWeek = isWithinAWeek(moment(formattedDT));
        if (
          item.$.read === 'false' &&
          item.$.graded === 'false' &&
          item.$.kind === 'SoftwareSubmission'
        ) {
          unreadCount += 1;
        }
        if (
          item.$.kind === 'ClassAssignment' &&
          item.$.read === 'false' &&
          item.$.graded === 'false'
        ) {
          assunreadCount += 1;
        }
        if (item.$.graded === 'false' && item.$.kind === 'SoftwareSubmission') {
          submissions += 1;
        }
        if (item.$.graded === 'false' && item.$.kind === 'ClassAssignment') {
          asssubmissions += 1;
        }
        if (item.$.graded === 'false' && item.$.kind === 'SoftwareSubmission' && checkWeek) {
          newThisWeek += 1;
        }
        if (item.$.graded === 'false' && item.$.kind === 'ClassAssignment' && checkWeek) {
          assnewThisWeek += 1;
        }
        return {
          id: item.$.workItemId,
          date: item.$.dateSubmitted,
          student: `${item.$.studentLastName}, ${item.$.studentFirstName}`,
          assignment: item.$.assignment,
          from: item.$.from,
          kind: item.$.kind,
          read: item.$.read,
          graded: item.$.graded,
          community_id: item.$.communityId,
          communityId: item.$.communityId,
          workItemId: item.$.workItemId,
          studentId: item.$.studentId,
          classId: item.$.classId,
          createdForClass: item.$.createdForClass,
        };
      }
    );
    yield put(Actions.setStudentRequestSuccess(studentSubmissionList));
    const counts = {
      submissions,
      newThisWeek,
      unreadCount,
      assunreadCount,
      asssubmissions,
      assnewThisWeek,
    };
    yield put(Actions.setStudentSetCount(counts));
  } catch (err) {
    const noCounts = {
      submissions: 0,
      newThisWeek: 0,
      unreadCount: 0,
      assunreadCount: 0,
      asssubmissions: 0,
      assnewThisWeek: 0,
    };
    yield put(Actions.setStudentSetCount(noCounts));
  }
}

export function* getStudentDataSubmissions() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const userType = yield select(makeSelectProfileUserType());
    const studentSubmissions = yield call(
      Request.getStudentSubmissionsData,
      sessionId,
      userId,
      userType
    );
    yield put(Actions.getStudentSubmissionSuccess(studentSubmissions));
  } catch (err) {
    yield put(Actions.getStudentSubmissionSuccess([]));
  }
}

export function* getPortfolioClassByCommunityID() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const messageObj = '<>';
    const getPortfolioClassData = yield call(
      Request.getClassByCommunityId,
      sessionId,
      userId,
      messageObj
    );
    const classList = getPortfolioClassData.output_data[0].classes[0].class;
    const studentList = yield classList.map(p =>
      call(Request.getEnrolmentByCommunityId, sessionId, p.class_id[0], messageObj)
    );
    const programList = [];
    const classUpdatedObj = classList.map((item, i) => {
      const classObj = {
        class_id: item.class_id[0],
        class_name: item.display_name[0],
      };
      const studentData = studentList[i].output_data[0].students[0].student.map(studentItem => {
        let appList = [];
        if (studentItem.applications[0] !== '') {
          appList = studentItem.applications[0].application.map(appItem => {
            if (programList.indexOf(appItem.app_id[0]) === -1) {
              programList.push(appItem.app_id[0]);
            }

            return {
              app_id: appItem.app_id[0],
              name: appItem.name[0],
            };
          });
        }
        return {
          studentid: studentItem.student_id[0],
          appData: appList,
        };
      });
      classObj.student = studentData;
      return classObj;
    });
    yield put(Actions.setProgramListSuccess(classUpdatedObj));
    yield put(Actions.setProgramListForTabSuccess(programList));
  } catch (err) {
    yield put(Actions.setProgramListForTabSuccess([]));
  }
}

export function* getRubricDefenitions() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const messageObj = '<>';
    const studentSubmissions = yield call(Request.getRubricData, sessionId, userId, messageObj);
    yield put(Actions.getRubricDefenitionSuccess(studentSubmissions));
  } catch (err) {
    yield put(Actions.getRubricDefenitionSuccess([]));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.GET_CLASS_DATA, getClassDataRequest),
    takeLatest(Constants.GET_STUDENT_SUBMISSION_META_DATA, getStudentSubmissionMetaData),
    takeLatest(Constants.GET_ASSIGNMENT_META_DATA, getAssignmentMetaData),
    takeLatest(Constants.GET_STUDENT_SUBMITTIONS, getStudentDataSubmissions),
    takeLatest(Constants.GET_PORTFOLIO_CLASS_BY_COMMUNITYID, getPortfolioClassByCommunityID),
    takeLatest(Constants.GET_RUBRIC_DEFENITIONS, getRubricDefenitions),
  ]);
}
