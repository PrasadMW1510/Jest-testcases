import { fromJS } from 'immutable';

import studentGoalContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('studentGoalContainerReducer reducer', () => {
  const initialState = fromJS({
    sGClassData: [],
    selectedSGClassGoals: [],
  });
  it('returns the initial state', () => {
    expect(studentGoalContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle SET_PORTFOLIO_SG_CLASSES', () => {
    const updatedVal = [];
    const classObj = [];
    const updatedState = fromJS({
      ...initialState.toJS(),
      sGClassData: updatedVal,
    });
    expect(
      studentGoalContainerReducer(undefined, Actions.setSGClassRequestSuccess(classObj))
    ).toEqual(updatedState);
  });
  it('should handle SET_PORTFOLIO_SG_CLASSES_GOAL_LIST', () => {
    const updatedVal = [];
    const classObj = [];
    const updatedState = fromJS({
      ...initialState.toJS(),
      sGClassData: updatedVal,
    });
    expect(
      studentGoalContainerReducer(undefined, Actions.setClassSGGridRequestSuccess(classObj))
    ).toEqual(updatedState);
  });
});
