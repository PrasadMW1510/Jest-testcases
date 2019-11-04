import * as Actions from '../actions';

describe('ManageAdminAcccountsContainer actions', () => {
  it('should getAdminRequest', () => {
    expect(Actions.getAdminRequest()).toMatchSnapshot();
  });

  it('should getAdminRequestSuccess', () => {
    const admin = { name: 'test' };
    expect(Actions.getAdminRequestSuccess(admin)).toMatchSnapshot();
  });

  it('should getAdminRequestFailure', () => {
    expect(Actions.getAdminRequestFailure('err')).toMatchSnapshot();
  });
  it('should getAdminsRequest', () => {
    expect(Actions.getAdminsRequest()).toMatchSnapshot();
  });

  it('should getAdminsRequestSuccess', () => {
    const admins = ['test'];
    expect(Actions.getAdminsRequestSuccess(admins)).toMatchSnapshot();
  });

  it('should getAdminsRequestFailure', () => {
    expect(Actions.getAdminsRequestFailure('err')).toMatchSnapshot();
  });

  it('should resetAdminsList', () => {
    expect(Actions.resetAdminsList()).toMatchSnapshot();
  });
});
