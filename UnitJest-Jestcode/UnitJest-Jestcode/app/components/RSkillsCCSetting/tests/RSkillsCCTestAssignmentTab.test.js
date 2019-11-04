import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import RSkillCCTestAssignmentTab from '../RSkillCCTestAssignmentTab';

describe('<RSkillCCTestAssignmentTab />', () => {
  let wrapper = null;
  const mockStudentCohortObject = { cohortType: 'Student', id: 'guidStudent54321' };
  const mockTeacherCohortObject = { cohortType: 'Teacher', id: 'guidTeacher54321' };
  const mockTabReset = jest.fn();
  const mockIsolateTab = jest.fn();
  const mockHandleSave = jest.fn();
  let stageDropDown = null;
  let rBookSelectDropDown = null;
  let workshopTest = null;
  let testLevelOpt = null;
  const mockTestAssignmentStages = [
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
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_A_1a.pdf',
              description: 'Skills from Workshop 1',
              name: 'Test 1',
              number: '1',
            },
            {
              atGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_A_2b.pdf',
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_A_2a.pdf',
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
              atGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_A_1b.pdf',
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_A_1a.pdf',
              description: 'Skills from Workshop 1',
              name: 'Test 1',
              number: '1',
            },
            {
              atGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_A_2b.pdf',
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_A_2a.pdf',
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
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_FlexI_1a.pdf',
              description: 'Skills from Workshop 1',
              name: 'Test 1',
              number: '1',
            },
            {
              atGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_FlexI_2b.pdf',
              belowGradePdf: '/rtng/extensions/sample_pdfs/rSkillsTests_F1_2a.pdf',
              description: 'Skills from Workshop 2',
              name: 'Test 2',
              number: '2',
            },
          ],
        },
      ],
    },
  ];
  beforeEach(() => {
    jest.spyOn(window, 'open');
    wrapper = shallow(
      <RSkillCCTestAssignmentTab
        effectiveCohortObject={mockStudentCohortObject}
        handleTabReset={mockTabReset}
        handleIsolateTab={mockIsolateTab}
        handleSave={mockHandleSave}
        isTabIsolated
        testAssignmentStages={mockTestAssignmentStages}
      />
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
    window.open.mockRestore();
  });

  describe('when isLoading is true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <RSkillCCTestAssignmentTab
          effectiveCohortObject={mockStudentCohortObject}
          handleTabReset={mockTabReset}
          handleIsolateTab={mockIsolateTab}
          handleSave={mockHandleSave}
          isTabIsolated
          isLoading
          testAssignmentStages={mockTestAssignmentStages}
        />
      );
    });

    it('should render a LoadingBar', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find('LoadingBar')).toHaveLength(1);
    });
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should have a determined first stage', () => {
    expect(wrapper.state('r180Stage')).toEqual(['A']);
  });

  it('should update state while user selects options', () => {
    expect(wrapper.state('rBook')).toEqual('');
    rBookSelectDropDown = wrapper.find('#id_rBook');
    expect(rBookSelectDropDown).not.toBeNull();
    rBookSelectDropDown.simulate('change', {
      target: { value: 'rbook' },
    });
    expect(wrapper.state('rBook')).toEqual(['rbook']);

    expect(wrapper.state('selectedRSkillsTest')).toEqual('');
    expect(wrapper.find('rskillscc-test-assign__test-input').exists()).toBeFalsy();
  });

  it('should update state when user selects a Stage.', () => {
    // A is initial stage in state due to pass in props
    expect(wrapper.state('r180Stage')).toEqual(['A']);
    stageDropDown = wrapper.find('#id_r180Stage');
    stageDropDown.simulate('change', {
      target: { value: 'B' },
    });
    expect(wrapper.state('r180Stage')).toEqual(['B']);
  });

  it('should update state while use selected workshop tests', () => {
    rBookSelectDropDown = wrapper.find('#id_rBook');
    rBookSelectDropDown.simulate('change', {
      target: { value: 'rbook' },
    });
    expect(wrapper.state('selectedRSkillsTest')).toEqual('');
    expect(wrapper.find('rskillscc-test-assign__test-input').exists()).toBeFalsy();
    workshopTest = wrapper.find('#rskillsTestRadio_1');
    expect(workshopTest).not.toBeNull();
    workshopTest.simulate('change', { target: { value: '1', name: 'rskillsTestRadio_1' } });
    expect(wrapper.state('selectedRSkillsTest')).toEqual(['1']);
  });

  it('should update state rSkills Test Level when user selects new level', () => {
    rBookSelectDropDown = wrapper.find('#id_rBook');
    rBookSelectDropDown.simulate('change', {
      target: { value: 'rbook' },
    });
    expect(wrapper.state('selectedRSkillsTest')).toEqual('');
    expect(wrapper.find('rskillscc-test-assign__test-input').exists()).toBeFalsy();
    workshopTest = wrapper.find('#rskillsTestRadio_1');
    expect(workshopTest).not.toBeNull();
    workshopTest.simulate('change', { target: { value: '1', name: 'rskillsTestRadio_1' } });
    expect(wrapper.state('selectedRSkillsTest')).toEqual(['1']);
    testLevelOpt = wrapper.find('#id_rSkillsTestLevel');
    expect(testLevelOpt).not.toBeNull();
    expect(wrapper.state('rSkillsTestLevel')).toEqual(['0']);
    testLevelOpt.simulate('change', { target: { value: '1' } });
    expect(wrapper.state('rSkillsTestLevel')).toEqual(['1']);
  });

  it('should handle the submit after user selects test assignment options.', () => {
    rBookSelectDropDown = wrapper.find('#id_rBook');
    rBookSelectDropDown.simulate('change', {
      target: { value: 'rbook' },
    });
    workshopTest = wrapper.find('#rskillsTestRadio_1');
    workshopTest.simulate('change', { target: { value: '1', name: 'rskillsTestRadio_1' } });
    const e = {
      preventDefault: () => {},
    };
    wrapper.instance().handleSubmit(e);
    expect(mockHandleSave).toHaveBeenCalled();
    expect(mockTabReset).toHaveBeenCalled();
  });

  it('should handleSaveAndReturn after user selects test assignment options.', () => {
    rBookSelectDropDown = wrapper.find('#id_rBook');
    rBookSelectDropDown.simulate('change', {
      target: { value: 'rbook' },
    });
    workshopTest = wrapper.find('#rskillsTestRadio_1');
    workshopTest.simulate('change', { target: { value: '1', name: 'rskillsTestRadio_1' } });
    const e = {
      preventDefault: () => {},
    };
    wrapper.instance().handleSaveAndReturn(e);
    expect(mockHandleSave).toHaveBeenCalled();
  });

  it('should handle the handleBelowGradeLevelPreviewButtonClick after user selects options.', () => {
    rBookSelectDropDown = wrapper.find('#id_rBook');
    rBookSelectDropDown.simulate('change', {
      target: { value: 'rbook' },
    });
    workshopTest = wrapper.find('#rskillsTestRadio_1');
    workshopTest.simulate('change', { target: { value: '1', name: 'rskillsTestRadio_1' } });
    wrapper.instance().handleBelowGradeLevelPreviewButtonClick();
    expect(window.open).toHaveBeenCalled();
  });

  it('should handle the handleGradeLevelPreviewButtonClick after user selects options.', () => {
    rBookSelectDropDown = wrapper.find('#id_rBook');
    rBookSelectDropDown.simulate('change', {
      target: { value: 'rbook' },
    });
    workshopTest = wrapper.find('#rskillsTestRadio_1');
    workshopTest.simulate('change', { target: { value: '1', name: 'rskillsTestRadio_1' } });
    wrapper.instance().handleGradeLevelPreviewButtonClick();
    expect(window.open).toHaveBeenCalled();
  });

  it('should handle new testAssignmentStages that are same as initial.', () => {
    expect(wrapper.state('tabHasNoUnsavedChanges')).toBeTruthy();
    wrapper.setState({ tabHasNoUnsavedChanges: false });
    expect(wrapper.state('tabHasNoUnsavedChanges')).toBeFalsy();
    wrapper.setProps({ testAssignmentStages: mockTestAssignmentStages });
    expect(wrapper.state('tabHasNoUnsavedChanges')).toBeFalsy();
  });

  it('should handle when new cohort is received.', () => {
    wrapper.setState({ tabHasNoUnsavedChanges: false, r180Stage: ['B'] });
    expect(wrapper.state('tabHasNoUnsavedChanges')).toBeFalsy();
    expect(wrapper.state('r180Stage')).toEqual(['B']);
    wrapper.setProps({ effectiveCohortObject: mockTeacherCohortObject });
    expect(wrapper.state('tabHasNoUnsavedChanges')).toBeTruthy();
    expect(wrapper.state('r180Stage')).toEqual(['A']);
  });

  it('should handle the setInitialValues', () => {
    expect(mockTabReset).not.toHaveBeenCalled();
    wrapper.instance().handleSetInitialValues();
    expect(mockTabReset).toHaveBeenCalled();
  });
});
