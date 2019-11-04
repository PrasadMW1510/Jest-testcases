import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as AppConstants from 'containers/App/constants';

import * as Constants from './constants';
import { makeSelectLoginData, makeSelectProfileDistrictId } from '../App/selectors';
import {
  makeSelectSchoolId,
  makeSelectGradeId,
  makeSelectTeacherId,
  makeSelectClassId,
  makeSelectGroupId,
  makeSelectStudentId,
} from '../SmartBarContainer/selectors';
import * as Request from './request';
import * as Actions from './actions';

/**
 * Get reports info for current cohort
 */
export function* reportListRequestFlow() {
  try {
    const loginData = yield select(makeSelectLoginData({}));
    const districtId = yield select(makeSelectProfileDistrictId());
    const schoolId = yield select(makeSelectSchoolId());
    const gradeId = yield select(makeSelectGradeId());
    const teacherId = yield select(makeSelectTeacherId());
    const classId = yield select(makeSelectClassId());
    const groupId = yield select(makeSelectGroupId());
    const studentId = yield select(makeSelectStudentId());
    // Cohort filters in ascending precedence, if the lower ids are set, they override the previous ones.
    let cohortType = AppConstants.COHORT_TYPE.District;
    let cohortId = districtId;
    if (schoolId.length > 0) {
      cohortType = AppConstants.COHORT_TYPE.School;
      cohortId = schoolId;
    }
    if (gradeId.length > 0) {
      cohortType = AppConstants.COHORT_TYPE.Grade;
      cohortId = gradeId;
    }
    if (teacherId.length > 0) {
      cohortType = AppConstants.COHORT_TYPE.Teacher;
      cohortId = teacherId;
    }
    if (classId.length > 0) {
      cohortType = AppConstants.COHORT_TYPE.Class;
      cohortId = classId;
    }
    if (groupId.length > 0) {
      cohortType = AppConstants.COHORT_TYPE.Group;
      cohortId = groupId;
    }
    if (studentId.length > 0) {
      cohortType = AppConstants.COHORT_TYPE.Student;
      cohortId = studentId;
    }

    const reportList = yield call(
      Request.getReportList,
      loginData.getIn(['session_id', 0]),
      cohortType,
      cohortId
    );

    yield put(Actions.reportListRequestSuccess(reportList));
  } catch (err) {
    yield put(Actions.reportListRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(Constants.REPORT_LIST_REQUEST, reportListRequestFlow);
}
