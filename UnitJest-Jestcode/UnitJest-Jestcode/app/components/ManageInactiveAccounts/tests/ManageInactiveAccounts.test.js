import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { COHORT_TYPE } from 'containers/App/constants';
import ManageInactiveAccounts from '../index';

describe('<ManageInactiveAccounts />', () => {
  let wrapper = null;
  let mockShowModal = null;
  let mockShowAccountDeleteModal = null;
  let mockShowSearchClassAssignModal = null;
  const mockGetInactiveCohortMembersRequest = jest.fn();
  const mockRowData = [
    {
      _id: 2,
    },
    {
      _id: 3,
    },
  ];
  beforeEach(() => {
    mockShowModal = jest.fn();
    mockShowAccountDeleteModal = jest.fn();
    mockShowSearchClassAssignModal = jest.fn();
    wrapper = shallow(
      <ManageInactiveAccounts
        getInactiveCohortMembersRequest={mockGetInactiveCohortMembersRequest}
        rowData={mockRowData}
        userOrg="District"
        userType="Administrator"
        showModal={mockShowModal}
        showAccountDeleteModal={mockShowAccountDeleteModal}
        showSearchClassAssignModal={mockShowSearchClassAssignModal}
      />
    );
  });

  it('should match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should match snapshot for non-last page of data', () => {
    const mockPaginationData = {
      itemCount: 2000,
    };
    const localWrapper = shallow(
      <ManageInactiveAccounts
        getInactiveCohortMembersRequest={mockGetInactiveCohortMembersRequest}
        paginationData={mockPaginationData}
        rowData={mockRowData}
        userOrg="District"
        userType="Administrator"
        showModal={mockShowModal}
        showAccountDeleteModal={mockShowAccountDeleteModal}
        showSearchClassAssignModal={mockShowSearchClassAssignModal}
      />
    );
    expect(shallowToJson(localWrapper)).toMatchSnapshot();
  });

  describe('componentWillUpdate', () => {
    it('should handle componentWillUpdate when starting data loading', () => {
      const nextProps = {
        isDataLoading: true,
      };
      const localWrapper = shallow(
        <ManageInactiveAccounts
          getInactiveCohortMembersRequest={mockGetInactiveCohortMembersRequest}
          isDataLoading
          rowData={mockRowData}
          userOrg="District"
          userType="Administrator"
          showModal={mockShowModal}
          showAccountDeleteModal={mockShowAccountDeleteModal}
          showSearchClassAssignModal={mockShowSearchClassAssignModal}
        />
      );
      const component = localWrapper.instance();
      component.isLoadingNewCohort = true;
      component.isLoadingNewPageOrSort = true;
      component.componentWillUpdate(nextProps);
      expect(component.isLoadingNewCohort).toBeTruthy();
      expect(component.isLoadingNewPageOrSort).toBeTruthy();
    });

    it('should handle componentWillUpdate when finishing data loading', () => {
      const nextProps = {
        isDataLoading: false,
      };
      const localWrapper = shallow(
        <ManageInactiveAccounts
          getInactiveCohortMembersRequest={mockGetInactiveCohortMembersRequest}
          isDataLoading
          rowData={mockRowData}
          userOrg="District"
          userType="Administrator"
          showModal={mockShowModal}
          showAccountDeleteModal={mockShowAccountDeleteModal}
          showSearchClassAssignModal={mockShowSearchClassAssignModal}
        />
      );
      const component = localWrapper.instance();
      component.componentWillUpdate(nextProps);
      expect(component.isLoadingNewCohort).toBeFalsy();
      expect(component.isLoadingNewPageOrSort).toBeFalsy();
    });
  });

  it('handleNewSort should function correctly with sort defined', () => {
    const tableState = {
      sorted: [{ id: 'name', desc: true }],
    };
    const actionPayload = {
      cohortType: COHORT_TYPE.Student,
      shouldSortAscending: false,
      sortColumn: 'last_name',
    };
    wrapper.instance().handleNewSort(tableState);
    expect(mockGetInactiveCohortMembersRequest).toHaveBeenCalledWith(actionPayload);
  });

  it('handleNewSort should function correctly without sort defined', () => {
    const tableState = { sorted: [] };
    const localMockGetInactiveCohortMembersRequest = jest.fn();
    wrapper.instance().handleNewSort(tableState);
    expect(localMockGetInactiveCohortMembersRequest).toHaveBeenCalledTimes(0);
  });

  it('handlePageChange should function correctly', () => {
    wrapper.instance().handlePageChange(3);
    expect(mockGetInactiveCohortMembersRequest).toHaveBeenCalledWith({
      cohortType: COHORT_TYPE.Student,
      currentPage: 2,
      shouldSortAscending: true,
      sortColumn: 'last_name',
    });
    expect(wrapper.instance().state.currentPage).toEqual(3);
    expect(wrapper.instance().isLoadingNewPageOrSort).toBeTruthy();
    expect(wrapper.instance().state.allSelected).toBeFalsy();
  });

  it('toggleAllCheckboxes should function correctly for checked', () => {
    wrapper.instance().toggleAllCheckboxes(true);
    const state = wrapper.instance().state;
    expect(state.allSelected).toBeTruthy();
    expect(state.checkedIds).toEqual([2, 3]);
  });

  it('toggleAllCheckboxes should function correctly for unchecked', () => {
    wrapper.instance().toggleAllCheckboxes(false);
    const state = wrapper.instance().state;
    expect(state.allSelected).toBeFalsy();
    expect(state.checkedIds).toEqual([]);
  });

  it('handleRowCheckboxOnChange should function correctly when checked', () => {
    const isChecked = true;
    const id = 1;
    wrapper.instance().handleRowCheckboxOnChange(isChecked, id);
    expect(wrapper.instance().state.checkedIds.indexOf(1)).toEqual(0);
  });

  it('handleRowCheckboxOnChange should function correctly when unchecked', () => {
    const isChecked = false;
    const id = 1;
    wrapper.instance().state.checkedIds = [1];
    wrapper.instance().handleRowCheckboxOnChange(isChecked, id);
    expect(wrapper.instance().state.checkedIds.indexOf(1)).toEqual(-1);
    expect(wrapper.instance().state.allSelected).toBeFalsy();
  });

  it('basicUserType should produce correct return value', () => {
    const teacherWrapper = shallow(
      <ManageInactiveAccounts
        getInactiveCohortMembersRequest={mockGetInactiveCohortMembersRequest}
        userOrg="School"
        userType="Teacher"
        showModal={mockShowModal}
        showAccountDeleteModal={mockShowAccountDeleteModal}
        showSearchClassAssignModal={mockShowSearchClassAssignModal}
      />
    );
    expect(teacherWrapper.instance().basicUserType).toEqual('Teacher');
  });

  it('handleChangeCohortType should function correctly', () => {
    const ev = {
      target: {
        value: 'School',
      },
    };
    wrapper.instance().handleChangeCohortType(ev);
    expect(wrapper.instance().state.cohortSelection).toEqual('School');
  });

  it('handleChangeActionType should function correctly', () => {
    const ev = {
      target: {
        value: 'Delete',
      },
    };
    wrapper.instance().handleChangeActionType(ev);
    expect(wrapper.instance().state.actionSelection).toEqual('Delete');
  });

  it('Go button click should function correctly', () => {
    wrapper
      .find('#goButton')
      .props()
      .onClickHandler();
  });
});
