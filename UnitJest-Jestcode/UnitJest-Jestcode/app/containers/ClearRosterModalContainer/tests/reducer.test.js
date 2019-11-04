import clearRosterModalReducer from '../reducer';
import * as Actions from '../actions';

describe('clearRosterModalReducer', () => {
  it('returns the initial state', () => {
    expect(clearRosterModalReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle GET_CLASSES_AND_GROUPS_REQUEST_FAILURE', () => {
    expect(
      clearRosterModalReducer(undefined, Actions.deactivateAllClassesRequestFailure('err'))
    ).toMatchSnapshot();
  });
});
