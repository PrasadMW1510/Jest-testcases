import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Read180Swew from '../index';

describe('<Read180Swew />', () => {
  const props = {
    read180Swew: {
      writingPromptSubmission: [
        {
          question: [{}],
          answer: [{}],
          evaluation: [
            {
              $: {
                submissionType: '',
                rubricType: '',
              },
            },
          ],
        },
      ],
    },
    saveColor: jest.fn(),
    overLink: jest.fn(),
    comments: {},
    score: '',
    unMountChild: jest.fn(),
    response: '',
    rubricType: '',
  };
  const wrapper = shallow(<Read180Swew {...props} />);
  it('Expect to render component', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render componentWillUnmount component', () => {
    wrapper.instance().componentWillUnmount();
    expect(props.unMountChild.mock.calls.length).toBe(1);
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
  it('Expect to render overlink component', () => {
    wrapper.instance().overlink();
    expect(props.overLink.mock.calls.length).toBe(1);
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(1)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(2)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(3)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');

    wrapper
      .find('.extended-writing-pull-right span')
      .at(4)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(6)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(7)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(8)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(9)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(11)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(12)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(13)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(14)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(16)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(17)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(18)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(19)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(21)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(22)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(23)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(24)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(26)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(27)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(28)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(29)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(31)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(32)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(33)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.extended-writing-pull-right span');
    wrapper
      .find('.extended-writing-pull-right span')
      .at(34)
      .simulate('click', {});
    expect(clickButton.exists()).toBeTruthy();
  });
});
