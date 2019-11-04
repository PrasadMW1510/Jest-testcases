import { fromJS } from 'immutable';

import deactivateModalContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('certificateInfoReducer', () => {
  const initialState = fromJS({
    error: false,
    deactivateUser: [],
  });
  it('returns the initial state', () => {
    expect(deactivateModalContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle deactivate user request success actions', () => {
    expect(
      deactivateModalContainerReducer(undefined, Actions.deactivateUserRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle deactivate user request failure actions', () => {
    expect(
      deactivateModalContainerReducer(undefined, Actions.deactivateUserRequestFailure('err'))
    ).toMatchSnapshot();
  });
});
