import { fromJS } from 'immutable';

import read180RespondWriteContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('read180RespondWriteContainerReducer reducer', () => {
  const initialState = fromJS({
    respondWrite: [],
    stundentName: '',
    assignmentName: '',
    studentId: '',
    workItemId: '',
    community_id: '',
  });
  it('returns the initial state', () => {
    expect(read180RespondWriteContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle SET_RESPOND_WRITE_REQUEST', () => {
    const data = {
      output_data: [{ workItems: [{ read180RespondWriteWorkItem: [[]] }, { b: 'b' }] }],
    };
    const rowItem = {
      student: '',
      assignment: '',
      workItemId: '',
      studentId: '',
      community_id: '',
    };

    const updatedState = fromJS({
      ...initialState.toJS(),
    });
    expect(
      read180RespondWriteContainerReducer(undefined, Actions.setRespondWriteRequest(data, rowItem))
    ).toEqual(updatedState);
  });
  it('should handle SET_RESPOND_WRITE_REQUEST_S44', () => {
    const data = {
      output_data: [{ workItems: [{ sys44WritingActivityWorkItem: [[]] }, { b: 'b' }] }],
    };
    const rowItem = {
      student: '',
      assignment: '',
      workItemId: '',
      studentId: '',
      community_id: '',
    };

    const updatedState = fromJS({
      ...initialState.toJS(),
    });
    expect(
      read180RespondWriteContainerReducer(
        undefined,
        Actions.setRespondWrites44Request(data, rowItem)
      )
    ).toEqual(updatedState);
  });
});
