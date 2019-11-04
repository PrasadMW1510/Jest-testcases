import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Read180Swcr2 from '../index';

describe('<Read180Swcr2 />', () => {
  const props = {
    read180Swcr2: {
      openResponse2Submission: [
        {
          question: [{}],
          answer: [{}],
        },
      ],
    },
    saveColor: jest.fn(),
    overallScore: jest.fn(),
    comments: {},
    score: '0',
    unMountChild: jest.fn(),
    response: '',
    rubricType: '',
  };
  const wrapper = shallow(<Read180Swcr2 {...props} />);
  it('Expect to render component', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render componentWillUnmount component', () => {
    wrapper.instance().componentWillUnmount();
    expect(props.unMountChild.mock.calls.length).toBe(1);
  });
  it('Expect to render overallScore component', () => {
    wrapper.instance().overallScore();
    expect(props.overallScore.mock.calls.length).toBe(1);
  });
  it('Expect to render commentArea component', () => {
    const e = {
      target: {
        value: '1',
      },
    };
    wrapper.instance().commentArea(e);
    expect(props.saveColor.mock.calls.length).toBe(1);
  });
  it('Expect to render scoreClick component', () => {
    const value = '0';
    wrapper.instance().scoreClick(value);
    expect(props.saveColor.mock.calls.length).toBe(2);
  });
  it('Expect to render scoreClick component', () => {
    const value = '1';
    wrapper.instance().scoreClick(value);
    expect(props.saveColor.mock.calls.length).toBe(3);
  });
  it('Expect to render scoreClick component', () => {
    const value = '2';
    wrapper.instance().scoreClick(value);
    expect(props.saveColor.mock.calls.length).toBe(4);
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.pull-right span');
    wrapper
      .find('.pull-right span')
      .at(0)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.pull-right span');
    wrapper
      .find('.pull-right span')
      .at(1)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.pull-right span');
    wrapper
      .find('.pull-right span')
      .at(2)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
});
describe('<Read180Swcr2 />', () => {
  const props = {
    read180Swcr2: {
      openResponse2Submission: [
        {
          question: [{}],
          answer: [{}],
        },
      ],
    },
    saveColor: jest.fn(),
    overallScore: jest.fn(),
    comments: {},
    score: '1',
    unMountChild: jest.fn(),
    response: '',
    rubricType: '',
  };
  const wrapper = shallow(<Read180Swcr2 {...props} />);
  it('Expect to render component', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
describe('<Read180Swcr2 />', () => {
  const props = {
    read180Swcr2: {
      openResponse1Submission: [
        {
          question: [{}],
          answer: [{}],
        },
      ],
    },
    saveColor: jest.fn(),
    overallScore: jest.fn(),
    comments: {},
    score: '2',
    unMountChild: jest.fn(),
    response: '',
    rubricType: '',
  };
  const wrapper = shallow(<Read180Swcr2 {...props} />);
  it('Expect to render component', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
