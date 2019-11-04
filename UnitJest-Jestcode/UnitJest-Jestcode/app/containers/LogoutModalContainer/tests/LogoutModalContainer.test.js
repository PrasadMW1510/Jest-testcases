import React from 'react';
import { shallow } from 'enzyme';
import { LogoutModalContainer } from '../index';

describe('<LogoutModalContainer />', () => {
  let wrapper = null;
  let mockHideModal = null;
  let mockLogoutRequest = null;
  const mockEvent = { preventDefault: jest.fn() };

  beforeEach(() => {
    mockHideModal = jest.fn();
    mockLogoutRequest = jest.fn();

    wrapper = shallow(
      <LogoutModalContainer hideModal={mockHideModal} logoutRequest={mockLogoutRequest} />
    );
  });

  it('should have a logout modal', () => {
    const modal = wrapper.find('LogoutModal');
    expect(modal).toBeDefined();
  });

  it('should just close modal when user declines', () => {
    const modal = wrapper.find('LogoutModal');
    modal.prop('onNo')(mockEvent);
    expect(mockHideModal).toHaveBeenCalled();
    expect(mockLogoutRequest).not.toHaveBeenCalled();
  });

  it('should logout and close modal when user agrees', () => {
    const modal = wrapper.find('LogoutModal');
    modal.prop('onYes')(mockEvent);
    expect(mockHideModal).toHaveBeenCalled();
    expect(mockLogoutRequest).toHaveBeenCalled();
  });
});
