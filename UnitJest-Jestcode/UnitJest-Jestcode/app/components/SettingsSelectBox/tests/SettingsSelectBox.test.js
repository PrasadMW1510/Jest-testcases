import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import SettingsSelectBox from '../index';

describe('<SettingsSelectBox />', () => {
  let wrapper = null;
  let mockOnChange = null;

  beforeEach(() => {
    mockOnChange = jest.fn();
  });

  it('should render enabled/non-mixed correctly', () => {
    wrapper = shallow(
      <SettingsSelectBox
        fieldClass="fieldClass"
        fieldName="fieldName"
        fieldValue="1"
        label="label"
        labelClass="labelClass"
        onChange={mockOnChange}
        mixedValue="-1"
      >
        <option key={1} value={1}>
          1
        </option>
        <option key={2} value={2}>
          2
        </option>
      </SettingsSelectBox>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled/mixed/right-label correctly', () => {
    wrapper = shallow(
      <SettingsSelectBox
        disabled
        fieldClass="fieldClass"
        fieldName="fieldName"
        fieldValue="-1"
        label="label"
        labelClass="labelClass"
        labelPosition="right"
        onChange={mockOnChange}
        mixedValue="-1"
      >
        <option key={1} value={1}>
          1
        </option>
        <option key={2} value={2}>
          2
        </option>
      </SettingsSelectBox>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
