import Immutable from 'immutable';
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { ManageAdminAccountsContainer } from '../ManageAdminAccountsContainer';

describe('<ManageAdminAccountsContainer />', () => {
  let wrapper = null;
  const mockGetAdminsRequest = jest.fn();
  const mockGetAdminRequest = jest.fn();
  const mockResetAdminsList = jest.fn();
  const mockShowModal = jest.fn();
  const mockUserId = 'mock-user-id';

  const mockManageAdminAccountContainer = Immutable.fromJS({
    admins: [
      {
        org_id: ['6477EA8C2E3D11E6A9700A2175802BAF'],
        type: ['district'],
        name: ['AWSQA1 Site 51102'],
        users: [
          {
            $: { user_type: 'Tech' },
            user: [
              {
                user_id: ['7nvm174lun7311d1kmekgd5q_2efa7f0'],
                district_user_id: ['gadmin2'],
                first_name: ['Getha'],
                last_name: ['DTAimport'],
                user_name: ['gdtaimport'],
              },
              {
                user_id: ['88309nvgvara6g92j088s7of_2efa7f0'],
                district_user_id: ['dtajeffl'],
                first_name: ['DTAJeff'],
                last_name: ['DTALeeman'],
                user_name: ['dtajeffl'],
              },
            ],
          },
          {
            $: { user_type: 'Administrator' },
            user: [
              {
                user_id: ['3bn5snam2uuhftpqa1acbsdq_2efa7f0'],
                district_user_id: ['1'],
                first_name: ['1'],
                last_name: ['1'],
                user_name: ['111'],
              },

              {
                user_id: ['s60blf1ilu74cbdlsh2dgg11_2efa7f0'],
                district_user_id: ['waaddemo'],
                first_name: ['waaddemo'],
                last_name: ['waaddemo'],
                user_name: ['waaddemo'],
              },
            ],
          },
        ],
      },
      {
        org_id: ['0bbtnkur8q1tvn2asjrh4o13_2efa7f0'],
        type: ['school'],
        name: ['PERF_SR_AWS_School'],
        users: [{ $: { user_type: 'Tech' } }, { $: { user_type: 'Administrator' } }],
      },
      {
        org_id: ['0dsl91cscka50vrns1rtmddr_2efa7f0'],
        type: ['school'],
        name: ['e2eLavanya'],
        users: [{ $: { user_type: 'Tech' } }, { $: { user_type: 'Administrator' } }],
      },
    ],
  });

  beforeEach(() => {
    wrapper = shallow(
      <ManageAdminAccountsContainer
        currentUserId={mockUserId}
        getAdminRequest={mockGetAdminRequest}
        getAdminsRequest={mockGetAdminsRequest}
        resetAdminsList={mockResetAdminsList}
        manageAdminAccountsContainer={mockManageAdminAccountContainer}
        showModal={mockShowModal}
      />
    );
  });

  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should call resetAdminsList when component unmounted', () => {
    wrapper.instance().componentWillUnmount();
    expect(mockResetAdminsList).toHaveBeenCalled();
  });

  it('should createAdminList', () => {
    expect(wrapper.instance().createAdminList()).toMatchSnapshot();
  });
});
