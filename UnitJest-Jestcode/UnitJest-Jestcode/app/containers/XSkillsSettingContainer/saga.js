import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { COHORT_TYPE } from 'containers/App/constants';
import { genericNonSLMSGetAPICall, genericNonSLMSPostAPICall } from 'containers/App/request';
import { makeSelectProfileSessionId } from 'containers/App/selectors';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import { showModal } from 'containers/ModalController/actions';
import { XSKILLS_TEST_ASSIGNMENT_SAVE_SUCCESS_MODAL } from 'containers/ModalController/constants';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import * as Actions from './actions';
import * as Constants from './constants';

import * as SmartBarConstants from '../SmartBarContainer/constants';

// TODO: this to be used for settings get story
const createSettingsGetUrlObj = (cohortObj, sessionId) => {
  const result = {
    url: Constants.XSKILLS_SETTINGS_URL,
    params: {
      sid: sessionId,
      command: Constants.XSKILLS_SETTINGS_GET_COMMAND,
      cohort_type: cohortObj.cohortType.toLowerCase(),
      cohort_id: cohortObj.id,
    },
  };
  if (cohortObj.CohortType === COHORT_TYPE.Grade) {
    result.params.school_id = cohortObj.schoolId;
  }
  return result;
};

const createTestAssignGetUrlObj = (cohortObj, sessionId) => ({
  url: Constants.XSKILLS_TEST_ASSIGN_URL,
  params: {
    sid: sessionId,
    command: Constants.XSKILLS_TEST_ASSIGN_GET_COMMAND,
    cohort_type: cohortObj.cohortType.toLowerCase(),
    cohort_id: cohortObj.id,
  },
});

const createTestAssignSavePostUrlObj = (cohortObj, sessionId) => ({
  url: Constants.XSKILLS_TEST_ASSIGN_URL,
  params: {
    command: Constants.XSKILLS_TEST_ASSIGN_SET_COMMAND,
    sid: sessionId,
    cohort_type: cohortObj.cohortType.toLowerCase(),
    cohort_id: cohortObj.id,
  },
});

export function* xSkillsTestAssignmentRequestFlow() {
  try {
    yield put(Actions.xSkillsTestAssignmentLoading());
    const effectiveCohortObj = yield select(makeSelectEffectiveCohortObject());

    // We dont need to make the server call if the cohort type is District or School
    if (
      effectiveCohortObj.cohortType === COHORT_TYPE.District ||
      effectiveCohortObj.cohortType === COHORT_TYPE.School ||
      effectiveCohortObj.cohortType === COHORT_TYPE.Grade
    ) {
      return yield put(Actions.xSkillsTestAssignmentRequestSuccess());
    }
    const sessionId = yield select(makeSelectProfileSessionId());
    const testAssignUrlObj = createTestAssignGetUrlObj(effectiveCohortObj, sessionId);

    const apiTestAssignment = yield call(
      genericNonSLMSGetAPICall,
      testAssignUrlObj.url,
      testAssignUrlObj.params
    );
    const tests = apiTestAssignment.output.output_data[0].tests[0];
    return yield put(Actions.xSkillsTestAssignmentRequestSuccess(tests));
  } catch (e) {
    return yield put(Actions.xSkillsTestAssignmentRequestFailure(e));
  }
}

export function* xSkillsTestAssignmentSaveRequestFlow(action) {
  try {
    // show the application level loading
    yield put(showLoading());
    const effectiveCohortObj = yield select(makeSelectEffectiveCohortObject());
    const sessionId = yield select(makeSelectProfileSessionId());
    const urlObj = createTestAssignSavePostUrlObj(effectiveCohortObj, sessionId);
    const saveResult = yield call(
      genericNonSLMSPostAPICall,
      urlObj.url,
      urlObj.params,
      action.data.postPayload
    );
    yield put(hideLoading());
    const saveResultsDetails = saveResult.output.output_data[0].result[0];
    // two values needed for the success modal.
    saveResultsDetails.redirectToRoster = action.data.redirectToRoster;
    saveResultsDetails.xSkillsTestNumber = action.data.postPayload.output.output_data.test_number;
    // hide the application level loading
    yield put(Actions.xSkillsTestAssignmentSaveRequestSuccess(saveResultsDetails));
    yield put(showModal(XSKILLS_TEST_ASSIGNMENT_SAVE_SUCCESS_MODAL, saveResultsDetails));
  } catch (e) {
    yield put(Actions.xSkillsTestAssignmentSaveRequestFailure(e));
    // show the application level loading
    yield put(hideLoading());
  }
}

export function* xSkillsSettingsRequestFlow() {
  try {
    yield put(Actions.xSkillsSettingsLoading());
    const effectiveCohortObj = yield select(makeSelectEffectiveCohortObject());
    const sessionId = yield select(makeSelectProfileSessionId());
    const settingsGetUrlObj = createSettingsGetUrlObj(effectiveCohortObj, sessionId);
    const apiSettings = yield call(
      genericNonSLMSGetAPICall,
      settingsGetUrlObj.url,
      settingsGetUrlObj.params
    );
    const programSettings = apiSettings.output.output_data[0].settings[0];
    yield put(Actions.xSkillsSettingsRequestSuccess(programSettings));
  } catch (e) {
    yield put(Actions.xSkillsSettingsRequestFailure(e));
  }
}

const SMART_BAR_COHORT_CONSTANTS = [
  SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
  SmartBarConstants.GRADE_SELECTION_SUCCESS,
  SmartBarConstants.TEACHER_SELECTION_SUCCESS,
  SmartBarConstants.CLASS_SELECTION_SUCCESS,
  SmartBarConstants.GROUP_SELECTION_SUCCESS,
  SmartBarConstants.STUDENT_SELECTION_SUCCESS,
];

const getTestAssignmentConstants = SMART_BAR_COHORT_CONSTANTS.concat([
  Constants.XSKILLS_TEST_ASSIGNMENT_REQUEST,
]);

const getSettingsRequestConstants = SMART_BAR_COHORT_CONSTANTS.concat([
  Constants.XSKILLS_SETTINGS_REQUEST,
]);

export default function* defaultSaga() {
  yield all([
    takeLatest(getTestAssignmentConstants, xSkillsTestAssignmentRequestFlow),
    takeLatest(
      Constants.XSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST,
      xSkillsTestAssignmentSaveRequestFlow
    ),
    takeLatest(getSettingsRequestConstants, xSkillsSettingsRequestFlow),
  ]);
}
