import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import DeactivateQuiz from '../index';

describe('<DeactivateQuiz />', () => {
  let wrapper = null;
  const props = {
    isOpen: true,
    handleCancel: jest.fn(),
    deactivateQuiz: jest.fn(),
  };
  wrapper = shallow(<DeactivateQuiz {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect deactivateQuiz to render correctly', () => {
    wrapper.instance().deactivateQuiz();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
});
