/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import * as Constants from './constants';

/**
 * Handles new non-SSO login request.
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loginRequest(username, password) {
  return {
    type: Constants.LOGIN_REQUEST,
    username,
    password,
  };
}

/**
 * Dispatched to save attained user login details
 * @param login
 * @returns {{type, login: *}}
 */
export function loginCredentialsSave(login) {
  return {
    type: Constants.LOGIN_CREDENTIALS_SAVE,
    login,
  };
}
/**
 * Dispatched when the login was successful and we have the login details
 *
 * @returns {{type}}
 */
export function loginSuccess() {
  return {
    type: Constants.LOGIN_REQUEST_SUCCESS,
  };
}

/**
 * Dispatched when loading the login fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOGIN_REQUEST_FAILURE passing the error
 */
export function loginFailure(error) {
  return {
    type: Constants.LOGIN_REQUEST_FAILURE,
    error,
  };
}

export function generalFailure({ type, error }) {
  return {
    type: Constants.GENERAL_FAILURE,
    subType: type,
    error,
  };
}

/**
 * Dispatched when logout is requested
 *
 * @returns {{type}}
 */
export function logoutRequest() {
  return {
    type: Constants.LOGOUT_REQUEST,
  };
}

/**
 * Dispatched when logout succeeded
 *
 * @returns {{type}}
 */
export function logoutRequestSuccess() {
  return {
    type: Constants.LOGOUT_REQUEST_SUCCESS,
  };
}

/**
 * Dispatched when logout failed
 *
 * @returns {{type}}
 */
export function logoutRequestFailure() {
  return {
    type: Constants.LOGOUT_REQUEST_FAILURE,
  };
}

/**
 * Dispatched when password hint is needed
 *
 * @returns {{type}}
 */
export function passwordHintRequest() {
  return {
    type: Constants.PASSWORD_HINT_REQUEST,
  };
}

/**
 * Dispatched when password hint request succeeded
 * @returns {{type}}
 */
export function passwordHintRequestSuccess(hint) {
  return {
    type: Constants.PASSWORD_HINT_REQUEST_SUCCESS,
    hint,
  };
}

/**
 * Dispatched when password hint request failed
 *
 * @returns {{type}}
 */
export function passwordHintRequestFailure(error) {
  return generalFailure({
    type: Constants.PASSWORD_HINT_REQUEST_FAILURE,
    error,
  });
}

/**
 * Get the class list
 *
 * @returns {{type}}
 */
export function classListRequest() {
  return {
    type: Constants.CLASS_LIST_REQUEST,
  };
}

/**
 * Dispatched when we get the class list successfully
 * @param classes
 * @returns {{type, classes: *}}
 */
export function classListRequestSuccess(classes = []) {
  return {
    type: Constants.CLASS_LIST_REQUEST_SUCCESS,
    classes,
  };
}

/**
 * Dispatched when the class list request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function classListRequestFailure(error) {
  return generalFailure({
    type: Constants.CLASS_LIST_REQUEST_FAILURE,
    error,
  });
}

/**
 * Get the user profile
 *
 * @returns {{type}}
 */
export function profileRequest() {
  return {
    type: Constants.PROFILE_REQUEST,
  };
}

/**
 * Dispatched when the profile request was successful and we have the profile data
 * @param profile
 * @returns {{type, profile: *}}
 */
export function profileRequestSuccess(profile) {
  return {
    type: Constants.PROFILE_REQUEST_SUCCESS,
    profile,
  };
}

/**
 * Dispatched when the profile request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */

export function profileRequestFailure(error) {
  return generalFailure({
    type: Constants.PROFILE_REQUEST_FAILURE,
    error,
  });
}

/**
 * School admin login flow
 *
 * @returns {{type}}
 */
export function schoolUserLoginFlowRequest() {
  return {
    type: Constants.SCHOOL_USER_LOGIN_FLOW_REQUEST,
  };
}

/**
 * Get the student list
 *
 * @returns {{type}}
 */
export function studentListRequest() {
  return {
    type: Constants.STUDENT_LIST_REQUEST,
  };
}

/**
 * Dispatched when the student list request was successful and we have the student list data
 * @param students
 * @returns {{type, students: *}}
 */
export function studentListRequestSuccess(students = []) {
  return {
    type: Constants.STUDENT_LIST_REQUEST_SUCCESS,
    students,
  };
}

