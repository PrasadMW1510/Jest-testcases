import reportsPageReducer from '../reducer';
import * as Actions from '../actions';

describe('reportsPageReducer', () => {
  it('should handle report list request success actions', () => {
    expect(reportsPageReducer(undefined, Actions.reportListRequestSuccess())).toMatchSnapshot();
  });

  it('should handle report list request failure actions', () => {
    expect(
      reportsPageReducer(undefined, Actions.reportListRequestFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle default case', () => {
    expect(reportsPageReducer(undefined, { type: 'default' })).toMatchSnapshot();
  });
});
