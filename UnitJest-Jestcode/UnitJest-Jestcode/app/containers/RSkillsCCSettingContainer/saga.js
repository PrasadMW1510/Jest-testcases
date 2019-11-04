import { push } from 'react-router-redux';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { COHORT_TYPE } from 'containers/App/constants';
import { genericNonSLMSGetAPICall, genericNonSLMSPostAPICall } from 'containers/App/request';
import { makeSelectProfileSessionId } from 'containers/App/selectors';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import { ROUTE_PATHS } from 'containers/RosterPage/constants';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import { showModal } from 'containers/ModalController/actions';
import { RSKILLSCC_TEST_ASSIGNMENT_SAVE_SUCCESS_MODAL } from 'containers/ModalController/constants';
import * as Actions from './actions';
import * as Request from './request';
import * as Constants from './constants';
import { transformRSkillsCCStagesData } from './transformers';

import * as SmartBarConstants from '../SmartBarContainer/constants';

const createGetUrlObj = (cohortObj, sessionId) => ({
  url: Constants.RSKILLSCC_SETTINGS_URL,
  params: {
    sid: sessionId,
    command: Constants.RSKILLSCC_SETTINGS_GET_COMMAND,
    cohort_type: cohortObj.cohortType.toLowerCase(),
    cohort_id: cohortObj.id,
    output_format: 'raw',
  },
});

const createSettingsPostUrlObj = (effectiveCohortObj, sessionId) => {
  const postUrlObj = {
    url: Constants.RSKILLSCC_SETTINGS_URL,
    params: {
      sid: sessionId,
      command: Constants.RSKILLSCC_SETTINGS_SET_COMMAND,
      output_format: 'raw',
    },
  };
  if (effectiveCohortObj.cohortType === COHORT_TYPE.Grade) {
    postUrlObj.params.school_id = effectiveCohortObj.schoolId;
  }
  return postUrlObj;
};

const createRestoreDefaultsUrlObj = (cohortObj, sessionId) => {
  switch (cohortObj.cohortType) {
    case COHORT_TYPE.Grade:
      return {
        url: Constants.RSKILLSCC_SETTINGS_URL,
        params: {
          sid: sessionId,
          command: Constants.RSKILLSCC_DEFAULT_SETTINGS_COMMAND,
          cohort_type: cohortObj.cohortType.toLowerCase(),
          cohort_id: cohortObj.id,
          school_id: cohortObj.schoolId,
        },
      };
    default:
      return {
        url: Constants.RSKILLSCC_SETTINGS_URL,
        params: {
          sid: sessionId,
          command: Constants.RSKILLSCC_DEFAULT_SETTINGS_COMMAND,
          cohort_type: cohortObj.cohortType.toLowerCase(),
          cohort_id: cohortObj.id,
        },
      };
  }
};

export function* rSkillsCCDefaultSettingsRequestFlow() {
  try {
    const effectiveCohortObj = yield select(makeSelectEffectiveCohortObject());
    const sessionId = yield select(makeSelectProfileSessionId());
    const defaultSettingsUrlObj = createRestoreDefaultsUrlObj(effectiveCohortObj, sessionId);

    const apiDefaultSettingsOutput = yield call(
      genericNonSLMSGetAPICall,
      defaultSettingsUrlObj.url,
      defaultSettingsUrlObj.params
    );

    const apiDefaultSettingsOutputData = apiDefaultSettingsOutput.output.output_data[0].settings[0];
    yield put(Actions.rSkillsCCDefaultSettingsRequestSuccess(apiDefaultSettingsOutputData));
  } catch (err) {
    yield put(Actions.rSkillsCCDefaultSettingsRequestFailure(err));
  }
}

export function* rSkillsSettingsSaveRequestFlow(action) {
  try {
    // show the application level loading
    yield put(showLoading());
    const effectiveCohortObj = yield select(makeSelectEffectiveCohortObject());
    const sessionId = yield select(makeSelectProfileSessionId());

    const urlObj = createSettingsPostUrlObj(effectiveCohortObj, sessionId);
    yield call(genericNonSLMSPostAPICall, urlObj.url, urlObj.params, action.data.postPayload);

    yield put(Actions.rSkillsCCSettingsSaveRequestSuccess());

    // hide the application level loading
    yield put(hideLoading());

    if (action.data.redirectToRoster) {
      yield put(push(ROUTE_PATHS.roster));
    } else {
      // refresh settings data after save, when not redirecting
      yield put(Actions.rSkillsCCSettingsTestAssignmentRequest());
    }
  } catch (err) {
    yield put(Actions.rSkillsCCSettingsSaveRequestFailure(err));
    yield put(hideLoading());
  }
}

export function* rSkillsTestAssignmentRequestFlow() {
  try {
    yield put(Actions.rSkillsCCSettingsContainerLoading());
    const effectiveCohortObj = yield select(makeSelectEffectiveCohortObject());
    const sessionId = yield select(makeSelectProfileSessionId());
    const settingsUrlObj = createGetUrlObj(effectiveCohortObj, sessionId);

    const [apiSettingsOutput, apiTestAssignment] = yield all([
      call(genericNonSLMSGetAPICall, settingsUrlObj.url, settingsUrlObj.params),
      call(Request.getRSkillsCCTestAssignment, sessionId),
    ]);

    const apiSettingsOutputData = apiSettingsOutput.output.output_data[0].settings[0];
    const transformedStages = transformRSkillsCCStagesData(apiTestAssignment);

    yield put(
      Actions.rSkillsCCSettingsTestAssignmentRequestSuccess(
        apiSettingsOutputData,
        transformedStages
      )
    );
  } catch (err) {
    yield put(Actions.rSkillsCCSettingsTestAssignmentRequestFailure(err));
  }
}

export function* rSkillsTestAssignmentSaveRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const saveResult = yield call(
      Request.postRSkillsCCSetTestAssignments,
      sessionId,
      action.data.postPayload
    );
    saveResult.rBookName = action.data.bundleName;
    saveResult.rSkillsTestDescription = action.data.testDescription;
    saveResult.redirectToRoster = action.data.redirectToRoster;
    yield put(Actions.rSkillsCCTestAssignmentSaveRequestSuccess(saveResult));
    yield put(showModal(RSKILLSCC_TEST_ASSIGNMENT_SAVE_SUCCESS_MODAL, saveResult));
  } catch (err) {
    yield put(Actions.rSkillsCCTestAssignmentSaveRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(
      [
        SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
        SmartBarConstants.GRADE_SELECTION_SUCCESS,
        SmartBarConstants.TEACHER_SELECTION_SUCCESS,
        SmartBarConstants.CLASS_SELECTION_SUCCESS,
        SmartBarConstants.GROUP_SELECTION_SUCCESS,
        SmartBarConstants.STUDENT_SELECTION_SUCCESS,
        Constants.RSKILLSCC_SETTINGS_TEST_ASSIGNMENT_REQUEST,
      ],
      rSkillsTestAssignmentRequestFlow
    ),
    takeLatest(
      Constants.RSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST,
      rSkillsTestAssignmentSaveRequestFlow
    ),
    takeLatest(Constants.RSKILLSCC_DEFAULT_SETTINGS_REQUEST, rSkillsCCDefaultSettingsRequestFlow),
    takeLatest(Constants.RSKILLSCC_SETTINGS_SAVE_REQUEST, rSkillsSettingsSaveRequestFlow),
  ]);
}
