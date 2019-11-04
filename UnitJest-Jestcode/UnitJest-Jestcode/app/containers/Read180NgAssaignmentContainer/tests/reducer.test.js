import { fromJS } from 'immutable';
import read180NgAssaignmentContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('Read180NgAssaignmentContainer reducer', () => {
  const initialState = fromJS({
    studentDetails: [],
    postNewAssignment: {},
  });
  it('returns the initial state', () => {
    expect(read180NgAssaignmentContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle GET_STUDENTDETAIL_SUCCESS:', () => {
    const dataObj = {
      output_data: [{}, { b: 'b' }],
    };
    expect(
      read180NgAssaignmentContainerReducer(undefined, Actions.getStudentDetailsSuccess(dataObj))
    ).toMatchSnapshot();
  });
  it('should handle POST_NEW_ASSIGNMENT_SUCCESS:', () => {
    const dataObj = {
      output_data: [{}, { b: 'b' }],
    };
    expect(
      read180NgAssaignmentContainerReducer(undefined, Actions.postSaveNewAssignmentSuccess(dataObj))
    ).toMatchSnapshot();
  });
  it('should handle DEFAULT_ACTION', () => {
    const searchResultsobj = [];
    const updatedState = fromJS({
      ...initialState.toJS(),
    });
    expect(
      read180NgAssaignmentContainerReducer(undefined, Actions.defaultAction(searchResultsobj))
    ).toEqual(updatedState);
  });
});
