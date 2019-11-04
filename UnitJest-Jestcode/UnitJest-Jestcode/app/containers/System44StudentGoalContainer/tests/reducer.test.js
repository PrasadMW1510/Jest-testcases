import { fromJS } from 'immutable';
import system44StudentGoalContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('teacher Made Quiz Container Reducer', () => {
  const initialState = fromJS({
    error: false,
    getCombinedStudentGoalsData: null,
    getAllStudentGoalsData: null,
    fetchSuccess: false,
    academicGoalSaveStatus: null,
    behaviouralGoalSaveStatus: null,
    studentWorkData: null,
  });
  it('returns the initial state', () => {
    expect(system44StudentGoalContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('should handle GET_COMBINED_STUDENT_GOALS_REQUEST_SUCCESS', () => {
    const getCombinedStudentGoalsDataobj = {
      output_data: ['1'],
    };
    const updatedState = fromJS({
      error: false,
      getCombinedStudentGoalsData: '1',
      getAllStudentGoalsData: null,
      fetchSuccess: true,
      academicGoalSaveStatus: null,
      behaviouralGoalSaveStatus: null,
      studentWorkData: null,
    });
    expect(
      system44StudentGoalContainerReducer(
        undefined,
        Actions.getCombinedStudentGoalsRequestSuccess(getCombinedStudentGoalsDataobj)
      )
    ).toEqual(updatedState);
  });
  it('should handle GET_COMBINED_STUDENT_GOALS_REQUEST_SUCCESS', () => {
    const getAllStudentGoalsDataObj = {
      output_data: ['1'],
    };
    const updatedState = fromJS({
      error: false,
      getCombinedStudentGoalsData: null,
      getAllStudentGoalsData: '1',
      fetchSuccess: true,
      academicGoalSaveStatus: null,
      behaviouralGoalSaveStatus: null,
      studentWorkData: null,
    });
    expect(
      system44StudentGoalContainerReducer(
        undefined,
        Actions.getAllStudentGoalsRequestSuccess(getAllStudentGoalsDataObj)
      )
    ).toEqual(updatedState);
  });
  it('should handle GET_STUDENT_SUBMISSIONS_REQUEST_SUCCESS', () => {
    const getAllStudentGoalsDataObj = {
      output_data: [
        {
          workItems: [
            {
              studentGoalsWorkItem: ['ásjk'],
            },
          ],
        },
      ],
    };
    expect(
      system44StudentGoalContainerReducer(
        undefined,
        Actions.getStudentSubmissionsRequestSuccess(getAllStudentGoalsDataObj)
      )
    ).toMatchSnapshot();
  });
  it('should handle SET_PORTFOLIO_ASSIGNMENT_CLASSES', () => {
    expect(
      system44StudentGoalContainerReducer(undefined, Actions.setStudentAcademicGoalsSuccess())
    ).toMatchSnapshot();
  });
  it('should handle SET_PORTFOLIO_ASSIGNMENT_CLASSES', () => {
    expect(
      system44StudentGoalContainerReducer(undefined, Actions.setStudentAcademicGoalsError())
    ).toMatchSnapshot();
  });
  it('should handle SET_PORTFOLIO_ASSIGNMENT_CLASSES', () => {
    expect(
      system44StudentGoalContainerReducer(undefined, Actions.setStudentBehaviourGoalsSuccess())
    ).toMatchSnapshot();
  });
  it('should handle SET_PORTFOLIO_ASSIGNMENT_CLASSES', () => {
    expect(
      system44StudentGoalContainerReducer(undefined, Actions.setStudentBehaviourGoalsError())
    ).toMatchSnapshot();
  });
  it('should handle SET_PORTFOLIO_ASSIGNMENT_CLASSES', () => {
    expect(
      system44StudentGoalContainerReducer(undefined, Actions.updateStudentBehaviourGoalsSuccess())
    ).toMatchSnapshot();
  });
  it('should handle SET_PORTFOLIO_ASSIGNMENT_CLASSES', () => {
    expect(
      system44StudentGoalContainerReducer(undefined, Actions.updateStudentBehaviourGoalsError())
    ).toMatchSnapshot();
  });
  it('should handle SET_PORTFOLIO_ASSIGNMENT_CLASSES', () => {
    expect(
      system44StudentGoalContainerReducer(undefined, Actions.clearResponseStatus())
    ).toMatchSnapshot();
  });
  it('should handle CLEAR_STATE', () => {
    expect(system44StudentGoalContainerReducer(undefined, Actions.clearState())).toMatchSnapshot();
  });
});
