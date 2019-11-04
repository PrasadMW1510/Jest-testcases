import React from 'react';
import { shallow } from 'enzyme';
import { AboutSamLinkModalContainer } from '../index';

describe('<AboutSamLinkModalContainer />', () => {
  let wrapper = null;
  const mockHideModal = jest.fn();
  const mockData = { item: ['mock data'] };

  beforeEach(() => {
    wrapper = shallow(<AboutSamLinkModalContainer hideModal={mockHideModal} data={mockData} />);
  });

  it('should have AboutSamLinkModa', () => {
    const modal = wrapper.find('AboutSamLinkModal');
    expect(modal).toBeDefined();
  });

  it('should close modal on Ok clicked', () => {
    const modal = wrapper.find('AboutSamLinkModal');
    modal.prop('onOk')({ preventDefault: jest.fn() });
    expect(mockHideModal).toHaveBeenCalled();
  });
});
