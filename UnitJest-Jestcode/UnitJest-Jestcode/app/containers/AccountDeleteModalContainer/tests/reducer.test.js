import { fromJS } from 'immutable';
import accountDeleteModalContainerReducer from '../reducer';

describe('accountDeleteModalContainerReducer', () => {
  const initialState = fromJS({
    error: false,
  });
  it('returns the initial state', () => {
    expect(accountDeleteModalContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
});
