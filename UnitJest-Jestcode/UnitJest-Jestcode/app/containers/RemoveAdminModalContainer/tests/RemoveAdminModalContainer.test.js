import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { RemoveAdminModalContainer } from '../RemoveAdminModalContainer';

describe('<RemoveAdminModalContainer />', () => {
  let wrapper = null;
  const mockHideModal = jest.fn();
  const mockDisableAdminRequest = jest.fn();
  const mockData = {
    adminId: 'mock-admin-id',
  };

  beforeEach(() => {
    wrapper = shallow(
      <RemoveAdminModalContainer
        data={mockData}
        hideModal={mockHideModal}
        disableAdminRequest={mockDisableAdminRequest}
      />
    );
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should hideModal when handleNo is pressed', () => {
    const mockEvent = {
      preventDefault: () => {},
    };
    wrapper.instance().handleNo(mockEvent);
    expect(mockHideModal).toBeCalled();
  });

  it('should deactivateAllClassesRequest when handleYes is pressed', () => {
    const mockEvent = { preventDefault: () => {} };
    wrapper.instance().handleYes(mockEvent);
    expect(mockDisableAdminRequest).toBeCalledWith(mockData.adminId);
  });
});
