import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ProgramSettingsButtons from '../index';

describe('<ProgramSettingsButtons />', () => {
  let wrapper = null;
  let mockRestoreDefaultHandler = null;
  let mockSaveAndReturnHandler = null;
  let mockSetInitialValuesHandler = null;
  const fakeEvent = { preventDefault: () => {} };

  beforeEach(() => {
    mockRestoreDefaultHandler = jest.fn();
    mockSaveAndReturnHandler = jest.fn();
    mockSetInitialValuesHandler = jest.fn();
  });

  describe('stateResult is true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ProgramSettingsButtons
          restoreDefaultHandler={mockRestoreDefaultHandler}
          saveAndReturnHandler={mockSaveAndReturnHandler}
          setInitialValuesHandler={mockSetInitialValuesHandler}
          stateResult
        />
      );
    });

    it('expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('stateResult is true and showRestoreDefaults is false', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ProgramSettingsButtons
          restoreDefaultHandler={mockRestoreDefaultHandler}
          saveAndReturnHandler={mockSaveAndReturnHandler}
          setInitialValuesHandler={mockSetInitialValuesHandler}
          showRestoreDefaults={false}
          stateResult
        />
      );
    });

    it('expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('all buttons are shown', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ProgramSettingsButtons
          restoreDefaultHandler={mockRestoreDefaultHandler}
          saveAndReturnHandler={mockSaveAndReturnHandler}
          setInitialValuesHandler={mockSetInitialValuesHandler}
        />
      );
    });

    it('expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('restoreDefaultHandler is called', () => {
      const restoreDefaultButton = wrapper.find('SAMButton[id="restoreDefaults"]');
      restoreDefaultButton.prop('onClickHandler')(fakeEvent);
      expect(mockRestoreDefaultHandler).toHaveBeenCalled();
    });

    it('setInitialValuesHandler is called', () => {
      const cancelButton = wrapper.find('SAMButton[id="cancel"]');
      cancelButton.prop('onClickHandler')(fakeEvent);
      expect(mockSetInitialValuesHandler).toHaveBeenCalled();
    });

    it('saveAndReturnHandler is called', () => {
      const saveAndReturnButton = wrapper.find('withRouter(SAMLinkButton)[id="saveAndReturn"]');
      saveAndReturnButton.prop('onClickHandler')(fakeEvent);
      expect(mockSaveAndReturnHandler).toHaveBeenCalled();
    });
  });
});
