import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import * as Constants from 'components/ProgramSettingsViewPS/constants';
import ProgramSettingsViewPS from '../index';

describe('<ProgramSettingsViewPS />', () => {
  let wrapper = null;
  let mockHandleSave = null;
  let mockSetIsolateTab = null;
  let mockSettings = null;
  let mockIsTabIsolated = null;

  describe('expect to render ProgramSettingsViewPS', () => {
    beforeEach(() => {
      mockHandleSave = jest.fn();
      mockSetIsolateTab = jest.fn();
      mockIsTabIsolated = false;
      mockSettings = fromJS({
        audio_instructions: ['1'],
        student_access_to_score: ['1'],
        include_sample_questions: ['1'],
        ell_audio_instructions: ['0'],
      });

      wrapper = shallow(
        <ProgramSettingsViewPS
          handleSave={mockHandleSave}
          setIsolateTab={mockSetIsolateTab}
          settings={mockSettings}
          isTabIsolated={mockIsTabIsolated}
        />
      );
    });
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    describe('handleCheckbox', () => {
      it('handles checked is false click', () => {
        const e = {
          preventDefault: jest.fn(),
          target: { id: 'audio_instructions', checked: false },
        };
        wrapper.instance().handleCheckbox(e);

        const wrapperSettingsState = wrapper.state('settingsObj');
        expect(wrapperSettingsState.audio_instructions[0]).toEqual('0');
        expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
      });

      it('handles checked is true click', () => {
        const e = {
          preventDefault: jest.fn(),
          target: { id: 'audio_instructions', checked: true },
        };
        wrapper.instance().handleCheckbox(e);

        const wrapperSettingsState = wrapper.state('settingsObj');
        expect(wrapperSettingsState.audio_instructions[0]).toEqual('1');
        expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
      });
    });
    it('handles ell_audio_instructions is none click', () => {
      const e = {
        preventDefault: jest.fn(),
        target: { id: 'ell_audio_instructions', value: '0' },
      };
      wrapper.instance().handleEnglishLanguageLearnerOption(e);

      const wrapperSettingsState = wrapper.state('settingsObj');
      expect(wrapperSettingsState.ell_audio_instructions[0]).toEqual('0');
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });
    it('handles ell_audio_instructions is none click', () => {
      const e = {
        preventDefault: jest.fn(),
        target: { id: 'ell_audio_instructions', value: '1' },
      };
      wrapper.instance().handleEnglishLanguageLearnerOption(e);

      const wrapperSettingsState = wrapper.state('settingsObj');
      expect(wrapperSettingsState.ell_audio_instructions[0]).toEqual('1');
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });
    it('handleSave', () => {
      wrapper.setProps({ mockHandleSave: jest.fn() });
      wrapper.instance().handleSave();

      expect(mockHandleSave).toHaveBeenCalled();
      expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
    });

    it('handleSetInitialValues', () => {
      wrapper.instance().handleSetInitialValues();

      const mockState = wrapper.state('settingsObj');
      expect(mockState).toEqual(mockSettings.toJS());
      expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
    });

    it('handleSubmit', () => {
      const mockEvent = {
        preventDefault: jest.fn(),
      };
      const mockState = {
        audio_instructions: ['1'],
        student_access_to_score: ['1'],
        include_sample_questions: ['1'],
        ell_audio_instructions: ['0'],
      };
      wrapper.instance().handleSubmit(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockHandleSave).toHaveBeenCalledWith(mockState);
      expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
    });
    it('handleRestoreDefault', () => {
      const defaultSettingsObj = Constants.DEFAULT_SETTINGS;

      wrapper.instance().handleRestoreDefault();
      wrapper.setState({
        settingsObj: defaultSettingsObj,
        saveOptions: false,
      });
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });
  });
});
