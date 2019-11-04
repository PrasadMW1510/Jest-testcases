/**
 * Global App Saga
 * This Saga should only contain sagas that affect the global app state (reducer)
 */

import { push, LOCATION_CHANGE } from 'react-router-redux';
import { call, put, takeLatest, select, all, take, cancel } from 'redux-saga/effects';
import { getBaseUrl } from 'utils/request';
import { deleteLocalSLMSId, saveLocalSLMSId } from 'utils/cookieManager';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as Request from './request';
import * as Actions from './actions';
import {
  makeSelectGlobal,
  makeSelectLoginData,
  makeSelectProfileData,
  makeSelectProfileUserId,
  makeSelectProfileSessionId,
  makeSelectSchoolsDataMap,
  makeSelectSchoolsData,
} from './selectors';
import * as Constants from './constants';

/**
 * Get profile info for current user
 */
export function* profileRequestFlow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());

    const profileDetails = yield call(Request.getProfileData, sessionId, userId);

    yield put(Actions.profileRequestSuccess(profileDetails));
  } catch (err) {
    yield put(Actions.profileRequestFailure(err));
  }
}

/**
 * Get schools for current user
 */
export function* schoolRequestFlow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());

    const schoolDetails = yield call(Request.getSchoolData, sessionId, userId);

    yield put(Actions.schoolListRequestSuccess(schoolDetails));
  } catch (err) {
    yield put(Actions.schoolListRequestFailure(err));
  }
}

/**
 * Login flow for district users
 */
export function* districtUserLoginFlow() {
  try {
    const loginData = yield select(makeSelectLoginData());
    const sessionId = yield select(makeSelectProfileSessionId());

    const schoolDetails = yield call(
      Request.getSchoolDataByDistrict,
      sessionId,
      loginData.getIn(['user_org_id', 0])
    );

    yield put(Actions.schoolListRequestSuccess(schoolDetails));
  } catch (err) {
    yield put(Actions.schoolListRequestFailure(err));
  }
}

/**
 * Login flow for teacher users
 */
export function* teacherUserLoginFlow() {
  const profileData = yield select(makeSelectProfileData());

  // auto select if there is one school
  if (profileData.getIn(['organizations', 0, 'organization']).size !== 1) {
    yield call(schoolRequestFlow);
  } else {
    const schoolId = profileData.getIn(['organizations', 0, 'organization', 0, 'org_id', 0]);
    yield call(
      teacherUpdateFlow,
      Actions.updateTeacherData(profileData.getIn(['user_id', 0]), schoolId)
    );
  }
}

/**
 * Get programs available for current user
 */
export function* programAvailableRequestFlow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());

    const programDetails = yield call(Request.getProgramList, sessionId);
    yield put(Actions.programAvailableRequestSuccess(programDetails));
  } catch (err) {
    yield put(Actions.programAvailableRequestFailure(err));
  }
}
/**
 * Update school derived data
 *
 * @param action
 */
export function* schoolUpdateFlow(action) {
  try {
    const loginData = yield select(makeSelectLoginData());
    const userOrg = loginData.getIn(['user_org', 0]);
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());

    if (userOrg) {
      // non-teachers grab teacher and grade data
      const [teacherDetails, gradeDetails] = yield all([
        call(Request.getTeacherDataBySchool, sessionId, action.schoolId),
        call(Request.getGradeDataBySchool, sessionId, action.schoolId),
      ]);

      yield put(Actions.teacherListRequestSuccess(teacherDetails));
      yield put(Actions.gradeListRequestSuccess(gradeDetails));

      yield put(Actions.updateSchoolDataSuccess());
    } else {
      // teachers grab classes, groups, and students
      const [classDetails, groupDetails, studentDetails] = yield all([
        call(Request.getClassData, sessionId, action.schoolId, userId),
        call(Request.getGroupDataBySchool, sessionId, action.schoolId, userId),
        call(Request.getStudentDataBySchool, sessionId, action.schoolId, userId),
      ]);

      yield put(Actions.classListRequestSuccess(classDetails));
      yield put(Actions.groupListRequestSuccess(groupDetails));
      yield put(Actions.studentListRequestSuccess(studentDetails));

      yield put(Actions.updateSchoolDataSuccessTeacher());
    }
  } catch (err) {
    yield put(Actions.updateSchoolDataFailure(err));
  }
}

/**
 * Login flow for a school admin user
 */
