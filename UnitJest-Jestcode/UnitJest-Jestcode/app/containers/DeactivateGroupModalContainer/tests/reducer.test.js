import { fromJS } from 'immutable';

import deactivateGroupModalContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('deactivateGroupModalContainerReducer', () => {
  const initialState = fromJS({
    error: false,
    deactivateGroup: [],
  });
  it('returns the initial state', () => {
    expect(deactivateGroupModalContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle deactivate group request success actions', () => {
    expect(
      deactivateGroupModalContainerReducer(undefined, Actions.deactivateGroupRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle deactivate group request failure actions', () => {
    expect(
      deactivateGroupModalContainerReducer(undefined, Actions.deactivateGroupRequestFailure('err'))
    ).toMatchSnapshot();
  });
});
