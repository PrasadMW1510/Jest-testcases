import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';

import { EditDistrictProfileContainer } from '../EditDistrictProfileContainer';

describe('<EditDistrictProfileContainer />', () => {
  let wrapper;
  let mockProfileData;
  let mockHideModal;
  let mockGetTimeZonesRequest;
  let mockUpdateDistrictProfileRequest;
  let mockShowModal;
  let mockTimeZones;

  beforeEach(() => {
    mockProfileData = fromJS({
      profileDetailsDistAdmin: {
        display_name: ['mock-display-name'],
        description: ['mock-description'],
        type: ['mock-type'],
        district_info: [
          {
            location: ['mock-location'],
            apps: [{ app: [{ _: 'CRX', $: { restricted: 'true' } }] }],
            school_days: [{ school_day: ['2', '3'] }],
            time_zone: ['mock-time-zone'],
            start_of_day: ['mock-start-of-day'],
            end_of_day: ['mock-start-of-day'],
          },
        ],

        contact_person: [
          {
            district_last_name: ['mock-last-name'],
            district_first_name: ['mock-first-name'],
            district_middle_name: ['mock-middle-name'],
            district_contact_title: ['mock-title'],
          },
        ],
        contact_info: [
          {
            email_address: ['mock-email-address'],
            address1: ['mock-address1'],
            address2: ['mock-address2'],
            address3: ['mock-address3'],
            phone_number: ['mock-phone-number'],
            state: ['mock-state'],
            city: ['mock-city'],
            postal_code: ['mock-last-name'],
          },
        ],
      },
    });

    mockTimeZones = ['Pacific (US & Canada', 'Eastern (US & Canada)'];

    mockHideModal = jest.fn();
    mockShowModal = jest.fn();

    mockGetTimeZonesRequest = jest.fn();
    mockUpdateDistrictProfileRequest = jest.fn();

    wrapper = shallow(
      <EditDistrictProfileContainer
        hideModal={mockHideModal}
        showModal={mockShowModal}
        getTimeZonesRequest={mockGetTimeZonesRequest}
        profile={mockProfileData}
        updateDistrictProfileRequest={mockUpdateDistrictProfileRequest}
        timeZones={mockTimeZones}
      />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