export function* schoolUserLoginFlow() {
  try {
    const loginData = yield select(makeSelectLoginData());
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const schoolId = loginData.getIn(['user_org_id', 0]);

    const [classDetails, teacherDetails, gradeDetails] = yield all([
      call(Request.getClassDataBySchool, sessionId, schoolId, userId),
      call(Request.getTeacherDataBySchool, sessionId, schoolId, userId),
      call(Request.getGradeDataBySchool, sessionId, schoolId, userId),
    ]);

    // update class details
    yield put(Actions.classListRequestSuccess(classDetails));

    // update group details
    yield put(Actions.teacherListRequestSuccess(teacherDetails));

    // update student details
    yield put(Actions.gradeListRequestSuccess(gradeDetails));

    // Seperate action for school admin login
    yield put(Actions.updateSchoolAdminDataSuccess());
  } catch (err) {
    yield put(Actions.updateSchoolDataFailure(err));
  }
}

/**
 * Update grade derived data.
 *
 * @param action
 */
export function* gradeUpdateFlow(action) {
  try {
    const loginData = yield select(makeSelectLoginData());
    const sessionId = yield select(makeSelectProfileSessionId());

    // some user types cannot select schools. in that case, we use their user organization ids
    const schoolId = action.schoolId || loginData.getIn(['user_org_id', 0]);

    const [classDetails, teacherDetails, studentDetails] = yield all([
      call(Request.getClassDataByGradeSchool, sessionId, schoolId, action.gradeId),
      call(Request.getTeacherDataByGradeSchool, sessionId, schoolId, action.gradeId),
      call(Request.getStudentDataByGradeSchool, sessionId, schoolId, action.gradeId),
    ]);

    // update class details
    yield put(Actions.classListRequestSuccess(classDetails));

    // update teacher details
    yield put(Actions.teacherListRequestSuccess(teacherDetails));

    // update student details
    yield put(Actions.studentListRequestSuccess(studentDetails));

    yield put(Actions.updateGradeDataSuccess());
  } catch (err) {
    yield put(Actions.updateGradeDataFailure(err));
  }
}

/**
 * Update teacher derived data.
 *
 * @param action
 */
export function* teacherUpdateFlow(action) {
  try {
    const loginData = yield select(makeSelectLoginData());
    const sessionId = yield select(makeSelectProfileSessionId());

    // some user types cannot select schools. in that case, we use their user organization ids
    const schoolId = action.schoolId || loginData.getIn(['user_org_id', 0]);

    const [classDetails, groupDetails, studentDetails] = yield all([
      call(Request.getClassData, sessionId, schoolId, action.teacherId),
      call(Request.getGroupDataBySchool, sessionId, schoolId, action.teacherId),
      call(Request.getStudentDataBySchool, sessionId, schoolId, action.teacherId),
    ]);

    // update class details
    yield put(Actions.classListRequestSuccess(classDetails));

    // update group details
    yield put(Actions.groupListRequestSuccess(groupDetails));

    // update student details
    yield put(Actions.studentListRequestSuccess(studentDetails));

    yield put(Actions.updateTeacherDataSuccess());
  } catch (err) {
    yield put(Actions.updateTeacherDataFailure(err));
  }
}

/**
 * Update group and students data based on class.
 *
 * @param action
 */
export function* classUpdateFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());

    const [groupDetails, studentDetails] = yield all([
      call(Request.getGroupDataByClass, sessionId, action.classId),
      call(Request.getStudentDataByClass, sessionId, action.classId),
    ]);

    // update group details
    yield put(Actions.groupListRequestSuccess(groupDetails));

    // update student details
    yield put(Actions.studentListRequestSuccess(studentDetails));

    yield put(Actions.updateClassDataSuccess());
  } catch (err) {
    yield put(Actions.updateClassDataFailure(err));
  }
}

/**
 * Update student data based on group.
 *
 * @param action
 */
export function* groupUpdateFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());

    // update student details
    const studentDetails = yield call(Request.getStudentDataByGroup, sessionId, action.groupId);
    yield put(Actions.studentListRequestSuccess(studentDetails));

    yield put(Actions.updateGroupDataSuccess());
  } catch (err) {
    yield put(Actions.updateGroupDataFailure(err));
  }
}

/**
 * Update student derived data.
 *
 */
export function* studentUpdateFlow() {
  try {
    yield put(Actions.updateStudentDataSuccess());
  } catch (err) {
    yield put(Actions.updateStudentDataFailure(err));
  }
}

