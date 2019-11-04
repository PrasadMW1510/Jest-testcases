import { fromJS } from 'immutable';
import customListContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('search Result Details Container Reducer', () => {
  const initialState = fromJS({});
  it('returns the initial state', () => {
    expect(customListContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle DEFAULT_ACTION', () => {
    expect(customListContainerReducer(undefined, Actions.defaultAction())).toMatchSnapshot();
  });
});
