import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import InputPhoneNumber from 'components/forms/InputPhoneNumber';

describe('<InputPhoneNumber />', () => {
  it('Should render correctly', () => {
    const wrapper = shallow(
      <InputPhoneNumber
        className="my-custom-class"
        name="schoolContactPhoneNumber"
        placeholder="xxx-xxx-xxxx"
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should format with valid input', () => {
    const wrapper = shallow(<InputPhoneNumber name="schoolContactPhoneNumber" />);
    const formatted = wrapper.instance().formatPhoneNumber('1234567890');
    expect(formatted).toBe('123-456-7890');
  });
  it('Should format with no input', () => {
    const wrapper = shallow(<InputPhoneNumber name="schoolContactPhoneNumber" />);
    const formatted = wrapper.instance().formatPhoneNumber(null);
    expect(formatted).toBe('');
  });
  it('Should normalize with valid input', () => {
    const wrapper = shallow(<InputPhoneNumber name="schoolContactPhoneNumber" />);
    const normalized = wrapper.instance().normalizePhoneNumber('123', '12');
    expect(normalized).toBe('123');
  });
  it('Should normalize with invalid input', () => {
    const wrapper = shallow(<InputPhoneNumber name="schoolContactPhoneNumber" />);
    const normalized = wrapper.instance().normalizePhoneNumber('1a', '1');
    expect(normalized).toBe('1');
  });
  it('Should parse with no input', () => {
    const wrapper = shallow(<InputPhoneNumber name="schoolContactPhoneNumber" />);
    const parsed = wrapper.instance().parsePhoneNumber(null);
    expect(parsed).toBe('');
  });
  it('Should parse with valid input', () => {
    const wrapper = shallow(<InputPhoneNumber name="schoolContactPhoneNumber" />);
    const parsed = wrapper.instance().parsePhoneNumber('123-456-7890');
    expect(parsed).toBe('1234567890');
  });
});