/**
 * get the permissions for user
 */
export function* permissionsRequestFlow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());

    const permissionData = yield call(Request.getPermissions, sessionId, userId);
    yield put(Actions.permissionsRequestSuccess(permissionData));
  } catch (err) {
    yield put(Actions.permissionsRequestFailure(err));
  }
}

/**
 * New local login (non-SSO)
 * When there is no previous local login, we do this
 */
export function* loginFlow({ username, password }) {
  try {
    yield put(showLoading());
    const loginDetails = yield call(Request.getLoginData, username, password);

    // save it to a cookie so we can reuse it later
    yield call(saveLocalSLMSId, loginDetails.session_id[0]);

    yield put(Actions.loginCredentialsSave(loginDetails));
    yield call(mainLoginFlow, '/');
  } catch (err) {
    yield put(Actions.loginFailure(err));
    yield put(hideLoading());
  }
}
/**
 * Updates certain global API data of the redux store
 */
export function* userDataUpdateFlow() {
  const loginData = yield select(makeSelectLoginData());

  // the main login flow diverges based on user org type
  switch (loginData.getIn(['user_org', 0])) {
    case Constants.COHORT_TYPE.District:
      yield call(districtUserLoginFlow);
      break;
    case Constants.COHORT_TYPE.School:
      yield call(schoolUserLoginFlow);
      break;
    default: {
      // Teachers don't have an org type in their login response
      yield call(teacherUserLoginFlow);
    }
  }
}

/**
 * Main login flow shared by both non SSO login and SSO login
 * @param redirect url to redirect to
 */
export function* mainLoginFlow(redirect) {
  yield all([
    call(profileRequestFlow),
    call(programAvailableRequestFlow),
    call(permissionsRequestFlow),
  ]);

  yield call(userDataUpdateFlow);

  const watcherTasks = yield all([
    takeLatest(Constants.PROFILE_REQUEST, profileRequestFlow),
    takeLatest(Constants.SCHOOL_LIST_REQUEST, schoolRequestFlow),
    takeLatest(Constants.SCHOOL_USER_LOGIN_FLOW_REQUEST, schoolUserLoginFlow),
    takeLatest(Constants.UPDATE_CLASS_DATA, classUpdateFlow),
    takeLatest(Constants.UPDATE_GROUP_DATA, groupUpdateFlow),
    takeLatest(Constants.UPDATE_SCHOOL_DATA, schoolUpdateFlow),
    takeLatest(Constants.UPDATE_STUDENT_DATA, studentUpdateFlow),
    takeLatest(Constants.UPDATE_GRADE_DATA, gradeUpdateFlow),
    takeLatest(Constants.UPDATE_TEACHER_DATA, teacherUpdateFlow),
    takeLatest(Constants.PROGRAM_AVAILABLE_DATA, programAvailableRequestFlow),
    takeLatest(Constants.UPDATE_USER_DATA, userDataUpdateFlow),
    takeLatest(LOCATION_CHANGE, routeChangeFlow),
    takeLatest(Constants.PERMISSION_REQUEST, permissionsRequestFlow),
  ]);

  yield put(Actions.loginSuccess());
  yield put(hideLoading());

  if (redirect) {
    yield put(push(redirect));
  }

  // wait for a logout request to occur
  yield take(Constants.LOGOUT_REQUEST);

  // cancel all watchers since the user will be logged out
  yield all(watcherTasks.map(task => cancel(task)));
}

/**
 * SLMS Login Handler
 * This handles the case where we have a saved SLMS ID (either from SSO / previous local login)
 */
export function* slmsLoginFlow({ type, slmsId }) {
  try {
    const loginDetails = yield call(Request.getLoginDataSLMSID, slmsId);

    yield put(Actions.loginCredentialsSave(loginDetails));
    yield call(mainLoginFlow);
  } catch (err) {
    if (type === Constants.LOCAL_RELOGIN) {
      // that local cookie didn't work, so let's delete it
      yield call(deleteLocalSLMSId);

      yield all([put(push('/login')), put(Actions.loginFailure(err))]);
    } else {
      // For SSO envs, go to the LLO URL
      yield call(window.location.replace, `${getBaseUrl()}/client/?LLO=true`);
    }
  }
}

/**
 * Route change update flow
 * This updates the global API user data whenever the user goes to the home page
 * Currently, this can be triggered from clicking the home tab and the quick links button
 */
