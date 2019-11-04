/*
 *
 * InboxModalContainer actions
 *
 */

import * as Constants from './constants';

export function getStudentProgramDetailsDataRequest(programdata) {
  return {
    type: Constants.GET_STUDENT_PROGRAM_DETAIL_REQUEST,
    programdata,
  };
}

export function getStudentProgramDetailsDataSuccess(resultsData) {
  return {
    type: Constants.GET_STUDENT_PROGRAM_DETAIL_REQUEST_SUCCESS,
    resultsData,
  };
}

export function getQuestion(path) {
  return {
    type: Constants.GET_STUDENT_SKILL_ASSESTMENT_QUESTION,
    path,
  };
}

export function getStudentQuestionDataSuccess(data) {
  return {
    type: Constants.GET_STUDENT_SKILL_ASSESTMENT_QUESTION_SUCCESS,
    data,
  };
}

export function getStudentQuestionDataFailure(data) {
  return {
    type: Constants.GET_STUDENT_SKILL_ASSESTMENT_QUESTION_FAILURE,
    data,
  };
}

export function storeEvaluationUpdate(postdata, evData) {
  return {
    type: Constants.SAVE_STUDENT_EVALUATION_DATA,
    postdata,
    evData,
  };
}

export function saveStudentEvalulationDataSuccess(responseData) {
  return {
    type: Constants.SAVE_STUDENT_EVALUATION_DATA_SUCCESS,
    responseData,
  };
}

export function defaultAction() {
  return {
    type: Constants.DEFAULT_ACTION,
  };
}
