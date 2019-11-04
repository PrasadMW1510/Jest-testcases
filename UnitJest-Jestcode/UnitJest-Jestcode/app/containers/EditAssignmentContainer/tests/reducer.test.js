import { fromJS } from 'immutable';
import editAssignmentContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('search Result Details Container Reducer', () => {
  const initialState = fromJS({
    respAssignmentData: null,
    studentDetails: [],
    saveAssignmentSuccess: null,
    deleteAssignmentSucess: null,
  });
  it('returns the initial state', () => {
    expect(editAssignmentContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle GET_ASSIGNMENT_SUCCESS', () => {
    const comskillObj = {
      output_data: [
        { workItems: [{ classAssignmentWorkItem: [{ classAssignmentGroup: [{}] }] }, { b: 'b' }] },
      ],
    };
    expect(
      editAssignmentContainerReducer(undefined, Actions.getAssignmentDataSuccess(comskillObj))
    ).toMatchSnapshot();
  });
  it('should handle GET_STUDENTDETAIL_SUCCESS', () => {
    const comskillObj = {
      output_data: [{}],
    };
    expect(
      editAssignmentContainerReducer(undefined, Actions.getStudentDetailsSuccess(comskillObj))
    ).toMatchSnapshot();
  });
  it('should handle SAVE_ASSGINMENT_REQUEST_SUCCESS', () => {
    const comskillObj = {
      output_data: [{}],
    };
    expect(
      editAssignmentContainerReducer(undefined, Actions.saveAssignmentRequestSuccess(comskillObj))
    ).toMatchSnapshot();
  });
  it('should handle DELETE_ASSIGNMENT_REQUEST_SUCCESS', () => {
    const comskillObj = {
      output_data: [{}],
    };
    expect(
      editAssignmentContainerReducer(undefined, Actions.deleteAssignmentRequestSuccess(comskillObj))
    ).toMatchSnapshot();
  });
  it('should handle CLEAR_RESPONSE_STATUS', () => {
    expect(
      editAssignmentContainerReducer(undefined, Actions.clearResponseStatus())
    ).toMatchSnapshot();
  });
  it('should handle CLEAR_STATE', () => {
    expect(editAssignmentContainerReducer(undefined, Actions.clearState())).toMatchSnapshot();
  });
});
