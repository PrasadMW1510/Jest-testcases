import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import SettingsTextField from '../index';

describe('<SettingsTextField />', () => {
  let wrapper = null;
  let mockOnChange = null;

  beforeEach(() => {
    mockOnChange = jest.fn();
  });

  it('should render enabled/non-mixed correctly', () => {
    wrapper = shallow(
      <SettingsTextField
        fieldClass="fieldClass"
        fieldName="fieldName"
        fieldValue="1"
        label="label"
        labelClass="labelClass"
        labelPosition="right"
        mixedValue="-1"
        onChange={mockOnChange}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled/mixed/left-label correctly', () => {
    wrapper = shallow(
      <SettingsTextField
        disabled
        fieldClass="fieldClass"
        fieldName="fieldName"
        fieldValue="-1"
        label="label"
        labelPosition="left"
        mixedValue="-1"
        onChange={mockOnChange}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