/**
 * Dispatched when the student list request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function studentListRequestFailure(error) {
  return generalFailure({
    type: Constants.STUDENT_LIST_REQUEST_FAILURE,
    error,
  });
}

/**
 * Get the group list
 *
 * @returns {{type}}
 */
export function groupListRequest() {
  return {
    type: Constants.GROUP_LIST_REQUEST,
  };
}

/**
 * Dispatched when the group list request was successful and we have the group list data
 * @param groups
 * @returns {{type, groups: *}}
 */
export function groupListRequestSuccess(groups = []) {
  return {
    type: Constants.GROUP_LIST_REQUEST_SUCCESS,
    groups,
  };
}

/**
 * Dispatched when the school list request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function groupListRequestFailure(error) {
  return generalFailure({
    type: Constants.GROUP_LIST_REQUEST_FAILURE,
    error,
  });
}

/**
 * Get the grades list
 *
 * @returns {{type}}
 */
export function gradeListRequest() {
  return {
    type: Constants.GRADE_LIST_REQUEST,
  };
}

/**
 * Dispatched when the grades list request was successful and we have the grade list data
 * @param grades
 * @returns {{type, groups: *}}
 */
export function gradeListRequestSuccess(grades = []) {
  return {
    type: Constants.GRADE_LIST_REQUEST_SUCCESS,
    grades,
  };
}

/**
 * Dispatched when the grade list request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function gradeListRequestFailure(error) {
  return generalFailure({
    type: Constants.GRADE_LIST_REQUEST_FAILURE,
    error,
  });
}

/**
 * Get the teachers list
 *
 * @returns {{type}}
 */
export function teacherListRequest() {
  return {
    type: Constants.TEACHER_LIST_REQUEST,
  };
}

/**
 * Dispatched when the teacher list request was successful and we have the teacher list data
 * @param teachers
 * @returns {{type, teachers: *}}
 */
export function teacherListRequestSuccess(teachers = []) {
  return {
    type: Constants.TEACHER_LIST_REQUEST_SUCCESS,
    teachers,
  };
}

/**
 * Dispatched when the teacher list request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function teacherListRequestFailure(error) {
  return generalFailure({
    type: Constants.TEACHER_LIST_REQUEST_FAILURE,
    error,
  });
}

/**
 * Get the school list
 *
 * @returns {{type}}
 */
export function schoolListRequest() {
  return {
    type: Constants.SCHOOL_LIST_REQUEST,
  };
}

/**
 * Dispatched when the school list request was successful and we have the school list data
 * @param schools
 * @returns {{type, schools: *}}
 */
export function schoolListRequestSuccess(schools = []) {
  return {
    type: Constants.SCHOOL_LIST_REQUEST_SUCCESS,
    schools,
  };
}

/**
 * Dispatched when the school list request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function schoolListRequestFailure(error) {
  return generalFailure({
    type: Constants.SCHOOL_LIST_REQUEST_FAILURE,
    error,
  });
}

/**
 * Dispatched when updated school derived data is needed
 *
 * @param schoolId
 * @returns {{type, schoolId: *}}
 */
export function updateSchoolData(schoolId) {
  return {
    type: Constants.UPDATE_SCHOOL_DATA,
    schoolId,
  };
}

/**
 * Dispatched when updating school derived API data passes
 *
 * @returns {{type}}
 */
export function updateSchoolDataSuccess() {
  return {
    type: Constants.UPDATE_SCHOOL_DATA_SUCCESS,
  };
}
/**
 * Dispatched when updating school derived API data passes (for teachers)
 *
 * @returns {{type}}
 */
export function updateSchoolDataSuccessTeacher() {
  return {
    type: Constants.UPDATE_SCHOOL_DATA_SUCCESS_TEACHER,
  };
}

/**
 * Dispatched when updating school derived API data fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function updateSchoolDataFailure(error) {
  return generalFailure({
    type: Constants.UPDATE_SCHOOL_DATA_FAILURE,
    error,
  });
}

/**
 * Dispatched when class derived data should be updated
 *
 * @param classId
 * @returns {{type, classId: *}}
 */
export function updateClassData(classId) {
  return {
    type: Constants.UPDATE_CLASS_DATA,
    classId,
  };
}

/**
 * Dispatched when updating class derived API data passes
 *
 * @returns {{type}}
 */
export function updateClassDataSuccess() {
  return {
    type: Constants.UPDATE_CLASS_DATA_SUCCESS,
  };
}

