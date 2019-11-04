import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import * as Selectors from 'containers/App/selectors';
import { genericGetAPICall } from 'containers/App/request';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import { createEnrollmentURLObj } from 'utils/programSettingsUtils';

import * as Actions from './actions';
import * as Constants from './constants';

export function* programSettingsEnrollmentListFlow() {
  try {
    const cohortObj = yield select(makeSelectEffectiveCohortObject());
    const sessionId = yield select(Selectors.makeSelectProfileSessionId());
    const userOrgId = yield select(Selectors.makeSelectProfileUserOrgId());
    const userOrgType = yield select(Selectors.makeSelectLoginUserOrg());

    const urlObj = createEnrollmentURLObj(cohortObj, sessionId, userOrgType, userOrgId);

    const enrollmentList = yield call(genericGetAPICall, urlObj.url, urlObj.params);

    yield put(
      Actions.programSettingsEnrollmentListSuccess(enrollmentList.applications[0].application)
    );
  } catch (e) {
    yield put(Actions.programSettingsEnrollmentListFailure(e));
  }
}
export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.PROGRAM_SETTINGS_ENROLLMENT_LIST, programSettingsEnrollmentListFlow),
    takeLatest(SmartBarConstants.SCHOOL_SELECTION_SUCCESS, programSettingsEnrollmentListFlow),
    takeLatest(SmartBarConstants.GRADE_SELECTION_SUCCESS, programSettingsEnrollmentListFlow),
    takeLatest(SmartBarConstants.TEACHER_SELECTION_SUCCESS, programSettingsEnrollmentListFlow),
    takeLatest(SmartBarConstants.CLASS_SELECTION_SUCCESS, programSettingsEnrollmentListFlow),
    takeLatest(SmartBarConstants.GROUP_SELECTION_SUCCESS, programSettingsEnrollmentListFlow),
    takeLatest(SmartBarConstants.STUDENT_SELECTION_SUCCESS, programSettingsEnrollmentListFlow),
  ]);
}
