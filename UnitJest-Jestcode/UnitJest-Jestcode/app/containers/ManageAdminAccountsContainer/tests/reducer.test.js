import manageAdminAccountsReducer from '../reducer';
import * as Actions from '../actions';

describe('classAssignModal reducer', () => {
  it('returns the initial state', () => {
    expect(manageAdminAccountsReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle GET_ADMIN_REQUEST', () => {
    expect(
      manageAdminAccountsReducer(undefined, Actions.getAdminRequest('mockUserId'))
    ).toMatchSnapshot();
  });

  it('should handle GET_ADMIN_REQUEST_SUCCESS', () => {
    expect(
      manageAdminAccountsReducer(undefined, Actions.getAdminRequestSuccess({ name: 'test' }))
    ).toMatchSnapshot();
  });

  it('should handle GET_ADMIN_REQUEST_FAILURE', () => {
    expect(
      manageAdminAccountsReducer(undefined, Actions.getAdminRequestFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle GET_ADMINS_REQUEST', () => {
    expect(manageAdminAccountsReducer(undefined, Actions.getAdminsRequest())).toMatchSnapshot();
  });

  it('should handle GET_ADMINS_REQUEST_SUCCESS', () => {
    expect(
      manageAdminAccountsReducer(undefined, Actions.getAdminsRequestSuccess(['test']))
    ).toMatchSnapshot();
  });

  it('should handle GET_ADMINS_REQUEST_FAILURE', () => {
    expect(
      manageAdminAccountsReducer(undefined, Actions.getAdminsRequestFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle RESET_ADMINS_LIST', () => {
    expect(manageAdminAccountsReducer(undefined, Actions.resetAdminsList())).toMatchSnapshot();
  });
});
