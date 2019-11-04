import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { PROGRAM_LIST } from 'containers/App/constants';

import ProgramSettingsView from '../index';

describe('<ProgramSettingsView />', () => {
  let wrapper = null;

  let mockSelectedProgram = null;
  let mockEnrollmentList = fromJS([]);
  const mockDisplayImage = '/b4dced4348bdc9fa80024292c7926954.png';

  describe('expect to render FADSettingsContainer', () => {
    beforeEach(() => {
      mockSelectedProgram = {
        display_image_large: mockDisplayImage,
        product_code: PROGRAM_LIST.FAD.code,
      };

      mockEnrollmentList = fromJS([
        {
          'application.id': ['FAD'],
          students: [
            {
              total: [2],
            },
          ],
        },
      ]);

      wrapper = shallow(
        <ProgramSettingsView
          selectedProgram={mockSelectedProgram}
          enrollmentList={mockEnrollmentList}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find('FADSettingsContainer')).toBeTruthy();
    });
  });

  describe('expect to render R180EESettingContainer', () => {
    beforeEach(() => {
      mockSelectedProgram = {
        display_image_large: mockDisplayImage,
        product_code: PROGRAM_LIST.R180.code,
      };

      mockEnrollmentList = fromJS([
        {
          'application.id': ['R180_A'],
          students: [
            {
              total: [2],
            },
          ],
        },
        {
          'application.id': ['R180_B'],
          students: [
            {
              total: [3],
            },
          ],
        },
        {
          'application.id': ['R180_C'],
          students: [
            {
              total: [4],
            },
          ],
        },
        {
          'application.id': ['R180_A_Upsell'],
          students: [
            {
              total: [5],
            },
          ],
        },
        {
          'application.id': ['R180_B_Upsell'],
          students: [
            {
              total: [6],
            },
          ],
        },
        {
          'application.id': ['R180_C_Upsell'],
          students: [
            {
              total: [7],
            },
          ],
        },
      ]);

      wrapper = shallow(
        <ProgramSettingsView
          selectedProgram={mockSelectedProgram}
          enrollmentList={mockEnrollmentList}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find('R180EESettingContainer')).toBeTruthy();
    });
  });

  describe('expect to render R180NGSettingContainer', () => {
    beforeEach(() => {
      mockSelectedProgram = {
        display_image_large: mockDisplayImage,
        product_code: PROGRAM_LIST.R180NG.code,
      };

      wrapper = shallow(
        <ProgramSettingsView
          selectedProgram={mockSelectedProgram}
          enrollmentList={mockEnrollmentList}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find('R180NGSettingContainer')).toBeTruthy();
    });
  });

  describe('expect to render RSkillsCCSettingContainer', () => {
    beforeEach(() => {
      mockSelectedProgram = {
        display_image_large: mockDisplayImage,
        product_code: PROGRAM_LIST.RTNG.code,
      };

      wrapper = shallow(
        <ProgramSettingsView
          selectedProgram={mockSelectedProgram}
          enrollmentList={mockEnrollmentList}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find('RSkillsCCSettingContainer')).toBeTruthy();
    });
  });

  describe('expect to render S44SettingContainer', () => {
    beforeEach(() => {
      mockSelectedProgram = {
        display_image_large: mockDisplayImage,
        product_code: PROGRAM_LIST.S44.code,
      };

      mockEnrollmentList = fromJS([
        {
          'application.id': ['S44'],
          students: [
            {
              total: [2],
            },
          ],
        },
      ]);

      wrapper = shallow(
        <ProgramSettingsView
          selectedProgram={mockSelectedProgram}
          enrollmentList={mockEnrollmentList}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find('S44SettingContainer')).toBeTruthy();
    });
  });

  describe('expect to render IreadSettingsContainer', () => {
    beforeEach(() => {
      mockSelectedProgram = {
        display_image_large: mockDisplayImage,
        product_code: PROGRAM_LIST.S44JR.code,
      };

      mockEnrollmentList = fromJS([
        {
          'application.id': ['S44JR'],
          students: [
            {
              total: [2],
            },
          ],
        },
      ]);

      wrapper = shallow(
        <ProgramSettingsView
          selectedProgram={mockSelectedProgram}
          enrollmentList={mockEnrollmentList}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find('IreadSettingsContainer')).toBeTruthy();
    });
  });

  describe('expect to render S44NGSettingContainer', () => {
    beforeEach(() => {
      mockSelectedProgram = {
        display_image_large: mockDisplayImage,
        product_code: PROGRAM_LIST.S44NG.code,
      };

      mockEnrollmentList = fromJS([
        {
          'application.id': ['S44NG'],
          students: [
            {
              total: [2],
            },
          ],
        },
        {
          'application.id': ['S44NG_A_flex'],
          students: [
            {
              total: [10],
            },
          ],
        },
        {
          'application.id': ['S44NG_B_flex'],
          students: [
            {
              total: [35],
            },
          ],
        },
        {
          'application.id': ['S44NG_C_flex'],
          students: [
            {
              total: [40],
            },
          ],
        },
      ]);

      wrapper = shallow(
        <ProgramSettingsView
          selectedProgram={mockSelectedProgram}
          enrollmentList={mockEnrollmentList}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find('S44NGSettingContainer')).toBeTruthy();
    });
  });

  describe('expect to render RISettingContainer', () => {
    beforeEach(() => {
      mockSelectedProgram = {
        display_image_large: mockDisplayImage,
        product_code: PROGRAM_LIST.SRI.code,
      };

      mockEnrollmentList = fromJS([
        {
          'application.id': ['SRI'],
          students: [
            {
              total: [2],
            },
          ],
        },
      ]);

      wrapper = shallow(
        <ProgramSettingsView
          selectedProgram={mockSelectedProgram}
          enrollmentList={mockEnrollmentList}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find('RISettingContainer')).toBeTruthy();
    });
  });

  describe('expect to render XSkillsSettingContainer', () => {
    beforeEach(() => {
      mockSelectedProgram = {
        display_image_large: mockDisplayImage,
        product_code: PROGRAM_LIST.XT.code,
      };

      mockEnrollmentList = fromJS([
        {
          'application.id': ['XT_I'],
          students: [
            {
              total: [2],
            },
          ],
        },
        {
          'application.id': ['XT_II'],
          students: [
            {
              total: [4],
            },
          ],
        },
        {
          'application.id': ['XT_III'],
          students: [
            {
              total: [3],
            },
          ],
        },
      ]);

      wrapper = shallow(
        <ProgramSettingsView
          selectedProgram={mockSelectedProgram}
          enrollmentList={mockEnrollmentList}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find('XSkillsSettingContainer')).toBeTruthy();
    });
  });

  describe('props.selectedProgram is not an empty object', () => {
    beforeEach(() => {
      mockSelectedProgram = {
        display_image_large: mockDisplayImage,
        product_code: PROGRAM_LIST.DTM.code,
      };

      wrapper = shallow(
        <ProgramSettingsView
          selectedProgram={mockSelectedProgram}
          enrollmentList={mockEnrollmentList}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find('ProgramSettingsNavBar')).toBeTruthy();
    });
  });
});
