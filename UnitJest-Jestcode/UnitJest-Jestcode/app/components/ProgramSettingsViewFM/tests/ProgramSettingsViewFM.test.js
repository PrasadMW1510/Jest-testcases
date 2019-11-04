import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { ACCESSIBILITY, LANGUAGE, LESSONS_PER_DAY, OPERATION, ORIENTATION } from '../constants';
import ProgramSettingsViewFM from '../index';

describe('<ProgramSettingsViewFM />', () => {
  let wrapper = null;
  let wrapperInstance = null;

  let mockHandleSave = null;
  let mockSetIsolateTab = null;
  let mockSettings = null;

  let mockEvent = null;

  beforeEach(() => {
    mockHandleSave = jest.fn();
    mockSetIsolateTab = jest.fn();

    mockSettings = fromJS({
      Defaults: [
        {
          Operation: [''],
          Problems: ['70'],
          Orientation: ['Horizontal'],
          Response: ['1.25'],
          Language: ['English'],
          Contrast: ['Standard'],
          Lessons: ['1'],
          Reset: ['false'],
        },
      ],
      Settings: [
        {
          Operation: ['Subtraction9'],
          Problems: ['70'],
          Orientation: ['Vertical'],
          Response: ['1.25'],
          Language: ['Spanish'],
          Contrast: ['Dark'],
          Lessons: ['2'],
          Reset: ['false'],
        },
      ],
    });

    wrapper = shallow(
      <ProgramSettingsViewFM
        handleSave={mockHandleSave}
        isTabIsolated={false}
        setIsolateTab={mockSetIsolateTab}
        settings={mockSettings}
      />
    );

    wrapperInstance = wrapper.instance();
  });

  it('expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('setStateAndIsolateTab', () => {
    const settingsState = wrapper.state('settings');
    settingsState.Orientation[0] = 'Mixed';

    wrapperInstance.setStateAndIsolateTab(settingsState);
    expect(wrapper.state('settings').Orientation).toEqual(['Mixed']);
    expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
  });

  describe('getSettingsValue', () => {
    it('returns Contrast value', () => {
      expect(wrapperInstance.getSettingsValue(ACCESSIBILITY.id)).toEqual(
        wrapper.state('settings')[ACCESSIBILITY.id][0]
      );
    });

    it('returns Language value', () => {
      expect(wrapperInstance.getSettingsValue(LANGUAGE.id)).toEqual(
        wrapper.state('settings')[LANGUAGE.id][0]
      );
    });

    it('returns Lessons value', () => {
      expect(wrapperInstance.getSettingsValue(LESSONS_PER_DAY.id)).toEqual(
        wrapper.state('settings')[LESSONS_PER_DAY.id][0]
      );
    });

    it('returns Operation value', () => {
      expect(wrapperInstance.getSettingsValue(OPERATION.id)).toEqual(
        wrapper.state('settings')[OPERATION.id][0]
      );
    });

    it('returns Orientation value', () => {
      expect(wrapperInstance.getSettingsValue(ORIENTATION.id)).toEqual(
        wrapper.state('settings')[ORIENTATION.id][0]
      );
    });
  });

  describe('handleChange', () => {
    it('handle Contrast change', () => {
      mockEvent = {
        target: {
          id: ACCESSIBILITY.id,
          value: 'Light',
        },
      };

      wrapperInstance.handleChange(mockEvent);
      expect(wrapperInstance.getSettingsValue(ACCESSIBILITY.id)).toEqual(mockEvent.target.value);
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });

    it('handle Language change', () => {
      mockEvent = {
        target: {
          id: LANGUAGE.id,
          value: 'English',
        },
      };

      wrapperInstance.handleChange(mockEvent);
      expect(wrapperInstance.getSettingsValue(LANGUAGE.id)).toEqual(mockEvent.target.value);
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });

    it('handle Lessons Per Day Change', () => {
      mockEvent = {
        target: {
          id: LESSONS_PER_DAY.id,
          value: '1',
        },
      };

      wrapperInstance.handleChange(mockEvent);
      expect(wrapperInstance.getSettingsValue(LESSONS_PER_DAY.id)).toEqual(mockEvent.target.value);
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });

    it('handle Operation Change', () => {
      mockEvent = {
        target: {
          id: OPERATION.id,
          value: 'Multiplication9',
        },
      };

      wrapperInstance.handleChange(mockEvent);
      expect(wrapperInstance.getSettingsValue(OPERATION.id)).toEqual(mockEvent.target.value);
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });

    it('handle Orientation Change', () => {
      mockEvent = {
        target: {
          id: ORIENTATION.id,
          value: 'Mixed',
        },
      };

      wrapperInstance.handleChange(mockEvent);
      expect(wrapperInstance.getSettingsValue(ORIENTATION.id)).toEqual(mockEvent.target.value);
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });
  });

  it('handleRestoreDefault', () => {
    const expectedSettingsState = {
      Operation: ['Subtraction9'],
      Problems: ['70'],
      Orientation: ['Horizontal'],
      Response: ['1.25'],
      Language: ['English'],
      Contrast: ['Standard'],
      Lessons: ['1'],
      Reset: ['false'],
    };

    wrapperInstance.handleRestoreDefault();
    const actualSettingsState = wrapper.state('settings');
    expect(actualSettingsState).toEqual(expectedSettingsState);
  });

  it('handleSave', () => {
    wrapperInstance.handleSave();

    expect(mockHandleSave).toHaveBeenCalledWith(wrapper.state('settings'));
    expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
  });

  it('handleSetInitialValues', () => {
    wrapperInstance.handleSetInitialValues();

    expect(wrapper.state('settings')).toEqual(mockSettings.getIn(['Settings', 0]).toJS());
    expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
  });

  it('handleSubmit', () => {
    mockEvent = {
      preventDefault: jest.fn(),
    };

    wrapperInstance.handleSubmit(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockHandleSave).toHaveBeenCalledWith(wrapper.state('settings'));
    expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
  });

  it('isTabIsolated is set to true', () => {
    wrapper.setProps({ isTabIsolated: true });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
