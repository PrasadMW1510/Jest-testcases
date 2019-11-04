import { call, put, takeLatest, select, all } from 'redux-saga/effects';

import { COHORT_TYPE, USER_ORG } from 'containers/App/constants';
import {
  makeSelectLoginUserOrg,
  makeSelectProfileSessionId,
  makeSelectProfileUserOrgId,
} from 'containers/App/selectors';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import { TAB_ADVANCED_SETTINGS, TAB_SETTINGS } from 'components/MISetting/constants';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Request from './request';
import * as Transformers from './transformers';
import * as SmartBarConstants from '../SmartBarContainer/constants';

const getSchoolId = (selectedCohortInfo, userOrgType, userOrgId) =>
  userOrgType === USER_ORG.School ? userOrgId : selectedCohortInfo.schoolId;

export function* miProgramSettingsRequestFlow() {
  try {
    const { sessionId, userOrgId, userOrgType } = yield call(getProfileData);
    let apiRequest = null;
    let apiParam = null;
    const selectedCohortInfo = yield select(makeSelectEffectiveCohortObject());
    const schoolId = getSchoolId(selectedCohortInfo, userOrgType, userOrgId);
    // the grade-level request is an outlier since its cohort ID doesn't uniquely identify across higher cohorts;
    // the rest conform to a single API
    if (selectedCohortInfo.cohortType === COHORT_TYPE.Grade) {
      apiRequest = Request.getMISettingsForGrade;
      apiParam = {
        cohortId: selectedCohortInfo.id,
        schoolId,
        sessionId,
      };
    } else {
      apiRequest = Request.getMISettings;
      apiParam = {
        cohortId: selectedCohortInfo.id,
        cohortType: selectedCohortInfo.cohortType,
        sessionId,
      };
    }
    // eslint-disable-next-line prefer-const
    let [apiProgramSettings, apiProficiencyBandData] = yield all([
      call(apiRequest, apiParam),
      call(Request.getMIProficiencyBandData, {
        cohortId: selectedCohortInfo.id,
        cohortType: selectedCohortInfo.cohortType.toLowerCase(),
        sessionId,
      }),
    ]);
    apiProgramSettings = apiProgramSettings.settings ? apiProgramSettings.settings[0] : {};
    const proficiencyBandData = Transformers.proficiencyBandsToFormRepresentation(
      apiProficiencyBandData
    );
    yield put(Actions.MIProgramSettingsRequestSuccess(apiProgramSettings, proficiencyBandData));
  } catch (err) {
    yield put(Actions.MIProgramSettingsRequestFailure(err));
  }
}

export function* MISaveRequestFlow(action) {
  let saveSaga = null;
  if (action.activeTabId === TAB_SETTINGS) {
    saveSaga = MITabSettingsSaveRequestFlow;
  } else if (action.activeTabId === TAB_ADVANCED_SETTINGS) {
    saveSaga = MITabAdvancedSettingsSaveRequestFlow;
  } else {
    return;
  }
  yield call(saveSaga, action);
}

export function* MITabSettingsSaveRequestFlow(action) {
  try {
    const apiProgramSettingsObj = Transformers.programSettingsToApiRepresentation(
      action.programSettingsToSave.chosen_settings[0]
    );
    const { sessionId, userOrgId, userOrgType } = yield call(getProfileData);
    let apiRequest = null;
    let apiParam = null;
    const selectedCohortInfo = yield select(makeSelectEffectiveCohortObject());
    const schoolId = getSchoolId(selectedCohortInfo, userOrgType, userOrgId);
    if (selectedCohortInfo.cohortType === COHORT_TYPE.Grade) {
      apiRequest = Request.postMISettingsForGrade;
      apiParam = {
        cohortId: selectedCohortInfo.id,
        programSettingsObj: apiProgramSettingsObj,
        schoolId,
        sessionId,
      };
    } else {
      apiRequest = Request.postMISettings;
      apiParam = {
        cohortId: selectedCohortInfo.id,
        cohortType: selectedCohortInfo.cohortType,
        programSettingsObj: apiProgramSettingsObj,
        sessionId,
      };
    }
    yield call(apiRequest, apiParam);
    yield put(Actions.MISaveRequestSuccess(action.activeTabId, action.programSettingsToSave));
  } catch (err) {
    yield put(Actions.MISaveRequestFailure(err));
  }
}

export function* MITabAdvancedSettingsSaveRequestFlow(action) {
  try {
    const { sessionId, userOrgId } = yield call(getProfileData);
    const apiProficiencyBandData = Transformers.proficiencyBandsToApiRepresentation(
      action.programSettingsToSave
    );
    const apiParams = {
      districtId: userOrgId,
      proficiencyBandData: apiProficiencyBandData,
      sessionId,
    };
    yield call(Request.postMIProficiencyBandData, apiParams);
    yield put(Actions.MISaveRequestSuccess(action.activeTabId, action.programSettingsToSave));
  } catch (err) {
    yield put(Actions.MISaveRequestFailure(err));
  }
}

export function* getProfileData() {
  const sessionId = yield select(makeSelectProfileSessionId());
  const userOrgType = yield select(makeSelectLoginUserOrg());
  const userOrgId = yield select(makeSelectProfileUserOrgId());
  return { sessionId, userOrgId, userOrgType };
}

export default function* defaultSaga() {
  yield all([
    takeLatest(
      [
        Constants.MI_PROGRAM_SETTINGS_REQUEST,
        SmartBarConstants.CLASS_SELECTION_SUCCESS,
        SmartBarConstants.GRADE_SELECTION_SUCCESS,
        SmartBarConstants.GROUP_SELECTION_SUCCESS,
        SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
        SmartBarConstants.STUDENT_SELECTION_SUCCESS,
        SmartBarConstants.TEACHER_SELECTION_SUCCESS,
      ],
      miProgramSettingsRequestFlow
    ),
    takeLatest(Constants.MI_SAVE_REQUEST, MISaveRequestFlow),
  ]);
}
