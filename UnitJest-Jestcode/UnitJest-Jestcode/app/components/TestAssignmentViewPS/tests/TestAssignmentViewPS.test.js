import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import TestAssignmentViewPS from '../index';

describe('<TestAssignmentViewPS />', () => {
  let wrapper = null;
  let mockHandleSave = null;
  let mockSetIsolateTab = null;
  let mockIsTabIsolated = null;
  let mockTestAssignmentData = null;

  describe('expect to render ProgramSettingsViewPS', () => {
    beforeEach(() => {
      mockHandleSave = jest.fn();
      mockSetIsolateTab = jest.fn();
      mockIsTabIsolated = false;
      mockTestAssignmentData = fromJS({
        dtmModules: {
          module: {
            topic_name: ['Addition &amp; Subtraction'],
            module_id: ['module_3_4'],
            short_name: ['Module C'],
            long_name: ['Numbers greater than 100'],
          },
        },
        dtmTests: {
          tests: {
            test_id: ['dtm_topic1_module1_2_end'],
            module_id: ['module_0_1'],
            test_name: ['End-of-Module Test'],
            test_topic: ['Addition &amp; Subtraction'],
          },
        },
        subproduct: {
          sub_product: [
            {
              name: ['Do The Math Now!'],
              application_id: ['DTM_NOW'],
              total_students: ['0'],
            },
          ],
        },
      });

      wrapper = shallow(
        <TestAssignmentViewPS
          handleSave={mockHandleSave}
          setIsolateTab={mockSetIsolateTab}
          testAssignmentData={mockTestAssignmentData}
          isTabIsolated={mockIsTabIsolated}
        />
      );
    });
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
