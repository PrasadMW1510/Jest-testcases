import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import EditDistrictProfile from '../index';
import { TAB_PROFILE, TAB_CONTACT } from '../constants';

describe('<EditDistrictProfile />', () => {
  let wrapper = null;
  const mockHandleCancel = jest.fn();
  const mockShowModal = jest.fn();
  const mockHandleSave = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockApplications = [
    { label: 'Common Core Code X', id: 'CDX' },
    { label: 'Progress Space', id: 'DTM' },
    { label: 'Do The Math', id: 'DTM2' },
  ];
  const mockData = {};
  const mockTimeZones = ['Pacific (US & Canada', 'Eastern (US & Canada)'];

  beforeEach(() => {
    wrapper = shallow(
      <EditDistrictProfile
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        showModal={mockShowModal}
        handleSubmit={mockHandleSubmit}
        applications={mockApplications}
        data={mockData}
        timeZones={mockTimeZones}
      />
    );
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should handleTabClick', () => {
    const mockEvent = {
      currentTarget: {
        id: TAB_CONTACT,
      },
    };

    expect(wrapper.state('activeTab')).toEqual(TAB_PROFILE);
    wrapper.instance().handleTabClick(mockEvent);
    expect(wrapper.state('activeTab')).toEqual(TAB_CONTACT);
  });
  it('should handleSave', () => {
    const values = {};

    wrapper.instance().handleSave(values);
    expect(mockHandleSave).toBeCalled();
  });
});
