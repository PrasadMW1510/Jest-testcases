import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import * as Selectors from 'containers/ManageInactiveAccountsContainer/selectors';
import { ManageInactiveAccountsContainer } from '../ManageInactiveAccountsContainer';

describe('<ManageInactiveAccountsContainer />', () => {
  let wrapper = null;
  const mockGetInactiveCohortMembersRequest = jest.fn();
  const mockInactiveMemberSelector = [];
  const mockPaginationData = {
    itemCount: 1000,
  };

  beforeEach(() => {
    const mockUserOrgAndType = {
      userOrg: 'District',
      userType: 'Administrator',
    };
    jest.spyOn(Selectors, 'selectInactiveMembers').mockReturnValue(mockInactiveMemberSelector);
    jest.spyOn(Selectors, 'selectLoading').mockReturnValue(false);
    jest.spyOn(Selectors, 'selectPaginationData').mockReturnValue(mockPaginationData);
    wrapper = shallow(
      <ManageInactiveAccountsContainer
        getInactiveCohortMembersRequest={mockGetInactiveCohortMembersRequest}
        userOrgAndType={mockUserOrgAndType}
      />
    );
  });

  it('should match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
