import React from 'react';
import { shallow } from 'enzyme';
import { DeactivateSchoolModalContainer } from '../DeactivateSchoolModalContainer';

describe('<DeactivateSchoolModalContainer />', () => {
  let wrapper = null;
  let mockHideModal = null;
  let deactivateSchoolRequest = null;
  const mockEvent = { preventDefault: jest.fn() };

  beforeEach(() => {
    mockHideModal = jest.fn();
    deactivateSchoolRequest = jest.fn();

    wrapper = shallow(
      <DeactivateSchoolModalContainer
        hideModal={mockHideModal}
        deactivateSchoolRequest={deactivateSchoolRequest}
      />
    );
  });

  it('should have a deactivateSchoolRequest', () => {
    const modal = wrapper.find('DeactivateSchoolModal');
    expect(modal).toBeDefined();
  });

  it('should just close modal when user declines', () => {
    const modal = wrapper.find('DeactivateSchoolModal');
    modal.prop('onNo')(mockEvent);
    expect(mockHideModal).toHaveBeenCalled();
    expect(deactivateSchoolRequest).not.toHaveBeenCalled();
  });

  it('should deactivate modal close when user agrees', () => {
    const modal = wrapper.find('DeactivateSchoolModal');
    modal.prop('onYes')(mockEvent);
    expect(deactivateSchoolRequest).toHaveBeenCalled();
  });
});
