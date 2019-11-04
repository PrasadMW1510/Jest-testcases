import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import { COHORT_TYPE } from 'containers/App/constants';

import DeleteInactiveSuccessModal from '../index';

describe('<DeleteInactiveSuccessModal />', () => {
  let wrapper = null;

  let mockData = null;
  let mockOnYes = null;

  beforeEach(() => {
    mockOnYes = jest.fn();
  });

  describe('cohortType is Student', () => {
    beforeEach(() => {
      mockData = {
        searchOpts: {
          cohortType: COHORT_TYPE.Student,
        },
      };

      wrapper = shallow(<DeleteInactiveSuccessModal isOpen data={mockData} onYes={mockOnYes} />);
    });

    it('successCount and failureCount is 1', () => {
      mockData.successCount = 1;
      mockData.failureCount = 1;
      wrapper.setProps({ data: mockData });

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('successCount and failureCount is not 1', () => {
      mockData.successCount = 10;
      mockData.failureCount = 10;
      wrapper.setProps({ data: mockData });

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('cohortType is Teacher', () => {
    beforeEach(() => {
      mockData = {
        searchOpts: {
          cohortType: COHORT_TYPE.Teacher,
        },
      };

      wrapper = shallow(<DeleteInactiveSuccessModal isOpen data={mockData} onYes={mockOnYes} />);
    });

    it('successCount and failureCount is 1', () => {
      mockData.successCount = 1;
      mockData.failureCount = 1;
      wrapper.setProps({ data: mockData });

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('successCount and failureCount is not 1', () => {
      mockData.successCount = 10;
      mockData.failureCount = 10;
      wrapper.setProps({ data: mockData });

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('cohortType is School', () => {
    beforeEach(() => {
      mockData = {
        searchOpts: {
          cohortType: COHORT_TYPE.School,
        },
      };

      wrapper = shallow(<DeleteInactiveSuccessModal isOpen data={mockData} onYes={mockOnYes} />);
    });

    it('successCount is 1', () => {
      mockData.successCount = 1;
      wrapper.setProps({ data: mockData });

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('successCount is not 1', () => {
      mockData.successCount = 10;
      wrapper.setProps({ data: mockData });

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('cohortType is Class', () => {
    beforeEach(() => {
      mockData = {
        searchOpts: {
          cohortType: COHORT_TYPE.Class,
        },
      };

      wrapper = shallow(<DeleteInactiveSuccessModal isOpen data={mockData} onYes={mockOnYes} />);
    });

    it('successCount is 1', () => {
      mockData.successCount = 1;
      wrapper.setProps({ data: mockData });

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('successCount is not 1', () => {
      mockData.successCount = 10;
      wrapper.setProps({ data: mockData });

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
