import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import PrintCustomQuiz from '../index';
describe('<PrintCustomQuiz />', () => {
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
  wrapper = shallow(<PrintCustomQuiz {...props} />);
  wrapper1 = shallow(<PrintCustomQuiz {...props1} />);

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
        word_count: true,
        points: true,
      },
    });
    wrapper.instance().handleChange(event);
    expect(wrapper.state('checkedPrintState')).toEqual({
      '': true,
      lexile: true,
      reading_level: true,
      grl: true,
      word_count: true,
      points: true,
    });
  });
  it('Expect handlePreview to render correctly', () => {
    wrapper.instance().setState({
      checkedPrintState: {
        lexile: true,
        reading_level: true,
        grl: true,
        word_count: true,
        points: true,
      },
    });
    wrapper.instance().handlePreview();
    expect(wrapper.instance().props.onPreview).toBeDefined();
  });
  it('click on the onChange button', () => {
    const changeButton = wrapper1.find('#lexile');
    wrapper1.find('#lexile').simulate('change', {
      target: {
        id: '',
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
    const changeButton = wrapper1.find('#grl');
    wrapper1.find('#grl').simulate('change', {
      target: {
        checked: true,
      },
    });
    expect(changeButton.exists()).toBeTruthy();
  });
  it('click on the onChange button', () => {
    const changeButton = wrapper1.find('#wordCount');
    wrapper1.find('#wordCount').simulate('change', {
      target: {
        checked: true,
      },
    });
    expect(changeButton.exists()).toBeTruthy();
  });
  it('click on the onChange button', () => {
    const changeButton = wrapper1.find('#points');
    wrapper1.find('#points').simulate('change', {
      target: {
        checked: true,
      },
    });
    expect(changeButton.exists()).toBeTruthy();
  });
});
