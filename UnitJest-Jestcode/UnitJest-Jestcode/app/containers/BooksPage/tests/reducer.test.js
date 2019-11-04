import { fromJS } from 'immutable';
import booksPageReducer from '../reducer';
import { defaultAction } from '../actions';

describe('booksPageReducer', () => {
  it('returns the initial state', () => {
    expect(booksPageReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('returns the initial state for a default action', () => {
    expect(booksPageReducer(undefined, defaultAction())).toEqual(fromJS({}));
  });
});
