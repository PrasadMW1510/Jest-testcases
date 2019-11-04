import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import * as ModalConstants from 'containers/ModalController/constants';
import SAMTable from 'components/SAMTable';
import ManageAdminAccounts from '../ManageAdminAccounts';
import * as Constants from '../constants';

describe('<ManageAdminAccounts />', () => {
  let showModalSpy;
  beforeEach(() => {
    showModalSpy = jest.fn();
  });

  it('Should render correctly with no data', () => {
    const wrapper = mount(
      <ManageAdminAccounts
        admins={[]}
        currentUserId="mock-user-id"
        isDistrictAdmin
        showModal={showModalSpy}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should populates the SAMTable with no data', () => {
    const wrapper = shallow(
      <ManageAdminAccounts currentUserId="mock-user-id" admins={[]} showModal={showModalSpy} />
    );
    const table = wrapper.find(SAMTable);
    const { data } = table.props();
    expect(data).toEqual([]);
  });

  it('should populate the ManageAdminAccout Table with the right columns', () => {
    const mockData = {
      type: 'district Admin',
      name: 'user, sch',
      district_user_id: 'mockDistrictId',
      user_id: 'mockuserId',
      remove: true,
    };
    const mockRowData = {
      original: mockData,
    };
    const wrapper = shallow(
      <ManageAdminAccounts
        currentUserId="mock-user-id"
        admins={[mockData]}
        showModal={showModalSpy}
      />
    );
    const table = wrapper.find(SAMTable);
    const { columns } = table.props();

    const nameColumn = columns.find(row => row.accessor === 'name');
    const removeColumn = columns.find(row => row.Header === '');

    const nameColumnWrapper = shallow(nameColumn.Header());
    const removeColumnWrapper = shallow(removeColumn.Cell(mockRowData));

    expect(shallowToJson(nameColumnWrapper)).toMatchSnapshot();
    expect(shallowToJson(removeColumnWrapper)).toMatchSnapshot();
  });

  describe('Describe table with data', () => {
    let wrapper;
    beforeEach(() => {
      const items = [
        {
          type: 'district Admin',
          name: 'user, sch',
          district_user_id: 'mockDistrictId',
          user_id: 'mockuserId',
          remove: true,
        },
      ];
      wrapper = shallow(
        <ManageAdminAccounts
          admins={items}
          currentUserId="mock-user-id"
          isDistrictAdmin
          showModal={showModalSpy}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Should click the first column when componentDidMount', () => {
      const firstColumnClickSpy = jest.fn();

      wrapper.instance().firstColumn = { click: firstColumnClickSpy };

      wrapper.instance().componentDidMount();

      expect(firstColumnClickSpy).toBeCalled();
    });

    it('Should not click the first column when componentDidMount and first column is not defined', () => {
      const firstColumnClickSpy = jest.fn();

      wrapper.instance().firstColumn = { click: firstColumnClickSpy };

      wrapper.instance().firstColumn = null;

      wrapper.instance().componentDidMount();
      expect(firstColumnClickSpy).not.toBeCalled();
    });

    it('should handleAddDistrictAdmin', () => {
      const modalData = {
        editMode: false,
        adminType: Constants.DISTRICT,
        accountType: Constants.DISTRICT_ADMINISTRATOR,
      };

      wrapper.instance().handleAddDistrictAdmin();

      expect(showModalSpy.mock.calls[0][0]).toEqual(ModalConstants.EDIT_ADMIN_MODAL);
      expect(showModalSpy.mock.calls[0][1]).toEqual(modalData);
    });

    it('should handleAddDistrictTech', () => {
      const modalData = {
        editMode: false,
        adminType: Constants.DISTRICT_TECHNICAL,
        accountType: Constants.DISTRICT_TECH,
      };

      wrapper.instance().handleAddDistrictTech();

      expect(showModalSpy.mock.calls[0][0]).toEqual(ModalConstants.EDIT_ADMIN_MODAL);
      expect(showModalSpy.mock.calls[0][1]).toEqual(modalData);
    });

    it('should handleAddSchoolAdmin', () => {
      const modalData = {
        editMode: false,
        adminType: Constants.SCHOOL,
        accountType: Constants.SCHOOL_ADMINISTRATOR,
      };

      wrapper.instance().handleAddSchoolAdmin();

      expect(showModalSpy.mock.calls[0][0]).toEqual(ModalConstants.EDIT_ADMIN_MODAL);
      expect(showModalSpy.mock.calls[0][1]).toEqual(modalData);
    });

    it('should handleAddSchoolTech', () => {
      const modalData = {
        editMode: false,
        adminType: Constants.SCHOOL_TECHNICAL,
        accountType: Constants.SCHOOL_TECH,
      };

      wrapper.instance().handleAddSchoolTech();

      expect(showModalSpy.mock.calls[0][0]).toEqual(ModalConstants.EDIT_ADMIN_MODAL);
      expect(showModalSpy.mock.calls[0][1]).toEqual(modalData);
    });
  });
});
