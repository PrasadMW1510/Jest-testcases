import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { shallowToJson } from 'enzyme-to-json';

import { PROGRAM_LIST } from 'containers/App/constants';

import ProgramGradingView from '../index';

describe('<ProgramGradingView />', () => {
  let wrapper = null;

  let mockSelectedProgram = null;
  let mockEnrollmentList = fromJS([]);
  const mockDisplayImage = '/a2dabdfecfde82f90145cbd702e07a6b.png';

  describe('expect to render SRCGradingToolsContainer', () => {
    beforeEach(() => {
      mockSelectedProgram = {
        display_image: mockDisplayImage,
        product_code: PROGRAM_LIST.SRC.code,
      };

      mockEnrollmentList = fromJS([
        {
          'application.id': ['SRC'],
          students: [
            {
              total: [2],
            },
          ],
        },
      ]);

      wrapper = shallow(
        <ProgramGradingView
          selectedProgram={mockSelectedProgram}
          enrollmentList={mockEnrollmentList}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find('SRCGradingToolsContainer')).toBeTruthy();
    });
  });

  describe('props.selectedProgram is empty object', () => {
    it('Should render correctly', () => {
      wrapper = shallow(
        <ProgramGradingView selectedProgram={{}} enrollmentList={mockEnrollmentList} />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('props.selectedProgram is not an empty object', () => {
    beforeEach(() => {
      mockSelectedProgram = {
        display_image: mockDisplayImage,
        product_code: PROGRAM_LIST.DTM.code,
      };

      wrapper = shallow(
        <ProgramGradingView
          selectedProgram={mockSelectedProgram}
          enrollmentList={mockEnrollmentList}
        />
      );
    });

    it('Should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find('ProgramSettingsNavBar')).toBeTruthy();
    });
  });
});
