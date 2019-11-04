/*
 *
 * ProfilePageContainer actions
 *
 */

import * as Constants from './constants';

/**
 * Get the profile page
 *
 * @returns {{type}}
 */
export function profilePageRequest() {
  return {
    type: Constants.PROFILE_PAGE_REQUEST,
  };
}

/**
 * Dispatched when we get the profile page successfully
 * @param profileDetails
 * @returns {{type, profilePage: *}}
 */
export function profilePageRequestSuccess(profileDetails = {}) {
  return {
    type: Constants.PROFILE_PAGE_REQUEST_SUCCESS,
    profileDetails,
  };
}

/**
 * Dispatched when the profile page request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function profilePageRequestFailure(error) {
  return {
    type: Constants.PROFILE_PAGE_REQUEST_FAILURE,
    error,
  };
}

/**
 * Get the profile page
 *
 * @returns {{type}}
 */
export function profilePageStudentRequest(studentId) {
  return {
    type: Constants.PROFILE_PAGE_STUDENT_REQUEST,
    studentId,
  };
}

/**
 * Get the profile page
 *
 * @returns {{type}}
 */
export function profilePageSchoolRequest(schoolId) {
  return {
    type: Constants.PROFILE_PAGE_SCHOOL_REQUEST,
    schoolId,
  };
}

/**
 * Get the profile page
 *
 * @returns {{type}}
 */
export function profilePageGroupRequest(groupId) {
  return {
    type: Constants.PROFILE_PAGE_GROUP_REQUEST,
    groupId,
  };
}

/**
 * Get the profile page
 *
 * @returns {{type}}
 */
export function profilePageTeacherRequest(teacherId) {
  return {
    type: Constants.PROFILE_PAGE_TEACHER_REQUEST,
    teacherId,
  };
}

/**
 * Get the profile page
 *
 * @returns {{type}}
 */
export function profilePageGradeRequest(gradeId) {
  return {
    type: Constants.PROFILE_PAGE_GRADE_REQUEST,
    gradeId,
  };
}

/**
 * Get the profile page
 *
 * @returns {{type}}
 */
export function teacherByGradeRequest() {
  return {
    type: Constants.TEACHER_BY_GRADE_REQUEST,
  };
}

/**
 * Dispatched when we get the profile page successfully
 * @param teacherByGradeDetails
 * @returns {{type, profilePage: *}}
 */
export function teacherByGradeRequestSuccess(teacherByGradeDetails = {}) {
  return {
    type: Constants.TEACHER_BY_GRADE_REQUEST_SUCCESS,
    teacherByGradeDetails,
  };
}

/**
 * Dispatched when the profile page request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function teacherByGradeRequestFailure(error) {
  return {
    type: Constants.TEACHER_BY_GRADE_REQUEST_FAILURE,
    error,
  };
}

/**
 * Get the profile page
 *
 * @returns {{type}}
 */
export function classByGradeRequest() {
  return {
    type: Constants.CLASS_BY_GRADE_REQUEST,
  };
}

/**
 * Dispatched when we get the profile page successfully
 * @param classByGradeDetails
 * @returns {{type, profilePage: *}}
 */
export function classByGradeRequestSuccess(classByGradeDetails = {}) {
  return {
    type: Constants.CLASS_BY_GRADE_REQUEST_SUCCESS,
    classByGradeDetails,
  };
}

/**
 * Dispatched when the profile page request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function classByGradeRequestFailure(error) {
  return {
    type: Constants.CLASS_BY_GRADE_REQUEST_FAILURE,
    error,
  };
}

/**
 * Get the profile page
 *
 * @returns {{type}}
 */
export function studentByGradeRequest() {
  return {
    type: Constants.STUDENT_BY_GRADE_REQUEST,
  };
}

/**
 * Dispatched when we get the profile page successfully
 * @param studentByGradeDetails
 * @returns {{type, profilePage: *}}
 */
export function studentByGradeRequestSuccess(studentByGradeDetails = {}) {
  return {
    type: Constants.STUDENT_BY_GRADE_REQUEST_SUCCESS,
    studentByGradeDetails,
  };
}

/**
 * Dispatched when the profile page request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function studentByGradeRequestFailure(error) {
  return {
    type: Constants.STUDENT_BY_GRADE_REQUEST_FAILURE,
    error,
  };
}

/**
 * Get the profile page
 *
 * @returns {{type}}
 */
export function profilePageClassRequest(classId) {
  return {
    type: Constants.PROFILE_PAGE_CLASS_REQUEST,
    classId,
  };
}

/**
 * Dispatched when we get the profile page successfully
 * @param classDetails
 * @returns {{type, classDetails: *}}
 */
export function profilePageClassRequestSuccess(classDetails = {}) {
  return {
    type: Constants.PROFILE_PAGE_CLASS_REQUEST_SUCCESS,
    classDetails,
  };
}

/**
 * Dispatched when the profile page request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function profilePageClassRequestFailure(error) {
  return {
    type: Constants.PROFILE_PAGE_CLASS_REQUEST_FAILURE,
    error,
  };
}

/**
 * Get the profile page for District Admin
 *
 * @returns {{type}}
 */
export function profilePageForDistrictAdminRequest() {
  return {
    type: Constants.PROFILE_PAGE_DISTRICT_ADMIN_REQUEST,
  };
}

/**
 * Dispatched when we get the profile page for District Admin successfully
 * @param profileDetailsDistAdmin
 * @returns {{type, profilePage: *}}
 */
export function profilePageForDistrictAdminRequestSuccess(profileDetailsDistAdmin = {}) {
  return {
    type: Constants.PROFILE_PAGE_DISTRICT_ADMIN_REQUEST_SUCCESS,
    profileDetailsDistAdmin,
  };
}

/**
 * Dispatched when the profile page for District Admin request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function profilePageForDistrictAdminFailure(error) {
  return {
    type: Constants.PROFILE_PAGE_DISTRICT_ADMIN_REQUEST_FAILURE,
    error,
  };
}

/**
 * Get the profile page for School Admin
 *
 * @returns {{type}}
 */
export function profilePageForSchoolAdminRequest() {
  return {
    type: Constants.PROFILE_PAGE_SCHOOL_ADMIN_REQUEST,
  };
}

/**
 * Dispatched when we get the profile page for School Admin successfully
 * @param profileDetailsSchoolAdmin
 * @returns {{type, profilePage: *}}
 */
export function profilePageForSchoolAdminRequestSuccess(profileDetailsSchoolAdmin = {}) {
  return {
    type: Constants.PROFILE_PAGE_SCHOOL_ADMIN_REQUEST_SUCCESS,
    profileDetailsSchoolAdmin,
  };
}

/**
 * Dispatched when the profile page for School Admin request fails
 *
 * @param error
 * @returns {{type, error: *}}
 */
export function profilePageForSchoolAdminRequestFailure(error) {
  return {
    type: Constants.PROFILE_PAGE_SCHOOL_ADMIN_REQUEST_FAILURE,
    error,
  };
}
