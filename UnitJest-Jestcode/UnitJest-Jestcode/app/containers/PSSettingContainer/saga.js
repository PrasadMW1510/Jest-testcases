import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import { genericNonSLMSGetAPICall, genericNonSLMSPostAPICall } from 'containers/App/request';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import { makeSelectProfileSessionId } from 'containers/App/selectors';
import * as Actions from './actions';
import * as Constants from './constants';

export function* psSettingsContainerFlow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const cohortObj = yield select(makeSelectEffectiveCohortObject());
    const params = {
      command: 'get_settings',
      sid: sessionId,
      cohort_type: cohortObj.cohortType.toLowerCase(),
      cohort_id: cohortObj.id,
    };
    const settings = yield call(genericNonSLMSGetAPICall, Constants.URL, params);
    const result = settings.output.output_data[0];
    let setting = {};
    if (result.get_settings[0].settings !== '') {
      setting = result === '' ? {} : result.get_settings[0].settings[0];
      setting = setting === '' ? {} : setting;
    }
    yield put(Actions.psSettingsContainerSuccess(setting));
  } catch (e) {
    yield put(Actions.psSettingsContainerFailure(e));
  }
}

export function* psProgramSettingsSaveFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const cohortObj = yield select(makeSelectEffectiveCohortObject());
    const params = {
      command: 'set_settings',
      sid: sessionId,
      cohort_type: cohortObj.cohortType.toLowerCase(),
      cohort_id: cohortObj.id,
    };
    const data = {
      output: {
        output_data: {
          settings: {
            audio_instructions: action.settingsData.audio_instructions[0],
            student_access_to_score: action.settingsData.student_access_to_score[0],
            include_sample_questions: action.settingsData.include_sample_questions[0],
            ell_audio_instructions: action.settingsData.ell_audio_instructions[0],
          },
        },
      },
    };
    yield call(genericNonSLMSPostAPICall, Constants.URL, params, data);

    yield put(Actions.psSettingsSaveSuccess());

    // We want to refresh the settings data after saving the settings.
    yield put(Actions.psSettingsContainerRequest());
  } catch (e) {
    yield put(Actions.psSettingsSaveFailure(e));
  }
}

export function* psTestAssignmenFlow() {
  try {
    yield all([
      call(psGetDtmModulesFlow),
      call(psGetDtmTestsRequestFlow),
      call(psGetDtmSubProductRequestFlow),
    ]);
    yield put(Actions.psTestAssignmentSuccess());
  } catch (e) {
    yield put(Actions.psTestAssignmentFailure(e));
  }
}

export function* psGetDtmModulesFlow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const params = { command: 'get_dtm_modules', sid: sessionId };
    const settings = yield call(genericNonSLMSGetAPICall, Constants.URL, params);
    const result = settings.output.output_data[0];
    const setting = result === '' ? {} : result.get_dtm_modules[0].modules;
    yield put(Actions.psGetDtmModulesSuccess(setting));
  } catch (e) {
    yield put(Actions.psGetDtmModulesFailure(e));
  }
}

export function* psGetDtmTestsRequestFlow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const params = { command: 'get_dtm_tests', sid: sessionId };
    const settings = yield call(genericNonSLMSGetAPICall, Constants.URL, params);
    const result = settings.output.output_data[0];
    const setting = result === '' ? {} : result.get_dtm_tests[0];
    yield put(Actions.psGetDtmTestsSuccess(setting));
  } catch (e) {
    yield put(Actions.psGetDtmTestsFailure(e));
  }
}

export function* psGetDtmSubProductRequestFlow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const cohortObj = yield select(makeSelectEffectiveCohortObject());
    const params = {
      command: 'get_dtm_subproducts',
      sid: sessionId,
      cohort_type: cohortObj.cohortType.toLowerCase(),
      cohort_id: cohortObj.id,
    };
    const settings = yield call(genericNonSLMSGetAPICall, Constants.URL, params);
    let setting = {};
    const result = settings.output.output_data[0];
    if (typeof result.get_dtm_subproducts[0].sub_products !== 'undefined')
      setting = result === '' ? {} : result.get_dtm_subproducts[0].sub_products[0];
    yield put(Actions.psGetDtmSubProductSuccess(setting));
  } catch (e) {
    yield put(Actions.psGetDtmSubProductSuccess(e));
  }
}

const getSettingsConstants = [
  Constants.PS_SETTINGS_CONTAINER,
  SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
  SmartBarConstants.GRADE_SELECTION_SUCCESS,
  SmartBarConstants.TEACHER_SELECTION_SUCCESS,
  SmartBarConstants.CLASS_SELECTION_SUCCESS,
  SmartBarConstants.GROUP_SELECTION_SUCCESS,
  SmartBarConstants.STUDENT_SELECTION_SUCCESS,
];

const getTestAssignmentConstants = [
  Constants.PS_TEST_ASSIGNMENT,
  SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
  SmartBarConstants.GRADE_SELECTION_SUCCESS,
  SmartBarConstants.TEACHER_SELECTION_SUCCESS,
  SmartBarConstants.CLASS_SELECTION_SUCCESS,
  SmartBarConstants.GROUP_SELECTION_SUCCESS,
  SmartBarConstants.STUDENT_SELECTION_SUCCESS,
];

export default function* defaultSaga() {
  yield all([
    takeLatest(getSettingsConstants, psSettingsContainerFlow),
    takeLatest(getTestAssignmentConstants, psTestAssignmenFlow),
    takeLatest(Constants.PS_SETTINGS_SAVE, psProgramSettingsSaveFlow),
  ]);
}
