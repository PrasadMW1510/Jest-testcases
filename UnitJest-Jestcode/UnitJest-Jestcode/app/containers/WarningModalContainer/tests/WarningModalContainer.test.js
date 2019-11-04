import React from 'react';
import { shallow } from 'enzyme';

import { WarningModalContainer } from '../index';

describe('<WarningModalContainer />', () => {
  let wrapper = null;
  let mockData = null;
  let mockHideModal = null;
  let modal = null;
  const fakeEvent = { preventDefault: () => {} };

  beforeEach(() => {
    mockData = { values: 'mockValues' };
    mockHideModal = jest.fn();
    wrapper = shallow(<WarningModalContainer data={mockData} hideModal={mockHideModal} />);
    modal = wrapper.find('WarningModal');
  });

  it('should have WarningModal', () => {
    expect(modal).toBeDefined();
  });

  it('should close modal on Ok clicked', () => {
    modal.prop('okOnClickHandler')(fakeEvent);
    expect(mockHideModal).toHaveBeenCalled();
  });
});
