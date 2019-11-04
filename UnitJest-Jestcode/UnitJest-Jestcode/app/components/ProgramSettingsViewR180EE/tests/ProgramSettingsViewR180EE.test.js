import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { OK_CANCEL_MODAL } from 'containers/ModalController/constants';

import { DEFAULT_SETTINGS } from '../constants';
import ProgramSettingsViewR180EE from '../index';

describe('<ProgramSettingsViewR180EE />', () => {
  let wrapper = null;
  let wrapperInstance = null;

  let mockHandleSave = null;
  let mockSetIsolateTab = null;
  let mockSettings = null;
  let mockShowModal = null;
  let mockEvent = null;

  const fakeTrueEvent = {
    target: {
      id: 'computer_placement',
      checked: true,
    },
  };

  const fakeFalseEvent = {
    target: {
      id: 'computer_placement',
      checked: false,
    },
  };

  beforeEach(() => {
    mockHandleSave = jest.fn();
    mockSetIsolateTab = jest.fn();
    mockSettings = fromJS({
      computer_placement: ['1'],
      auto_level: ['0'],
      captioning: ['0'],
      alt_color_scheme: ['0'],
      button_rollover: ['0'],
      pronunciation_tip: ['0'],
      second_language_id: ['3'],
      student_level: ['4'],
      reading_speed: ['3'],
    });
    mockShowModal = jest.fn();

    mockEvent = { preventDefault: jest.fn() };

    wrapper = shallow(
      <ProgramSettingsViewR180EE
        isTabIsolated={false}
        handleSave={mockHandleSave}
        setIsolateTab={mockSetIsolateTab}
        settings={mockSettings}
        showModal={mockShowModal}
      />
    );

    wrapperInstance = wrapper.instance();
  });

  it('expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('handleCheckbox', () => {
    it('handles true click', () => {
      wrapperInstance.handleCheckbox(fakeTrueEvent);

      const wrapperSettingsState = wrapper.state('settingsObj');
      expect(wrapperSettingsState.computer_placement[0]).toEqual('1');
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });

    it('handles false click', () => {
      wrapperInstance.handleCheckbox(fakeFalseEvent);

      const wrapperSettingsState = wrapper.state('settingsObj');
      expect(wrapperSettingsState.computer_placement[0]).toEqual('0');
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });
  });

  describe('handleChangeEnglishLanguageLearnerOptions', () => {
    it('sets pronunciation_tip to 0', () => {
      wrapperInstance.handleChangeEnglishLanguageLearnerOptions({ target: { value: '4' } });

      const wrapperSettingsState = wrapper.state('settingsObj');
      expect(wrapperSettingsState.second_language_id[0]).toEqual('4');
      expect(wrapperSettingsState.pronunciation_tip[0]).toEqual('0');
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });

    it('sets pronunciation_tip to 1', () => {
      wrapperInstance.handleChangeEnglishLanguageLearnerOptions({ target: { value: '1' } });

      const wrapperSettingsState = wrapper.state('settingsObj');
      expect(wrapperSettingsState.second_language_id[0]).toEqual('1');
      expect(wrapperSettingsState.pronunciation_tip[0]).toEqual('1');
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });
  });

  it('handleReadingSpeedChange', () => {
    wrapperInstance.handleReadingSpeedChange({ target: { value: '2' } });

    const wrapperSettingsState = wrapper.state('settingsObj');
    expect(wrapperSettingsState.reading_speed[0]).toEqual('2');
    expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
  });

  describe('handleStudentLevelChange', () => {
    it('student_level is set to -1', () => {
      wrapperInstance.handleStudentLevelChange({ target: { value: '-1' } });

      const wrapperSettingsState = wrapper.state('settingsObj');
      expect(mockShowModal).not.toHaveBeenCalled();
      expect(wrapperSettingsState.student_level[0]).toEqual('-1');
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });

    it('student_level is set to 4', () => {
      const previousStudentLevel = mockSettings.getIn(['student_level', 0]);
      wrapperInstance.handleStudentLevelChange({ target: { value: '4' } });

      const wrapperSettingsState = wrapper.state('settingsObj');
      expect(mockShowModal).toHaveBeenCalledWith(OK_CANCEL_MODAL, {
        heading: 'Set Student Level',
        message: wrapperInstance.renderOkCancelModalMessage('4'),
        modalClassName: 'r180ee-settings__student-level-modal',
        headerClassName: 'r180ee-settings__student-level-modal-header',
        onCancel: wrapperInstance.handleModalCancel,
        onCancelParam: previousStudentLevel,
      });

      expect(wrapperSettingsState.student_level[0]).toEqual('4');
      expect(wrapperSettingsState.computer_placement[0]).toEqual('0');
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });
  });

  it('handleModalCancel', () => {
    wrapperInstance.handleModalCancel('-1');

    const wrapperSettingsState = wrapper.state('settingsObj');
    expect(wrapperSettingsState.student_level[0]).toEqual('-1');
    expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
  });

  it('handleRestoreDefault', () => {
    const expectedDefaultSettings = DEFAULT_SETTINGS.toJS();
    expectedDefaultSettings.computer_placement = mockSettings.toJS().computer_placement;
    expectedDefaultSettings.auto_level = mockSettings.toJS().auto_level;
    expectedDefaultSettings.student_level = mockSettings.toJS().student_level;

    wrapperInstance.handleRestoreDefault();

    const wrapperSettingsState = wrapper.state('settingsObj');
    expect(wrapperSettingsState).toEqual(expectedDefaultSettings);
    expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
  });

  it('handleSave', () => {
    const wrapperSettingsState = wrapper.state('settingsObj');

    wrapperInstance.handleSave();

    expect(mockHandleSave).toHaveBeenCalledWith(wrapperSettingsState);
    expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
  });

  it('handleSetInitialValues', () => {
    wrapperInstance.handleSetInitialValues();

    const wrapperSettingsState = wrapper.state('settingsObj');
    expect(wrapperSettingsState).toEqual(mockSettings.toJS());
    expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
  });

  it('handleSubmit', () => {
    const wrapperSettingsState = wrapper.state('settingsObj');

    wrapperInstance.handleSubmit(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockHandleSave).toHaveBeenCalledWith(wrapperSettingsState);
    expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
  });

  it('student_level is -1, should render -- option in drop down', () => {
    mockSettings = fromJS({
      computer_placement: ['1'],
      auto_level: ['0'],
      captioning: ['0'],
      alt_color_scheme: ['0'],
      button_rollover: ['0'],
      pronunciation_tip: ['0'],
      second_language_id: ['3'],
      student_level: ['-1'],
      reading_speed: ['3'],
    });

    wrapper.setProps({ settings: mockSettings });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
