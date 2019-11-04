import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import { USER_TYPE, USER_ORG } from 'containers/App/constants';
import { isUserTypeAdminOrTech } from 'utils/utilities';
import * as Request from './request';
import * as Actions from './actions';
import * as SmartBarActions from '../SmartBarContainer/actions';
import { makeSelectLoginData } from '../App/selectors';
import { makeSelectSmartBarContainer } from '../SmartBarContainer/selectors';
import * as Constants from './constants';
import * as SmartBarConstants from '../SmartBarContainer/constants';

/**
 * No selection, Roster Tab clicked
 */
export function* usageSummaryRequestFlow() {
  const smartBarSelections = yield select(makeSelectSmartBarContainer());

  if (smartBarSelections.getIn(['selectedStudentId'])) {
    yield call(
      usageSummaryStudentRequestFlow,
      SmartBarActions.studentSelection(smartBarSelections.getIn(['selectedStudentId']))
    );
  } else if (smartBarSelections.getIn(['selectedGroupId'])) {
    yield call(
      usageSummaryGroupRequestFlow,
      SmartBarActions.groupSelection(smartBarSelections.getIn(['selectedGroupId']))
    );
  } else if (smartBarSelections.getIn(['selectedClassId'])) {
    yield call(
      usageSummaryClassRequestFlow,
      SmartBarActions.classSelection(smartBarSelections.getIn(['selectedClassId']))
    );
  } else if (smartBarSelections.getIn(['selectedTeacherId'])) {
    yield call(
      usageSummaryTeacherRequestFlow,
      SmartBarActions.teacherSelection(smartBarSelections.getIn(['selectedTeacherId']))
    );
  } else if (smartBarSelections.getIn(['selectedGradeId'])) {
    yield call(
      usageSummaryGradeRequestFlow,
      SmartBarActions.gradeSelection(smartBarSelections.getIn(['selectedGradeId']))
    );
  } else if (smartBarSelections.getIn(['activeSchoolId'])) {
    yield call(
      usageSummarySchoolRequestFlow,
      SmartBarActions.schoolSelection(smartBarSelections.getIn(['activeSchoolId']))
    );
  } else {
    try {
      const loginData = yield select(makeSelectLoginData());
      let usageSummary;
      const userType = loginData.getIn(['user_type', 0]);
      if (userType === USER_TYPE.Teacher) {
        usageSummary = yield call(
          Request.getUsageSummaryDataForTeacher,
          loginData.getIn(['session_id', 0]),
          loginData.getIn(['user_id', 0])
        );
      } else if (
        loginData.getIn(['user_org', 0]) === USER_ORG.District &&
        isUserTypeAdminOrTech(userType)
      ) {
        usageSummary = yield call(
          Request.getUsageSummaryDataForDistAdmin,
          loginData.getIn(['session_id', 0]),
          loginData.getIn(['user_org_id', 0])
        );
      } else {
        usageSummary = yield call(
          Request.getUsageSummaryDataForSchoolAdmin,
          loginData.getIn(['session_id', 0]),
          loginData.getIn(['user_org_id', 0])
        );
      }
      yield put(Actions.usageSummaryRequestSuccess(usageSummary));
    } catch (err) {
      yield put(Actions.usageSummaryRequestFailure(err));
    }
  }
}

/**
 * School selection from smart bar
 * @param action
 */
export function* usageSummarySchoolRequestFlow(action) {
  try {
    const loginData = yield select(makeSelectLoginData());

    const usageSummary = yield call(
      Request.getUsageSummaryDataForSchoolAdmin,
      loginData.getIn(['session_id', 0]),
      action.schoolId
    );

    yield put(Actions.usageSummaryRequestSuccess(usageSummary));
  } catch (err) {
    yield put(Actions.usageSummaryRequestFailure(err));
  }
}

/**
 * Grade selection from smart bar
 * @param action
 */
export function* usageSummaryGradeRequestFlow(action) {
  try {
    const loginData = yield select(makeSelectLoginData());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());

    const orgType = loginData.getIn(['user_org', 0]);
    const userType = loginData.getIn(['user_type', 0]);
    let schoolId = smartBarSelections.getIn(['activeSchoolId']);

    if (orgType === USER_ORG.School && isUserTypeAdminOrTech(userType)) {
      schoolId = loginData.getIn(['user_org_id', 0]);
    }

    const usageSummary = yield call(
      Request.getGradeUsageSummaryData,
      loginData.getIn(['session_id', 0]),
      action.gradeId,
      schoolId
    );

    yield put(Actions.usageSummaryRequestSuccess(usageSummary));
  } catch (err) {
    yield put(Actions.usageSummaryRequestFailure(err));
  }
}

/**
 * Teacher selection from smart bar
 * @param action
 */
export function* usageSummaryTeacherRequestFlow(action) {
  try {
    const loginData = yield select(makeSelectLoginData());
    const usageSummary = yield call(
      Request.getUsageSummaryDataForTeacher,
      loginData.getIn(['session_id', 0]),
      action.teacherId
    );
    yield put(Actions.usageSummaryRequestSuccess(usageSummary));
  } catch (err) {
    yield put(Actions.usageSummaryRequestFailure(err));
  }
}

/**
 * Group selection from smart bar
 * @param action
 */
export function* usageSummaryClassRequestFlow(action) {
  try {
    const loginData = yield select(makeSelectLoginData());
    const usageSummary = yield call(
      Request.getClassUsageSummaryData,
      loginData.getIn(['session_id', 0]),
      action.classId
    );
    yield put(Actions.usageSummaryRequestSuccess(usageSummary));
  } catch (err) {
    yield put(Actions.usageSummaryRequestFailure(err));
  }
}

/**
 * Group selection from smart bar
 * @param action
 */
export function* usageSummaryGroupRequestFlow(action) {
  try {
    const loginData = yield select(makeSelectLoginData());
    const usageSummary = yield call(
      Request.getGroupUsageSummaryData,
      loginData.getIn(['session_id', 0]),
      action.groupId
    );
    yield put(Actions.usageSummaryRequestSuccess(usageSummary));
  } catch (err) {
    yield put(Actions.usageSummaryRequestFailure(err));
  }
}

/**
 * Student selection from smart bar
 * @param action
 */
export function* usageSummaryStudentRequestFlow(action) {
  try {
    const loginData = yield select(makeSelectLoginData());
    const usageSummary = yield call(
      Request.getStudentUsageSummaryData,
      loginData.getIn(['session_id', 0]),
      action.studentId
    );
    yield put(Actions.usageSummaryRequestSuccess(usageSummary));
  } catch (err) {
    yield put(Actions.usageSummaryRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.USAGE_SUMMARY_REQUEST, usageSummaryRequestFlow),
    takeLatest(SmartBarConstants.SCHOOL_SELECTION_SUCCESS, usageSummarySchoolRequestFlow),
    takeLatest(SmartBarConstants.GRADE_SELECTION_SUCCESS, usageSummaryGradeRequestFlow),
    takeLatest(SmartBarConstants.TEACHER_SELECTION_SUCCESS, usageSummaryTeacherRequestFlow),
    takeLatest(SmartBarConstants.CLASS_SELECTION_SUCCESS, usageSummaryClassRequestFlow),
    takeLatest(SmartBarConstants.GROUP_SELECTION_SUCCESS, usageSummaryGroupRequestFlow),
    takeLatest(SmartBarConstants.STUDENT_SELECTION_SUCCESS, usageSummaryStudentRequestFlow),
  ]);
}
