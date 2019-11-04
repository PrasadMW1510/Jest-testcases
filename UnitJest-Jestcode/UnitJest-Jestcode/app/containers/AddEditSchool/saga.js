import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { initialize, stopSubmit } from 'redux-form/immutable';
import { updateUserData } from 'containers/App/actions';
import {
  makeSelectProfileDistrictId,
  makeSelectProfileOrganizationData,
  makeSelectProfileSessionId,
} from 'containers/App/selectors';
import { makeSelectSchoolId } from 'containers/SmartBarContainer/selectors';
import { getProfileForSchoolAdmin } from 'containers/ProfilePageContainer/request';
import { hideModal } from 'containers/ModalController/actions';
import { COHORT_TYPE } from 'containers/App/constants';
import * as MIAActions from 'containers/ManageInactiveAccountsContainer/actions';
import { TITLE_1_STATUS_LIST } from 'components/SchoolForm/constants';
import { fromJS } from 'immutable';
import { transformSchoolDataForForm, transformSchoolMapForPost } from './transformers';
import * as Request from './request';
import * as Constants from './constants';
import * as Actions from './actions';

export function* initializeSchoolFormRequestFlow(action) {
  try {
    const { sessionId, districtId } = yield call(getApiParams);
    const isEdit = action && action.data && action.data.edit;
    const editSchoolId = action && action.data && action.data.editSchoolId;
    const [metaData, schoolProfile] = yield all([
      call(loadMetaData, sessionId, districtId),
      call(getInitialState, sessionId, isEdit, editSchoolId),
    ]);
    yield put(initialize(Constants.FORM_SCHOOL_PROFILE, fromJS({ ...schoolProfile, metaData })));
    yield put(Actions.initializeSchoolFormRequestSuccess());
  } catch (err) {
    yield put(Actions.initializeSchoolFormRequestFailure(err));
  }
}

export function* loadMetaData(sessionId, districtId) {
  const [gradeListForDistrict] = yield all([
    call(Request.getGradeListForDistrict, sessionId, districtId),
  ]);
  return {
    [Constants.META_DATA_GRADES]: gradeListForDistrict,
  };
}

// The action object has an `isEdit` property
export function* handleSaveRequestFlow(action) {
  try {
    const { sessionId, districtId } = yield call(getApiParams);
    const schoolId = yield call(getActiveSchool);
    const postData = transformSchoolMapForPost(action.schoolObject, schoolId, districtId);
    const request = action.isEdit ? Request.postEditSchool : Request.postAddSchool;
    yield call(request, sessionId, postData);
    yield put(Actions.saveSchoolRequestSuccess());
    // Refreshes list of schools
    yield put(updateUserData());
    yield put(hideModal());
  } catch (err) {
    // The errors need to be hooked into the form validation
    // Mark the form as having errors
    yield put(stopSubmit(Constants.FORM_SCHOOL_PROFILE, err));
    // For completeness, call this too
    yield put(Actions.saveSchoolRequestFailure(err));
  }
}

export function* handleSaveMIARequestFlow(action) {
  try {
    const { sessionId, districtId } = yield call(getApiParams);
    const schoolId = action && action.editSchoolId;
    const postData = transformSchoolMapForPost(action.schoolObject, schoolId, districtId);
    const request = Request.postEditSchool;
    yield call(request, sessionId, postData);
    yield put(Actions.saveSchoolRequestSuccess());

    // Refreshes list of schools
    yield put(updateUserData());

    // school reactivating complete, issue request to refresh mia page
    yield put(MIAActions.getInactiveCohortMembersRequest(action.searchOpts));

    yield put(hideModal());
  } catch (err) {
    // The errors need to be hooked into the form validation
    // Mark the form as having errors
    yield put(stopSubmit(Constants.FORM_SCHOOL_PROFILE, err));
    // For completeness, call this too
    yield put(Actions.saveSchoolRequestFailure(err));
  }
}

// Handle the difference starting form state between `Add` & `Edit`
export function* getInitialState(sessionId, isEdit, editSchoolId) {
  let schoolId = yield call(getActiveSchool);
  if (editSchoolId) {
    schoolId = editSchoolId;
  }
  let initialData = {};
  // An 'edit' action should always be accompanied by a schoolId.
  if (isEdit && schoolId) {
    // Edit School Profile
    // Failures handled in `initializeSchoolFormRequestFlow` try/catch
    initialData = yield call(getProfileForSchoolAdmin, sessionId, schoolId);
  } else {
    initialData = {
      contact_info: [{}],
      contact_person: [{}],
      school_info: [
        {
          grades: [],
          grading_periods: [{ grading_period: [] }],
          school_period: [],
          school_types: [],
          title_1_status: TITLE_1_STATUS_LIST[0].id,
        },
      ],
    };
  }
  // Transform raw server class profile data into a form-friendly shape
  return transformSchoolDataForForm(initialData);
}

export function* getActiveSchool() {
  let schoolId = null;
  const smartbarSchoolId = yield select(makeSelectSchoolId());
  // The smartbar selection, if any, takes precedence
  if (smartbarSchoolId) {
    schoolId = smartbarSchoolId;
  } else {
    // Check the Profile Orgs
    const profileOrgs = yield select(makeSelectProfileOrganizationData());
    const firstProfileOrg = profileOrgs && profileOrgs.getIn([0, 'organization', 0]);
    const orgType = firstProfileOrg && firstProfileOrg.getIn(['type', 0]);

    // Cover school admins
    if (typeof orgType === 'string' && orgType.toLowerCase() === COHORT_TYPE.School.toLowerCase()) {
      // Org is a school, return its id
      schoolId = firstProfileOrg.getIn(['org_id', 0]);
    }
  }
  return schoolId;
}

export function* getApiParams() {
  const sessionId = yield select(makeSelectProfileSessionId());
  const districtId = yield select(makeSelectProfileDistrictId());
  return { sessionId, districtId };
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.INITIALIZE_SCHOOL_FORM_REQUEST, initializeSchoolFormRequestFlow),
    takeLatest(Constants.SAVE_SCHOOL_REQUEST, handleSaveRequestFlow),
    takeLatest(Constants.SAVE_SCHOOL_MIA_REQUEST, handleSaveMIARequestFlow),
  ]);
}
