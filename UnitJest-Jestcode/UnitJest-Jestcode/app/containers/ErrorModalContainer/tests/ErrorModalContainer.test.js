import React from 'react';
import { shallow } from 'enzyme';
import { ErrorModalContainer } from '../index';

describe('<ErrorModalContainer />', () => {
  let wrapper = null;
  let mockHideModal = null;
  let mockLogoutRequest = null;
  let mockError = null;
  const mockEvent = { preventDefault: jest.fn() };

  beforeEach(() => {
    mockHideModal = jest.fn();
    mockLogoutRequest = jest.fn();
    mockError = 'foobar';

    wrapper = shallow(
      <ErrorModalContainer
        hideModal={mockHideModal}
        logoutRequest={mockLogoutRequest}
        error={mockError}
        shouldLogout
      />
    );
  });

  it('should have an error modal', () => {
    const modal = wrapper.find('ErrorModal');
    expect(modal).toBeDefined();
  });

  it('modal without logout', () => {
    wrapper = shallow(
      <ErrorModalContainer
        hideModal={mockHideModal}
        logoutRequest={mockLogoutRequest}
        error={mockError}
      />
    );
    const modal = wrapper.find('ErrorModal');
    modal.prop('onClick')(mockEvent);
    expect(mockHideModal).toHaveBeenCalled();
    expect(mockLogoutRequest).toHaveBeenCalledTimes(0);
  });

  it('should logout and close modal when user agrees', () => {
    const modal = wrapper.find('ErrorModal');
    modal.prop('onClick')(mockEvent);
    expect(mockHideModal).toHaveBeenCalled();
    expect(mockLogoutRequest).toHaveBeenCalled();
  });
});