export function* routeChangeFlow({ payload }) {
  if (payload.pathname === '/') {
    yield call(userDataUpdateFlow);
  }
}

/**
 * Password hint flow
 */
export function* passwordHintFlow() {
  // TODO: fully implement
  yield put(
    Actions.passwordHintRequestFailure(
      'Sorry, we were unable to locate your Password Hint. Please enter your Username, and then click "Password Hint".'
    )
  );
}

/**
 * Logout flow
 */
export function* logoutFlow() {
  try {
    const globalData = yield select(makeSelectGlobal());

    if (!globalData.get('isSSO')) {
      // For non-SSO envs, remove the local cookie
      yield call(deleteLocalSLMSId);
      yield put(Actions.logoutRequestSuccess());
    } else {
      // For SSO envs, go to the LLO URL
      yield call(window.location.replace, `${getBaseUrl()}/client/?LLO=true`);
    }
  } catch (e) {
    // nothing much we can do to recover from a failed logout
    yield put(Actions.logoutRequestSuccess());
  }
}

export function* updateProfilePageData() {
  try {
    const schools = yield select(makeSelectSchoolsDataMap());
    let schoolIdSelected = yield select(SmartBarSelectors.makeSelectedActiveSchoolId());
    const sessionId = yield select(makeSelectProfileSessionId());
    const loginData = yield select(makeSelectLoginData());

    yield put(Actions.updateProfileSchoolDataSuccess(schools));

    if (
      schoolIdSelected === '' &&
      loginData.getIn(['user_org', 0]) !== Constants.USER_ORG.District
    ) {
      schoolIdSelected = loginData.getIn(['user_org_id', 0]);

      const teachers = yield call(Request.getTeacherDataBySchool, sessionId, schoolIdSelected);
      const grades = yield call(Request.getGradeDataBySchool, sessionId, schoolIdSelected);
      const classes = yield call(
        Request.getClassDataBySchool,
        sessionId,
        schoolIdSelected,
        loginData.getIn(['user_id', 0])
      );
      yield put(Actions.updateProfileGradeDataSuccess(grades));
      yield put(Actions.updateProfileTeacherDataSuccess(teachers));
      yield put(Actions.updateProfileClassDataSuccess(classes));
    } else if (schoolIdSelected !== '') {
      const teachers = yield call(Request.getTeacherDataBySchool, sessionId, schoolIdSelected);
      const grades = yield call(Request.getGradeDataBySchool, sessionId, schoolIdSelected);
      const classes = yield call(
        Request.getClassDataBySchool,
        sessionId,
        schoolIdSelected,
        loginData.getIn(['user_id', 0])
      );
      yield put(Actions.updateProfileGradeDataSuccess(grades));
      yield put(Actions.updateProfileTeacherDataSuccess(teachers));
      yield put(Actions.updateProfileClassDataSuccess(classes));
    }
    let groups = null;
    let students = null;
    if (loginData.getIn(['user_type', 0]) === Constants.USER_TYPE.Teacher) {
      groups = yield call(
        Request.getGroupDataBySchool,
        sessionId,
        schoolIdSelected,
        loginData.getIn(['user_id', 0])
      );
      students = yield call(
        Request.getStudentDataBySchool,
        sessionId,
        schoolIdSelected,
        loginData.getIn(['user_id', 0])
      );

      yield put(Actions.updateProfileGroupDataSuccess(groups));
      yield put(Actions.updateProfileStudentDataSuccess(students));
    } else {
      const gradeIdSelected = yield select(SmartBarSelectors.makeSelectedActiveGradeId());
      const teacherIdSelected = yield select(SmartBarSelectors.makeSelectedActiveTeacherId());
      const classIdSelected = yield select(SmartBarSelectors.makeSelectedActiveClassId());
      if (classIdSelected !== '') {
        groups = yield call(Request.getGroupDataByClass, sessionId, classIdSelected);
        students = yield call(Request.getStudentDataByClass, sessionId, classIdSelected);

        yield put(Actions.updateProfileGroupDataSuccess(groups));
        yield put(Actions.updateProfileStudentDataSuccess(students));
      } else if (teacherIdSelected !== '') {
        groups = yield call(
          Request.getGroupDataBySchool,
          sessionId,
          schoolIdSelected,
          teacherIdSelected
        );
        students = yield call(
          Request.getStudentDataBySchool,
          sessionId,
          schoolIdSelected,
          teacherIdSelected
        );

        yield put(Actions.updateProfileGroupDataSuccess(groups));
        yield put(Actions.updateProfileStudentDataSuccess(students));
      } else if (gradeIdSelected !== '') {
        students = yield call(
          Request.getStudentDataByGradeSchool,
          sessionId,
          schoolIdSelected,
          gradeIdSelected
        );

        yield put(Actions.updateProfileStudentDataSuccess(students));
      }
    }
  } catch (err) {
    yield put(Actions.updateProfilePageDataFailure(err));
  }
}

