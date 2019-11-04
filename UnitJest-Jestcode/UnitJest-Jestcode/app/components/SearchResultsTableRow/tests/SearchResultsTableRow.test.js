import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { USER_TYPE } from 'containers/App/constants';
import { SEARCH_STUDENT, SEARCH_TEACHER } from 'containers/SearchModalContainer/constants';

import SearchResultsTableRow from '../index';

describe('<SearchResultsTableRow />', () => {
  let wrapper = null;
  let mockRowData = {};
  describe('should render correctly when user type profile is Teacher', () => {
    beforeEach(() => {
      mockRowData = {
        first_name: 'John',
        last_name: 'Doe',
        student_id: 'ABC12345',
        user_name: 'johndoe',
        grade: '6',
        classes: 'SampleClass',
        teachers: 'Dumbledor',
        enrollment: 'M180',
      };
      wrapper = shallow(
        <SearchResultsTableRow
          rowData={mockRowData}
          profileUserType={USER_TYPE.Teacher}
          resultType={SEARCH_STUDENT}
        />
      );
    });

    it('should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('should render correctly when user type profile is administrator and student Results', () => {
    beforeEach(() => {
      mockRowData = {
        first_name: 'John',
        last_name: 'Doe',
        student_id: 'ABC12345',
        user_name: 'johndoe',
        grade: '6',
        classes: 'SampleClass',
        teachers: 'Dumbledor',
        schools: 'Sample School',
        enrollment: 'M180',
      };
      wrapper = shallow(
        <SearchResultsTableRow
          rowData={mockRowData}
          profileUserType={USER_TYPE.Administrator}
          resultType={SEARCH_STUDENT}
        />
      );
    });

    it('should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('should render correctly when user type profile is administrator and teacher Results', () => {
    beforeEach(() => {
      mockRowData = {
        first_name: 'John',
        last_name: 'Doe',
        district_user_id: 'ABC12345',
        user_name: 'johndoe',
        schools: 'Sample School',
        classes: 'SampleClass',
      };
      wrapper = shallow(
        <SearchResultsTableRow
          rowData={mockRowData}
          profileUserType={USER_TYPE.Administrator}
          resultType={SEARCH_TEACHER}
        />
      );
    });

    it('should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('should render nothing when user type profile is teacher and teacher Results', () => {
    beforeEach(() => {
      mockRowData = {};
      wrapper = shallow(
        <SearchResultsTableRow
          rowData={mockRowData}
          profileUserType={USER_TYPE.Teacher}
          resultType={SEARCH_TEACHER}
        />
      );
    });

    it('should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('should render nothing when user type profile is not Teacher nor Admin', () => {
    beforeEach(() => {
      mockRowData = {};
      wrapper = shallow(
        <SearchResultsTableRow
          rowData={mockRowData}
          profileUserType={USER_TYPE.Student}
          resultType={SEARCH_TEACHER}
        />
      );
    });

    it('should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
