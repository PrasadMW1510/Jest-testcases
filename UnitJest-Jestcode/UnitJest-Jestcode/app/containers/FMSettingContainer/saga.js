import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { COHORT_TYPE } from 'containers/App/constants';
import { genericNonSLMSGetAPICall, genericNonSLMSPostAPICall } from 'containers/App/request';
import { makeSelectProfileSessionId } from 'containers/App/selectors';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';

import * as Actions from './actions';
import * as Constants from './constants';

// ------ Helper functions -----
const createSettingsUrlObj = (cohortObj, sid, isPost = false) => {
  const { cohortType } = cohortObj;

  const urlObj = {
    url: Constants.FM_SETTINGS_URL,
    params: {
      command: isPost
        ? Constants.FM_SETTINGS_URL_SET_COMMAND
        : Constants.FM_SETTINGS_URL_GET_COMMAND,
      sid,
      cohort_type: cohortType.toLowerCase(),
      cohort_id: cohortObj.id,
    },
  };

  if (cohortType === COHORT_TYPE.Student) {
    urlObj.params.school_id = cohortObj.schoolId;
    urlObj.params.output_format = 'raw';
  }

  return urlObj;
};

const createSettingsPayload = settings => ({
  SetSettingsReq: {
    Settings: {
      Operation: settings.Operation[0],
      Problems: '',
      Orientation: settings.Orientation[0],
      Response: '',
      Language: settings.Language[0],
      Contrast: settings.Contrast[0],
      Lessons: settings.Lessons[0],
      Reset: '',
    },
  },
});

// ------ Saga flows -----
export function* fmSettingsContainerFlow() {
  try {
    yield all([call(fmProgramSettingsFlow), call(fmAdvancedSettingsFlow)]);

    yield put(Actions.fmSettingsContainerSuccess());
  } catch (e) {
    yield put(Actions.fmSettingsContainerFailure(e));
  }
}

export function* fmProgramSettingsFlow() {
  try {
    const cohortObj = yield select(makeSelectEffectiveCohortObject());

    if (
      cohortObj.cohortType !== COHORT_TYPE.Class &&
      cohortObj.cohortType !== COHORT_TYPE.Group &&
      cohortObj.cohortType !== COHORT_TYPE.Student
    ) {
      return yield put(Actions.fmGetSettingsSuccess());
    }

    const sessionId = yield select(makeSelectProfileSessionId());
    const urlObj = createSettingsUrlObj(cohortObj, sessionId);

    const output = yield call(genericNonSLMSGetAPICall, urlObj.url, urlObj.params);

    return yield put(
      Actions.fmGetSettingsSuccess(output.output.output_data[0].getSettings[0].GetSettingsResp[0])
    );
  } catch (e) {
    return yield put(Actions.fmGetSettingsFailure(e));
  }
}

export function* fmProgramSettingsSaveFlow(action) {
  try {
    const cohortObj = yield select(makeSelectEffectiveCohortObject());
    const sessionId = yield select(makeSelectProfileSessionId());

    const urlObj = createSettingsUrlObj(cohortObj, sessionId, true);
    const payloadData = createSettingsPayload(action.settingsData);

    yield call(genericNonSLMSPostAPICall, urlObj.url, urlObj.params, payloadData);

    yield put(Actions.fmSettingsSaveSuccess());

    // We want to refresh the settings data after saving the settings.
    yield put(Actions.fmSettingsContainerRequest());
  } catch (e) {
    yield put(Actions.fmSettingsSaveFailure(e));
  }
}

export function* fmAdvancedSettingsFlow() {
  try {
    // TODO: Add functionally to get advanced settings data from server
    yield put(Actions.fmGetAdvancedSettingsSuccess());
  } catch (e) {
    yield put(Actions.fmGetAdvancedSettingsFailure(e));
  }
}

export function* fmAdvancedSettingsSaveFlow() {
  try {
    // TODO: Add functionally to save advanced settings data to the server
    yield put(Actions.fmAdvancedSettingsSaveSuccess());

    // We want to refresh the settings data after saving the settings.
    yield put(Actions.fmSettingsContainerRequest());
  } catch (e) {
    yield put(Actions.fmAdvancedSettingsSaveFailure(e));
  }
}

const getSettingsConstants = [
  Constants.FM_SETTINGS_CONTAINER,
  SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
  SmartBarConstants.GRADE_SELECTION_SUCCESS,
  SmartBarConstants.TEACHER_SELECTION_SUCCESS,
  SmartBarConstants.CLASS_SELECTION_SUCCESS,
  SmartBarConstants.GROUP_SELECTION_SUCCESS,
  SmartBarConstants.STUDENT_SELECTION_SUCCESS,
];

export default function* defaultSaga() {
  yield all([
    takeLatest(getSettingsConstants, fmSettingsContainerFlow),
    takeLatest(Constants.FM_SETTINGS_SAVE, fmProgramSettingsSaveFlow),
    takeLatest(Constants.FM_ADVANCED_SETTINGS_SAVE, fmAdvancedSettingsSaveFlow),
  ]);
}