export function* updateExpandCollapse() {
  try {
    const schoolId = yield select(SmartBarSelectors.makeSelectClickedSchoolId());
    const gradeId = yield select(SmartBarSelectors.makeSelectClickedGradeId());
    const teacherId = yield select(SmartBarSelectors.makeSelectClickedTeacherId());
    const classId = yield select(SmartBarSelectors.makeSelectClickedClassId());
    const groupId = yield select(SmartBarSelectors.makeSelectClickedGroupId());
    const studentId = yield select(SmartBarSelectors.makeSelectClickedStudentId());
    const login = yield select(makeSelectLoginData());
    const schools = yield select(makeSelectSchoolsData());

    const userType = login.getIn(['user_org', 0])
      ? login.getIn(['user_org', 0])
      : login.getIn(['user_type', 0]);

    switch (userType) {
      case Constants.USER_ORG.District:
        if (studentId !== '') {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(false, false, true, true, true, true)
          );
        } else if (groupId !== '') {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(false, false, true, true, true, true)
          );
        } else if (classId !== '') {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(false, false, true, true, true, true)
          );
        } else if (teacherId !== '') {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(false, false, true, true, false, true)
          );
        } else if (gradeId !== '') {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(false, true, true, false, false, true)
          );
        } else if (schoolId !== '') {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(true, true, false, false, false, false)
          );
        } else {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(true, false, false, false, false, false)
          );
        }
        break;
      case Constants.USER_ORG.School:
        if (studentId !== '') {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(false, false, true, true, true, true)
          );
        } else if (groupId !== '') {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(false, false, true, true, true, true)
          );
        } else if (classId !== '') {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(false, false, true, true, true, true)
          );
        } else if (teacherId !== '') {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(false, false, true, true, false, true)
          );
        } else if (gradeId !== '') {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(false, true, true, false, false, true)
          );
        } else {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(false, true, false, false, false, false)
          );
        }
        break;
      case Constants.USER_TYPE.Teacher:
        if (studentId !== '') {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(true, false, false, true, true, true)
          );
        } else if (groupId !== '') {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(true, false, true, true, true, true)
          );
        } else if (classId !== '') {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(true, false, false, true, true, true)
          );
        } else if (schoolId !== '') {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(true, false, false, true, false, true)
          );
        } else if (schools) {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(true, false, false, false, false, false)
          );
        } else {
          yield put(
            Actions.updateSmartBarExpandCollapseStatus(false, false, false, true, false, true)
          );
        }
        break;
      default:
        break;
    }
  } catch (err) {
    yield put(Actions.updateSmartBarExpandCollapseFailure(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* slmsData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    takeLatest(Constants.LOGIN_REQUEST, loginFlow),
    takeLatest([Constants.SSO_LOGIN, Constants.LOCAL_RELOGIN], slmsLoginFlow),
    takeLatest(Constants.LOGOUT_REQUEST, logoutFlow),
    takeLatest(Constants.PASSWORD_HINT_REQUEST, passwordHintFlow),
    takeLatest(SmartBarConstants.SMARTBAR_SELECTED_UPDATE_DATA, updateProfilePageData),
    takeLatest(
      [
        Constants.UPDATE_SCHOOL_DATA_SUCCESS,
        Constants.UPDATE_GRADE_DATA_SUCCESS,
        Constants.UPDATE_TEACHER_DATA_SUCCESS,
        Constants.UPDATE_CLASS_DATA_SUCCESS,
        Constants.UPDATE_GROUP_DATA_SUCCESS,
        Constants.UPDATE_STUDENT_DATA_SUCCESS,
        Constants.UPDATE_SCHOOL_DATA_SUCCESS_TEACHER,
        Constants.UPDATE_SCHOOL_ADMIN_DATA_SUCCESS,
        Constants.SCHOOL_LIST_REQUEST_SUCCESS,
      ],
      updateExpandCollapse
    ),
  ]);
}
