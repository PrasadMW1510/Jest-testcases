import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { COHORT_TYPE } from 'containers/App/constants';
import { S44_DEFAULT_SETTINGS } from 'containers/S44SettingContainer/constants';

import ProgramSettingsViewS44 from '../index';

describe('<ProgramSettingsViewS44 />', () => {
  let wrapper = null;
  let wrapperInstance = null;

  let mockHandleSave = null;
  let mockSetIsolateTab = null;
  let mockSettings = null;
  const fakeTrueEvent = {
    target: {
      checked: true,
    },
  };

  const fakeFalseEvent = {
    target: {
      checked: false,
    },
  };

  beforeEach(() => {
    mockHandleSave = jest.fn();
    mockSetIsolateTab = jest.fn();
  });

  const testSpanishSupport = () => {
    let spanishSupportCheckbox = null;

    beforeEach(() => {
      spanishSupportCheckbox = wrapper.find('S44CheckboxSection[checkboxText="Spanish Support"]');
    });

    it('handles true click', () => {
      spanishSupportCheckbox.prop('handleChangeCheckboxValue')(fakeTrueEvent);

      const wrapperSettingsState = wrapper.state('settingsObj');
      expect(wrapperSettingsState.spanish_support[0]).toEqual('1');
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });

    it('handles false click', () => {
      spanishSupportCheckbox.prop('handleChangeCheckboxValue')(fakeTrueEvent);
      spanishSupportCheckbox.prop('handleChangeCheckboxValue')(fakeFalseEvent);

      const wrapperSettingsState = wrapper.state('settingsObj');
      expect(wrapperSettingsState.spanish_support[0]).toEqual('0');
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });
  };

  const testCaptioning = () => {
    let captioningCheckbox = null;

    beforeEach(() => {
      captioningCheckbox = wrapper.find(
        'S44CheckboxSection[checkboxText="Enable video captioning"]'
      );
    });

    it('handles true click', () => {
      captioningCheckbox.prop('handleChangeCheckboxValue')(fakeTrueEvent);

      const wrapperSettingsState = wrapper.state('settingsObj');
      expect(wrapperSettingsState.captioning[0]).toEqual('1');
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });

    it('handles false click', () => {
      captioningCheckbox.prop('handleChangeCheckboxValue')(fakeTrueEvent);
      captioningCheckbox.prop('handleChangeCheckboxValue')(fakeFalseEvent);

      const wrapperSettingsState = wrapper.state('settingsObj');
      expect(wrapperSettingsState.captioning[0]).toEqual('0');
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });
  };

  describe('cohort type is not student', () => {
    beforeEach(() => {
      mockSettings = fromJS({
        spanish_support: ['0'],
        captioning: ['0'],
      });

      wrapper = shallow(
        <ProgramSettingsViewS44
          cohortType={COHORT_TYPE.Teacher}
          handleSave={mockHandleSave}
          isTabIsolated={false}
          setIsolateTab={mockSetIsolateTab}
          settings={mockSettings}
        />
      );

      wrapperInstance = wrapper.instance();
    });

    it('Should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    describe('Spanish Support Checkbox', () => {
      testSpanishSupport();
    });

    describe('Captioning checkbox', () => {
      testCaptioning();
    });

    it('handleRestoreDefault', () => {
      const expectedSettings = S44_DEFAULT_SETTINGS.generic.toJS();

      wrapperInstance.handleRestoreDefault();
      expect(wrapper.state('settingsObj')).toEqual(expectedSettings);
    });

    it('handleSave', () => {
      wrapperInstance.handleSave();
      expect(mockHandleSave).toHaveBeenCalledWith(wrapper.state('settingsObj'));
      expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
    });

    it('handleSetInitialValues', () => {
      wrapperInstance.handleSetInitialValues();
      expect(wrapper.state('settingsObj')).toEqual(mockSettings.toJS());
      expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
    });

    it('handleSubmit', () => {
      const preventDefault = jest.fn();
      wrapperInstance.handleSubmit({ preventDefault });
      expect(preventDefault).toHaveBeenCalled();
      expect(mockHandleSave).toHaveBeenCalledWith(wrapper.state('settingsObj'));
      expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
    });
  });

  describe('cohort type is student', () => {
    describe('student hasnt started working', () => {
      beforeEach(() => {
        mockSettings = fromJS({
          has_started_working: ['false'],
          auto_placement: ['1'],
          initial_placement: ['0'],
          enable_fasttrack: ['0'],
          spanish_support: ['0'],
          captioning: ['0'],
        });

        wrapper = shallow(
          <ProgramSettingsViewS44
            cohortType={COHORT_TYPE.Student}
            handleSave={mockHandleSave}
            isTabIsolated={false}
            setIsolateTab={mockSetIsolateTab}
            settings={mockSettings}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Should render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      describe('Spanish Support Checkbox', () => {
        testSpanishSupport();
      });

      describe('Captioning checkbox', () => {
        testCaptioning();
      });

      it('handleRestoreDefault', () => {
        const expectedSettings = S44_DEFAULT_SETTINGS.student.toJS();
        expectedSettings.has_started_working = ['false'];

        wrapperInstance.handleRestoreDefault();
        expect(wrapper.state('settingsObj')).toEqual(expectedSettings);
      });

      it('handleSave', () => {
        wrapperInstance.handleSave();
        expect(mockHandleSave).toHaveBeenCalledWith(wrapper.state('settingsObj'));
        expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
      });

      it('handleSetInitialValues', () => {
        wrapperInstance.handleSetInitialValues();
        expect(wrapper.state('settingsObj')).toEqual(mockSettings.toJS());
        expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
      });

      it('handleSubmit', () => {
        const preventDefault = jest.fn();
        wrapperInstance.handleSubmit({ preventDefault });
        expect(preventDefault).toHaveBeenCalled();
        expect(mockHandleSave).toHaveBeenCalledWith(wrapper.state('settingsObj'));
        expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
      });
    });

    describe('student has started working', () => {
      beforeEach(() => {
        mockSettings = fromJS({
          has_started_working: ['true'],
          auto_placement: ['1'],
          initial_placement: ['0'],
          enable_fasttrack: ['0'],
          spanish_support: ['0'],
          captioning: ['0'],
        });

        wrapper = shallow(
          <ProgramSettingsViewS44
            cohortType={COHORT_TYPE.Student}
            handleSave={mockHandleSave}
            isTabIsolated={false}
            setIsolateTab={mockSetIsolateTab}
            settings={mockSettings}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Should render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      describe('Spanish Support Checkbox', () => {
        testSpanishSupport();
      });

      describe('Captioning checkbox', () => {
        testCaptioning();
      });

      it('handleRestoreDefault', () => {
        const expectedSettings = S44_DEFAULT_SETTINGS.student.toJS();
        expectedSettings.has_started_working = ['true'];

        wrapperInstance.handleRestoreDefault();
        expect(wrapper.state('settingsObj')).toEqual(expectedSettings);
      });

      it('handleSave', () => {
        wrapperInstance.handleSave();
        expect(mockHandleSave).toHaveBeenCalledWith(wrapper.state('settingsObj'));
        expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
      });

      it('handleSetInitialValues', () => {
        wrapperInstance.handleSetInitialValues();
        expect(wrapper.state('settingsObj')).toEqual(mockSettings.toJS());
        expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
      });

      it('handleSubmit', () => {
        const preventDefault = jest.fn();
        wrapperInstance.handleSubmit({ preventDefault });
        expect(preventDefault).toHaveBeenCalled();
        expect(mockHandleSave).toHaveBeenCalledWith(wrapper.state('settingsObj'));
        expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
      });
    });
  });
});
