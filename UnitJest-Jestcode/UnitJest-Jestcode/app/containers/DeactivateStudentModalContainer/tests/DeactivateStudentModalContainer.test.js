import React from 'react';
import { shallow } from 'enzyme';
import { DeactivateStudentModalContainer } from '../DeactivateStudentModalContainer';

describe('<DeactivateStudentModalContainer />', () => {
  let wrapper = null;
  let mockHideModal = null;
  let deactivateStudentRequest = null;
  const mockEvent = { preventDefault: jest.fn() };

  beforeEach(() => {
    mockHideModal = jest.fn();
    deactivateStudentRequest = jest.fn();

    wrapper = shallow(
      <DeactivateStudentModalContainer
        hideModal={mockHideModal}
        deactivateStudentRequest={deactivateStudentRequest}
      />
    );
  });

  it('should have a deactivateStudentRequest', () => {
    const modal = wrapper.find('DeactivateStudentModal');
    expect(modal).toBeDefined();
  });

  it('should just close modal when user declines', () => {
    const modal = wrapper.find('DeactivateStudentModal');
    modal.prop('onNo')(mockEvent);
    expect(mockHideModal).toHaveBeenCalled();
    expect(deactivateStudentRequest).not.toHaveBeenCalled();
  });

  it('should deactivate modal close when user agrees', () => {
    const modal = wrapper.find('DeactivateStudentModal');
    modal.prop('onYes')(mockEvent);
    expect(deactivateStudentRequest).toHaveBeenCalled();
  });
});
