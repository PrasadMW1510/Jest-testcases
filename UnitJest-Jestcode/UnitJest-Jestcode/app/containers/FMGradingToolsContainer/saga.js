import { call, put, takeLatest, select, all } from 'redux-saga/effects';

import { USER_ORG } from 'containers/App/constants';
import {
  makeSelectLoginUserOrg,
  makeSelectProfileSessionId,
  makeSelectProfileUserOrgId,
} from 'containers/App/selectors';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import * as Request from './request';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Transformers from './transformers';
import * as SmartBarConstants from '../SmartBarContainer/constants';

const getSchoolId = (selectedCohortInfo, userOrgType, userOrgId) =>
  userOrgType === USER_ORG.School ? userOrgId : selectedCohortInfo.id;

export function* FMStudentOperationRequestFlow() {
  try {
    const { sessionId, userOrgId, userOrgType } = yield call(getProfileData);
    let apiRequest = null;
    let apiParam = null;
    const selectedCohortInfo = yield select(makeSelectEffectiveCohortObject());
    const schoolId = getSchoolId(selectedCohortInfo, userOrgType, userOrgId);

    apiRequest = Request.getFMStudentOperation;
    apiParam = {
      cohortId: selectedCohortInfo.id,
      cohortType: selectedCohortInfo.cohortType,
      schoolId,
      sessionId,
    };
    const apiStudentOperationsData = yield call(apiRequest, apiParam);
    const studentOperationsData = Transformers.FMStudentOperationRepresentation(
      apiStudentOperationsData,
      selectedCohortInfo.cohortType
    );
    yield put(Actions.FMStudentOperationRequestSuccess(studentOperationsData));
  } catch (err) {
    // need to handle error here
  }
}

export function* FMGeneratePdfReportFlow({
  current,
  addition,
  subtraction,
  multiplication,
  division,
  problemType,
  orientation,
  answerKey,
}) {
  try {
    const { sessionId } = yield call(getProfileData);
    let apiRequest = null;
    let apiParam = null;
    const selectedCohortInfo = yield select(makeSelectEffectiveCohortObject());
    apiRequest = Request.FMGeneratePdfReport;
    apiParam = {
      cohortId: selectedCohortInfo.id,
      cohortType: selectedCohortInfo.cohortType,
      sessionId,
      current,
      addition,
      subtraction,
      multiplication,
      division,
      problemType,
      orientation,
      answerKey,
    };
    const apiGeneratePdfReportData = yield call(apiRequest, apiParam);
    const generatePdfReportUrl = Transformers.FMGeneratePdfReportData(
      apiGeneratePdfReportData,
      selectedCohortInfo.cohortType.toLowerCase()
    );
    yield call(Request.displayGeneratedReport, generatePdfReportUrl);
  } catch (err) {
    // handle err here
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
        Constants.FM_STUDENT_OPERATION_REQUEST,
        SmartBarConstants.CLASS_SELECTION_SUCCESS,
        SmartBarConstants.GRADE_SELECTION_SUCCESS,
        SmartBarConstants.GROUP_SELECTION_SUCCESS,
        SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
        SmartBarConstants.STUDENT_SELECTION_SUCCESS,
        SmartBarConstants.TEACHER_SELECTION_SUCCESS,
      ],
      FMStudentOperationRequestFlow
    ),
  ]);
  yield takeLatest(Constants.FM_GENERATE_PDF_REPORT, FMGeneratePdfReportFlow);
}
