import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import PrintBookLabels from '../index';

describe('<PrintBookLabels />', () => {
  let wrapper = null;
  let wrapper1 = null;
  const props = {
    isOpen: true,
    handleCancel: jest.fn(),
    onPreview: jest.fn(),
    data: [],
  };
  const props1 = {
    isOpen: true,
    handleCancel: jest.fn(),
    onPreview: jest.fn(),
    data: ['some'],
  };
  wrapper = shallow(<PrintBookLabels {...props} />);
  wrapper1 = shallow(<PrintBookLabels {...props1} />);

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
  });
  it('Expect handleChange to render correctly', () => {
    const event = {
      target: {
        id: '',
      },
    };
    wrapper.instance().setState({
      checkedPrintState: {
        lexile: true,
        reading_level: true,
        grl: true,
        show_points: true,
      },
    });
    wrapper.instance().handleChange(event);
    expect(wrapper.state('checkedPrintState')).toEqual({
      '': true,
      lexile: true,
      reading_level: true,
      grl: true,
      show_points: true,
    });
  });
  it('Expect handleRadioChange to render correctly', () => {
    const event = {
      target: {
        value: 2,
      },
    };
    wrapper.instance().handleRadioChange(event);
    expect(wrapper.state('selectedOption')).toEqual(2);
  });
  it('Expect handleTextboxChange to render correctly', () => {
    const event = {
      target: {
        validity: {
          valid: true,
        },
        value: 2,
      },
    };
    wrapper.instance().setState({
      labelVal: 2,
    });
    wrapper.instance().handleTextboxChange(event);
    expect(wrapper.state('labelVal')).toEqual(2);
  });
  it('Expect handleTextboxChange to render with else ', () => {
    const event = {
      target: {
        validity: {},
        value: 2,
      },
    };
    wrapper.instance().setState({
      labelVal: '',
    });
    wrapper.instance().handleTextboxChange(event);
    expect(wrapper.state('labelVal')).toEqual('');
  });
  it('Expect handlePreview to render correctly', () => {
    wrapper.instance().setState({
      labelVal: 30,
    });
    wrapper.instance().handlePreview();
    expect(wrapper.state('showError')).toBeTruthy();
  });
  it('Expect handlePreview to render correctly else', () => {
    wrapper.instance().setState({
      labelVal: 20,
    });
    wrapper.instance().handlePreview();
    expect(wrapper.instance().props.onPreview).toBeCalled();
    expect(wrapper.state('showError')).toBeFalsy();
  });
  it('click on the onChange button', () => {
    const changeButton = wrapper1.find('#lexile');
    wrapper1.find('#lexile').simulate('change', {
      target: {
        checked: true,
      },
    });
    expect(changeButton.exists()).toBeTruthy();
  });
  it('click on the onChange button', () => {
    const changeButton = wrapper1.find('#showPoints');
    wrapper1.find('#showPoints').simulate('change', {
      target: {
        checked: true,
      },
    });
    expect(changeButton.exists()).toBeTruthy();
  });
  it('click on the onChange button', () => {
    const changeButton = wrapper1.find('#grl');
    wrapper1.find('#grl').simulate('change', {
      target: {
        checked: true,
      },
    });
    expect(changeButton.exists()).toBeTruthy();
  });
  it('click on the onChange button', () => {
    const changeButton = wrapper1.find('#readingLevel');
    wrapper1.find('#readingLevel').simulate('change', {
      target: {
        checked: true,
      },
    });
    expect(changeButton.exists()).toBeTruthy();
  });
  it('click on the onChange button', () => {
    const changeButton = wrapper1.find('#WideBookLabels');
    wrapper1.find('#WideBookLabels').simulate('change', {
      target: {
        checked: true,
      },
    });
    expect(changeButton.exists()).toBeTruthy();
  });
  it('click on the onChange button', () => {
    const changeButton = wrapper1.find('#TallBookLabels');
    wrapper1.find('#TallBookLabels').simulate('change', {
      target: {
        checked: true,
      },
    });
    expect(changeButton.exists()).toBeTruthy();
  });
  it('click on the onChange button', () => {
    const changeButton = wrapper1.find('#textboxLabel');
    wrapper1.find('#textboxLabel').simulate('change', {
      target: {
        validity: {
          valid: true,
        },
        value: 2,
      },
    });
    expect(changeButton.exists()).toBeTruthy();
  });
  it('show error to be true', () => {
    wrapper1.instance().setState({
      showError: true,
    });
    expect(wrapper1).toMatchSnapshot();
  });
});
