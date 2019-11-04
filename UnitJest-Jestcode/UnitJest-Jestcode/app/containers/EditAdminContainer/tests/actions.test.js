import * as Actions from '../actions';

describe('EditAdminContainer actions', () => {
  it('should return the correct constant for editAdminContainerRequest', () => {
    expect(Actions.editAdminContainerRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for editAdminContainerRequestSuccess', () => {
    expect(Actions.editAdminContainerRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for editAdminContainerRequestFailure', () => {
    expect(Actions.editAdminContainerRequestFailure('mockError')).toMatchSnapshot();
  });

  it('should return the correct constant for postSaveAdminRequest with no params', () => {
    expect(Actions.postSaveAdminRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for postSaveAdminRequest with param', () => {
    expect(Actions.postSaveAdminRequest('mockProfileData')).toMatchSnapshot();
  });

  it('should return the correct constant for postSaveAdminRequestSuccess', () => {
    expect(Actions.postSaveAdminRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for postSaveAdminRequestFailure', () => {
    expect(Actions.postSaveAdminRequestFailure()).toMatchSnapshot();
  });

  it('should return the correct constant for postAddAdminRequest', () => {
    expect(
      Actions.postAddAdminRequest({ user_type: 'admin' }, [100], 'mockSchoolId')
    ).toMatchSnapshot();
  });

  it('should return the correct constant for postAddAdminRequestSuccess', () => {
    expect(Actions.postAddAdminRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for postAddAdminRequestFailure', () => {
    expect(Actions.postAddAdminRequestFailure()).toMatchSnapshot();
  });
});
