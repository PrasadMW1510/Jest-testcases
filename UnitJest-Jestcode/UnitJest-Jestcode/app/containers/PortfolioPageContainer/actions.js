/*
 *
 * PortfolioPageContainer actions
 *
 */

import * as Constants from './constants';

export function getClassDetailsRequest() {
  return {
    type: Constants.GET_CLASS_DATA,
  };
}

export function getClassDataRequestSuccess(teacherObj) {
  return {
    type: Constants.SET_PORTFOLIO_TEACHERS_DATA,
    teacherObj,
  };
}

// export function getGradeDetailsRequest(schoolid){
//   return {
//     type: Constants.GET_GRADE_DATA,
//     schoolid,
//   }
// }

// export function getGradeDataRequestSuccess(gradeObj,schoolid){
//   return {
//     type: Constants.SET_GRADE_DATA,
//     gradeObj,
//     schoolid,
//   }
// }

// export function getTeachersDetailsRequest(gradeId){
//   return {
//     type: Constants.GET_TEACHERS_DATA,
//     gradeId,
//   }
// }

// export function setGradeDataRequestSuccess(gradeId){
//   return {
//     type: Constants.SET_GRADE_ID,
//     gradeId,
//   }
// }

// export function getTeacherDataRequestSuccess(teacherObj){
//   return {
//     type: Constants.SET_TEACHERS_DATA,
//     teacherObj,
//   }
// }

export function getPortfolioClassDetailsRequest(teacherId) {
  return {
    type: Constants.GET_PORTFOLIO_CLASS_DATA,
    teacherId,
  };
}

export function getInboxClassByCommunityId() {
  return {
    type: Constants.GET_PORTFOLIO_CLASS_BY_COMMUNITYID,
  };
}

export function setProgramListSuccess(data) {
  return {
    type: Constants.SET_PORTFOLIO_PROGRAM_LIST,
    data,
  };
}

export function setProgramListForTabSuccess(data) {
  return {
    type: Constants.SET_PORTFOLIO_PROGRAM_LIST_FOR_TABS,
    data,
  };
}

// export function setPortfolioSelectedGradeId(gradeId){
//   return {
//     type: Constants.SET_PORTFOLIO_GRADE_ID,
//     gradeId,
//   }
// }

export function getStudentsSubmissionMetadata(classId) {
  return {
    type: Constants.GET_STUDENT_SUBMISSION_META_DATA,
    classId,
  };
}

export function setStudentSetCount(data) {
  return {
    type: Constants.GET_STUDENT_SUBMISSION_META_DATA_COUNT,
    data,
  };
}

export function setStudentRequestSuccess(data) {
  return {
    type: Constants.SET_STUDENT_SUBMISSION_META_DATA,
    data,
  };
}

export function getStudentSubmissions() {
  return {
    type: Constants.GET_STUDENT_SUBMITTIONS,
  };
}

export function getStudentSubmissionSuccess(resultsData) {
  return {
    type: Constants.GET_STUDENT_SUBMISSION_SUCCESS,
    resultsData,
  };
}

export function getClassCommunity() {
  return {
    type: Constants.GET_CLASS_COMMUNITY,
  };
}

export function getClassCommunityDataSuccess(resultsData) {
  return {
    type: Constants.GET_CLASS_COMMUNITY_SUCCESS,
    resultsData,
  };
}

export function getAssignmentMetaData() {
  return {
    type: Constants.GET_ASSIGNMENT_META_DATA,
  };
}

export function setStudentAssignmentRequestSuccess(data) {
  return {
    type: Constants.SET_ASSIGNMENT_META_DATA,
    data,
  };
}

export function setStudentAssignmentSetCount(data) {
  return {
    type: Constants.SET_ASSIGNMENT_COUNT,
    data,
  };
}

export function getRubricDefenitions() {
  return {
    type: Constants.GET_RUBRIC_DEFENITIONS,
  };
}

export function getRubricDefenitionSuccess(data) {
  return {
    type: Constants.SET_RUBRIC_DEFENITIONS,
    data,
  };
}
