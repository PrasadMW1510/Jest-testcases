import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { COHORT_TYPE } from 'containers/App/constants';
import { genericNonSLMSGetAPICall, genericNonSLMSPostAPICall } from 'containers/App/request';
import * as Selectors from 'containers/App/selectors';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';

import * as Actions from './actions';
import * as Constants from './constants';

const createSettingsURL = (cohortObj, sessionId, getSaveUrl = false) => {
  const command = getSaveUrl ? 'SetCohortSettings' : 'GetCohortSettings';

  return {
    url: Constants.IREAD_SETTINGS_URL,
    params: {
      command,
      sid: sessionId,
      cohort_id: cohortObj.id,
      cohort_type: cohortObj.cohortType.toLowerCase(),
    },
  };
};

export function* getIreadProgramSettings() {
  try {
    const cohortObj = yield select(makeSelectEffectiveCohortObject());

    // We dont need to make the server call if the cohort type is District, School, Grade, or Teacher
    if (
      cohortObj.cohortType === COHORT_TYPE.District ||
      cohortObj.cohortType === COHORT_TYPE.School ||
      cohortObj.cohortType === COHORT_TYPE.Grade ||
      cohortObj.cohortType === COHORT_TYPE.Teacher
    ) {
      return yield put(Actions.IreadProgramSettingsRequestSuccess({}));
    }

    const sessionId = yield select(Selectors.makeSelectProfileSessionId());

    const urlObj = createSettingsURL(cohortObj, sessionId);
    const response = yield call(genericNonSLMSGetAPICall, urlObj.url, urlObj.params);
    const responseData = response.output.output_data[0].cohort_settings[0];

    return yield put(Actions.IreadProgramSettingsRequestSuccess(responseData));
  } catch (err) {
    return yield put(Actions.IreadProgramSettingsRequestFailure(err));
  }
}

export function* saveIreadEnrollmentProgramSettings(action) {
  try {
    const cohortObj = yield select(makeSelectEffectiveCohortObject());
    const sessionId = yield select(Selectors.makeSelectProfileSessionId());

    const urlObj = createSettingsURL(cohortObj, sessionId, true);

    const data = {
      output: { output_data: { cohort_settings: action.settings } },
    };

    yield call(genericNonSLMSPostAPICall, urlObj.url, urlObj.params, data);
    yield put(Actions.IreadSaveRequestSuccess());
    yield call(getIreadProgramSettings);
  } catch (err) {
    yield put(Actions.IreadSaveRequestFailure(err));
  }
}

const getSettingsConstants = [
  Constants.IREAD_PROGRAM_SETTINGS_REQUEST,
  SmartBarConstants.CLASS_SELECTION_SUCCESS,
  SmartBarConstants.GROUP_SELECTION_SUCCESS,
  SmartBarConstants.STUDENT_SELECTION_SUCCESS,
];

export default function* defaultSaga() {
  yield all([
    takeLatest(getSettingsConstants, getIreadProgramSettings),
    takeLatest(Constants.IREAD_SAVE_REQUEST, saveIreadEnrollmentProgramSettings),
  ]);
}
