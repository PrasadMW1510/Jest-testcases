import { fromJS } from 'immutable';
import addSchoolContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('addSchoolContainerReducer', () => {
  // we use underscore format here to resemble the format from the server

  let initialState = null;
  let mockAddSchoolContainerState = null;
  const mockError = 'some error message';

  beforeEach(() => {
    initialState = {
      error: null,
    };
    mockAddSchoolContainerState = fromJS(initialState);
  });

  it('returns the initial state', () => {
    expect(addSchoolContainerReducer(undefined, {})).toEqual(mockAddSchoolContainerState);
  });

  it('should record error for failed meta data request', () => {
    const newState = initialState;
    newState.error = mockError;
    expect(
      addSchoolContainerReducer(undefined, Actions.getMetaDataRequestFailure(mockError))
    ).toEqual(fromJS(newState));
  });
});
