import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ActivateQuiz from '../index';

describe('<ActivateQuiz />', () => {
  let wrapper = null;
  const props = {
    isOpen: true,
    handleCancel: jest.fn(),
    activateQuiz: jest.fn(),
  };
  wrapper = shallow(<ActivateQuiz {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect activateQuiz to render correctly', () => {
    wrapper.instance().activateQuiz();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
});
