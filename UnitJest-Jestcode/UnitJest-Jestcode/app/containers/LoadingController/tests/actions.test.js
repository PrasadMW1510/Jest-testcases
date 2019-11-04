import * as Actions from '../actions';

describe('LoadingController actions', () => {
  it('should return the correct constant for showLoading', () => {
    expect(Actions.showLoading()).toMatchSnapshot();
  });

  it('should return the correct constant for hideLoading', () => {
    expect(Actions.hideLoading()).toMatchSnapshot();
  });
});
