import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { isUserTypeAdminOrTech } from 'utils/utilities';
import {
  makeSelectedActiveSchoolId,
  makeSelectedActiveTeacherId,
  makeSelectedActiveGradeId,
} from 'containers/SmartBarContainer/selectors';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import { USER_ORG } from 'containers/App/constants';

import * as Request from './request';
import * as Actions from './actions';
import {
  makeSelectProfileDistrictId,
  makeSelectProfileSessionId,
  makeSelectLoginUserOrg,
  makeSelectProfileUserType,
  makeSelectProfileUserOrgId,
} from '../App/selectors';
import * as Constants from './constants';

export function* TeacherEnrollmentFlow(action) {
  try {
    // The pathname in url can potentially be different depending how user
    // accesses this tab, so redirection not handled in SmartBar saga.
    if (action.classId || action.studentId || action.groupId) {
      return yield put(push('/roster'));
    }
    const teacherEnroll = yield call(makeTeacherRequest, action);
    yield put(Actions.teacherEnrollRequestSuccess(teacherEnroll));
  } catch (err) {
    yield put(Actions.teacherEnrollRequestFailure(err));
  }
}

export function* makeTeacherRequest(action) {
  const sessionId = yield select(makeSelectProfileSessionId());
  const districtId = yield select(makeSelectProfileDistrictId());
  const activeSchoolId = yield select(makeSelectedActiveSchoolId());
  const activeTeacherId = yield select(makeSelectedActiveTeacherId());
  const activeGradeId = yield select(makeSelectedActiveGradeId());

  const orgType = yield select(makeSelectLoginUserOrg());
  const userType = yield select(makeSelectProfileUserType());
  let orgSchoolId;
  if (orgType === USER_ORG.School && isUserTypeAdminOrTech(userType)) {
    orgSchoolId = yield select(makeSelectProfileUserOrgId());
  }

  // If user selects a new school in the smartbar, use the schoolId
  // associated with that action. Else use the active schoolId if available.
  const schoolId = action.schoolId || activeSchoolId || orgSchoolId;
  const gradeId = action.gradeId || activeGradeId;
  const teacherId = action.teacherId || activeTeacherId;
  const payload = action.payload || {};

  // User selected school in smartbar
  if (action.schoolId) {
    return yield call(Request.getTeacherEnrollmentForSchool, sessionId, action.schoolId, payload);
  } else if (teacherId && !action.gradeId) {
    return yield call(
      Request.getTeacherEnrollmentForTeacher,
      sessionId,
      schoolId,
      teacherId,
      payload
    );
  } else if (gradeId) {
    return yield call(Request.getTeacherEnrollmentForGrade, sessionId, schoolId, gradeId, payload);
  } else if (schoolId) {
    return yield call(Request.getTeacherEnrollmentForSchool, sessionId, schoolId, payload);
  }
  return yield call(Request.getTeacherEnrollmentForDistrict, sessionId, districtId, payload);
}

export function* TeacherAppsUsageFlow(action) {
  try {
    const teacherAppsUsage = yield call(makeTeacherAppUsageRequest, action);
    yield put(Actions.teacherAppsUsageRequestSuccess(teacherAppsUsage));
  } catch (err) {
    yield put(Actions.teacherAppsUsageRequestFailure(err));
  }
}

export function* makeTeacherAppUsageRequest(action) {
  const sessionId = yield select(makeSelectProfileSessionId());
  const schoolId = yield select(makeSelectProfileUserOrgId());
  const orgType = yield select(makeSelectLoginUserOrg());
  const userType = yield select(makeSelectProfileUserType());

  // A school id selected in smartbar takes precedence
  if (action && action.schoolId) {
    return yield call(Request.getTeacherAppsUsageForSchool, sessionId, action.schoolId);
  }

  if (orgType === USER_ORG.School && isUserTypeAdminOrTech(userType)) {
    return yield call(Request.getTeacherAppsUsageForSchool, sessionId, schoolId);
  }
  return yield call(Request.getTeacherAppsUsage, sessionId);
}

export function* TeacherAccessSaveFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    yield call(Request.postTeacherEnrollment, sessionId, action.teacherEnroll);
    if (action.shouldReturn) {
      yield put(push('/roster'));
    } else {
      yield put(Actions.teacherEnrollRequest({ currentPage: action.currentPage - 1 }));
      yield put(Actions.teacherAppsUsageRequest());
      yield put(Actions.teacherAccessSaveRequestSuccess());
    }
  } catch (err) {
    yield put(Actions.teacherAccessSaveRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(
      [
        Constants.TEACHER_ENROLL_REQUEST,
        SmartBarConstants.GRADE_SELECTION_SUCCESS,
        SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
        SmartBarConstants.TEACHER_SELECTION_SUCCESS,
        SmartBarConstants.CLASS_SELECTION_SUCCESS,
        SmartBarConstants.GROUP_SELECTION_SUCCESS,
        SmartBarConstants.STUDENT_SELECTION_SUCCESS,
        SmartBarConstants.RESET_SELECTIONS,
      ],
      TeacherEnrollmentFlow
    ),
    takeLatest(
      [Constants.TEACHER_APPS_USAGE_REQUEST, SmartBarConstants.SCHOOL_SELECTION_SUCCESS],
      TeacherAppsUsageFlow
    ),
    takeLatest(Constants.TEACHER_ACCESS_SAVE_REQUEST, TeacherAccessSaveFlow),
  ]);
}
