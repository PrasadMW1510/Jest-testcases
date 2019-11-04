/*
 *
 * StudentWorksContainer actions file
 *
 */

import * as Constants from './constants';

export function getSchoolDetailsRequest(distId) {
  return {
    type: Constants.GET_SCHOOL_DATA,
    distId,
  };
}

export function getSchoolDataRequestSuccess(classObj) {
  return {
    type: Constants.SET_SCHOOL_DATA,
    classObj,
  };
}

export function getGradeDetailsRequest(schoolid, userType) {
  return {
    type: Constants.GET_GRADE_DATA,
    schoolid,
    userType,
  };
}

export function getGradeDataRequestSuccess(gradeObj, schoolid) {
  return {
    type: Constants.SET_GRADE_DATA,
    gradeObj,
    schoolid,
  };
}

export function getTeachersDetailsRequest(gradeId, userType, adminType) {
  return {
    type: Constants.GET_TEACHERS_DATA,
    gradeId,
    userType,
    adminType,
  };
}

export function setGradeDataRequestSuccess(gradeId) {
  return {
    type: Constants.SET_GRADE_ID,
    gradeId,
  };
}

export function getTeacherDataRequestSuccess(teacherObj) {
  return {
    type: Constants.SET_TEACHERS_DATA,
    teacherObj,
  };
}

export function getPortfolioClassDetailsRequest(teacherId, userType, adminType) {
  return {
    type: Constants.GET_PORTFOLIO_CLASS_DATA,
    teacherId,
    userType,
    adminType,
  };
}

export function setPortfolioSelectedGradeId(gradeId) {
  return {
    type: Constants.SET_PORTFOLIO_GRADE_ID,
    gradeId,
  };
}

export function getStudentsSubmissionMetadataSW(classId) {
  return {
    type: Constants.GET_STUDENT_SUBMISSION_META_DATA_SW,
    classId,
  };
}

export function setStudentRequestSuccess(data) {
  return {
    type: Constants.SET_STUDENT_SUBMISSION_META_DATA,
    data,
  };
}

export function getStudentEnrolment(data) {
  return {
    type: Constants.GET_STUDENT_ENROLMENT_DATA,
    data,
  };
}

export function setStudentEnrolmentDataSuccess(data) {
  return {
    type: Constants.SET_STUDENT_ENROLMENT_DATA,
    data,
  };
}

export function getStudentsSubmissionTreeList(data, userType, adminType) {
  return {
    type: Constants.GET_PORTFOLIO_STUDENT_ENROLMENT_TREE_DATA,
    data,
    userType,
    adminType,
  };
}

export function setStudentsSubmissionTreeList(data) {
  return {
    type: Constants.SET_PORTFOLIO_STUDENT_ENROLMENT_TREE_DATA,
    data,
  };
}

export function setPortfolioSelectedTeacherId(data) {
  return {
    type: Constants.SET_PORTFOLIO_TEACHER_ID,
    data,
  };
}

export function getStudentsSubmissionNodeList(data) {
  return {
    type: Constants.SET_PORTFOLIO_STUDENT_NODE_LIST,
    data,
  };
}
