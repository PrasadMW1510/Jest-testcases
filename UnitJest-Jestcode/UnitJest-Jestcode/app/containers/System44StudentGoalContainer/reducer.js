/*
 *
 * System44StudentGoalContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  getCombinedStudentGoalsData: null,
  getAllStudentGoalsData: null,
  fetchSuccess: false,
  academicGoalSaveStatus: null,
  behaviouralGoalSaveStatus: null,
  studentWorkData: null,
});

function system44StudentGoalContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_COMBINED_STUDENT_GOALS_REQUEST_SUCCESS:
      return state
        .set(
          'getCombinedStudentGoalsData',
          fromJS(action.getCombinedStudentGoalsData.output_data[0])
        )
        .set('fetchSuccess', true);

    case Constants.GET_ALL_STUDENT_GOALS_REQUEST_SUCCESS:
      return state
        .set('getAllStudentGoalsData', fromJS(action.getAllStudentGoalsData.output_data[0]))
        .set('fetchSuccess', true);
    case Constants.SET_STUDENT_ACADEMIC_GOALS_SUCCESS:
      return state.set('academicGoalSaveStatus', fromJS(action.data));
    case Constants.SET_STUDENT_ACADEMIC_GOALS_ERROR:
      return state.set('academicGoalSaveStatus', fromJS(action.error));
    case Constants.SET_STUDENT_BEHAVIOURAL_GOALS_SUCCESS:
      return state.set('behaviouralGoalSaveStatus', fromJS(action.data));
    case Constants.SET_STUDENT_BEHAVIOURAL_GOALS_ERROR:
      return state.set('behaviouralGoalSaveStatus', fromJS(action.error));
    case Constants.UPDATE_STUDENT_BEHAVIOURAL_GOALS_SUCCESS:
      return state.set('behaviouralGoalSaveStatus', fromJS(action.data));
    case Constants.UPDATE_STUDENT_BEHAVIOURAL_GOALS_ERROR:
      return state.set('behaviouralGoalSaveStatus', fromJS(action.error));
    case Constants.CLEAR_RESPONSE_STATUS:
      return state.set('behaviouralGoalSaveStatus', null).set('academicGoalSaveStatus', null);
    case Constants.GET_STUDENT_SUBMISSIONS_REQUEST_SUCCESS:
      return state
        .set(
          'studentWorkData',
          fromJS(
            action.data.output_data &&
              action.data.output_data[0].workItems &&
              action.data.output_data[0].workItems[0] &&
              action.data.output_data[0].workItems[0].studentGoalsWorkItem &&
              action.data.output_data[0].workItems &&
              action.data.output_data[0].workItems[0].studentGoalsWorkItem[0]
          )
        )
        .set('fetchSuccess', true);
    case Constants.CLEAR_STATE:
      return state
        .set('error', false)
        .set('getCombinedStudentGoalsData', null)
        .set('getAllStudentGoalsData', null)
        .set('fetchSuccess', false)
        .set('academicGoalSaveStatus', null)
        .set('behaviouralGoalSaveStatus', null)
        .set('studentWorkData', null);
    default:
      return state;
  }
}

export default system44StudentGoalContainerReducer;
