import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import { getProfileData } from 'containers/App/request';
import { makeSelectSmartBarContainer } from 'containers/SmartBarContainer/selectors';
import * as Request from './request';
import * as Actions from './actions';
import {
  makeSelectProfileDistrictId,
  makeSelectProfileSessionId,
  makeSelectProfileUserId,
  makeSelectProfileUserOrgId,
} from '../App/selectors';
import * as SmartBarConstants from '../SmartBarContainer/constants';
import * as Constants from './constants';

/**
 * No selection, Roster Tab clicked
 */
export function* profilePageRequestFlow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const profileDetails = yield call(getProfileData, sessionId, userId);

    yield put(Actions.profilePageRequestSuccess(profileDetails));
  } catch (err) {
    yield put(Actions.profilePageRequestFailure(err));
  }
}

/**
 * Default Profile Info for District Admin
 */
export function* profilePageForDistrictAdminRequestFlow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const districtId = yield select(makeSelectProfileDistrictId());
    const profileDetailsDistAdmin = yield call(
      Request.getProfileForDistrictAdmin,
      sessionId,
      districtId
    );

    yield put(Actions.profilePageForDistrictAdminRequestSuccess(profileDetailsDistAdmin));
  } catch (err) {
    yield put(Actions.profilePageForDistrictAdminFailure(err));
  }
}

/**
 * Default Profile Info for School Admin
 */
export function* profilePageForSchoolAdminRequestFlow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const schoolId = yield select(makeSelectProfileUserOrgId());
    const profileDetailsSchoolAdmin = yield call(
      Request.getProfileForSchoolAdmin,
      sessionId,
      schoolId
    );

    yield put(Actions.profilePageForSchoolAdminRequestSuccess(profileDetailsSchoolAdmin));
  } catch (err) {
    yield put(Actions.profilePageForSchoolAdminRequestFailure(err));
  }
}

/**
 * Student selection from smart bar
 * @param action
 */
export function* profilePageStudentRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());

    const profileDetails = yield call(
      Request.getStudentProfilePageData,
      sessionId,
      action.studentId
    );
    yield put(Actions.profilePageRequestSuccess(profileDetails));
  } catch (err) {
    yield put(Actions.profilePageRequestFailure(err));
  }
}

/**
 * Class selection from smart bar
 * @param action
 */
export function* profilePageClassRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const profileDetails = yield call(Request.getClassDetails, sessionId, action.classId);
    yield put(Actions.profilePageRequestSuccess(profileDetails));
  } catch (err) {
    yield put(Actions.profilePageRequestFailure(err));
  }
}

/**
 * Teacher selection from smart bar
 * @param action
 */
export function* profilePageTeacherRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const profileDetails = yield call(
      Request.getTeacherProfilePageData,
      sessionId,
      action.teacherId
    );
    yield put(Actions.profilePageRequestSuccess(profileDetails));
  } catch (err) {
    yield put(Actions.profilePageRequestFailure(err));
  }
}

/**
 * Group selection from smart bar
 * @param action
 */
export function* classDetailsFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const classDetails = yield call(Request.getClassDetails, sessionId, action.classId);
    yield put(Actions.profilePageClassRequestSuccess(classDetails));
  } catch (err) {
    yield put(Actions.profilePageClassRequestFailure(err));
  }
}

/**
 * Group selection from smart bar
 * @param action
 */
export function* profilePageGroupRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const profileDetails = yield call(Request.getGroupProfilePageData, sessionId, action.groupId);

    yield put(Actions.profilePageRequestSuccess(profileDetails));
  } catch (err) {
    yield put(Actions.profilePageRequestFailure(err));
  }
}

/**
 * School selection from smart bar
 * @param action
 */
export function* profilePageSchoolRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const profileDetails = yield call(Request.getSchoolProfilePageData, sessionId, action.schoolId);
    yield put(Actions.profilePageRequestSuccess(profileDetails));
  } catch (err) {
    yield put(Actions.profilePageRequestFailure(err));
  }
}

