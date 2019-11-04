import React from 'react';

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { ClassAssignModalContainer } from '../index';
describe('<ClassAssignModalContainer />', () => {
  let wrapper = null;
  const mockData = {};
  const mockHideModal = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<ClassAssignModalContainer data={mockData} hideModal={mockHideModal} />);
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should call the hideModal function', () => {
    wrapper.instance().handleClose();
    expect(mockHideModal).toHaveBeenCalled();
  });
});
