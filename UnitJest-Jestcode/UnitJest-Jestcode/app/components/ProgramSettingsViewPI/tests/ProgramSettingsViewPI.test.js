import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import * as Constants from 'components/ProgramSettingsViewPI/constants';
import ProgramSettingsViewPI from '../index';

describe('<ProgramSettingsViewPI />', () => {
  let wrapper = null;
  let mockHandleSave = null;
  let mockSetIsolateTab = null;
  let mockSettings = null;
  let mockIsTabIsolated = null;

  describe('expect to render ProgramSettingsViewPI', () => {
    beforeEach(() => {
      mockHandleSave = jest.fn();
      mockSetIsolateTab = jest.fn();
      mockIsTabIsolated = false;
      mockSettings = fromJS({
        spanish_support: ['0'],
        requires_accommodation: ['0'],
      });

      wrapper = shallow(
        <ProgramSettingsViewPI
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
          target: { id: 'spanish_support', checked: false },
        };
        wrapper.instance().handleCheckbox(e);

        const wrapperSettingsState = wrapper.state('settingsObj');
        expect(wrapperSettingsState.spanish_support[0]).toEqual('0');
        expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
      });

      it('handles checked is true click', () => {
        const e = {
          preventDefault: jest.fn(),
          target: { id: 'spanish_support', checked: true },
        };
        wrapper.instance().handleCheckbox(e);

        const wrapperSettingsState = wrapper.state('settingsObj');
        expect(wrapperSettingsState.spanish_support[0]).toEqual('1');
        expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
      });
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
      const mockState = { requires_accommodation: ['0'], spanish_support: ['0'] };
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
