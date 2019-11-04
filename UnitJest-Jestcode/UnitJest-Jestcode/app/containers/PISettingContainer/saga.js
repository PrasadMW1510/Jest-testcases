import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import { getUrl, postUrl } from 'utils/request';

import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';

import { makeSelectProfileSessionId } from 'containers/App/selectors';
import * as Actions from './actions';
import * as Constants from './constants';

// ------ Saga flows -----
export function* piSettingsContainerFlow() {
  try {
    // TODO: Add functionally to get settings data from server
    const sessionId = yield select(makeSelectProfileSessionId());
    const cohortObj = yield select(makeSelectEffectiveCohortObject());
    const url = `spi/spiProductCtrls.cd?command=GetGroupSettings&cohort_type=${cohortObj.cohortType.toLowerCase()}&cohort_id=${
      cohortObj.id
    }&school_id=${cohortObj.schoolId}&sid=${sessionId}`;
    const settings = yield call(getUrl, url);
    const result = settings.output.output_data[0];
    const setting = result === '' ? {} : result.group_settings[0];
    yield put(Actions.piSettingsContainerSuccess(setting));
  } catch (e) {
    yield put(Actions.piSettingsContainerFailure(e));
  }
}

export function* piProgramSettingsSaveFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const cohortObj = yield select(makeSelectEffectiveCohortObject());
    const url = `spi/spiProductCtrls.cd?command=SetGroupSettings&sid=${sessionId}`;
    const data = {
      output: {
        output_data: {
          cohort_type: cohortObj.cohortType.toUpperCase(),
          cohort_id: cohortObj.id,
          school_id: cohortObj.schoolId,
          group_settings: {
            spanish_support: action.settingsData.spanish_support[0],
            requires_accommodation: action.settingsData.requires_accommodation[0],
          },
        },
      },
    };
    yield call(postUrl, url, data);

    yield put(Actions.piSettingsSaveSuccess());

    // We want to refresh the settings data after saving the settings.
    yield put(Actions.piSettingsContainerRequest());
  } catch (e) {
    yield put(Actions.piSettingsSaveFailure(e));
  }
}

const getSettingsConstants = [
  Constants.PI_SETTINGS_CONTAINER,
  SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
  SmartBarConstants.GRADE_SELECTION_SUCCESS,
  SmartBarConstants.TEACHER_SELECTION_SUCCESS,
  SmartBarConstants.CLASS_SELECTION_SUCCESS,
  SmartBarConstants.GROUP_SELECTION_SUCCESS,
  SmartBarConstants.STUDENT_SELECTION_SUCCESS,
];

export default function* defaultSaga() {
  yield all([
    takeLatest(getSettingsConstants, piSettingsContainerFlow),
    takeLatest(Constants.PI_SETTINGS_SAVE, piProgramSettingsSaveFlow),
  ]);
}
