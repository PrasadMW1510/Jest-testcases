import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import ProfilePage from 'components/ProfilePage';
import ManageRoster from 'components/ManageRoster';
import { COHORT_TYPE, USER_ORG, USER_TYPE } from 'containers/App/constants';

import { ProfilePageContainer } from '../ProfilePageContainer';

describe('<ProfilePageContainer />', () => {
  let wrapper = null;
  let mockedGlobalState = null;
  let mockProfilePage = null;
  let mockProfilePageClassRequest = null;
  let smartBarSelections = null;
  let mockShowClassFormModal = null;
  let mockShowModal = null;
  let mockShowStudentFormModal = null;
  let mockShowTeacherFormModal = null;
  let mockShowDeactivateUserModal = null;
  let profilePageRequest = null;
  let profilePageForDistrictAdminRequest = null;
  let profilePageForSchoolAdminRequest = null;
  let profileUserType = null;
  let profileOrgType = null;
  let profilePageStudentRequest = null;
  let profilePageSchoolRequest = null;
  let profilePageGroupRequest = null;
  let profilePageTeacherRequest = null;
  let profilePageGradeRequest = null;

  beforeEach(() => {
    mockedGlobalState = fromJS({ profile: { first_name: 'John', last_name: 'Smith' } });
    mockProfilePage = fromJS({ profile: { first_name: 'John', last_name: 'Smith' } });

    profilePageRequest = jest.fn();
    profilePageStudentRequest = jest.fn();
    profilePageSchoolRequest = jest.fn();
    profilePageGroupRequest = jest.fn();
    profilePageTeacherRequest = jest.fn();
    profilePageGradeRequest = jest.fn();
    profilePageForDistrictAdminRequest = jest.fn();
    profilePageForSchoolAdminRequest = jest.fn();
    mockProfilePageClassRequest = jest.fn();
    mockShowClassFormModal = jest.fn();
    mockShowModal = jest.fn();
    mockShowStudentFormModal = jest.fn();
    mockShowTeacherFormModal = jest.fn();
    mockShowDeactivateUserModal = jest.fn();

    profileUserType = USER_TYPE.Tech;
    profileOrgType = USER_ORG.District;
  });

  describe('selectedCoh type is Grade', () => {
    beforeEach(() => {
      smartBarSelections = fromJS({ selectedCohType: COHORT_TYPE.Grade });

      wrapper = shallow(
        <ProfilePageContainer
          profile={mockedGlobalState}
          profilePage={mockProfilePage}
          profilePageClassRequest={mockProfilePageClassRequest}
          profilePageForDistrictAdminRequest={profilePageForDistrictAdminRequest}
          profilePageForSchoolAdminRequest={profilePageForSchoolAdminRequest}
          profilePageGradeRequest={profilePageGradeRequest}
          profilePageGroupRequest={profilePageGroupRequest}
          profilePageRequest={profilePageRequest}
          profilePageSchoolRequest={profilePageSchoolRequest}
          profilePageStudentRequest={profilePageStudentRequest}
          profilePageTeacherRequest={profilePageTeacherRequest}
          profileOrgType={profileOrgType}
          profileUserType={profileUserType}
          showModal={mockShowModal}
          showClassFormModal={mockShowClassFormModal}
          showDeactivateUserModal={mockShowDeactivateUserModal}
          showStudentFormModal={mockShowStudentFormModal}
          showTeacherFormModal={mockShowTeacherFormModal}
          smartBarSelections={smartBarSelections}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should contain a ProfilePage', () => {
      expect(wrapper.find(ProfilePage)).toBeTruthy();
    });

    it('should contain a ManageRoster', () => {
      expect(wrapper.find(ManageRoster)).toBeTruthy();
    });

    it('mockProfilePage is called with Teacher as default', () => {
      wrapper.setProps({
        profileUserType: USER_TYPE.Teacher,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('mockProfilePage is called with profileDetailsSchoolAdmin', () => {
      profileOrgType = USER_ORG.School;
      profileUserType = USER_TYPE.Administrator;
      wrapper.setProps({ profileOrgType, profileUserType });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('mockProfilePage is called with Administrator as default', () => {
      wrapper.setProps({
        profileUserType: USER_TYPE.Administrator,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('selectedCoh type is Teacher', () => {
    beforeEach(() => {
      smartBarSelections = fromJS({ selectedCohType: COHORT_TYPE.Teacher });

      wrapper = shallow(
        <ProfilePageContainer
          profile={mockedGlobalState}
          profilePage={mockProfilePage}
          profilePageClassRequest={mockProfilePageClassRequest}
          profilePageForDistrictAdminRequest={profilePageForDistrictAdminRequest}
          profilePageForSchoolAdminRequest={profilePageForSchoolAdminRequest}
          profilePageGradeRequest={profilePageGradeRequest}
          profilePageGroupRequest={profilePageGroupRequest}
          profilePageRequest={profilePageRequest}
          profilePageSchoolRequest={profilePageSchoolRequest}
          profilePageStudentRequest={profilePageStudentRequest}
          profilePageTeacherRequest={profilePageTeacherRequest}
          profileOrgType={profileOrgType}
          profileUserType={profileUserType}
          showModal={mockShowModal}
          showClassFormModal={mockShowClassFormModal}
          showDeactivateUserModal={mockShowDeactivateUserModal}
          showStudentFormModal={mockShowStudentFormModal}
          showTeacherFormModal={mockShowTeacherFormModal}
          smartBarSelections={smartBarSelections}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should contain a ProfilePage', () => {
      expect(wrapper.find(ProfilePage)).toBeTruthy();
    });

    it('should contain a ManageRoster', () => {
      expect(wrapper.find(ManageRoster)).toBeTruthy();
    });

    it('mockProfilePage is called with Teacher as default', () => {
      wrapper.setProps({
        profileUserType: USER_TYPE.Teacher,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('mockProfilePage is called with profileDetailsSchoolAdmin', () => {
      profileOrgType = USER_ORG.School;
      profileUserType = USER_TYPE.Administrator;
      wrapper.setProps({ profileOrgType, profileUserType });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('mockProfilePage is called with Administrator as default', () => {
      wrapper.setProps({
        profileUserType: USER_TYPE.Administrator,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('selectedCoh type is Class', () => {
    beforeEach(() => {
      smartBarSelections = fromJS({ selectedCohType: COHORT_TYPE.Class });

      wrapper = shallow(
        <ProfilePageContainer
          profile={mockedGlobalState}
          profilePage={mockProfilePage}
          profilePageClassRequest={mockProfilePageClassRequest}
          profilePageForDistrictAdminRequest={profilePageForDistrictAdminRequest}
          profilePageForSchoolAdminRequest={profilePageForSchoolAdminRequest}
          profilePageGradeRequest={profilePageGradeRequest}
          profilePageGroupRequest={profilePageGroupRequest}
          profilePageRequest={profilePageRequest}
          profilePageSchoolRequest={profilePageSchoolRequest}
          profilePageStudentRequest={profilePageStudentRequest}
          profilePageTeacherRequest={profilePageTeacherRequest}
          profileOrgType={profileOrgType}
          profileUserType={profileUserType}
          showModal={mockShowModal}
          showClassFormModal={mockShowClassFormModal}
          showDeactivateUserModal={mockShowDeactivateUserModal}
          showStudentFormModal={mockShowStudentFormModal}
          showTeacherFormModal={mockShowTeacherFormModal}
          smartBarSelections={smartBarSelections}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should contain a ProfilePage', () => {
      expect(wrapper.find(ProfilePage)).toBeTruthy();
    });

    it('should contain a ManageRoster', () => {
      expect(wrapper.find(ManageRoster)).toBeTruthy();
    });

    it('mockProfilePage is called with Teacher as default', () => {
      wrapper.setProps({
        profileUserType: USER_TYPE.Teacher,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('mockProfilePage is called with profileDetailsSchoolAdmin', () => {
      profileOrgType = USER_ORG.School;
      profileUserType = USER_TYPE.Administrator;
      wrapper.setProps({ profileOrgType, profileUserType });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('mockProfilePage is called with Administrator as default', () => {
      wrapper.setProps({
        profileUserType: USER_TYPE.Administrator,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('selectedCoh type is Group', () => {
    beforeEach(() => {
      smartBarSelections = fromJS({ selectedCohType: COHORT_TYPE.Group });

      wrapper = shallow(
        <ProfilePageContainer
          profile={mockedGlobalState}
          profilePage={mockProfilePage}
          profilePageClassRequest={mockProfilePageClassRequest}
          profilePageForDistrictAdminRequest={profilePageForDistrictAdminRequest}
          profilePageForSchoolAdminRequest={profilePageForSchoolAdminRequest}
          profilePageGradeRequest={profilePageGradeRequest}
          profilePageGroupRequest={profilePageGroupRequest}
          profilePageRequest={profilePageRequest}
          profilePageSchoolRequest={profilePageSchoolRequest}
          profilePageStudentRequest={profilePageStudentRequest}
          profilePageTeacherRequest={profilePageTeacherRequest}
          profileOrgType={profileOrgType}
          profileUserType={profileUserType}
          showModal={mockShowModal}
          showClassFormModal={mockShowClassFormModal}
          showDeactivateUserModal={mockShowDeactivateUserModal}
          showStudentFormModal={mockShowStudentFormModal}
          showTeacherFormModal={mockShowTeacherFormModal}
          smartBarSelections={smartBarSelections}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should contain a ProfilePage', () => {
      expect(wrapper.find(ProfilePage)).toBeTruthy();
    });

    it('should contain a ManageRoster', () => {
      expect(wrapper.find(ManageRoster)).toBeTruthy();
    });

    it('mockProfilePage is called with Teacher as default', () => {
      wrapper.setProps({
        profileUserType: USER_TYPE.Teacher,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('mockProfilePage is called with profileDetailsSchoolAdmin', () => {
      profileOrgType = USER_ORG.School;
      profileUserType = USER_TYPE.Administrator;
      wrapper.setProps({ profileOrgType, profileUserType });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('mockProfilePage is called with Administrator as default', () => {
      wrapper.setProps({
        profileUserType: USER_TYPE.Administrator,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('selectedCoh type is Student', () => {
    beforeEach(() => {
      smartBarSelections = fromJS({ selectedCohType: COHORT_TYPE.Student });

      wrapper = shallow(
        <ProfilePageContainer
          profile={mockedGlobalState}
          profilePage={mockProfilePage}
          profilePageClassRequest={mockProfilePageClassRequest}
          profilePageForDistrictAdminRequest={profilePageForDistrictAdminRequest}
          profilePageForSchoolAdminRequest={profilePageForSchoolAdminRequest}
          profilePageGradeRequest={profilePageGradeRequest}
          profilePageGroupRequest={profilePageGroupRequest}
          profilePageRequest={profilePageRequest}
          profilePageSchoolRequest={profilePageSchoolRequest}
          profilePageStudentRequest={profilePageStudentRequest}
          profilePageTeacherRequest={profilePageTeacherRequest}
          profileOrgType={profileOrgType}
          profileUserType={profileUserType}
          showModal={mockShowModal}
          showClassFormModal={mockShowClassFormModal}
          showDeactivateUserModal={mockShowDeactivateUserModal}
          showStudentFormModal={mockShowStudentFormModal}
          showTeacherFormModal={mockShowTeacherFormModal}
          smartBarSelections={smartBarSelections}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should contain a ProfilePage', () => {
      expect(wrapper.find(ProfilePage)).toBeTruthy();
    });

    it('should contain a ManageRoster', () => {
      expect(wrapper.find(ManageRoster)).toBeTruthy();
    });

    it('mockProfilePage is called with Teacher as default', () => {
      wrapper.setProps({
        profileUserType: USER_TYPE.Teacher,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('mockProfilePage is called with profileDetailsSchoolAdmin', () => {
      profileOrgType = USER_ORG.School;
      profileUserType = USER_TYPE.Administrator;
      wrapper.setProps({ profileOrgType, profileUserType });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('mockProfilePage is called with Administrator as default', () => {
      wrapper.setProps({
        profileUserType: USER_TYPE.Administrator,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('selectedCoh type is School', () => {
    beforeEach(() => {
      smartBarSelections = fromJS({ selectedCohType: COHORT_TYPE.School });

      wrapper = shallow(
        <ProfilePageContainer
          profile={mockedGlobalState}
          profilePage={mockProfilePage}
          profilePageClassRequest={mockProfilePageClassRequest}
          profilePageForDistrictAdminRequest={profilePageForDistrictAdminRequest}
          profilePageForSchoolAdminRequest={profilePageForSchoolAdminRequest}
          profilePageGradeRequest={profilePageGradeRequest}
          profilePageGroupRequest={profilePageGroupRequest}
          profilePageRequest={profilePageRequest}
          profilePageSchoolRequest={profilePageSchoolRequest}
          profilePageStudentRequest={profilePageStudentRequest}
          profilePageTeacherRequest={profilePageTeacherRequest}
          profileOrgType={profileOrgType}
          profileUserType={profileUserType}
          showModal={mockShowModal}
          showClassFormModal={mockShowClassFormModal}
          showDeactivateUserModal={mockShowDeactivateUserModal}
          showStudentFormModal={mockShowStudentFormModal}
          showTeacherFormModal={mockShowTeacherFormModal}
          smartBarSelections={smartBarSelections}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should contain a ProfilePage', () => {
      expect(wrapper.find(ProfilePage)).toBeTruthy();
    });

    it('should contain a ManageRoster', () => {
      expect(wrapper.find(ManageRoster)).toBeTruthy();
    });

    it('mockProfilePage is called with Teacher as default', () => {
      wrapper.setProps({
        profileUserType: USER_TYPE.Teacher,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('mockProfilePage is called with profileDetailsSchoolAdmin', () => {
      profileOrgType = USER_ORG.School;
      profileUserType = USER_TYPE.Administrator;
      wrapper.setProps({ profileOrgType, profileUserType });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('mockProfilePage is called with Administrator as default', () => {
      wrapper.setProps({
        profileUserType: USER_TYPE.Administrator,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('selectedCoh type is undefined', () => {
    beforeEach(() => {
      smartBarSelections = fromJS({});

      wrapper = shallow(
        <ProfilePageContainer
          profile={mockedGlobalState}
          profilePage={mockProfilePage}
          profilePageClassRequest={mockProfilePageClassRequest}
          profilePageForDistrictAdminRequest={profilePageForDistrictAdminRequest}
          profilePageForSchoolAdminRequest={profilePageForSchoolAdminRequest}
          profilePageGradeRequest={profilePageGradeRequest}
          profilePageGroupRequest={profilePageGroupRequest}
          profilePageRequest={profilePageRequest}
          profilePageSchoolRequest={profilePageSchoolRequest}
          profilePageStudentRequest={profilePageStudentRequest}
          profilePageTeacherRequest={profilePageTeacherRequest}
          profileOrgType={profileOrgType}
          profileUserType={profileUserType}
          showModal={mockShowModal}
          showClassFormModal={mockShowClassFormModal}
          showDeactivateUserModal={mockShowDeactivateUserModal}
          showStudentFormModal={mockShowStudentFormModal}
          showTeacherFormModal={mockShowTeacherFormModal}
          smartBarSelections={smartBarSelections}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should contain a ProfilePage', () => {
      expect(wrapper.find(ProfilePage)).toBeTruthy();
    });

    it('should contain a ManageRoster', () => {
      expect(wrapper.find(ManageRoster)).toBeTruthy();
    });

    it('mockProfilePage is called with Teacher as default', () => {
      wrapper.setProps({
        profileUserType: USER_TYPE.Teacher,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('mockProfilePage is called with profileDetailsSchoolAdmin', () => {
      profileOrgType = USER_ORG.School;
      profileUserType = USER_TYPE.Administrator;
      wrapper.setProps({ profileOrgType, profileUserType });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('mockProfilePage is called with Administrator as default', () => {
      wrapper.setProps({
        profileUserType: USER_TYPE.Administrator,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
