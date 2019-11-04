import * as Actions from '../actions';

describe('RemoveAdmindModalContraint actions', () => {
  it('should disableAdminRequest', () => {
    expect(Actions.disableAdminRequest()).toMatchSnapshot();
  });

  it('should disableAdminRequestSuccess', () => {
    expect(Actions.disableAdminRequestSuccess()).toMatchSnapshot();
  });

  it('should disableAdminRequestFailure', () => {
    expect(Actions.disableAdminRequestFailure('err')).toMatchSnapshot();
  });
});
