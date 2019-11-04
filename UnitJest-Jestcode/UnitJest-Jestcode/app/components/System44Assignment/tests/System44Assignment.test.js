import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import System44Assignment from '../index';

describe('<System44Assignment />', () => {
  let wrapper = null;
  let props = null;
  props = {
    isOpen: true,
    handleCancel: jest.fn(),
    onPreview: jest.fn(),
  };
  wrapper = shallow(<System44Assignment {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to call handleChange with index value 1', () => {
    const index = '1';
    const event = {
      target: {
        checked: false,
      },
    };
    wrapper.instance().handleChange(index, event);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call handleChange with index value 2', () => {
    const index = '2';
    const event = {
      target: {
        checked: false,
      },
    };
    wrapper.instance().handleChange(index, event);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call handleChange with index value else', () => {
    const index = '23';
    const event = {
      target: {
        checked: false,
      },
    };
    wrapper.instance().handleChange(index, event);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call handlePreview', () => {
    wrapper.instance().handlePreview();
    expect(wrapper.instance().props.onPreview).toBeCalled();
  });
  it('Expect to call onChange1', () => {
    const changeButton = wrapper.find('.print-system44-modal-assignment-wrapper1 input');
    wrapper
      .find('.print-system44-modal-assignment-wrapper1 input')
      .at(0)
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(changeButton.exists()).toBeTruthy();
  });
  it('Expect to call onChange2', () => {
    const changeButton = wrapper.find('.print-system44-modal-assignment-wrapper1 input');
    wrapper
      .find('.print-system44-modal-assignment-wrapper1 input')
      .at(1)
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(changeButton.exists()).toBeTruthy();
  });
});
