import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ErrorModal from '../index';

describe('<ErrorModal />', () => {
  let wrapper = null;
  let mockOnClick = null;
  let errorMessage = null;

  beforeEach(() => {
    mockOnClick = jest.fn();
    errorMessage = 'foobar';
    wrapper = shallow(<ErrorModal isOpen onClick={mockOnClick} errorMessage={errorMessage} />);
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to handle clicks', () => {
    const button = wrapper.find('button');
    expect(button.exists()).toBeTruthy();
    button.simulate('click');
    expect(mockOnClick).toHaveBeenCalled();
  });
});
