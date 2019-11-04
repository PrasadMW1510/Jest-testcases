import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import LoadingBar from 'components/LoadingBar';
import { USER_TYPE } from 'containers/App/constants';
import { SEARCH_STUDENT, SEARCH_TEACHER } from 'containers/SearchModalContainer/constants';
import SAMTable from 'components/SAMTable';

import SearchResultsTable from '../index';

describe('<SearchResultsTable />', () => {
  let wrapper = null;
  let mockSearchResults = null;
  const mockHandleRowCheckboxOnChange = jest.fn();
  const mockToggleAllCheckboxes = jest.fn();
  const mockData = {
    first_name: 'john',
    last_name: 'doe',
    schools: 'A School, B School',
  };

  describe('Should render correctly when Student results data available for teacher', () => {
    beforeEach(() => {
      mockSearchResults = {
        students: [{ user_id: '123', last_name: 'Student', first_name: 'Any' }],
        itemCount: '1',
        paginationData: {
          current_page: ['0'],
          items_per_page: ['250'],
          paginate: ['false'],
        },
      };
      wrapper = shallow(
        <SearchResultsTable
          searchResults={mockSearchResults}
          resultsType={SEARCH_STUDENT}
          profileUserType={USER_TYPE.Teacher}
          handleRowCheckboxOnChange={mockHandleRowCheckboxOnChange}
          toggleAllCheckboxes={mockToggleAllCheckboxes}
        />
      );
    });

    it('Should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should populate the SAMTable with the correct values', () => {
      const table = wrapper.find(SAMTable);
      const { columns } = table.props();
      const nameColumn = columns.find(row => row.Header === 'Name');
      expect(nameColumn.accessor(mockData)).toEqual(
        `${mockData.last_name}, ${mockData.first_name}`
      );
    });

    it('should not have an emptyDataDiv', () => {
      const emptyDataDiv = wrapper.instance().renderEmptySearchTable();
      expect(emptyDataDiv).toBeNull();
    });
  });

  describe('Should render correctly when data is not available', () => {
    beforeEach(() => {
      mockSearchResults = { itemCount: 0 };

      wrapper = shallow(
        <SearchResultsTable
          searchResults={mockSearchResults}
          resultsType={SEARCH_STUDENT}
          profileUserType={USER_TYPE.Administrator}
          handleRowCheckboxOnChange={mockHandleRowCheckboxOnChange}
          toggleAllCheckboxes={mockToggleAllCheckboxes}
        />
      );
    });

    it('Should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should populates the SAMTable with no data', () => {
      const table = wrapper.find(SAMTable);
      const { data } = table.props();

      expect(data).toEqual([]);
    });
  });

  describe('Should render correctly when Teacher results data available for admin', () => {
    beforeEach(() => {
      mockSearchResults = {
        itemCount: 1,
        paginationData: {
          current_page: ['1'],
          items_per_page: ['250'],
          paginate: ['false'],
        },
        teachers: [
          {
            user_id: 'abc',
            district_user_id: '123',
          },
        ],
      };
      wrapper = shallow(
        <SearchResultsTable
          searchResults={mockSearchResults}
          profileUserType={USER_TYPE.Administrator}
          resultsType={SEARCH_TEACHER}
          handleRowCheckboxOnChange={mockHandleRowCheckboxOnChange}
          toggleAllCheckboxes={mockToggleAllCheckboxes}
        />
      );
    });

    it('Should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should populate the SAMTable with the correct values', () => {
      const table = wrapper.find(SAMTable);
      const { columns } = table.props();
      const nameColumn = columns.find(row => row.Header === 'Name');
      expect(nameColumn.accessor(mockData)).toEqual(
        `${mockData.last_name}, ${mockData.first_name}`
      );
    });
  });

  describe('Should render correctly when Student results data available for admin', () => {
    beforeEach(() => {
      mockSearchResults = {
        students: [{ user_id: '123' }],
        itemCount: '501',
        paginationData: {
          current_page: ['1'],
          items_per_page: ['250'],
          paginate: ['false'],
        },
      };
      wrapper = shallow(
        <SearchResultsTable
          searchResults={mockSearchResults}
          profileUserType={USER_TYPE.Administrator}
          resultsType={SEARCH_STUDENT}
          handleRowCheckboxOnChange={mockHandleRowCheckboxOnChange}
          toggleAllCheckboxes={mockToggleAllCheckboxes}
        />
      );
    });

    it('Should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should populate the SAMTable with the correct values', () => {
      const table = wrapper.find(SAMTable);
      const { columns } = table.props();
      const nameColumn = columns.find(row => row.Header === 'Name');
      expect(nameColumn.accessor(mockData)).toEqual(
        `${mockData.last_name}, ${mockData.first_name}`
      );
    });
  });

  describe('Should render Empty when data is not available', () => {
    beforeEach(() => {
      mockSearchResults = { students: [], itemCount: 0 };
      const mockSelectAll = false;
      wrapper = shallow(
        <SearchResultsTable
          searchResults={mockSearchResults}
          resultsType={SEARCH_STUDENT}
          profileUserType={USER_TYPE.Administrator}
          handleRowCheckboxOnChange={mockHandleRowCheckboxOnChange}
          toggleAllCheckboxes={mockToggleAllCheckboxes}
          selectAll={mockSelectAll}
        />
      );
    });

    it('Should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      const emptyDataDiv = wrapper.instance().renderEmptySearchTable();
      expect(emptyDataDiv).toBeTruthy();
    });
  });

  describe('Should have Teacher searching for student columns when profile userType not Teacher, admin, or Tech', () => {
    beforeEach(() => {
      mockSearchResults = {
        students: [{ user_id: '123', last_name: 'Student', first_name: 'Any' }],
        itemCount: '1',
        paginationData: {
          current_page: ['0'],
          items_per_page: ['250'],
          paginate: ['false'],
        },
      };
      wrapper = shallow(
        <SearchResultsTable
          searchResults={mockSearchResults}
          resultsType={SEARCH_STUDENT}
          profileUserType={USER_TYPE.Student}
          handleRowCheckboxOnChange={mockHandleRowCheckboxOnChange}
          toggleAllCheckboxes={mockToggleAllCheckboxes}
        />
      );
    });

    it('should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should not have the Schools column', () => {
      const table = wrapper.find(SAMTable);
      const { columns } = table.props();
      const schoolColumn = columns.find(row => row.Header === 'Schools');
      expect(schoolColumn).toBeUndefined();
    });
  });

  describe('Should render loadingbar when loading property is true', () => {
    beforeEach(() => {
      mockSearchResults = { students: [], itemCount: 0, loading: true };
      const mockSelectAll = false;
      wrapper = shallow(
        <SearchResultsTable
          searchResults={mockSearchResults}
          resultsType={SEARCH_STUDENT}
          profileUserType={USER_TYPE.Administrator}
          handleRowCheckboxOnChange={mockHandleRowCheckboxOnChange}
          toggleAllCheckboxes={mockToggleAllCheckboxes}
          selectAll={mockSelectAll}
        />
      );
    });

    it('Should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      const loadingBar = wrapper.find(LoadingBar);
      expect(loadingBar).toBeTruthy();
    });
  });
});
