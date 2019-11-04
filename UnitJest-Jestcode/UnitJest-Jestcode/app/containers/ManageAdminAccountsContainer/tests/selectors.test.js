import { fromJS } from 'immutable';
import makeSelectManageAdminAccountsContainer, { isManageAdminAccountsLoading } from '../selectors';

describe('selectClassAssignModal', () => {
  it('should select the class assign modal domain', () => {
    const manageAdminAccountsContainer = fromJS({
      manageAdminAccountsContainer: { admins: ['test'] },
    });
    const mockedState = fromJS({ manageAdminAccountsContainer });

    expect(makeSelectManageAdminAccountsContainer()(mockedState)).toMatchSnapshot();
  });
});

describe('isManageAdminsAccountLoading', () => {
  it('should return true if mockState is undefined', () => {
    const manageAdminAccountsContainer = undefined;
    const mockState = fromJS({
      manageAdminAccountsContainer,
    });

    expect(isManageAdminAccountsLoading()(mockState)).toBeTruthy();
  });

  it('should return loading prop', () => {
    const manageAdminAccountsContainer = fromJS({
      loading: false,
    });
    const mockState = fromJS({
      manageAdminAccountsContainer,
    });

    expect(isManageAdminAccountsLoading()(mockState)).toBeFalsy();
  });
});
