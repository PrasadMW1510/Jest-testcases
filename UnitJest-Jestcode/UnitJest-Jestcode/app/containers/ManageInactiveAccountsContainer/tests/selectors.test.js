import { fromJS } from 'immutable';
import {
  makeSelectInactiveAccountInfo,
  selectInactiveMembers,
  selectLoading,
  selectPaginationData,
} from '../selectors';

describe('ManageInactiveAccountsContainer selectors', () => {
  it('should select inactive members', () => {
    const immInactiveAccountInfo = fromJS({
      inactiveMembers: ['member1', 'member2'],
    });
    expect(selectInactiveMembers(immInactiveAccountInfo)).toEqual(['member1', 'member2']);
  });

  it('should select pagination data', () => {
    const immInactiveAccountInfo = fromJS({
      inactiveMembers: ['member1', 'member2'],
      itemCount: 5000,
      paginationData: {
        current_page: ['20'],
      },
    });
    expect(selectPaginationData(immInactiveAccountInfo)).toEqual({
      itemCount: 5000,
      current_page: ['20'],
    });
  });

  it('should select loading status', () => {
    const immInactiveAccountInfo = fromJS({
      loading: true,
    });
    expect(selectLoading(immInactiveAccountInfo)).toEqual(true);
  });

  it('should select the domain state', () => {
    const domainState = fromJS({
      manageInactiveAccounts: {
        inactiveMembers: ['member1', 'member2'],
        loading: true,
      },
    });
    const mockedState = fromJS({
      domainState,
    });
    expect(makeSelectInactiveAccountInfo()(mockedState)).toEqual(
      domainState.getIn('manageInactiveAccounts')
    );
  });
});
