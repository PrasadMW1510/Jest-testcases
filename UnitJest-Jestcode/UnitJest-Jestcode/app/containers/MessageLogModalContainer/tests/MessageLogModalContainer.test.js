import React from 'react';
import { shallow } from 'enzyme';
import { MessageLogModalContainer } from '../index';

describe('<MessageLogModalContainer />', () => {
  let wrapper = null;
  const mockHideModal = jest.fn();
  const mockData = { data: 'mock data' };

  beforeEach(() => {
    wrapper = shallow(<MessageLogModalContainer hideModal={mockHideModal} data={mockData} />);
  });

  it('should have MessageLogModal', () => {
    const modal = wrapper.find('MessageLogModal');
    expect(modal).toBeDefined();
  });

  it('should close modal on Ok clicked', () => {
    const modal = wrapper.find('MessageLogModal');
    modal.prop('onOk')({ preventDefault: jest.fn() });
    expect(mockHideModal).toHaveBeenCalled();
  });
});
