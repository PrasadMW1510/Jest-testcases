import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { change, initialize, setSubmitFailed } from 'redux-form/immutable';
import { hideModal } from 'containers/ModalController/actions';
import { COHORT_TYPE } from 'containers/App/constants';
import { redirectionSmartBarSGT } from 'containers/SmartBarContainer/actions';
import { getGradeDataBySchool, getTeacherDataBySchool } from 'containers/App/request';
import { getClassDetails } from 'containers/ProfilePageContainer/request';
import {
  makeSelectProfileOrganizationData,
  makeSelectProfileSessionId,
  makeSelectProfileUserId,
} from 'containers/App/selectors';
import {
  makeSelectedActiveSchoolId,
  makeSelectedActiveClassId,
} from 'containers/SmartBarContainer/selectors';
import { transformClassDataForForm, transformClassMapForPost } from 'utils/transformData';
import * as AppActions from 'containers/App/actions';
import * as MIAActions from 'containers/ManageInactiveAccountsContainer/actions';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';

export function* initializeClassFormRequestFlow(action) {
  try {
    const { sessionId, userId } = yield call(getUserData);
    let schoolId = yield call(getActiveSchool);
    if (action.data && action.data.schoolIdForClass) {
      schoolId = action.data.schoolIdForClass;
    }
    // Gets all the needed data to display the form. `classProfile`
    // will be populated with initial data (either the full profile data
    // for an 'edit' or appropriate defaults for an 'add class').
    const [metaData, classProfile] = yield all([
      call(loadMetaData, sessionId, schoolId, userId),
      call(
        getInitialState,
        sessionId,
        userId,
        action && action.data && action.data.edit,
        action && action.data && action.data.editClassId
      ),
    ]);
    yield put(initialize(Constants.FORM_CLASS_PROFILE, fromJS({ ...classProfile, metaData })));
    yield put(Actions.initializeClassFormRequestSuccess());
  } catch (err) {
    yield put(Actions.initializeClassFormRequestFailure(err));
  }
}

// The action object has an `isEdit` property
export function* handleSaveRequestFlow(action) {
  try {
    const { sessionId } = yield call(getUserData);
    const classId = yield select(makeSelectedActiveClassId());
    const schoolId = yield call(getActiveSchool);
    const postData = transformClassMapForPost(action.classObject, classId, schoolId);
    const request = action.isEdit ? Request.postEditClass : Request.postAddClass;
    yield call(request, sessionId, postData);
    yield put(Actions.saveClassRequestSuccess());
    // Refreshes list of classes
    yield put(redirectionSmartBarSGT());
    yield put(hideModal());
  } catch (err) {
    // The errors need to be hooked into the form validation
    yield put(change(Constants.FORM_CLASS_PROFILE, 'serverErrors', err));
    // Mark the form as having errors
    yield put(setSubmitFailed(Constants.FORM_CLASS_PROFILE));
    // For completeness, call this too
    yield put(Actions.saveClassRequestFailure(err));
  }
}

// The action object has an `isEdit` property
export function* handleSaveMIARequestFlow(action) {
  try {
    const { sessionId } = yield call(getUserData);
    let classId = yield select(makeSelectedActiveClassId());

    if (action.editClassId) {
      classId = action.editClassId;
    }
    let schoolId = yield call(getActiveSchool);
    if (action.schoolIdForClass) {
      schoolId = action.schoolIdForClass;
    }
    const postData = transformClassMapForPost(action.classObject, classId, schoolId);
    const request = action.isEdit ? Request.postEditClass : Request.postAddClass;
    yield call(request, sessionId, postData);
    yield put(Actions.saveClassMIARequestSuccess());
    // Refreshes list of classes
    // refresh smartbar - updated reactivated class
    yield put(AppActions.updateUserData());

    // class reactivating complete, issue request to refresh mia page
    yield put(MIAActions.getInactiveCohortMembersRequest(action.searchOpts));
    yield put(hideModal());
  } catch (err) {
    // The errors need to be hooked into the form validation
    yield put(change(Constants.FORM_CLASS_PROFILE, 'serverErrors', err));
    // Mark the form as having errors
    yield put(setSubmitFailed(Constants.FORM_CLASS_PROFILE));
    // For completeness, call this too
    yield put(Actions.saveClassMIARequestFailure(err));
  }
}

export function* loadMetaData(sessionId, schoolId, userId) {
  // Make requests in parallel. Failures handled in `initializeClassFormRequestFlow` try/catch
  const [grades, teachers, students] = yield all([
    call(getGradeDataBySchool, sessionId, schoolId, userId),
    call(getTeacherDataBySchool, sessionId, schoolId, userId),
    call(Request.getStudentDataBySchool, sessionId, schoolId, userId),
  ]);
  return {
    [Constants.META_DATA_GRADES]: grades,
    [Constants.META_DATA_TEACHERS]: teachers,
    [Constants.META_DATA_STUDENTS]: students,
  };
}

// Handle the difference starting form state between `Add` & `Edit`
export function* getInitialState(sessionId, userId, isEdit, editClassId) {
  let classId = yield select(makeSelectedActiveClassId());
  if (editClassId) {
    classId = editClassId;
  }
  let initialData = {};

  // An 'edit' action should always be accompanied by a classId.
  if (isEdit && classId) {
    // Edit Class Profile
    // Failures handled in `initializeClassFormRequestFlow` try/catch
    initialData = yield call(getClassDetails, sessionId, classId);

    if (editClassId) {
      initialData.teachers = [{ user: [{ user_id: userId }] }];
    }
  } else {
    // Add A Class
    // Auto-select 'teacher1' to the logged-in user.
    // JSON structure from server is mimicked so 'transformClassDataForForm'
    // can be used... it supplies appropriate default values.
    initialData = { teachers: [{ user: [{ user_id: userId }] }] };
  }
  // Transform raw server class profile data into a form-friendly shape
  return transformClassDataForForm(initialData);
}

// Failures handled in `initializeClassFormRequestFlow` try/catch
export function* getUserData() {
  const sessionId = yield select(makeSelectProfileSessionId());
  const userId = yield select(makeSelectProfileUserId());
  return { sessionId, userId };
}

export function* getActiveSchool() {
  let schoolId = null;
  const smartbarSchoolId = yield select(makeSelectedActiveSchoolId());

  // The smartbar selection, if any, takes precedance
  if (smartbarSchoolId) {
    schoolId = smartbarSchoolId;
  } else {
    // Check the Profile Orgs
    const profileOrgs = yield select(makeSelectProfileOrganizationData());
    const firstProfileOrg = profileOrgs && profileOrgs.getIn([0, 'organization', 0]);
    const orgType = firstProfileOrg && firstProfileOrg.getIn(['type', 0]);

    // Cover teachers & school admins
    if (typeof orgType === 'string' && orgType.toLowerCase() === COHORT_TYPE.School.toLowerCase()) {
      // Org is a school, return its id
      schoolId = firstProfileOrg.getIn(['org_id', 0]);
    }
  }
  return schoolId;
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.INITIALIZE_CLASS_FORM_REQUEST, initializeClassFormRequestFlow),
    takeLatest(Constants.SAVE_CLASS_REQUEST, handleSaveRequestFlow),
    takeLatest(Constants.SAVE_CLASS_MIA_REQUEST, handleSaveMIARequestFlow),
  ]);
}
