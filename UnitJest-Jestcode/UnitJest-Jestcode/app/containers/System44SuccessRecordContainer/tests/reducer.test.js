import { fromJS } from 'immutable';
import system44SuccessRecordContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('System44SuccessRecordContainer reducer', () => {
  const initialState = fromJS({
    getAssignmentSuccessRecordData: {},
  });

  it('returns the initial state', () => {
    expect(system44SuccessRecordContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle GET_ASSIGNMENT_SUCCESS_RECORD_SUCCESS', () => {
    const searchResultsobj = {
      output_data: [{}],
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
    });
    expect(
      system44SuccessRecordContainerReducer(
        undefined,
        Actions.getAssignmentSuccessRecordSuccess(searchResultsobj)
      )
    ).toEqual(updatedState);
  });
  it('should handle GET_ASSIGNMENT_SUCCESS_RECORD_FAILURE', () => {
    expect(
      system44SuccessRecordContainerReducer(undefined, Actions.getAssignmentSuccessRecordFailure())
    ).toMatchSnapshot();
  });
});
