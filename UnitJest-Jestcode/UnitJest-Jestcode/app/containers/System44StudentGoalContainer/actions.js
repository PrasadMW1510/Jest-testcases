/*
 *
 * System44StudentGoalContainer actions
 *
 */
import * as Constants from './constants';

export function getCombinedStudentGoalsRequest(studentId) {
  return {
    type: Constants.GET_COMBINED_STUDENT_GOALS_REQUEST,
    studentId,
  };
}

export function getCombinedStudentGoalsRequestSuccess(getCombinedStudentGoalsData = []) {
  return {
    type: Constants.GET_COMBINED_STUDENT_GOALS_REQUEST_SUCCESS,
    getCombinedStudentGoalsData,
  };
}

export function getCombinedStudentGoalsRequestFailure(error) {
  return {
    type: Constants.GET_COMBINED_STUDENT_GOALS_REQUEST_FAILURE,
    error,
  };
}

export function setStudentAcademicGoals(value, studentId) {
  return {
    type: Constants.SET_STUDENT_ACADEMIC_GOALS,
    studentId,
    value,
  };
}

export function setStudentAcademicGoalsSuccess(data) {
  return {
    type: Constants.SET_STUDENT_ACADEMIC_GOALS_SUCCESS,
    data,
  };
}

export function setStudentAcademicGoalsError(error) {
  return {
    type: Constants.SET_STUDENT_ACADEMIC_GOALS_ERROR,
    error,
  };
}

export function setStudentBehaviourGoals(value, studentId, isUpdate) {
  return {
    type: Constants.SET_STUDENT_BEHAVIOURAL_GOALS,
    value,
    studentId,
    isUpdate,
  };
}

export function setStudentBehaviourGoalsSuccess(data) {
  return {
    type: Constants.SET_STUDENT_BEHAVIOURAL_GOALS_SUCCESS,
    data,
  };
}

export function setStudentBehaviourGoalsError(error) {
  return {
    type: Constants.SET_STUDENT_BEHAVIOURAL_GOALS_ERROR,
    error,
  };
}

export function updateStudentBehaviourGoals(value, studentId, isUpdate, workItemId) {
  return {
    type: Constants.UPDATE_STUDENT_BEHAVIOURAL_GOALS,
    value,
    studentId,
    isUpdate,
    workItemId,
  };
}

export function updateStudentBehaviourGoalsSuccess(data) {
  return {
    type: Constants.UPDATE_STUDENT_BEHAVIOURAL_GOALS_SUCCESS,
    data,
  };
}

export function updateStudentBehaviourGoalsError(error) {
  return {
    type: Constants.UPDATE_STUDENT_BEHAVIOURAL_GOALS_ERROR,
    error,
  };
}

export function getAllStudentGoalsRequest() {
  return {
    type: Constants.GET_ALL_STUDENT_GOALS_REQUEST,
  };
}

export function getAllStudentGoalsRequestSuccess(getAllStudentGoalsData = []) {
  return {
    type: Constants.GET_ALL_STUDENT_GOALS_REQUEST_SUCCESS,
    getAllStudentGoalsData,
  };
}

export function getAllStudentGoalsRequestFailure(error) {
  return {
    type: Constants.GET_ALL_STUDENT_GOALS_REQUEST_FAILURE,
    error,
  };
}

export function clearResponseStatus() {
  return {
    type: Constants.CLEAR_RESPONSE_STATUS,
  };
}

export function getStudentSubmissionsRequest(payload) {
  return {
    type: Constants.GET_STUDENT_SUBMISSIONS_REQUEST,
    payload,
  };
}

export function getStudentSubmissionsRequestSuccess(data) {
  return {
    type: Constants.GET_STUDENT_SUBMISSIONS_REQUEST_SUCCESS,
    data,
  };
}

export function getStudentSubmissionsRequestError(error) {
  return {
    type: Constants.GET_STUDENT_SUBMISSIONS_REQUEST_ERROR,
    error,
  };
}

export function clearState() {
  return {
    type: Constants.CLEAR_STATE,
  };
}
