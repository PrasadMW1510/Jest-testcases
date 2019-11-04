import * as Actions from '../actions';

describe('AccountDeleteModalContainer actions', () => {
  it('should return the correct constant for postAccountDeleteRequest', () => {
    expect(Actions.postAccountDeleteRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for postAccountDeleteRequestSuccess', () => {
    expect(Actions.postAccountDeleteRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for postAccountDeleteRequestFailure', () => {
    expect(Actions.postAccountDeleteRequestFailure('err')).toMatchSnapshot();
  });
});
