import * as Actions from '../actions';

describe('ClearRosterModal actions', () => {
  it('should deactivateAllClassesRequest', () => {
    expect(Actions.deactivateAllClassesRequest()).toMatchSnapshot();
  });

  it('should deactivateAllClassesRequestSuccess', () => {
    expect(Actions.deactivateAllClassesRequestSuccess()).toMatchSnapshot();
  });

  it('should deactivateAllClassesRequestFailure', () => {
    expect(Actions.deactivateAllClassesRequestFailure('err')).toMatchSnapshot();
  });
});
