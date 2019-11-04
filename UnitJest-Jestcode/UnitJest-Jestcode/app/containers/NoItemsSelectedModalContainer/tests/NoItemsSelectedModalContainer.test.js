import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import { NoItemsSelectedModalContainer } from '../index';

describe('<NoItemsSelectedModalContainer />', () => {
  let wrapper = null;

  let mockData = null;
  let mockHideModal = null;

  let mockEvent = null;

  beforeEach(() => {
    mockData = { data: 'mockData' };
    mockHideModal = jest.fn();

    mockEvent = { preventDefault: jest.fn() };

    wrapper = shallow(<NoItemsSelectedModalContainer data={mockData} hideModal={mockHideModal} />);
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('handleOK', () => {
    const noItemsSelectedModal = wrapper.find('NoItemsSelectedModal');
    noItemsSelectedModal.prop('onOK')(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockHideModal).toHaveBeenCalled();
  });
});
