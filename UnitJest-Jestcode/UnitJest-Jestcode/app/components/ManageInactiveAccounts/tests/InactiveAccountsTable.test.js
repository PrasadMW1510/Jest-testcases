import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import InactiveAccountsTable from '../InactiveAccountsTable';

describe('<InactiveAccountsTable />', () => {
  const mockGetInactiveCohortMembersRequest = jest.fn();
  const mockHandleFetchData = jest.fn();
  const mockHandleRowCheckboxOnChange = jest.fn();
  const mockToggleAllCheckboxes = jest.fn();

  it('non-cohort-loading should match snapshot', () => {
    const localWrapper = shallow(
      <InactiveAccountsTable
        cohortSelection="Student"
        handleFetchData={mockHandleFetchData}
        handleRowCheckboxOnChange={mockHandleRowCheckboxOnChange}
        getInactiveCohortMembersRequest={mockGetInactiveCohortMembersRequest}
        toggleAllCheckboxes={mockToggleAllCheckboxes}
      />
    );
    expect(shallowToJson(localWrapper)).toMatchSnapshot();
  });

  it('cohort-loading should match snapshot', () => {
    const localWrapper = shallow(
      <InactiveAccountsTable
        cohortSelection="Student"
        handleFetchData={mockHandleFetchData}
        handleRowCheckboxOnChange={mockHandleRowCheckboxOnChange}
        isLoadingNewCohort
        getInactiveCohortMembersRequest={mockGetInactiveCohortMembersRequest}
        toggleAllCheckboxes={mockToggleAllCheckboxes}
      />
    );
    expect(shallowToJson(localWrapper)).toMatchSnapshot();
  });

  it('empty message table should render correctly', () => {
    const localWrapper = shallow(
      <InactiveAccountsTable
        cohortSelection="Student"
        handleFetchData={mockHandleFetchData}
        handleRowCheckboxOnChange={mockHandleRowCheckboxOnChange}
        getInactiveCohortMembersRequest={mockGetInactiveCohortMembersRequest}
        toggleAllCheckboxes={mockToggleAllCheckboxes}
      />
    );
    const emptyMsgTable = shallow(localWrapper.instance().renderEmptyMsgTable());
    expect(shallowToJson(emptyMsgTable)).toMatchSnapshot();
  });
});
