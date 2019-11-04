/*
 *
 * SmartBarContainer actions
 *
 */

import * as Constants from './constants';

/**
 * Set the school
 *
 * @returns {{type}}
 */
export function schoolSelection(schoolId) {
  return {
    type: Constants.SCHOOL_SELECTION,
    schoolId,
  };
}

/**
 * Set the school
 *
 * @returns {{type}}
 */
export function schoolRedirection(schoolId) {
  return {
    type: Constants.SCHOOL_REDIRECTION,
    schoolId,
  };
}

/**
 * Reset all selections
 *
 * @returns {{type}}
 */
export function resetSelections() {
  return {
    type: Constants.RESET_SELECTIONS,
  };
}

/**
 * Set the school success
 *
 * @returns {{type}}
 */
export function schoolSelectionSuccess(schoolId) {
  return {
    type: Constants.SCHOOL_SELECTION_SUCCESS,
    schoolId,
  };
}

/**
 * Set the school failure
 *
 * @returns {{type}}
 */
export function schoolSelectionFailure(error) {
  return {
    type: Constants.SCHOOL_SELECTION_FAILURE,
    error,
  };
}

/**
 * Set the class Redirection
 *
 * @returns {{type}}
 */
export function classRedirection(classId) {
  return {
    type: Constants.CLASS_REDIRECTION,
    classId,
  };
}

/**
 * Set the class
 *
 * @returns {{type}}
 */
export function classSelection(classId) {
  return {
    type: Constants.CLASS_SELECTION,
    classId,
  };
}

/**
 * Set the class success
 *
 * @returns {{type}}
 */
export function classSelectionSuccess(classId) {
  return {
    type: Constants.CLASS_SELECTION_SUCCESS,
    classId,
  };
}

/**
 * Set the class failure
 *
 * @returns {{type}}
 */
export function classSelectionFailure(error) {
  return {
    type: Constants.CLASS_SELECTION_FAILURE,
    error,
  };
}

/**
 * Set the group
 *
 * @returns {{type}}
 */
export function groupSelection(groupId) {
  return {
    type: Constants.GROUP_SELECTION,
    groupId,
  };
}

/**
 * Set the group success
 *
 * @returns {{type}}
 */
export function groupSelectionSuccess(groupId) {
  return {
    type: Constants.GROUP_SELECTION_SUCCESS,
    groupId,
  };
}

/**
 * Set the group failure
 *
 * @returns {{type}}
 */
export function groupSelectionFailure(error) {
  return {
    type: Constants.GROUP_SELECTION_FAILURE,
    error,
  };
}

/**
 * Set the student
 *
 * @returns {{type}}
 */
export function studentSelection(studentId) {
  return {
    type: Constants.STUDENT_SELECTION,
    studentId,
  };
}

/**
 * Set the student success
 *
 * @returns {{type}}
 */
export function studentSelectionSuccess(studentId) {
  return {
    type: Constants.STUDENT_SELECTION_SUCCESS,
    studentId,
  };
}

/**
 * Set the student failure
 *
 * @returns {{type}}
 */
export function studentSelectionFailure(error) {
  return {
    type: Constants.STUDENT_SELECTION_FAILURE,
    error,
  };
}

/**
 * Set the grade
 *
 * @returns {{type}}
 */
export function gradeSelection(gradeId) {
  return {
    type: Constants.GRADE_SELECTION,
    gradeId,
  };
}

/**
 * Set the grade success
 *
 * @returns {{type}}
 */
export function gradeSelectionSuccess(gradeId) {
  return {
    type: Constants.GRADE_SELECTION_SUCCESS,
    gradeId,
  };
}

/**
 * Set the grade failure
 *
 * @returns {{type}}
 */
export function gradeSelectionFailure(error) {
  return {
    type: Constants.GRADE_SELECTION_FAILURE,
    error,
  };
}

/**
 * Set the teacher
 *
 * @returns {{type}}
 */
export function teacherSelection(teacherId) {
  return {
    type: Constants.TEACHER_SELECTION,
    teacherId,
  };
}

/**
 * Set the teacher
 *
 * @returns {{type}}
 */
export function teacherRedirection(teacherId) {
  return {
    type: Constants.TEACHER_REDIRECTION,
    teacherId,
  };
}

/**
 * Set the grade
 *
 * @returns {{type}}
 */
export function gradeRedirection(gradeId) {
  return {
    type: Constants.GRADE_REDIRECTION,
    gradeId,
  };
}

/**
 * Set the group
 *
 * @returns {{type}}
 */
export function classRedirectionInGroup(classId) {
  return {
    type: Constants.CLASS_REDIRECTION_IN_GROUP,
    classId,
  };
}

/**
 * Set the teacher success
 *
 * @returns {{type}}
 */
export function teacherSelectionSuccess(teacherId) {
  return {
    type: Constants.TEACHER_SELECTION_SUCCESS,
    teacherId,
  };
}

/**
 * Set the teacher failure
 *
 * @returns {{type}}
 */
export function teacherSelectionFailure(error) {
  return {
    type: Constants.TEACHER_SELECTION_FAILURE,
    error,
  };
}

export function groupRedirection(groupId) {
  return {
    type: Constants.GROUP_REDIRECTION,
    groupId,
  };
}

export function activeSelectedSchool(schoolId) {
  return {
    type: Constants.PROFILE_SELECTED_SCHOOL,
    schoolId,
  };
}

export function activeSelectedGrade(gradeId) {
  return {
    type: Constants.PROFILE_SELECTED_GRADE,
    gradeId,
  };
}

export function activeSelectedTeacher(teacherId) {
  return {
    type: Constants.PROFILE_SELECTED_TEACHER,
    teacherId,
  };
}

export function activeSelectedClass(classId) {
  return {
    type: Constants.PROFILE_SELECTED_CLASS,
    classId,
  };
}

export function activeSelectedGroup(groupId) {
  return {
    type: Constants.PROFILE_SELECTED_GROUP,
    groupId,
  };
}

export function activeSelectedStudent(studentId) {
  return {
    type: Constants.PROFILE_SELECTED_STUDENT,
    studentId,
  };
}

/**
 * Action to refrest smartbar to display newly selected value.
 * @returns {{type: string}}
 */
export function redirectionSmartBarSGT() {
  return {
    type: Constants.REDIRECTION_COMMON_SGT,
  };
}

export function resetConstantId() {
  return {
    type: Constants.RESET_SMARTBAR_CONSTANTS,
  };
}

export function smartbarSelectedUpdateData() {
  return {
    type: Constants.SMARTBAR_SELECTED_UPDATE_DATA,
  };
}
