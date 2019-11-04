import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';

import { USER_ORG } from 'containers/App/constants';
import * as AdminConstants from 'components/ManageAdminAccounts';
import { EditAdminContainer } from '../EditAdminContainer';

describe('<EditAdminContainer />', () => {
  let wrapper = null;
  let wrapperInstance = null;
  let mockProfileData = null;
  let mockEditAdminContainerRequest = null;
  let mockHideModal = null;
  let mockShowModal;
  let mockPostSaveAdminRequest = null;
  let mockPostAddAdminRequest = null;
  let mockShowEditAdminModalWarning = null;
  let mockPasswordConfig = null;
  let mockPermissionsData = null;
  let mockData = null;
  let mockSchools;
  let mockAdminToEditData;

  beforeEach(() => {
    mockProfileData = fromJS({
      user_type: ['mock_user_type'],
      district_user_id: ['mock_district_user_id'],
      sps_id: ['mock_sps_id'],
      prefix: ['mock_prefix'],
      first_name: ['mock_first_name'],
      last_name: ['mock_last_name'],
      title: ['mock_title'],
      suffix: ['mock_suffix'],
      email: ['mock_email'],
      user_name: ['mock_user_name'],
      password: ['mock_password'],
      password_hint: ['mock_password_hint'],
      organizations: [{ organization: [{ name: ['mock_org_name'], org_id: ['mock_org_id'] }] }],
    });

    mockEditAdminContainerRequest = jest.fn();
    mockHideModal = jest.fn();
    mockShowModal = jest.fn();
    mockPostSaveAdminRequest = jest.fn();
    mockPostAddAdminRequest = jest.fn();

    mockShowEditAdminModalWarning = jest.fn();
    mockData = { editMode: true, editingSameAccount: true };

    mockPasswordConfig = fromJS({
      configs: [],
    });

    mockPermissionsData = fromJS([
      {
        name: ['View OwnProfile'],
        id: ['100'],
      },
    ]);

    mockAdminToEditData = fromJS({
      permissions: mockPermissionsData.toJS(),
    });

    mockSchools = fromJS([
      { name: ['school1'], org_id: ['org1'] },
      { name: ['school2'], org_id: ['org2'] },
    ]);
  });

  describe('userOrg is District', () => {
    beforeEach(() => {
      wrapper = shallow(
        <EditAdminContainer
          data={mockData}
          hideModal={mockHideModal}
          showModal={mockShowModal}
          editAdminContainerRequest={mockEditAdminContainerRequest}
          passwordConfigs={mockPasswordConfig}
          permissionsData={mockPermissionsData}
          postSaveAdminRequest={mockPostSaveAdminRequest}
          postAddAdminRequest={mockPostAddAdminRequest}
          profileData={mockProfileData}
          showEditAdminModalWarning={mockShowEditAdminModalWarning}
          userOrg={USER_ORG.District}
          schools={mockSchools}
        />
      );

      wrapperInstance = wrapper.instance();
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should close modal on handleCancel', () => {
      wrapperInstance.handleCancel();
      expect(mockHideModal).toHaveBeenCalled();
    });

    describe('handleSave', () => {
      it('username value has been change', () => {
        const mockValues = fromJS({
          user_name: 'mock_user_name_updated',
        });

        wrapperInstance.handleSave(mockValues);
        expect(mockShowEditAdminModalWarning).toHaveBeenCalledWith({
          values: mockValues,
          isTeacher: false,
          editingSameAccount: true,
        });
      });

      it('username value has not been changed', () => {
        const mockValues = fromJS({
          user_name: 'mock_user_name',
          password: 'updatedPassword',
        });

        wrapperInstance.handleSave(mockValues);
        expect(mockPostSaveAdminRequest).toMatchSnapshot();
      });
    });
  });

  describe('userOrg is School', () => {
    beforeEach(() => {
      wrapper = shallow(
        <EditAdminContainer
          data={mockData}
          hideModal={mockHideModal}
          showModal={mockShowModal}
          editAdminContainerRequest={mockEditAdminContainerRequest}
          passwordConfigs={mockPasswordConfig}
          adminToEditData={mockAdminToEditData}
          permissionsData={mockPermissionsData}
          postSaveAdminRequest={mockPostSaveAdminRequest}
          postAddAdminRequest={mockPostAddAdminRequest}
          profileData={mockProfileData}
          showEditAdminModalWarning={mockShowEditAdminModalWarning}
          userOrg={USER_ORG.School}
        />
      );

      wrapperInstance = wrapper.instance();
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should close modal on handleCancel', () => {
      wrapperInstance.handleCancel();
      expect(mockHideModal).toHaveBeenCalled();
    });

    describe('handleSave', () => {
      it('username value has been change', () => {
        const mockValues = fromJS({
          user_name: 'mock_user_name_updated',
        });

        wrapperInstance.handleSave(mockValues);
        expect(mockShowEditAdminModalWarning).toHaveBeenCalledWith({
          values: mockValues,
          isTeacher: false,
          editingSameAccount: true,
        });
      });

      it('username value has not been changed', () => {
        const mockValues = fromJS({
          user_name: 'mock_user_name',
          password: 'updatedPassword',
        });

        wrapperInstance.handleSave(mockValues);
        expect(mockPostSaveAdminRequest).toMatchSnapshot();
      });
    });
  });

  describe('EditAdminContainer edit mode is false', () => {
    const modalData = {
      editMode: false,
      adminType: AdminConstants.DISTRICT,
      accountType: AdminConstants.DISTRICT_ADMINISTRATOR,
    };

    beforeEach(() => {
      wrapper = shallow(
        <EditAdminContainer
          data={modalData}
          hideModal={mockHideModal}
          showModal={mockShowModal}
          editAdminContainerRequest={mockEditAdminContainerRequest}
          passwordConfigs={mockPasswordConfig}
          permissionsData={mockPermissionsData}
          postSaveAdminRequest={mockPostSaveAdminRequest}
          postAddAdminRequest={mockPostAddAdminRequest}
          adminToEditData={mockAdminToEditData}
          profileData={mockProfileData}
          showEditAdminModalWarning={mockShowEditAdminModalWarning}
          userOrg={USER_ORG.District}
          schools={mockSchools}
        />
      );

      wrapperInstance = wrapper.instance();
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    describe('handleSave', () => {
      it('username value has not been changed', () => {
        const mockValues = fromJS({
          user_name: 'mock_user_name',
          password: 'updatedPassword',
        });
        const mockPermissionIds = [100, 500, 1500];

        wrapperInstance.handleSave(mockValues, mockPermissionIds);
        expect(mockPostAddAdminRequest).toHaveBeenCalledWith(mockValues, mockPermissionIds);
      });
    });
  });

  describe('EditAdminContainer edit mode is false and School Type', () => {
    const modalData = {
      editMode: false,
      adminType: AdminConstants.SCHOOL,
      accountType: AdminConstants.SCHOOL_ADMINISTRATOR,
    };

    beforeEach(() => {
      wrapper = shallow(
        <EditAdminContainer
          data={modalData}
          hideModal={mockHideModal}
          showModal={mockShowModal}
          editAdminContainerRequest={mockEditAdminContainerRequest}
          passwordConfigs={mockPasswordConfig}
          permissionsData={mockPermissionsData}
          postSaveAdminRequest={mockPostSaveAdminRequest}
          postAddAdminRequest={mockPostAddAdminRequest}
          adminToEditData={mockAdminToEditData}
          profileData={mockProfileData}
          showEditAdminModalWarning={mockShowEditAdminModalWarning}
          userOrg={USER_ORG.District}
          schools={mockSchools}
        />
      );

      wrapperInstance = wrapper.instance();
    });
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to render with no schools', () => {
      wrapper = (
        <EditAdminContainer
          data={modalData}
          hideModal={mockHideModal}
          showModal={mockShowModal}
          editAdminContainerRequest={mockEditAdminContainerRequest}
          passwordConfigs={mockPasswordConfig}
          permissionsData={mockPermissionsData}
          postSaveAdminRequest={mockPostSaveAdminRequest}
          postAddAdminRequest={mockPostAddAdminRequest}
          adminToEditData={mockAdminToEditData}
          profileData={mockProfileData}
          showEditAdminModalWarning={mockShowEditAdminModalWarning}
          userOrg={USER_ORG.District}
          schools={null}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('EditAdminContainer edit mode is true and editingSameAccount is false', () => {
    const modalData = {
      editMode: true,
      adminType: AdminConstants.SCHOOL,
      editingSameAccount: false,
      accountType: AdminConstants.SCHOOL_ADMINISTRATOR,
    };

    const mockAdminToEditUserOrgId = 'test-admin-id';

    beforeEach(() => {
      wrapper = shallow(
        <EditAdminContainer
          data={modalData}
          hideModal={mockHideModal}
          showModal={mockShowModal}
          editAdminContainerRequest={mockEditAdminContainerRequest}
          passwordConfigs={mockPasswordConfig}
          permissionsData={mockPermissionsData}
          postSaveAdminRequest={mockPostSaveAdminRequest}
          postAddAdminRequest={mockPostAddAdminRequest}
          adminToEditData={mockAdminToEditData}
          adminToEditUserOrgId={mockAdminToEditUserOrgId}
          profileData={mockProfileData}
          showEditAdminModalWarning={mockShowEditAdminModalWarning}
          userOrg={USER_ORG.District}
          schools={mockSchools}
        />
      );

      wrapperInstance = wrapper.instance();
    });
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('EditAdminContainer defaultMode is true', () => {
    const modalData = {
      editMode: true,
      editingSameAccount: true,
      defaultMode: true,
    };

    const mockAdminToEditUserOrgId = 'test-admin-id';

    beforeEach(() => {
      wrapper = shallow(
        <EditAdminContainer
          data={modalData}
          hideModal={mockHideModal}
          showModal={mockShowModal}
          editAdminContainerRequest={mockEditAdminContainerRequest}
          passwordConfigs={mockPasswordConfig}
          permissionsData={mockPermissionsData}
          postSaveAdminRequest={mockPostSaveAdminRequest}
          postAddAdminRequest={mockPostAddAdminRequest}
          adminToEditData={mockAdminToEditData}
          adminToEditUserOrgId={mockAdminToEditUserOrgId}
          profileData={mockProfileData}
          showEditAdminModalWarning={mockShowEditAdminModalWarning}
          userOrg={USER_ORG.District}
          schools={mockSchools}
        />
      );

      wrapperInstance = wrapper.instance();
    });
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('showModal when componentDidMount', () => {
      wrapper.instance().componentDidMount();
      expect(mockShowModal).toHaveBeenCalled();
    });

    it('showModal when cancel is pressed', () => {
      wrapper.instance().handleCancel();
      expect(mockShowModal).toHaveBeenCalled();
    });
  });
});
