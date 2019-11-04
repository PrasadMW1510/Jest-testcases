import * as Actions from '../actions';

describe('ReactivateClassModalContainer actions', () => {
  it('should return the correct constant for postReactivateSchoolRequest', () => {
    expect(Actions.postReactivateClassRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for postReactivateClassRequestSuccess', () => {
    expect(Actions.postReactivateClassRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for postReactivateClassRequestFailure', () => {
    expect(Actions.postReactivateClassRequestFailure('err')).toMatchSnapshot();
  });
});