/**
 * Dispatched when updating class derived API data fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function updateClassDataFailure(error) {
  return generalFailure({
    type: Constants.UPDATE_CLASS_DATA_FAILURE,
    error,
  });
}

/**
 * Dispatched when global user data needs to be updated
 *
 * @returns {{type}}
 */
export function updateUserData() {
  return {
    type: Constants.UPDATE_USER_DATA,
  };
}

/**
 * Dispatched when global user data has been updated successfully
 *
 * @returns {{type}}
 */
export function updateUserDataSuccess() {
  return {
    type: Constants.UPDATE_USER_DATA_SUCCESS,
  };
}

/**
 * Dispatched when global user data has failed to update
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function updateUserDataFailure(error) {
  return generalFailure({
    type: Constants.UPDATE_USER_DATA_FAILURE,
    error,
  });
}

/**
 * Dispatched when teacher derived data should be updated
 *
 * @param teacherId
 * @param schoolId
 * @returns {{type, teacherId: *, schoolId: *}}
 */
export function updateTeacherData(teacherId, schoolId) {
  return {
    type: Constants.UPDATE_TEACHER_DATA,
    teacherId,
    schoolId,
  };
}

/**
 * Dispatched when updating teacher derived API data passes
 *
 * @returns {{type, teacherId: *}}
 */
export function updateTeacherDataSuccess() {
  return {
    type: Constants.UPDATE_TEACHER_DATA_SUCCESS,
  };
}

/**
 * Dispatched when updating teacher derived API data fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function updateTeacherDataFailure(error) {
  return generalFailure({
    type: Constants.UPDATE_TEACHER_DATA_FAILURE,
    error,
  });
}

/**
 * Dispatched when grade derived data should be updated
 *
 * @param gradeId
 * @param schoolId
 * @returns {{type, gradeId: *}}
 */
export function updateGradeData(gradeId, schoolId) {
  return {
    type: Constants.UPDATE_GRADE_DATA,
    gradeId,
    schoolId,
  };
}

/**
 * Dispatched when updating grade derived API data passes
 *
 * @returns {{type, gradeId: *}}
 */
export function updateGradeDataSuccess() {
  return {
    type: Constants.UPDATE_GRADE_DATA_SUCCESS,
  };
}

/**
 * Dispatched when updating grade derived API data fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function updateGradeDataFailure(error) {
  return generalFailure({
    type: Constants.UPDATE_GRADE_DATA_FAILURE,
    error,
  });
}

/**
 * Dispatched when group derived API is requested
 *
 * @param groupId
 * @returns {{type, groupId: *}}
 */
export function updateGroupData(groupId) {
  return {
    type: Constants.UPDATE_GROUP_DATA,
    groupId,
  };
}

/**
 * Dispatched when updating group derived API data passes
 *
 * @returns {{type}}
 */
export function updateGroupDataSuccess() {
  return {
    type: Constants.UPDATE_GROUP_DATA_SUCCESS,
  };
}

/**
 * Dispatched when updating group derived API data fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function updateGroupDataFailure(error) {
  return generalFailure({
    type: Constants.UPDATE_GROUP_DATA_FAILURE,
    error,
  });
}

/**
 * Dispatched when student derived data should update
 *
 * @param studentId
 * @returns {{type, studentId: *}}
 */
export function updateStudentData(studentId) {
  return {
    type: Constants.UPDATE_STUDENT_DATA,
    studentId,
  };
}

/**
 * Dispatched when updating student derived API data passes
 *
 * @returns {{type}}
 */
export function updateStudentDataSuccess() {
  return {
    type: Constants.UPDATE_STUDENT_DATA_SUCCESS,
  };
}

/**
 * Dispatched when updating student derived API data fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function updateStudentDataFailure(error) {
  return generalFailure({
    type: Constants.UPDATE_STUDENT_DATA_FAILURE,
    error,
  });
}
/**
 * Dispatched when programAvailable  data should be rendered
 *
 * @param serverAssets
 * @returns {{type, serverAssets: *}}
 */
export function programAvailableRequest(serverAssets = []) {
  return {
    type: Constants.PROGRAM_AVAILABLE_DATA,
    serverAssets,
  };
}
/**
 * Dispatched when the programAvailable list request was successful and we have the programAvailable list data
 *
 * @param serverAssets
 * @returns {{type, programAvailable: *}}
 */
export function programAvailableRequestSuccess(serverAssets = []) {
  return {
    type: Constants.PROGRAM_AVAILABLE_REQUEST_SUCCESS,
    serverAssets,
  };
}

