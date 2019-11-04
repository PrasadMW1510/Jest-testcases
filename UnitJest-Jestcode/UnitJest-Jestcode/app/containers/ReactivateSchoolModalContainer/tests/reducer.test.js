import { fromJS } from 'immutable';
import accountReactivateClassModalContainerReducer from '../reducer';

describe('reactivateClassModalContainerReducer', () => {
  const initialState = fromJS({
    error: false,
  });
  it('returns the initial state', () => {
    expect(accountReactivateClassModalContainerReducer(undefined, {})).toEqual(
      fromJS(initialState)
    );
  });
});
