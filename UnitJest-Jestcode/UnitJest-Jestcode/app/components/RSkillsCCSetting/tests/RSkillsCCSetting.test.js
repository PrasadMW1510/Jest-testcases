import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { PROGRAM_LIST } from 'containers/App/constants';

import RSkillsCCSetting from '../index';

describe('<RSkillsCCSetting />', () => {
  let wrapper = null;
  const mockStudentCohortObject = { cohortType: 'Student', id: 'guidStudent54321' };
  const mockTeacherCohortObject = { cohortType: 'Teacher', id: 'guidTeacher54321' };
  const mockDistrictCohortObject = { cohortType: 'District', id: 'guidDistrict9' };
  const mockHandleGetDefaultSettings = jest.fn();
  const mockHandleSettingsSave = jest.fn();
  const mockTestAssignmentSave = jest.fn();
  const mockEnrollmentCountZero = 0;
  const mockEnrollmentCountOne = 1;
  const mockImmDefaultProgramSettings = {};
  const mockImmProgramSettings = {};
  const mockTestAssignmentStagesArray = [
    {
      id: 'A',
      name: 'Stage A',
      bundles: [
        {
          id: 'rbook',
          name: 'rBook',
          tests: [
            {
              atGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_A_1b.pdf',
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_A_1b.pdf',
              description: 'Skills from Workshop 1',
              name: 'Test 1',
              number: '1',
            },
            {
              atGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_A_2b.pdf',
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_A_2b.pdf',
              description: 'Skills from Workshop 2',
              name: 'Test 2',
              number: '2',
            },
          ],
        },
      ],
    },
    {
      id: 'B',
      name: 'Stage B',
      bundles: [
        {
          id: 'rbook',
          name: 'rBook',
          tests: [
            {
              atGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_B_1b.pdf',
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_B_1b.pdf',
              description: 'Skills from Workshop 1',
              name: 'Test 1',
              number: '1',
            },
            {
              atGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_B_2b.pdf',
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_B_2b.pdf',
              description: 'Skills from Workshop 2',
              name: 'Test 2',
              number: '2',
            },
          ],
        },
        {
          id: 'rbook_flex_i',
          name: 'rBook Flex',
          tests: [
            {
              atGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_F1_1b.pdf',
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_F1_1b.pdf',
              description: 'Skills from Workshop 1',
              name: 'Test 1',
              number: '1',
            },
            {
              atGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_FlexI_2b.pdf',
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_FlexI_2b.pdf',
              description: 'Skills from Workshop 2',
              name: 'Test 2',
              number: '2',
            },
          ],
        },
        {
          id: 'rbook_flex_ii',
          name: 'rBook Flex II',
          tests: [
            {
              atGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_FlexII_1b.pdf',
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_FlexII_1b.pdf',
              description: 'Skills from Workshop 1',
              name: 'Test 1',
              number: '1',
            },
            {
              atGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_F2_2b.pdf',
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_F2_2b.pdf',
              description: 'Skills from Workshop 2',
              name: 'Test 2',
              number: '2',
            },
          ],
        },
      ],
    },
    {
      id: 'C',
      name: 'Stage C',
      bundles: [
        {
          id: 'rbook',
          name: 'rBook',
          tests: [
            {
              atGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_C_1b.pdf',
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_C_1b.pdf',
              description: 'Skills from Workshop 1',
              name: 'Test 1',
              number: '1',
            },
            {
              atGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_C_2b.pdf',
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_C_2b.pdf',
              description: 'Skills from Workshop 2',
              name: 'Test 2',
              number: '2',
            },
          ],
        },
        {
          id: 'rbook_flex_i',
          name: 'rBook Flex',
          tests: [
            {
              atGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_F1_1b.pdf',
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_F1_1b.pdf',
              description: 'Skills from Workshop 1',
              name: 'Test 1',
              number: '1',
            },
            {
              atGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_FlexI_2b.pdf',
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_FlexI_2b.pdf',
              description: 'Skills from Workshop 2',
              name: 'Test 2',
              number: '2',
            },
          ],
        },
        {
          id: 'rbook_flex_ii',
          name: 'rBook Flex II',
          tests: [
            {
              atGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_FlexII_1b.pdf',
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_FlexII_1b.pdf',
              description: 'Skills from Workshop 1',
              name: 'Test 1',
              number: '1',
            },
            {
              atGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_F2_2b.pdf',
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_F2_2b.pdf',
              description: 'Skills from Workshop 2',
              name: 'Test 2',
              number: '2',
            },
          ],
        },
      ],
    },
  ];
  describe('render', () => {
    it('should render correctly when student cohortType empty enrollment', () => {
      wrapper = shallow(
        <RSkillsCCSetting
          effectiveCohortObject={mockStudentCohortObject}
          immDefaultProgramSettings={mockImmDefaultProgramSettings}
          immProgramSettings={mockImmProgramSettings}
          programMeta={PROGRAM_LIST.RTNG}
          enrollmentCount={mockEnrollmentCountZero}
          testAssignmentStages={mockTestAssignmentStagesArray}
          handleRSkillsCCSettingsSave={mockHandleSettingsSave}
          handleRSkillsCCGetDefaultSettings={mockHandleGetDefaultSettings}
          handleRSkillsCCTestAssignmentSave={mockTestAssignmentSave}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render correctly when student cohortType enrolled', () => {
      wrapper = shallow(
        <RSkillsCCSetting
          effectiveCohortObject={mockStudentCohortObject}
          immDefaultProgramSettings={mockImmDefaultProgramSettings}
          immProgramSettings={mockImmProgramSettings}
          programMeta={PROGRAM_LIST.RTNG}
          enrollmentCount={mockEnrollmentCountOne}
          testAssignmentStages={mockTestAssignmentStagesArray}
          handleRSkillsCCSettingsSave={mockHandleSettingsSave}
          handleRSkillsCCGetDefaultSettings={mockHandleGetDefaultSettings}
          handleRSkillsCCTestAssignmentSave={mockTestAssignmentSave}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render correctly when teacher cohortType empty enrollment', () => {
      wrapper = shallow(
        <RSkillsCCSetting
          effectiveCohortObject={mockTeacherCohortObject}
          immDefaultProgramSettings={mockImmDefaultProgramSettings}
          immProgramSettings={mockImmProgramSettings}
          programMeta={PROGRAM_LIST.RTNG}
          enrollmentCount={mockEnrollmentCountZero}
          testAssignmentStages={mockTestAssignmentStagesArray}
          handleRSkillsCCSettingsSave={mockHandleSettingsSave}
          handleRSkillsCCGetDefaultSettings={mockHandleGetDefaultSettings}
          handleRSkillsCCTestAssignmentSave={mockTestAssignmentSave}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render correctly when teacher cohortType enrolled', () => {
      wrapper = shallow(
        <RSkillsCCSetting
          effectiveCohortObject={mockTeacherCohortObject}
          immDefaultProgramSettings={mockImmDefaultProgramSettings}
          immProgramSettings={mockImmProgramSettings}
          programMeta={PROGRAM_LIST.RTNG}
          enrollmentCount={mockEnrollmentCountOne}
          testAssignmentStages={mockTestAssignmentStagesArray}
          handleRSkillsCCSettingsSave={mockHandleSettingsSave}
          handleRSkillsCCGetDefaultSettings={mockHandleGetDefaultSettings}
          handleRSkillsCCTestAssignmentSave={mockTestAssignmentSave}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render correctly when district cohortType enrolled', () => {
      wrapper = shallow(
        <RSkillsCCSetting
          effectiveCohortObject={mockDistrictCohortObject}
          immDefaultProgramSettings={mockImmDefaultProgramSettings}
          immProgramSettings={mockImmProgramSettings}
          programMeta={PROGRAM_LIST.RTNG}
          enrollmentCount={mockEnrollmentCountOne}
          testAssignmentStages={mockTestAssignmentStagesArray}
          handleRSkillsCCSettingsSave={mockHandleSettingsSave}
          handleRSkillsCCGetDefaultSettings={mockHandleGetDefaultSettings}
          handleRSkillsCCTestAssignmentSave={mockTestAssignmentSave}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      const settingsMsg = wrapper.find('SettingsMessage');
      expect(settingsMsg).toHaveLength(1);
      expect(wrapper.find('SettingsMessage').props('message1')).toEqual({
        message1:
          'Please select a teacher, class, group, or student from the SmartBar on the left.',
      });
    });
    it('should render correctly when no selected cohortTypeCohortId empty enrollment', () => {
      wrapper = shallow(
        <RSkillsCCSetting
          effectiveCohortObject={mockTeacherCohortObject}
          immDefaultProgramSettings={mockImmDefaultProgramSettings}
          immProgramSettings={mockImmProgramSettings}
          programMeta={PROGRAM_LIST.RTNG}
          enrollmentCount={mockEnrollmentCountZero}
          testAssignmentStages={mockTestAssignmentStagesArray}
          handleRSkillsCCSettingsSave={mockHandleSettingsSave}
          handleRSkillsCCGetDefaultSettings={mockHandleGetDefaultSettings}
          handleRSkillsCCTestAssignmentSave={mockTestAssignmentSave}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('tab navigation for empty enrollment', () => {
    beforeEach(() => {
      wrapper = shallow(
        <RSkillsCCSetting
          effectiveCohortObject={mockStudentCohortObject}
          immDefaultProgramSettings={mockImmDefaultProgramSettings}
          immProgramSettings={mockImmProgramSettings}
          programMeta={PROGRAM_LIST.RTNG}
          enrollmentCount={mockEnrollmentCountZero}
          testAssignmentStages={mockTestAssignmentStagesArray}
          handleRSkillsCCSettingsSave={mockHandleSettingsSave}
          handleRSkillsCCGetDefaultSettings={mockHandleGetDefaultSettings}
          handleRSkillsCCTestAssignmentSave={mockTestAssignmentSave}
        />
      );
      wrapper.setState({ isolateTab: true });
    });

    it('should handle tab reset', () => {
      expect(wrapper.instance().state.isolateTab).toBeTruthy();
      wrapper.instance().handleTabsReset();
      expect(wrapper.instance().state.isolateTab).toBeFalsy();
    });

    it('should handle tab isolate', () => {
      wrapper.instance().handleTabsReset();
      expect(wrapper.instance().state.isolateTab).toBeFalsy();
      wrapper.instance().handleTabIsolate();
      expect(wrapper.instance().state.isolateTab).toBeTruthy();
    });

    it('should handle tab click', () => {
      // tab-test-assignment is the default tab.
      expect(wrapper.instance().state.activeTab).toEqual('tab-test-assignment');
      let mockEvent = { currentTarget: { id: 'tab-settings' } };
      wrapper.instance().handleTabClick(mockEvent);
      expect(wrapper.instance().state.activeTab).toEqual('tab-settings');
      mockEvent = { currentTarget: { id: 'tab-test-assignment' } };
      wrapper.instance().handleTabClick(mockEvent);
      expect(wrapper.instance().state.activeTab).toEqual('tab-test-assignment');
    });
  });

  describe('tab navigation for full enrollment', () => {
    beforeEach(() => {
      wrapper = shallow(
        <RSkillsCCSetting
          effectiveCohortObject={mockStudentCohortObject}
          immDefaultProgramSettings={mockImmDefaultProgramSettings}
          immProgramSettings={mockImmProgramSettings}
          programMeta={PROGRAM_LIST.RTNG}
          enrollmentCount={mockEnrollmentCountOne}
          testAssignmentStages={mockTestAssignmentStagesArray}
          handleRSkillsCCSettingsSave={mockHandleSettingsSave}
          handleRSkillsCCGetDefaultSettings={mockHandleGetDefaultSettings}
          handleRSkillsCCTestAssignmentSave={mockTestAssignmentSave}
        />
      );
      wrapper.setState({ isolateTab: true });
    });

    it('should handle tab click', () => {
      // tab-test-assignment is the default tab.
      expect(wrapper.instance().state.activeTab).toEqual('tab-test-assignment');
      let mockEvent = { currentTarget: { id: 'tab-settings' } };
      wrapper.instance().handleTabClick(mockEvent);
      expect(wrapper.instance().state.activeTab).toEqual('tab-settings');
      mockEvent = { currentTarget: { id: 'tab-test-assignment' } };
      wrapper.instance().handleTabClick(mockEvent);
      expect(wrapper.instance().state.activeTab).toEqual('tab-test-assignment');
    });
  });
});
