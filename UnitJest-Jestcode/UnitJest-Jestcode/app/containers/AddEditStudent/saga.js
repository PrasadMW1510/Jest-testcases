import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { initialize, stopSubmit } from 'redux-form/immutable';
import { hideModal } from 'containers/ModalController/actions';
import {
  getClassData,
  getClassDataBySchool,
  getGradeDataBySchool,
  getStudentDataBySchool,
  getPasswordConfig,
} from 'containers/App/request';
import { getStudentProfilePageData } from 'containers/ProfilePageContainer/request';
import { makeSelectProfileUserType } from 'containers/App/selectors';
import { USER_TYPE } from 'containers/App/constants';
import {
  makeSelectedActiveClassId,
  makeSelectedActiveGroupId,
  makeSelectedActiveStudentId,
  makeSelectedActiveGradeId,
} from 'containers/SmartBarContainer/selectors';
import { studentListRequestSuccess } from 'containers/App/actions';
import { redirectionSmartBarSGT } from 'containers/SmartBarContainer/actions';
import { getActiveSchool, getUserData } from 'containers/AddEditClass/saga';
import { transformStudentDataForForm } from 'utils/transformData';
import { isUserTypeAdminOrTech } from 'utils/utilities';
import { transformStudentMapForPost } from './transformers';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';

export function* initializeStudentFormRequestFlow(action) {
  try {
    const { sessionId, userId } = yield call(getUserData);
    const schoolId = yield call(getActiveSchool);
    const isEdit = action && action.data && action.data.edit;
    // Gets all the needed data to display the form. `studentProfile`
    // will be populated with initial data (either the full profile data
    // for an 'edit' or appropriate defaults for an 'add student').
    const [metaData, studentProfile] = yield all([
      call(loadMetaData, sessionId, schoolId, userId),
      call(getInitialState, sessionId, isEdit),
    ]);

    const metaGroups = metaData[Constants.META_DATA_GROUPS];

    // Steps to auto-select the associated class when a group is selected (via smartbar) for an `Add Student`

    // Step 1 - Get the full blown group details for the selected group id
    const groups =
      Array.isArray(metaGroups) && metaGroups.filter(item => studentProfile.groups[item.group_id]);

    // Step 2 - Create an object of the selected class ids that are associated with the selected groups
    // Each group item has a pointer (`owner_id`) to the class it belongs in.
    const classes =
      Array.isArray(groups) &&
      groups.reduce((obj, { owner_id }) => ({ ...obj, [owner_id[0]]: true }), {});

    yield put(
      initialize(
        Constants.FORM_STUDENT_PROFILE,
        fromJS({
          ...studentProfile,
          // Step 3 - Insert auto-selected class associated with selected group into initial form state (for `Add` only)
          ...(!isEdit && groups.length && { classes }),
          metaData,
        })
      )
    );
    yield put(Actions.initializeStudentFormRequestSuccess());
  } catch (err) {
    yield put(Actions.initializeStudentFormRequestFailure(err));
  }
}

export function* loadMetaData(sessionId, schoolId, userId) {
  const userType = yield select(makeSelectProfileUserType());
  const getClassDataForUserType = isUserTypeAdminOrTech(userType)
    ? getClassDataBySchool
    : getClassData;
  // Make requests in parallel. Failures handled in `initializeStudentFormRequestFlow` try/catch
  const [grades, classes, groups, passwordConfig] = yield all([
    call(getGradeDataBySchool, sessionId, schoolId),
    call(getClassDataForUserType, sessionId, schoolId, userId),
    call(Request.getGroupDataBySchool, sessionId, schoolId),
    call(getPasswordConfig, sessionId),
  ]);
  return {
    [Constants.META_DATA_GRADES]: grades,
    [Constants.META_DATA_CLASSES]: classes,
    [Constants.META_DATA_GROUPS]: groups,
    [Constants.META_DATA_PASSWORD_CONFIG]: passwordConfig,
  };
}

// Handle the difference starting form state between `Add` & `Edit`
export function* getInitialState(sessionId, isEdit) {
  const studentId = yield select(makeSelectedActiveStudentId());
  const gradeId = yield select(makeSelectedActiveGradeId());
  const classId = yield select(makeSelectedActiveClassId());
  const groupId = yield select(makeSelectedActiveGroupId());

  let initialData = {};
  if (isEdit && studentId) {
    // An 'edit' action should always be accompanied by a studentId.
    // Failures handled in `initializeStudentFormRequestFlow` try/catch
    initialData = yield call(getStudentProfilePageData, sessionId, studentId);
  } else {
    // Pre-select the grade, class, group to match smartbar selections
    initialData = {
      user_type: USER_TYPE.Student,
      ...(gradeId && { selectedGrade: gradeId }),
      ...(classId && { selectedClass: { [classId]: true } }),
      ...(groupId && { selectedGroup: { [groupId]: true } }),
    };
  }
  // Transform student profile data into a form-friendly shape.
  // `transformStudentDataForForm` is not asynchronous... `yield` usage aids in testing.
  return yield call(transformStudentDataForForm, initialData);
}

// The action object has an `isEdit` property
export function* handleSaveRequestFlow(action) {
  try {
    const { sessionId, userId } = yield call(getUserData);
    // Empty student id for 'Adds'
    const studentId = yield select(makeSelectedActiveStudentId());
    const schoolId = yield call(getActiveSchool);

    const postData = transformStudentMapForPost(action.studentObj, studentId, schoolId);
    const request = action.isEdit ? Request.postEditStudent : Request.postAddStudent;

    // Save data
    yield call(request, sessionId, postData);
    yield put(Actions.saveStudentRequestSuccess());

    // Update smart bar refresh
    yield put(redirectionSmartBarSGT());

    // Update Student List (SmartBar)
    const studentDetails = yield call(getStudentDataBySchool, sessionId, schoolId, userId);
    yield put(studentListRequestSuccess(studentDetails));

    yield put(hideModal());
  } catch (err) {
    // Mark the form as having errors
    yield put(stopSubmit(Constants.FORM_STUDENT_PROFILE, err));
    // For completeness, call this too
    yield put(Actions.saveStudentRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.INITIALIZE_STUDENT_FORM_REQUEST, initializeStudentFormRequestFlow),
    takeLatest(Constants.SAVE_STUDENT_REQUEST, handleSaveRequestFlow),
  ]);
}
