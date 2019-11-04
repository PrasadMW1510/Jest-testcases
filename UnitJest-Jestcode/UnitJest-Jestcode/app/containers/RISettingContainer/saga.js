import { call, put, takeLatest, select, all } from 'redux-saga/effects';

import { COHORT_TYPE, USER_ORG } from 'containers/App/constants';
import {
  makeSelectLoginUserOrg,
  makeSelectProfileSessionId,
  makeSelectProfileUserOrgId,
} from 'containers/App/selectors';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import { TAB_ADVANCED_SETTINGS, TAB_SETTINGS } from 'components/RISetting/constants';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Request from './request';
import * as Transformers from './transformers';
import * as SmartBarConstants from '../SmartBarContainer/constants';

const getSchoolId = (selectedCohortInfo, userOrgType, userOrgId) =>
  userOrgType === USER_ORG.School ? userOrgId : selectedCohortInfo.schoolId;

export function* riProgramSettingsRequestFlow() {
  try {
    const { sessionId, userOrgId, userOrgType } = yield call(getProfileData);
    let apiRequest = null;
    let apiParam = null;
    const selectedCohortInfo = yield select(makeSelectEffectiveCohortObject());
    const schoolId = getSchoolId(selectedCohortInfo, userOrgType, userOrgId);
    // the grade-level request is an outlier since its cohort ID doesn't uniquely identify across higher cohorts;
    // the rest conform to a single API
    if (selectedCohortInfo.cohortType === COHORT_TYPE.Grade) {
      apiRequest = Request.getRISettingsForGrade;
      apiParam = {
        cohortId: selectedCohortInfo.id,
        schoolId,
        sessionId,
      };
    } else {
      apiRequest = Request.getRISettings;
      apiParam = {
        cohortId: selectedCohortInfo.id,
        cohortType: selectedCohortInfo.cohortType,
        sessionId,
      };
    }
    // eslint-disable-next-line prefer-const
    let [apiProgramSettings, apiProficiencyBandData] = yield all([
      call(apiRequest, apiParam),
      call(Request.getRIProficiencyBandData, sessionId),
    ]);
    if (!apiProgramSettings[0].sri_settings) {
      apiProgramSettings = [
        {
          sri_settings: [{}],
        },
      ];
    }
    const proficiencyBandData = Transformers.proficiencyBandsToFormRepresentation(
      apiProficiencyBandData
    );
    yield put(
      Actions.RIProgramSettingsRequestSuccess(
        apiProgramSettings[0].sri_settings[0],
        proficiencyBandData
      )
    );
  } catch (err) {
    yield put(Actions.RIProgramSettingsRequestFailure(err));
  }
}

export function* RISaveRequestFlow(action) {
  let saveSaga = null;
  if (action.activeTabId === TAB_SETTINGS) {
    saveSaga = RITabSettingsSaveRequestFlow;
  } else if (action.activeTabId === TAB_ADVANCED_SETTINGS) {
    saveSaga = RITabAdvancedSettingsSaveRequestFlow;
  } else {
    return;
  }
  yield call(saveSaga, action);
}

export function* RITabSettingsSaveRequestFlow(action) {
  try {
    const apiProgramSettingsObj = Transformers.programSettingsToApiRepresentation(
      action.programSettingsToSave
    );
    const { sessionId, userOrgId, userOrgType } = yield call(getProfileData);
    let apiRequest = null;
    let apiParam = null;
    const selectedCohortInfo = yield select(makeSelectEffectiveCohortObject());
    const schoolId = getSchoolId(selectedCohortInfo, userOrgType, userOrgId);
    if (selectedCohortInfo.cohortType === COHORT_TYPE.Grade) {
      apiRequest = Request.postRISettingsForGrade;
      apiParam = {
        cohortId: selectedCohortInfo.id,
        programSettingsObj: apiProgramSettingsObj,
        schoolId,
        sessionId,
      };
    } else {
      apiRequest = Request.postRISettings;
      apiParam = {
        cohortId: selectedCohortInfo.id,
        cohortType: selectedCohortInfo.cohortType,
        programSettingsObj: apiProgramSettingsObj,
        sessionId,
      };
    }
    yield call(apiRequest, apiParam);
    yield put(Actions.RISaveRequestSuccess(action.activeTabId, action.programSettingsToSave));
  } catch (err) {
    yield put(Actions.RISaveRequestFailure(err));
  }
}

export function* RITabAdvancedSettingsSaveRequestFlow(action) {
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
    yield call(Request.postRIProficiencyBandData, apiParams);
    yield put(Actions.RISaveRequestSuccess(action.activeTabId, action.programSettingsToSave));
  } catch (err) {
    yield put(Actions.RISaveRequestFailure(err));
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
        Constants.RI_PROGRAM_SETTINGS_REQUEST,
        SmartBarConstants.CLASS_SELECTION_SUCCESS,
        SmartBarConstants.GRADE_SELECTION_SUCCESS,
        SmartBarConstants.GROUP_SELECTION_SUCCESS,
        SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
        SmartBarConstants.STUDENT_SELECTION_SUCCESS,
        SmartBarConstants.TEACHER_SELECTION_SUCCESS,
      ],
      riProgramSettingsRequestFlow
    ),
    takeLatest(Constants.RI_SAVE_REQUEST, RISaveRequestFlow),
  ]);
}
