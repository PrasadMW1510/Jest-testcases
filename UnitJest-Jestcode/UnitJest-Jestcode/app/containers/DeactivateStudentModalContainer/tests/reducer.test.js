import { fromJS } from 'immutable';

import deactivateStudentModalContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('deactivateStudentModalContainerReducer', () => {
  const initialState = fromJS({
    error: false,
    deactivateStudent: [],
  });
  it('returns the initial state', () => {
    expect(deactivateStudentModalContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle deactivate student request success actions', () => {
    expect(
      deactivateStudentModalContainerReducer(undefined, Actions.deactivateStudentRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle deactivate student request failure actions', () => {
    expect(
      deactivateStudentModalContainerReducer(
        undefined,
        Actions.deactivateStudentRequestFailure('err')
      )
    ).toMatchSnapshot();
  });
});
