import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { IREAD_SCREENER_MODAL } from 'containers/ModalController/constants';

import { IREAD_DEFAULT_SETTINGS } from '../constants';
import ProgramSettingViewIRead from '../ProgramSettingsViewIRead';

describe('<ProgramSettingViewIRead />', () => {
  let wrapper = null;
  let wrapperInstance = null;

  let mockHandleSave = null;
  let mockShowModal = null;
  let mockProgramSettingData = null;
  let mockSetIsolateTab = null;

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

  const fakeNoneValue = {
    target: {
      value: 'None',
    },
  };

  const fakeSpanishValue = {
    target: {
      value: 'Spanish',
    },
  };

  let fakeEvent = null;

  beforeEach(() => {
    fakeEvent = {
      preventDefault: jest.fn(),
    };

    mockHandleSave = jest.fn();
    mockShowModal = jest.fn();
    mockSetIsolateTab = jest.fn();

    mockProgramSettingData = fromJS({
      new_administration_flag: ['0'],
      allow_recordings_flag: ['0'],
      second_language_id: ['0'],
    });

    wrapper = shallow(
      <ProgramSettingViewIRead
        handleSave={mockHandleSave}
        isTabIsolated={false}
        programSettingData={mockProgramSettingData}
        showModal={mockShowModal}
        setIsolateTab={mockSetIsolateTab}
      />
    );

    wrapperInstance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('handleChangeAdminScreenOnNextLoginCheckbox', () => {
    it('target is checked', () => {
      wrapperInstance.handleChangeAdminScreenOnNextLoginCheckbox(fakeTrueEvent);

      const currentData = wrapper.state('currentData');
      expect(currentData.new_administration_flag[0]).toEqual('1');
      expect(mockSetIsolateTab).toBeCalledWith(true);
      expect(mockShowModal).toBeCalledWith(IREAD_SCREENER_MODAL, {
        setNewAdministrationFlag: wrapperInstance.setNewAdministrationFlag,
      });
    });

    it('target is unchecked', () => {
      wrapperInstance.handleChangeAdminScreenOnNextLoginCheckbox(fakeFalseEvent);

      const currentData = wrapper.state('currentData');
      expect(currentData.new_administration_flag[0]).toEqual('0');
      expect(mockSetIsolateTab).toBeCalledWith(true);
      expect(mockShowModal).not.toBeCalledWith(IREAD_SCREENER_MODAL, {
        setNewAdministrationFlag: wrapperInstance.setNewAdministrationFlag,
      });
    });
  });

  describe('handleChangeEnableStudentRecordingsCheckbox', () => {
    it('target is checked', () => {
      wrapperInstance.handleChangeEnableStudentRecordingsCheckbox(fakeTrueEvent);

      const currentData = wrapper.state('currentData');
      expect(currentData.allow_recordings_flag[0]).toEqual('1');
      expect(mockSetIsolateTab).toBeCalledWith(true);
    });

    it('target is unchecked', () => {
      wrapperInstance.handleChangeEnableStudentRecordingsCheckbox(fakeFalseEvent);

      const currentData = wrapper.state('currentData');
      expect(currentData.allow_recordings_flag[0]).toEqual('0');
      expect(mockSetIsolateTab).toBeCalledWith(true);
    });
  });

  describe('handleChangeEnglishLanguageLearnerOptions', () => {
    it('target value is None', () => {
      wrapperInstance.handleChangeEnglishLanguageLearnerOptions(fakeNoneValue);

      const currentData = wrapper.state('currentData');
      expect(currentData.second_language_id[0]).toEqual(fakeNoneValue.target.value);
      expect(mockSetIsolateTab).toBeCalledWith(true);
    });

    it('target value is Spanish', () => {
      wrapperInstance.handleChangeEnglishLanguageLearnerOptions(fakeSpanishValue);

      const currentData = wrapper.state('currentData');
      expect(currentData.second_language_id[0]).toEqual(fakeSpanishValue.target.value);
      expect(mockSetIsolateTab).toBeCalledWith(true);
    });
  });

  it('handleSetInitialValues', () => {
    wrapperInstance.handleSetInitialValues();

    const currentData = wrapper.state('currentData');
    expect(currentData).toEqual(mockProgramSettingData.toJS());
    expect(mockSetIsolateTab).toBeCalledWith(false);
  });

  it('handleRestoreDefault', () => {
    wrapperInstance.handleRestoreDefault();

    const currentData = wrapper.state('currentData');
    expect(currentData).toEqual(IREAD_DEFAULT_SETTINGS.toJS());
    expect(mockSetIsolateTab).toBeCalledWith(true);
  });

  it('handleSaveAndReturn', () => {
    wrapperInstance.handleSaveAndReturn();

    const currentData = wrapper.state('currentData');
    expect(mockHandleSave).toHaveBeenCalledWith(currentData);
    expect(mockSetIsolateTab).toBeCalledWith(false);
  });

  it('handleSubmit', () => {
    wrapperInstance.handleSubmit(fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();

    const currentData = wrapper.state('currentData');
    expect(mockHandleSave).toHaveBeenCalledWith(currentData);
    expect(mockSetIsolateTab).toBeCalledWith(false);
  });
});
