import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import { DeleteInactiveSuccessModalContainer } from '../index';

describe('<DeleteInactiveSuccessModalContainer />', () => {
  let wrapper = null;

  let mockData = null;
  let mockHideModal = null;
  let mockGetInactiveCohortMembersRequest = null;

  let mockEvent = null;

  beforeEach(() => {
    mockData = { searchOpts: 'mockSearchOpts' };
    mockHideModal = jest.fn();
    mockGetInactiveCohortMembersRequest = jest.fn();

    mockEvent = { preventDefault: jest.fn() };

    wrapper = shallow(
      <DeleteInactiveSuccessModalContainer
        data={mockData}
        hideModal={mockHideModal}
        getInactiveCohortMembersRequest={mockGetInactiveCohortMembersRequest}
      />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('handleYes', () => {
    const deleteInactiveSuccessModal = wrapper.find('DeleteInactiveSuccessModal');
    deleteInactiveSuccessModal.prop('onYes')(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockHideModal).toHaveBeenCalledTimes(2);
    expect(mockGetInactiveCohortMembersRequest).toHaveBeenCalledWith(mockData.searchOpts);
  });
});
