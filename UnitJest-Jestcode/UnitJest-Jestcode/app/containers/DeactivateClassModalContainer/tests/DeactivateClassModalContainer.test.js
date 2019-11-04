import React from 'react';
import { shallow } from 'enzyme';
import { DeactivateClassModalContainer } from '../DeactivateClassModalContainer';

describe('<DeactivateClassModalContainer />', () => {
  let wrapper = null;
  let mockHideModal = null;
  let deactivateClassRequest = null;
  const mockEvent = { preventDefault: jest.fn() };

  beforeEach(() => {
    mockHideModal = jest.fn();
    deactivateClassRequest = jest.fn();

    wrapper = shallow(
      <DeactivateClassModalContainer
        hideModal={mockHideModal}
        deactivateClassRequest={deactivateClassRequest}
      />
    );
  });

  it('should have a deactivateClassRequest', () => {
    const modal = wrapper.find('DeactivateClassModal');
    expect(modal).toBeDefined();
  });

  it('should just close modal when user declines', () => {
    const modal = wrapper.find('DeactivateClassModal');
    modal.prop('onNo')(mockEvent);
    expect(mockHideModal).toHaveBeenCalled();
    expect(deactivateClassRequest).not.toHaveBeenCalled();
  });

  it('should deactivate modal close when user agrees', () => {
    const modal = wrapper.find('DeactivateClassModal');
    modal.prop('onYes')(mockEvent);
    expect(deactivateClassRequest).toHaveBeenCalled();
  });
});
