import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { COHORT_TYPE } from 'containers/App/constants';
import { genericNonSLMSGetAPICall, genericNonSLMSPostAPICall } from 'containers/App/request';
import * as Selectors from 'containers/App/selectors';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';

import * as Actions from './actions';
import * as Constants from './constants';

const createGetUrlObj = (cohortObj, sessionId) => {
  let command = 'GetGroupSettings';

  if (cohortObj.cohortType === COHORT_TYPE.Student) {
    command = 'GetStudentSettings';
    return {
      url: Constants.S44NG_SETTINGS_URL,
      params: {
        command,
        sid: sessionId,
        user_id: cohortObj.id,
      },
    };
  }

  return {
    url: Constants.S44NG_SETTINGS_URL,
    params: {
      command,
      sid: sessionId,
      cohort_type: cohortObj.cohortType.toLowerCase(),
      cohort_id: cohortObj.id,
    },
  };
};

const createPostUrlObj = (cohortObj, sessionId) => {
  let command = 'SetGroupSettings';

  if (cohortObj.cohortType === COHORT_TYPE.Student) {
    command = 'SetStudentSettings';
    return {
      url: Constants.S44NG_SETTINGS_URL,
      params: {
        command,
        sid: sessionId,
        user_id: cohortObj.id,
      },
    };
  }

  return {
    url: Constants.S44NG_SETTINGS_URL,
    params: {
      command,
      sid: sessionId,
    },
  };
};

const createPayloadObj = (cohortObj, settingsData) => {
  const groupSettings = {
    writing_enabled: settingsData.writing_enabled[0],
    spanish_support: settingsData.spanish_support[0],
    captioning: settingsData.captioning[0],
  };

  if (cohortObj.cohortType === COHORT_TYPE.Student) {
    groupSettings.auto_placement = settingsData.auto_placement[0];
    groupSettings.initial_placement = settingsData.initial_placement[0];
    groupSettings.enable_fasttrack = settingsData.enable_fasttrack[0];
  }

  return {
    output: {
      output_data: {
        cohort_type: cohortObj.cohortType.toUpperCase(),
        cohort_id: cohortObj.id,
        group_settings: groupSettings,
      },
    },
  };
};

export function* s44NGProgramSettingsContainerFlow() {
  try {
    const cohortObj = yield select(makeSelectEffectiveCohortObject());

    // We dont need to make the server call if the cohort type is District or School
    if (
      cohortObj.cohortType === COHORT_TYPE.District ||
      cohortObj.cohortType === COHORT_TYPE.School
    ) {
      return yield put(Actions.s44NGSettingsContainerSuccess());
    }

    const sessionId = yield select(Selectors.makeSelectProfileSessionId());
    const urlObj = createGetUrlObj(cohortObj, sessionId);

    const output = yield call(genericNonSLMSGetAPICall, urlObj.url, urlObj.params);
    const outputData = output.output.output_data[0];

    // Student settings come back as a different format than other cohorts
    let settings = {};
    if (cohortObj.cohortType === COHORT_TYPE.Student) {
      if (Object.keys(outputData).length !== 0) {
        settings = outputData.student_settings[0];
      }
    } else {
      settings = outputData.group_settings[0];
    }

    return yield put(Actions.s44NGSettingsContainerSuccess(settings));
  } catch (e) {
    return yield put(Actions.s44NGSettingsContainerFailure(e));
  }
}

export function* s44NGProgramSettingsSaveFlow(action) {
  try {
    const cohortObj = yield select(makeSelectEffectiveCohortObject());
    const sessionId = yield select(Selectors.makeSelectProfileSessionId());

    const urlObj = createPostUrlObj(cohortObj, sessionId);

    const payloadData = createPayloadObj(cohortObj, action.settingsData);

    yield call(genericNonSLMSPostAPICall, urlObj.url, urlObj.params, payloadData);

    yield put(Actions.s44NGSettingsSaveSuccess());

    // We want to refresh the settings data after saving the settings.
    yield put(Actions.s44NGSettingsContainerRequest());
  } catch (e) {
    yield put(Actions.s44NGSettingsSaveFailure(e));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.S44NG_SETTINGS_CONTAINER, s44NGProgramSettingsContainerFlow),
    takeLatest(SmartBarConstants.GRADE_SELECTION_SUCCESS, s44NGProgramSettingsContainerFlow),
    takeLatest(SmartBarConstants.TEACHER_SELECTION_SUCCESS, s44NGProgramSettingsContainerFlow),
    takeLatest(SmartBarConstants.CLASS_SELECTION_SUCCESS, s44NGProgramSettingsContainerFlow),
    takeLatest(SmartBarConstants.GROUP_SELECTION_SUCCESS, s44NGProgramSettingsContainerFlow),
    takeLatest(SmartBarConstants.STUDENT_SELECTION_SUCCESS, s44NGProgramSettingsContainerFlow),
    takeLatest(Constants.S44NG_SETTINGS_SAVE, s44NGProgramSettingsSaveFlow),
  ]);
}
