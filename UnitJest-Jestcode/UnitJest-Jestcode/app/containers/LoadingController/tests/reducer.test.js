import { fromJS } from 'immutable';
import loadingControllerReducer from '../reducer';
import * as Actions from '../actions';

describe('loadingControllerReducer', () => {
  const initialState = fromJS({
    loadingOpen: false,
  });

  it('returns the initial state', () => {
    expect(loadingControllerReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('updates loadingOpen to true for SHOW_LOADING action', () => {
    const updatedState = fromJS({
      loadingOpen: true,
    });

    expect(loadingControllerReducer(undefined, Actions.showLoading())).toEqual(updatedState);
  });

  it('updates loadingOpen to false for HIDE_LOADING action', () => {
    expect(loadingControllerReducer(undefined, Actions.hideLoading())).toEqual(initialState);
  });
});
