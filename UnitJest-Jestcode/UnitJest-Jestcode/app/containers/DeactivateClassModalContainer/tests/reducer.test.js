import { fromJS } from 'immutable';

import deactivateClassModalContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('deactivateClassModalContainerReducer', () => {
  const initialState = fromJS({
    error: false,
    deactivateClass: [],
  });
  it('returns the initial state', () => {
    expect(deactivateClassModalContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle deactivate class request success actions', () => {
    expect(
      deactivateClassModalContainerReducer(undefined, Actions.deactivateClassRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle deactivate class request failure actions', () => {
    expect(
      deactivateClassModalContainerReducer(undefined, Actions.deactivateClassRequestFailure('err'))
    ).toMatchSnapshot();
  });
});
