import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';

import { CHECKBOX_STATE } from 'components/SettingsFourStateCheckbox/constants';

import SettingsTestExperienceSection from '../SettingsTestExperienceSection';

describe('<SettingsTestExperienceSection />', () => {
  let wrapper = null;
  const mockHandleChange = jest.fn();
  const mockCheckboxStatusMap = {
    [CHECKBOX_STATE.UncheckedDisabled]: [],
    [CHECKBOX_STATE.UncheckedEnabled]: ['0'],
    [CHECKBOX_STATE.CheckedDisabled]: [],
    [CHECKBOX_STATE.CheckedEnabled]: ['1'],
    [CHECKBOX_STATE.MixedDisabled]: [],
    [CHECKBOX_STATE.MixedEnabled]: ['-2'],
  };
  const mockSettingValue = [
    { apiProperty: 'audio_instructions', label: 'Include audio directions' },
    { apiProperty: 'show_correct_incorrect', label: 'Show correct and incorrect answers' },
    { apiProperty: 'include_open_response', label: 'Include constructed response' },
    { apiProperty: 'include_writing_prompts', label: 'Include extended constructed response' },
  ];
  const mockSettingsOnScreen = fromJS({});
  beforeEach(() => {
    wrapper = shallow(
      <SettingsTestExperienceSection
        handleChange={mockHandleChange}
        checkBoxStatusMap={mockCheckboxStatusMap}
        settingsOnScreen={mockSettingsOnScreen}
        settingValues={mockSettingValue}
      />
    );
  });
  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
