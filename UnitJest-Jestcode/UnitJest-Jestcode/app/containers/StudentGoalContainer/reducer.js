/*
 *
 * StudentGoalContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  sGClassData: [],
  selectedSGClassGoals: [],
});

function studentGoalContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.SET_PORTFOLIO_SG_CLASSES:
      return state.set('sGClassData', fromJS(action.updTeacherObj));
    case Constants.SET_PORTFOLIO_SG_CLASSES_GOAL_LIST:
      return state.set('selectedSGClassGoals', fromJS(action.data));
    default:
      return state;
  }
}

export default studentGoalContainerReducer;
