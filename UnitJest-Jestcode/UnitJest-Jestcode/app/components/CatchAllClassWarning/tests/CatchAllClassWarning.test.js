import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CatchAllClassWarning from '../index';

describe('<CatchAllClassWarning  />', () => {
  let wrapper = null;
  const props = {
    showAssignmentUpdate: true,
    closeAssignmentUpdate: jest.fn(),
    cancelwarningModal: true,
    yesWarningModalclose: jest.fn(),
    cancelWarningModalconClose: jest.fn(),
  };
  wrapper = shallow(<CatchAllClassWarning {...props} />);
  it('should render ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
