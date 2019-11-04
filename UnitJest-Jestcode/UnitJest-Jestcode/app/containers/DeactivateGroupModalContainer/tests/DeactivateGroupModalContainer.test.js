import React from 'react';
import { shallow } from 'enzyme';
import { DeactivateGroupModalContainer } from '../DeactivateGroupModalContainer';

describe('<DeactivateGroupModalContainer />', () => {
  let wrapper = null;
  let mockHideModal = null;
  let deactivateGroupRequest = null;
  const mockEvent = { preventDefault: jest.fn() };

  beforeEach(() => {
    mockHideModal = jest.fn();
    deactivateGroupRequest = jest.fn();

    wrapper = shallow(
      <DeactivateGroupModalContainer
        hideModal={mockHideModal}
        deactivateGroupRequest={deactivateGroupRequest}
      />
    );
  });

  it('should have a DeactivateGroupModal', () => {
    const modal = wrapper.find('DeactivateGroupModal');
    expect(modal).toBeDefined();
  });

  it('should just close modal when user declines', () => {
    const modal = wrapper.find('DeactivateGroupModal');
    modal.prop('onNo')(mockEvent);
    expect(mockHideModal).toHaveBeenCalled();
    expect(deactivateGroupRequest).not.toHaveBeenCalled();
  });

  it('should deactivate modal close when user agrees', () => {
    const modal = wrapper.find('DeactivateGroupModal');
    modal.prop('onYes')(mockEvent);
    expect(deactivateGroupRequest).toHaveBeenCalled();
  });
});
