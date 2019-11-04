import rosterPageReducer from '../reducer';
import * as Actions from '../actions';

describe('rosterPageReducer for SELECT_PROGRAM', () => {
  it('returns the initial state', () => {
    expect(rosterPageReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle selectedProgram request success', () => {
    expect(rosterPageReducer(undefined, Actions.handleSelectProgram())).toMatchSnapshot();
  });
});
