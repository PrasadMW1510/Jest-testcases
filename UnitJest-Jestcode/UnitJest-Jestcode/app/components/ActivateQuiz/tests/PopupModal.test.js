import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import PopupModal from '../PopupModal';

describe('<PopupModal />', () => {
  let wrapper = null;
  const props = {
    isOpen: true,
    activateQuiz: jest.fn(),
  };
  wrapper = shallow(<PopupModal {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
