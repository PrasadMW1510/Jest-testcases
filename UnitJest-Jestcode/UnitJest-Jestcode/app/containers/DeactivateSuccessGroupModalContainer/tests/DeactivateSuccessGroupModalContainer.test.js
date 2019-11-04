import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { shallowToJson } from 'enzyme-to-json';
import { DeactivateSuccessGroupModalContainer } from '../DeactivateSuccessGroupModalContainer';

describe('<DeactivateSuccessGroupModalContainer />', () => {
  let wrapper = null;
  let classRedirection = null;
  let profilePage = null;
  let mockHideModal = null;
  const mockEvent = { preventDefault: jest.fn() };

  beforeEach(() => {
    mockHideModal = jest.fn();
    classRedirection = jest.fn();
    profilePage = fromJS({
      classDetails: {
        class_id: ['d0mv04d4fla89s0c8gr22mnj_2efa7f0'],
      },
    });

    wrapper = shallow(
      <DeactivateSuccessGroupModalContainer
        hideModal={mockHideModal}
        classRedirection={classRedirection}
        profilePage={profilePage}
      />
    );
  });

  it('should have a DeactivateGroupSuccessModal', () => {
    const modal = wrapper.find('DeactivateGroupSuccessModal');
    expect(modal).toBeDefined();
  });

  it('should deactivate modal close when user agrees', () => {
    const modal = wrapper.find('DeactivateGroupSuccessModal');
    modal.prop('onYes')(mockEvent);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
