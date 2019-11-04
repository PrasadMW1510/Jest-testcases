import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import { USER_ORG } from 'containers/App/constants';

import { AddEditTeacher } from '../AddEditTeacher';

describe('<AddEditTeacher />', () => {
  let wrapper = null;
  let wrapperInstance = null;

  let mockAddEditTeacherRequest = null;
  let mockData = null;
  let mockHideModal = null;
  let mockPasswordConfigs = null;
  let mockPermissionsData = null;
  let mockPostSaveTeacherRequest = null;
  let mockPostAddTeacherRequest = null;
  let mockPostSaveTeacherMIARequest = null;
  let mockProfileData = null;
  let mockSchoolsAndClasses = null;
  let mockShowEditAdminModalWarning = null;

  beforeEach(() => {
    mockAddEditTeacherRequest = jest.fn();
    mockData = { editMode: true };
    mockHideModal = jest.fn();
    mockShowEditAdminModalWarning = jest.fn();
    mockPasswordConfigs = fromJS({
      configs: [],
    });
    mockPermissionsData = fromJS([
      {
        name: ['View OwnProfile'],
        id: ['100'],
      },
    ]);
    mockPostSaveTeacherRequest = jest.fn();
    mockPostAddTeacherRequest = jest.fn();
    mockPostSaveTeacherMIARequest = jest.fn();
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
      classes: fromJS([
        {
          class: [
            {
              class_id: [1],
              name: ['mockClass1'],
            },
            {
              class_id: [2],
              name: ['mockClass2'],
            },
          ],
        },
      ]),
    });

    mockSchoolsAndClasses = fromJS({
      school: [
        {
          school_id: [1],
          school_name: ['mockSchool1'],
          classes: [
            {
              class: [
                {
                  class_id: [1],
                  class_name: ['mockClass1'],
                },
                {
                  class_id: [2],
                  class_name: ['mockClass2'],
                },
              ],
            },
          ],
        },
        {
          school_id: [2],
          school_name: ['mockSchool2'],
          classes: [
            {
              class: [
                {
                  class_id: [3],
                  class_name: ['mockClass3'],
                },
                {
                  class_id: [4],
                  class_name: ['mockClass4'],
                },
              ],
            },
          ],
        },
      ],
    });

    wrapper = shallow(
      <AddEditTeacher
        addEditTeacherRequest={mockAddEditTeacherRequest}
        data={mockData}
        hideModal={mockHideModal}
        passwordConfigs={mockPasswordConfigs}
        permissionsData={mockPermissionsData}
        postSaveTeacherRequest={mockPostSaveTeacherRequest}
        postAddTeacherRequest={mockPostAddTeacherRequest}
        postSaveTeacherMIARequest={mockPostSaveTeacherMIARequest}
        profileData={mockProfileData}
        schoolsAndClasses={mockSchoolsAndClasses}
        showEditAdminModalWarning={mockShowEditAdminModalWarning}
        userOrg={USER_ORG.Teacher}
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
        isTeacher: true,
      });
    });

    it('username value has not been changed', () => {
      const mockValues = fromJS({
        user_name: 'mock_user_name',
        password: 'updatedPassword',
      });
      const mockPermissionsChecked = ['100'];

      wrapperInstance.handleSave(mockValues, mockPermissionsChecked);
      expect(mockPostSaveTeacherRequest).toHaveBeenCalledWith(mockValues, mockPermissionsChecked);
    });
  });

  describe('AddEditTeacher is adding', () => {
    const modalData = { editMode: false };

    beforeEach(() => {
      wrapper = shallow(
        <AddEditTeacher
          addEditTeacherRequest={mockAddEditTeacherRequest}
          data={modalData}
          hideModal={mockHideModal}
          passwordConfigs={mockPasswordConfigs}
          permissionsData={mockPermissionsData}
          postSaveTeacherRequest={mockPostSaveTeacherRequest}
          postAddTeacherRequest={mockPostAddTeacherRequest}
          postSaveTeacherMIARequest={mockPostSaveTeacherMIARequest}
          profileData={mockProfileData}
          schoolsAndClasses={mockSchoolsAndClasses}
          showEditAdminModalWarning={mockShowEditAdminModalWarning}
          userOrg={USER_ORG.District}
        />
      );
      wrapperInstance = wrapper.instance();
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to render correctly', () => {
      expect(wrapperInstance.getInitialValues()).toMatchSnapshot();
    });
  });
});
