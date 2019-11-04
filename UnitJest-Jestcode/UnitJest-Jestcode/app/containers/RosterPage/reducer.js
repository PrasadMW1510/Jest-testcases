/*
 *
 * RosterPage reducer
 *
 */

import { fromJS } from 'immutable';
import { SELECT_PROGRAM } from './constants';

const initialState = fromJS({
  selectedProgram: '',
});

function rosterPageReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_PROGRAM:
      return state.set('selectedProgram', action.selectedProgram);
    default:
      return state;
  }
}

export default rosterPageReducer;
