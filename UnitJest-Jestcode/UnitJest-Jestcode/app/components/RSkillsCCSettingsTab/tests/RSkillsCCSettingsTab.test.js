import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import RSkillsCCSettingsTab from '../index';

describe('<RSkillsCCSettingsTab />', () => {
  let wrapper = null;
  const mockStudentCohortObject = { cohortType: 'Student', id: 'guidStudent54321' };
  const mockTabReset = jest.fn();
  const mockIsolateTab = jest.fn();
  const mockHandleSave = jest.fn();
  const mockHandleGetDefaultSettings = jest.fn();
  const fakeTrueCheckboxEvent = {
    target: {
      checked: true,
      type: 'checkbox',
    },
  };
  const fakeFalseCheckboxEvent = {
    target: {
      checked: false,
      type: 'checkbox',
    },
  };
  const mockDefaultProgramSettingsEmpty = fromJS({});
  const mockDefaultProgramSettings = fromJS({
    ell_audio_instructions: ['1'],
    audio_instructions: ['1'],
    show_correct_incorrect: ['1'],
    include_open_response: ['1'],
    include_writing_prompts: ['1'],
    writing_prompt_grading: [{ active: ['true'], grading_rubric: ['0'] }],
  });
  const mockProgramSettings = fromJS({
    ell_audio_instructions: ['1'],
    audio_instructions: ['1'],
    show_correct_incorrect: ['1'],
    include_open_response: ['1'],
    include_writing_prompts: ['1'],
    writing_prompt_grading: [{ active: ['true'], grading_rubric: ['0'] }],
  });
  const mockNewProgramSettings = fromJS({
    ell_audio_instructions: ['1'],
    audio_instructions: ['1'],
    show_correct_incorrect: ['0'],
    include_open_response: ['0'],
    include_writing_prompts: ['0'],
    writing_prompt_grading: [{ active: ['true'], grading_rubric: ['0'] }],
  });
  beforeEach(() => {
    wrapper = shallow(
      <RSkillsCCSettingsTab
        effectiveCohortObject={mockStudentCohortObject}
        handleIsolateTab={mockIsolateTab}
        handleRSkillsCCGetDefaultSettings={mockHandleGetDefaultSettings}
        handleSave={mockHandleSave}
        handleTabReset={mockTabReset}
        isTabIsolated={false}
        immProgramSettings={mockProgramSettings}
        immDefaultProgramSettings={mockDefaultProgramSettingsEmpty}
      />
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should handle the restore default', () => {
    wrapper.instance().handleRestoreDefaultClick();
    expect(mockHandleGetDefaultSettings).toHaveBeenCalled();
  });

  it('should handle the submit', () => {
    const e = {
      preventDefault: () => {},
    };
    wrapper.instance().handleSubmit(e);
    expect(mockHandleSave).toHaveBeenCalled();
    expect(mockTabReset).toHaveBeenCalled();
  });

  it('should handle the saveAndReturn', () => {
    wrapper.instance().handleSaveAndReturn();
    expect(mockHandleSave).toHaveBeenCalled();
  });

  it('should handle new programsettings that are same as initial.', () => {
    expect(wrapper.state('tabHasNoUnsavedChanges')).toBeTruthy();
    wrapper.setState({ tabHasNoUnsavedChanges: false });
    expect(wrapper.state('tabHasNoUnsavedChanges')).toBeFalsy();
    wrapper.setProps({ immProgramSettings: mockProgramSettings });
    expect(wrapper.state('tabHasNoUnsavedChanges')).toBeFalsy();
  });

  it('should handle the changed settings props.', () => {
    expect(wrapper.state('tabHasNoUnsavedChanges')).toBeTruthy();
    wrapper.setState({ tabHasNoUnsavedChanges: false });
    expect(wrapper.state('tabHasNoUnsavedChanges')).toBeFalsy();
    wrapper.setProps({ immProgramSettings: mockNewProgramSettings });
    expect(wrapper.state('tabHasNoUnsavedChanges')).toBeTruthy();
  });

  it('should handle the changed default settings props.', () => {
    expect(wrapper.state('tabHasNoUnsavedChanges')).toBeTruthy();
    wrapper.setState({ tabHasNoUnsavedChanges: false });
    expect(wrapper.state('tabHasNoUnsavedChanges')).toBeFalsy();
    expect(mockIsolateTab).not.toHaveBeenCalled();
    wrapper.setProps({ immDefaultProgramSettings: mockDefaultProgramSettings });
    expect(mockIsolateTab).toHaveBeenCalled();
  });

  it('should handle the setInitialValues', () => {
    expect(mockTabReset).not.toHaveBeenCalled();
    wrapper.instance().handleSetInitialValues();
    expect(mockTabReset).toHaveBeenCalled();
  });

  it('should call isolateTab function when user checks a box', () => {
    expect(mockIsolateTab).not.toHaveBeenCalled();
    const correctAndIncorrectAnswerCheckbox = wrapper.find(
      'SettingsFourStateCheckbox[checkboxText="Show correct and incorrect answers"]'
    );
    correctAndIncorrectAnswerCheckbox.prop('handleChangeCheckboxValue')(fakeTrueCheckboxEvent);
    expect(mockIsolateTab).toHaveBeenCalled();
  });

  it('should call isolateTab function when user unchecks a box', () => {
    expect(mockIsolateTab).not.toHaveBeenCalled();
    const correctAndIncorrectAnswerCheckbox = wrapper.find(
      'SettingsFourStateCheckbox[checkboxText="Show correct and incorrect answers"]'
    );
    correctAndIncorrectAnswerCheckbox.prop('handleChangeCheckboxValue')(fakeTrueCheckboxEvent);
    correctAndIncorrectAnswerCheckbox.prop('handleChangeCheckboxValue')(fakeFalseCheckboxEvent);
    expect(mockIsolateTab).toHaveBeenCalled();
  });

  it('should call isolateTab function when user updates writing rubric ', () => {
    expect(mockIsolateTab).not.toHaveBeenCalled();
    const rubricSix = wrapper.find('#rubric_six_id');
    rubricSix.simulate('change', {
      target: { value: 'true', name: 'writing_rubric' },
    });
    expect(mockIsolateTab).toHaveBeenCalled();
  });

  describe('when isLoading is true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <RSkillsCCSettingsTab
          effectiveCohortObject={mockStudentCohortObject}
          handleIsolateTab={mockIsolateTab}
          handleRSkillsCCGetDefaultSettings={mockHandleGetDefaultSettings}
          handleSave={mockHandleSave}
          handleTabReset={mockTabReset}
          isTabIsolated={false}
          immProgramSettings={mockProgramSettings}
          immDefaultProgramSettings={mockDefaultProgramSettingsEmpty}
          isLoading
        />
      );
    });

    it('should render a LoadingBar', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find('LoadingBar')).toHaveLength(1);
      wrapper.setProps({ isLoading: false });
      expect(wrapper.find('LoadingBar').exists()).toBeFalsy();
    });
  });
});