/**
 * Grade selection from smart bar - Teachers
 * @param action
 */
export function* teacherByGradeRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    const userOrgId = yield select(makeSelectProfileUserOrgId());

    const teacherByGradeDetails = yield call(
      Request.getTeachersByGrade,
      sessionId,
      action.gradeId,
      smartBarSelections.getIn(['activeSchoolId']) || userOrgId
    );

    yield put(Actions.teacherByGradeRequestSuccess(teacherByGradeDetails));
  } catch (err) {
    yield put(Actions.teacherByGradeRequestFailure(err));
  }
}

/**
 * Grade selection from smart bar - Classes
 * @param action
 */
export function* classByGradeRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    const userOrgId = yield select(makeSelectProfileUserOrgId());

    const classByGradeDetails = yield call(
      Request.getClassByGrade,
      sessionId,
      action.gradeId,
      smartBarSelections.getIn(['activeSchoolId']) || userOrgId
    );

    yield put(Actions.classByGradeRequestSuccess(classByGradeDetails));
  } catch (err) {
    yield put(Actions.classByGradeRequestFailure(err));
  }
}

/**
 * Grade selection from smart bar - Students
 * @param action
 */
export function* studentByGradeRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    const userOrgId = yield select(makeSelectProfileUserOrgId());

    const studentByGradeDetails = yield call(
      Request.getStudentsByGrade,
      sessionId,
      action.gradeId,
      smartBarSelections.getIn(['activeSchoolId']) || userOrgId
    );

    yield put(Actions.studentByGradeRequestSuccess(studentByGradeDetails));
  } catch (err) {
    yield put(Actions.studentByGradeRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.PROFILE_PAGE_REQUEST, profilePageRequestFlow),
    takeLatest(
      Constants.PROFILE_PAGE_DISTRICT_ADMIN_REQUEST,
      profilePageForDistrictAdminRequestFlow
    ),
    takeLatest(Constants.PROFILE_PAGE_SCHOOL_ADMIN_REQUEST, profilePageForSchoolAdminRequestFlow),
    takeLatest(SmartBarConstants.TEACHER_SELECTION_SUCCESS, profilePageTeacherRequestFlow),
    takeLatest(Constants.PROFILE_PAGE_TEACHER_REQUEST, profilePageTeacherRequestFlow),
    takeLatest(SmartBarConstants.GRADE_SELECTION_SUCCESS, teacherByGradeRequestFlow),
    takeLatest(Constants.PROFILE_PAGE_GRADE_REQUEST, teacherByGradeRequestFlow),
    takeLatest(SmartBarConstants.GRADE_SELECTION_SUCCESS, classByGradeRequestFlow),
    takeLatest(Constants.PROFILE_PAGE_GRADE_REQUEST, classByGradeRequestFlow),
    takeLatest(SmartBarConstants.GRADE_SELECTION_SUCCESS, studentByGradeRequestFlow),
    takeLatest(Constants.PROFILE_PAGE_GRADE_REQUEST, studentByGradeRequestFlow),
    takeLatest(SmartBarConstants.CLASS_SELECTION_SUCCESS, profilePageClassRequestFlow),
    takeLatest(SmartBarConstants.GROUP_SELECTION_SUCCESS, profilePageGroupRequestFlow),
    takeLatest(Constants.PROFILE_PAGE_GROUP_REQUEST, profilePageGroupRequestFlow),
    takeLatest(SmartBarConstants.SCHOOL_SELECTION_SUCCESS, profilePageSchoolRequestFlow),
    takeLatest(Constants.PROFILE_PAGE_SCHOOL_REQUEST, profilePageSchoolRequestFlow),
    takeLatest(SmartBarConstants.STUDENT_SELECTION_SUCCESS, profilePageStudentRequestFlow),
    takeLatest(Constants.PROFILE_PAGE_STUDENT_REQUEST, profilePageStudentRequestFlow),
    takeLatest(Constants.PROFILE_PAGE_CLASS_REQUEST, classDetailsFlow),
  ]);
}
