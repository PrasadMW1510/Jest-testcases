import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import DeleteModal from '../DeleteModal';

describe('<DeleteModal />', () => {
  let wrapper = null;
  const props = {
    handleDeleteAssignment: jest.fn(),
    deleteWarningModal: true,
  };
  wrapper = shallow(<DeleteModal {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('onclick', () => {
    wrapper.instance().handleDeleteAssignment = jest.fn();
    wrapper
      .find('.portfolio-conf-warning-btn SAMButton')
      .at(0)
      .dive()
      .find('button')
      .simulate('click', { preventDefault() {} });
    expect(wrapper.instance().handleDeleteAssignment).not.toBeCalled();
  });
  it('onclick', () => {
    wrapper.instance().handleDeleteAssignment = jest.fn();
    wrapper
      .find('.portfolio-conf-warning-btn SAMButton')
      .at(1)
      .dive()
      .find('button')
      .simulate('click', { preventDefault() {} });
    expect(wrapper.instance().handleDeleteAssignment).not.toBeCalled();
  });
});
