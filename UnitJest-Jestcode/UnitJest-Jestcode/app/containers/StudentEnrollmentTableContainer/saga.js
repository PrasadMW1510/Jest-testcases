import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { isUserTypeAdminOrTech } from 'utils/utilities';
import {
  makeSelectSmartBarContainer,
  makeSelectedActiveSchoolId,
  makeSelectedActiveTeacherId,
  makeSelectedActiveGradeId,
  makeSelectedActiveClassId,
  makeSelectedActiveGroupId,
  makeSelectedActiveStudentId,
} from 'containers/SmartBarContainer/selectors';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import { USER_ORG, COHORT_TYPE } from 'containers/App/constants';

import * as Request from './request';
import * as Actions from './actions';
import {
  makeSelectProfileDistrictId,
  makeSelectProfileSessionId,
  makeSelectLoginUserOrg,
  makeSelectProfileUserType,
  makeSelectProfileUserId,
  makeSelectProfileUserOrgId,
} from '../App/selectors';
import * as Constants from './constants';

export function* StudentEnrollmentFlow(action) {
  try {
    yield put(Actions.showStudentEnrollmentLoading());
    const studentEnroll = yield call(makeStudentRequest, action);
    yield put(Actions.studentEnrollRequestSuccess(studentEnroll));
    yield put(Actions.showStudentEnrollmentLoadingSuccess());
  } catch (err) {
    yield put(Actions.studentEnrollRequestFailure(err));
    yield put(Actions.showStudentEnrollmentLoadingFailure());
  }
}

export function* makeStudentRequest(action) {
  const sessionId = yield select(makeSelectProfileSessionId());
  const districtId = yield select(makeSelectProfileDistrictId());
  const activeSchoolId = yield select(makeSelectedActiveSchoolId());
  const activeTeacherId = yield select(makeSelectedActiveTeacherId());
  const activeGradeId = yield select(makeSelectedActiveGradeId());
  const activeClassId = yield select(makeSelectedActiveClassId());
  const activeGroupId = yield select(makeSelectedActiveGroupId());
  const activeStudentId = yield select(makeSelectedActiveStudentId());

  const orgType = yield select(makeSelectLoginUserOrg());
  const userType = yield select(makeSelectProfileUserType());
  let orgSchoolId;
  let orgTeacherId;
  if (orgType === USER_ORG.School && isUserTypeAdminOrTech(userType)) {
    orgSchoolId = yield select(makeSelectProfileUserOrgId());
  }
  if (orgType === USER_ORG.Teacher) {
    orgTeacherId = yield select(makeSelectProfileUserId());
  }

  // If user selects a new school in the smartbar, use the schoolId
  // associated with that action. Else use the active schoolId if available.
  const schoolId = action.schoolId || activeSchoolId || orgSchoolId;
  const gradeId = action.gradeId || activeGradeId;
  const teacherId = action.teacherId || activeTeacherId || orgTeacherId;
  const classId = action.classId || activeClassId;
  const groupId = action.groupId || activeGroupId;
  const studentId = action.studentId || activeStudentId;
  const payload = action.payload || {};

  if (action.schoolId) {
    return yield call(Request.getStudentEnrollmentForSchool, sessionId, action.schoolId, payload);
  } else if (studentId) {
    return yield call(Request.getStudentEnrollmentForStudent, sessionId, studentId, payload);
  } else if (groupId) {
    return yield call(Request.getStudentEnrollmentForGroup, sessionId, groupId, payload);
  } else if (classId) {
    return yield call(Request.getStudentEnrollmentForClass, sessionId, classId, payload);
  } else if (teacherId) {
    return yield call(Request.getStudentEnrollmentForTeacher, sessionId, teacherId, payload);
  } else if (gradeId) {
    return yield call(Request.getStudentEnrollmentForGrade, sessionId, schoolId, gradeId, payload);
  } else if (schoolId) {
    return yield call(Request.getStudentEnrollmentForSchool, sessionId, schoolId, payload);
  }
  return yield call(Request.getStudentEnrollmentForDistrict, sessionId, districtId, payload);
}

export function* StudentAppsUsageFlow() {
  try {
    const studentAppsUsage = yield call(makeStudentAppUsageRequest);
    yield put(Actions.studentAppsUsageRequestSuccess(studentAppsUsage));
  } catch (err) {
    yield put(Actions.studentAppsUsageRequestFailure(err));
  }
}

export function* makeStudentAppUsageRequest() {
  const sessionId = yield select(makeSelectProfileSessionId());
  const schoolId = yield select(makeSelectProfileUserOrgId());
  const orgType = yield select(makeSelectLoginUserOrg());
  const userType = yield select(makeSelectProfileUserType());
  if (orgType === USER_ORG.District && isUserTypeAdminOrTech(userType)) {
    return yield call(Request.getStudentAppsUsage, sessionId);
  }
  return yield call(Request.getStudentAppsUsageForSchool, sessionId, schoolId);
}

export function* StudentEnrollSaveFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    if (smartBarSelections.getIn(['selectedCohType']) === COHORT_TYPE.Student) {
      yield call(Request.getEnrollmentMigration, sessionId, action.studentEnroll);
    }
    yield call(Request.postStudentEnrollment, sessionId, action.studentEnroll);
    if (action.shouldReturn) {
      yield put(push('/roster'));
    } else {
      yield put(Actions.studentEnrollRequest({ currentPage: action.currentPage - 1 }));
      yield put(Actions.studentAppsUsageRequest());
    }
  } catch (err) {
    yield put(Actions.studentEnrollSaveRequestFailure(err));
  }
}

export function* StudentGetListRequestFlow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const studentGetList = yield call(Request.getListOfStudentsEnrollment, sessionId);
    yield put(Actions.studentGetListRequestSuccess(studentGetList));
  } catch (err) {
    yield put(Actions.studentGetListRequestFailure(err));
  }
}

export function* SamCentralStatusFLow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const samCentralStatus = yield call(Request.getSamCentralStatus, sessionId);
    yield put(Actions.samCentralStatusRequestSuccess(samCentralStatus));
  } catch (err) {
    yield put(Actions.samCentralStatusRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(
      [
        Constants.STUDENT_ENROLL_REQUEST,
        SmartBarConstants.GRADE_SELECTION_SUCCESS,
        SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
        SmartBarConstants.TEACHER_SELECTION_SUCCESS,
        SmartBarConstants.CLASS_SELECTION_SUCCESS,
        SmartBarConstants.GROUP_SELECTION_SUCCESS,
        SmartBarConstants.STUDENT_SELECTION_SUCCESS,
        SmartBarConstants.RESET_SELECTIONS,
      ],
      StudentEnrollmentFlow
    ),
    takeLatest(Constants.STUDENT_APPS_USAGE_REQUEST, StudentAppsUsageFlow),
    takeLatest(Constants.STUDENT_ENROLL_SAVE_REQUEST, StudentEnrollSaveFlow),
    takeLatest(Constants.STUDENT_GET_LIST_REQUEST, StudentGetListRequestFlow),
    takeLatest(Constants.SAM_CENTRAL_STATUS_REQUEST, SamCentralStatusFLow),
  ]);
}