/**
 * Dispatched when the programAvailable list request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function programAvailableRequestFailure(error) {
  return generalFailure({
    type: Constants.PROGRAM_AVAILABLE_REQUEST_FAILURE,
    error,
  });
}

/**
 * Dispatched when permission request is successful
 *
 * @param permissionsData
 * @returns {{type, permissionsData: Array}}
 */
export function permissionsRequestSuccess(permissionsData = []) {
  return {
    type: Constants.PERMISSION_REQUEST_SUCCESS,
    permissionsData,
  };
}

/**
 * Dispatched when the permission request fails
 *
 * @param error
 * @returns {{type, subType, error}}
 */
export function permissionsRequestFailure(error) {
  return generalFailure({
    type: Constants.PERMISSION_REQUEST_FAILURE,
    error,
  });
}

/**
 * Dispatched when there is an SSO provided SLMS id
 * @returns {{type}}
 */
export function ssoLogin(slmsId) {
  return {
    type: Constants.SSO_LOGIN,
    slmsId,
  };
}

/**
 * Dispatched when there is already a non-SSO SLMS id
 * @returns {{type}}
 */
export function localRelogin(slmsId) {
  return {
    type: Constants.LOCAL_RELOGIN,
    slmsId,
  };
}

/**
 * Dispatched when you want to update the profile data
 *
 * @param profile
 * @returns {{type, profile: {}}}
 */
export function updateProfileRequestSuccess(profile = {}) {
  return {
    type: Constants.UPDATE_PROFILE_REQUEST_SUCCESS,
    profile,
  };
}

/**
 * Dispatch when you want to get the password config
 *
 * @param passwordConfig
 * @returns {{type, passwordConfig: {}}}
 */
export function passwordConfigRequestSuccess(passwordConfig = {}) {
  return {
    type: Constants.PASSWORD_CONFIG_REQUEST_SUCCESS,
    passwordConfig,
  };
}

/**
 * Dispatch when you want to update the schools and classes data
 *
 * @param schoolsAndClasses
 * @returns {{type, schoolsAndClasses: {}}}
 */
export function schoolsAndClassesRequestSuccess(schoolsAndClasses = {}) {
  return {
    type: Constants.SCHOOLS_AND_CLASSES_REQUEST_SUCCESS,
    schoolsAndClasses,
  };
}

export function updateProfilePageDataFailure(err) {
  return {
    type: Constants.UPDATE_PROFILE_PAGE_DATA_FAILURE,
    err,
  };
}

export function updateSchoolAdminDataSuccess() {
  return {
    type: Constants.UPDATE_SCHOOL_ADMIN_DATA_SUCCESS,
  };
}

export function updateProfileSchoolDataSuccess(profileSchool) {
  return {
    type: Constants.UPDATE_PROFILE_SCHOOL_DATA_SUCCESS,
    profileSchool,
  };
}

export function updateProfileGradeDataSuccess(profileGrade) {
  return {
    type: Constants.UPDATE_PROFILE_GRADE_DATA_SUCCESS,
    profileGrade,
  };
}

export function updateProfileTeacherDataSuccess(profileTeacher) {
  return {
    type: Constants.UPDATE_PROFILE_TEACHER_DATA_SUCCESS,
    profileTeacher,
  };
}

export function updateProfileClassDataSuccess(profileClass) {
  return {
    type: Constants.UPDATE_PROFILE_CLASS_DATA_SUCCESS,
    profileClass,
  };
}

export function updateProfileGroupDataSuccess(profileGroup) {
  return {
    type: Constants.UPDATE_PROFILE_GROUP_DATA_SUCCESS,
    profileGroup,
  };
}

export function updateProfileStudentDataSuccess(profileStudent) {
  return {
    type: Constants.UPDATE_PROFILE_STUDENT_DATA_SUCCESS,
    profileStudent,
  };
}

export function updateSmartBarExpandCollapseStatus(
  school,
  grade,
  teacher,
  classes,
  group,
  student
) {
  return {
    type: Constants.UPDATE_SMART_BAR_EXPAND_COLLAPSE_STATUS,
    school,
    grade,
    teacher,
    classes,
    group,
    student,
  };
}

export function updateSmartBarExpandCollapseFailure(err) {
  return {
    type: Constants.UPDATE_SMART_BAR_EXPAND_COLLAPSE_FAILURE,
    err,
  };
}
