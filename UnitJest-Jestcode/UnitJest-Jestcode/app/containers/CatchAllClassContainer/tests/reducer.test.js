import { fromJS } from 'immutable';

import addAssignmentContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('addAssignmentContainerReducer reducer', () => {
  const initialState = fromJS({
    studentDetails: [],
    postnewAssignment: {},
  });
  it('returns the initial state', () => {
    expect(addAssignmentContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle GET_STUDENTDETAIL_SUCCESS', () => {
    const dataObj = {
      output_data: [{}, { b: 'b' }],
    };
    expect(
      addAssignmentContainerReducer(undefined, Actions.getStudentDetailsSuccess(dataObj))
    ).toMatchSnapshot();
  });
  it('should handle POST_NEW_ASSIGNMENT_SUCCESS', () => {
    const dataObj = {
      output_data: [{}, { b: 'b' }],
    };
    expect(
      addAssignmentContainerReducer(undefined, Actions.postSaveNewAssignmentSuccess(dataObj))
    ).toMatchSnapshot();
  });
  it('should handle DEFAULT_ACTION', () => {
    expect(addAssignmentContainerReducer(undefined, Actions.defaultAction())).toMatchSnapshot();
  });
});
