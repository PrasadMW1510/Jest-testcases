import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import { COHORT_TYPE } from 'containers/App/constants';

import XSkillsSettingsTab from '../index';

describe('<XSkillsSettingsTab />', () => {
  let wrapper = null;
  let wrapperInstance = null;
  const mockHandleSave = jest.fn();
  const mockSetIsolateTab = jest.fn();
  const tabNotIsolated = false;
  const mockProgramSettings = fromJS({
    audio_instructions: ['1'],
    show_correct_incorrect: ['1'],
    include_open_response: ['1'],
    include_writing_prompts: ['1'],
    ell_audio_instructions: ['0'],
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    wrapper = shallow(
      <XSkillsSettingsTab
        cohortType={COHORT_TYPE.District}
        handleSave={mockHandleSave}
        immProgramSettings={mockProgramSettings}
        isTabIsolated={tabNotIsolated}
        setIsolateTab={mockSetIsolateTab}
      />
    );
    wrapperInstance = wrapper.instance();
  });
  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should handleChange for audio instruction radioButtons', () => {
    const ellAudioInst = 'ell_audio_instructions';
    expect(wrapperInstance.state.settingsOnScreen[ellAudioInst]).toEqual(['0']);
    expect(mockSetIsolateTab).not.toHaveBeenCalled();
    const spanishRadio = wrapper.find('#Spanish');
    spanishRadio.simulate('change', {
      target: { value: 1, name: ellAudioInst, checked: true },
    });
    expect(wrapperInstance.state.settingsOnScreen[ellAudioInst]).toEqual(['1']);
    expect(mockSetIsolateTab).toHaveBeenCalled();
  });

  it('should handleChange for checkBoxes', () => {
    const showCorrectIncorrect = 'show_correct_incorrect';
    expect(wrapperInstance.state.settingsOnScreen[showCorrectIncorrect]).toEqual(['1']);
    expect(mockSetIsolateTab).not.toHaveBeenCalled();
    // test for false condition
    wrapperInstance.handleChange({
      target: { name: showCorrectIncorrect, checked: false, type: 'checkbox' },
    });
    expect(wrapperInstance.state.settingsOnScreen[showCorrectIncorrect]).toEqual(['0']);
    expect(mockSetIsolateTab).toHaveBeenCalled();

    // test for true condition
    wrapperInstance.handleChange({
      target: { name: showCorrectIncorrect, checked: true, type: 'checkbox' },
    });
    expect(wrapperInstance.state.settingsOnScreen[showCorrectIncorrect]).toEqual(['1']);
    expect(mockSetIsolateTab).toHaveBeenCalled();
  });

  it('should handle the saveAndReturn', () => {
    wrapper.instance().handleSaveAndReturn();
    expect(mockHandleSave).toHaveBeenCalled();
  });

  it('should handleSetInitialValues', () => {
    expect(mockSetIsolateTab).not.toHaveBeenCalled();
    wrapperInstance.handleSetInitialValues();
    expect(mockSetIsolateTab).toHaveBeenCalled();
  });

  it('should handle the submit', () => {
    const e = {
      preventDefault: () => {},
    };
    wrapper.instance().handleSubmit(e);
    expect(mockHandleSave).toHaveBeenCalled();
    expect(mockSetIsolateTab).toHaveBeenCalled();
  });

  it('should handle the reinitializeEditorComplete', () => {
    wrapperInstance.handleSetInitialValues();
    expect(wrapperInstance.state.shouldReinitializeEditor).toEqual(true);
    wrapper.instance().reinitializeEditorComplete();
    expect(wrapperInstance.state.shouldReinitializeEditor).toEqual(false);
  });
});
