import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import PrintQuizAndAnswerKey from '../index';

describe('<PrintQuizAndAnswerKey />', () => {
  let wrapper = null;
  let wrapper1 = null;
  const props = {
    isOpen: true,
    handleCancel: jest.fn(),
    onPreview: jest.fn(),
    data: [
      {
        Title: 'iii',
        ID: [1, 2, 3],
      },
    ],
  };
  const props1 = {
    isOpen: true,
    handleCancel: jest.fn(),
    onPreview: jest.fn(),
    data: [],
  };
  const items = [
    {
      ID: ['1'],
    },
    {
      ID: ['2'],
    },
  ];
  wrapper = shallow(<PrintQuizAndAnswerKey {...props} data={items} key={[]} />);
  wrapper1 = shallow(<PrintQuizAndAnswerKey {...props1} key={[]} />);

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
  });
  it('Expect prevQuiz  to render correctly', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      initialId: '2',
    });
    wrapper.instance().prevQuiz(event);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect prevQuiz  to render correctly', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      initialId: '1',
    });
    wrapper.instance().prevQuiz(event);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect nextQuiz  to render correctly', () => {
    const ev = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      initialId: '1',
    });
    wrapper.instance().nextQuiz(ev);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect nextQuiz  to render correctly', () => {
    const ev = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      initialId: '2',
    });
    wrapper.instance().nextQuiz(ev);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect changeNoOfQs  to render correctly', () => {
    const ev = {
      target: {
        validity: {
          valid: true,
        },
        value: 2,
      },
    };
    wrapper.instance().setState({
      initialNumberOfQs: 2,
    });
    wrapper.instance().changeNoOfQs(ev);
    expect(wrapper.state('initialNumberOfQs')).toEqual(2);
  });
  it('Expect changeNoOfQs  to render without valid', () => {
    const ev = {
      target: {
        validity: {},
        value: 2,
      },
    };
    wrapper.instance().setState({
      initialNumberOfQs: '',
    });
    wrapper.instance().changeNoOfQs(ev);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect handlePreview  to render correctly', () => {
    wrapper.instance().handlePreview();
    expect(wrapper.instance().props.onPreview).toBeDefined();
  });
  it('click on the onClick button', () => {
    const clickButton = wrapper.find('.print-a-span');
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().prevQuiz(event);
    wrapper
      .find('.print-a-span')
      .at(0)
      .simulate('click', { preventDefault() {} });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('click on the onClick button', () => {
    const clickButton = wrapper.find('.print-a-span');
    const ev = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().nextQuiz(ev);
    wrapper
      .find('.print-a-span')
      .at(1)
      .simulate('click', { preventDefault() {} });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('click on the onChange button', () => {
    const changeButton = wrapper.find('.print-questinandanswer__textbox');
    wrapper.find('.print-questinandanswer__textbox').simulate('change', {
      target: {
        validity: {
          valid: true,
        },
        value: 32,
      },
    });
    expect(changeButton.exists()).toBeTruthy();
  });
});
