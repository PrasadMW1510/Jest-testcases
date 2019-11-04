import React from 'react';
import { shallow } from 'enzyme';
import { DeactivateModalContainer } from '../DeactivateModalContainer';

describe('<DeactivateModalContainer />', () => {
  let wrapper = null;
  let mockHideModal = null;
  let deactivateUserRequest = null;
  const mockEvent = { preventDefault: jest.fn() };

  beforeEach(() => {
    mockHideModal = jest.fn();
    deactivateUserRequest = jest.fn();

    wrapper = shallow(
      <DeactivateModalContainer
        hideModal={mockHideModal}
        deactivateUserRequest={deactivateUserRequest}
      />
    );
  });

  it('should have a DeactivateTeacherModal', () => {
    const modal = wrapper.find('DeactivateTeacherModal');
    expect(modal).toBeDefined();
  });

  it('should just close modal when user declines', () => {
    const modal = wrapper.find('DeactivateTeacherModal');
    modal.prop('onNo')(mockEvent);
    expect(mockHideModal).toHaveBeenCalled();
    expect(deactivateUserRequest).not.toHaveBeenCalled();
  });

  it('should deactivate modal close when user agrees', () => {
    const modal = wrapper.find('DeactivateTeacherModal');
    modal.prop('onYes')(mockEvent);
    expect(deactivateUserRequest).toHaveBeenCalled();
  });
});
