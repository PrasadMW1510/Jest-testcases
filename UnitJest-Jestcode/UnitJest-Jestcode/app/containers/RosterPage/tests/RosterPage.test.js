import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import Immutable from 'immutable';
import { MemoryRouter as Router } from 'react-router-dom';

import ManageStudentsTeachers from 'components/ManageStudentsTeachers';
import AdvancedSettingsContainer from 'containers/AdvancedSettingsContainer';
import ProfilePageContainer from 'containers/ProfilePageContainer';
import ProgramAvailableRosterContainer from 'containers/ProgramAvailableRosterContainer';
import ProgramSettingsContainer from 'containers/ProgramSettingsContainer';
import UsageSummaryContainer from 'containers/UsageSummaryContainer';

import { ROUTE_PATHS } from '../constants';
import { RosterPage } from '../RosterPage';

describe('<RosterPage />', () => {
  let wrapper = null;
  let mockLocation = null;
  let smartBarSelections = null;
  let loginData = null;
  let mockSelectedCohortType = null;
  const mockedRender = jest.fn();

  describe('Administrator', () => {
    beforeEach(() => {
      mockLocation = {
        pathname: ROUTE_PATHS.roster,
      };
      smartBarSelections = Immutable.fromJS({
        selectedCohType: '',
      });
      mockSelectedCohortType = '';
      loginData = Immutable.fromJS({});

      wrapper = shallow(
        <RosterPage
          profileUserType="Administrator"
          isGlobalLoading={false}
          isManageAdminAccountsLoading={false}
          isUsageSummaryLoading={false}
          isStudentEnrollmentLoading={false}
          isTeacherAccessLoading={false}
          isTeacherAccessAppLoading={false}
          isProgramSettingsLoading={false}
          location={mockLocation}
          loginData={loginData}
          smartBarSelections={smartBarSelections}
          selectedCohortType={mockSelectedCohortType}
        />
      );
    });

    it('should match snapshot', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render ManageStudentsTeachers for StudentLicenses', () => {
      wrapper.find({ path: '/roster/manageStudentLicenses' }).prop('render')(mockedRender);
      expect(wrapper.find(ManageStudentsTeachers)).toBeTruthy();
    });

    it('should render ManageStudentsTeachers for TeacherLicenses', () => {
      wrapper.find({ path: '/roster/manageTeacherLicenses' }).prop('render')(mockedRender);
      expect(wrapper.find(ManageStudentsTeachers)).toBeTruthy();
    });

    it('should render ManageStudentsTeachers for TeacherAccess', () => {
      wrapper.find({ path: '/roster/manageTeacherAccess' }).prop('render')(mockedRender);
      expect(wrapper.find(ManageStudentsTeachers)).toBeTruthy();
    });
  });

  describe('NonAdministrator', () => {
    beforeEach(() => {
      mockLocation = {
        pathname: ROUTE_PATHS.roster,
      };

      smartBarSelections = Immutable.fromJS({
        selectedCohType: '',
      });

      loginData = Immutable.fromJS({});

      wrapper = shallow(
        <RosterPage
          profileUserType="NonAdministrator"
          isGlobalLoading={false}
          isUsageSummaryLoading={false}
          isStudentEnrollmentLoading={false}
          isTeacherAccessLoading={false}
          isTeacherAccessAppLoading={false}
          isManageAdminAccountsLoading={false}
          isProgramSettingsLoading={false}
          location={mockLocation}
          loginData={loginData}
          smartBarSelections={smartBarSelections}
          selectedCohortType={mockSelectedCohortType}
        />
      );
    });

    it('should render ProfilePageContainer', () => {
      expect(wrapper.find(ProfilePageContainer)).toHaveLength(0);
    });

    it('should render UsageSummaryContainer', () => {
      expect(wrapper.find(UsageSummaryContainer)).toHaveLength(0);
    });

    it('should render ProgramAvailableRosterContainer', () => {
      expect(wrapper.find(ProgramAvailableRosterContainer)).toHaveLength(0);
    });

    it('should render AdvancedSettingsContainer', () => {
      expect(wrapper.find(AdvancedSettingsContainer)).toHaveLength(0);
    });

    it('should match the Teacher snapshot', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render a different route for roster', () => {
      const mockedRoute = shallow(<Router path="/roster" />);
      expect(mockedRoute.find('div.roster-content-panel')).toBeTruthy();
    });

    it('should render a different route for roster', () => {
      const mockedRoute = shallow(<Router path="/roster/programSettings" />);
      expect(mockedRoute.find(ProgramSettingsContainer)).toHaveLength(0);
    });

    it('should render ManageStudentsTeachers for StudentEnrollment', () => {
      wrapper.find({ path: '/roster/manageStudentEnrollment' }).prop('render')(mockedRender);
      expect(wrapper.find(ManageStudentsTeachers)).toBeTruthy();
    });

    it('should render a different route for roster', () => {
      wrapper.find('.rosterRoute').prop('render')(mockedRender);
      expect(wrapper.find('div.roster-content-panel')).toBeTruthy();
    });
  });

  describe('isLoading', () => {
    describe('isGlobalLoading', () => {
      beforeEach(() => {
        mockLocation = {
          pathname: ROUTE_PATHS.roster,
        };
        smartBarSelections = Immutable.fromJS({
          selectedCohType: '',
        });

        loginData = Immutable.fromJS({});
      });

      describe('is false', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading={false}
              isUsageSummaryLoading={false}
              isStudentEnrollmentLoading={false}
              isTeacherAccessLoading={false}
              isTeacherAccessAppLoading={false}
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns false', () => {
          expect(wrapper.instance().isLoading()).toBeFalsy();
        });
      });

      describe('is true', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading
              isManageAdminAccountsLoading={false}
              isUsageSummaryLoading={false}
              isStudentEnrollmentLoading={false}
              isTeacherAccessLoading={false}
              isTeacherAccessAppLoading={false}
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns true', () => {
          expect(wrapper.instance().isLoading()).toBeTruthy();
        });
      });
    });

    describe('isGlobalLoading is false, pathname is /roster', () => {
      beforeEach(() => {
        mockLocation = {
          pathname: ROUTE_PATHS.roster,
        };
        smartBarSelections = Immutable.fromJS({
          selectedCohType: '',
        });

        loginData = Immutable.fromJS({});
      });

      describe('isUsageSummaryLoading is false', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading={false}
              isUsageSummaryLoading={false}
              isStudentEnrollmentLoading={false}
              isTeacherAccessLoading={false}
              isTeacherAccessAppLoading={false}
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns false', () => {
          expect(wrapper.instance().isLoading()).toBeFalsy();
        });
      });

      describe('isUsageSummaryLoading is true', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading={false}
              isUsageSummaryLoading
              isStudentEnrollmentLoading={false}
              isTeacherAccessLoading={false}
              isTeacherAccessAppLoading={false}
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns true', () => {
          expect(wrapper.instance().isLoading()).toBeTruthy();
        });
      });
    });

    describe('isGlobalLoading is false, pathname is /roster/manageAdminAccounts', () => {
      beforeEach(() => {
        mockLocation = {
          pathname: ROUTE_PATHS.manageAdminAccounts,
        };
      });

      describe('isManageAdminAccountsLoading is false', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading={false}
              isUsageSummaryLoading={false}
              isStudentEnrollmentLoading={false}
              isTeacherAccessLoading={false}
              isTeacherAccessAppLoading={false}
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns false', () => {
          expect(wrapper.instance().isLoading()).toBeFalsy();
        });
      });

      describe('isManageAdminAccountsLoading is true', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading
              isUsageSummaryLoading={false}
              isStudentEnrollmentLoading={false}
              isTeacherAccessLoading={false}
              isTeacherAccessAppLoading={false}
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns true', () => {
          expect(wrapper.instance().isLoading()).toBeTruthy();
        });
      });
    });

    describe('isGlobalLoading is false, pathname is /roster/programSettings', () => {
      beforeEach(() => {
        mockLocation = {
          pathname: ROUTE_PATHS.programSettings,
        };
        smartBarSelections = Immutable.fromJS({
          selectedCohType: '',
        });

        loginData = Immutable.fromJS({});
      });

      describe('isProgramSettingsLoading is false', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading={false}
              isUsageSummaryLoading={false}
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns false', () => {
          expect(wrapper.instance().isLoading()).toBeFalsy();
        });
      });

      describe('isProgramSettingsLoading is true', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading={false}
              isUsageSummaryLoading={false}
              isStudentEnrollmentLoading={false}
              isTeacherAccessLoading={false}
              isTeacherAccessAppLoading={false}
              isProgramSettingsLoading
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns true', () => {
          expect(wrapper.instance().isLoading()).toBeTruthy();
        });
      });
    });

    describe('isGlobalLoading is false, pathname is /roster/manageStudentEnrollment', () => {
      beforeEach(() => {
        mockLocation = {
          pathname: ROUTE_PATHS.manageStudentEnrollment,
        };
      });

      describe('isStudentEnrollmentLoading is false', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading={false}
              isUsageSummaryLoading={false}
              isStudentEnrollmentLoading={false}
              isTeacherAccessLoading={false}
              isTeacherAccessAppLoading={false}
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns false', () => {
          expect(wrapper.instance().isLoading()).toBeFalsy();
        });
      });

      describe('isStudentEnrollmentLoading is true', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading={false}
              isStudentEnrollmentLoading
              isUsageSummaryLoading={false}
              isTeacherAccessLoading
              isTeacherAccessAppLoading={false}
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns true', () => {
          expect(wrapper.instance().isLoading()).toBeTruthy();
        });
      });

      describe('isTeacherAccessLoading is false', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading={false}
              isUsageSummaryLoading={false}
              isStudentEnrollmentLoading={false}
              isTeacherAccessLoading={false}
              isTeacherAccessAppLoading={false}
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns false', () => {
          expect(wrapper.instance().isLoading()).toBeFalsy();
        });
      });

      describe('isTeacherAccessLoading is true', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading={false}
              isUsageSummaryLoading={false}
              isStudentEnrollmentLoading={false}
              isTeacherAccessLoading
              isTeacherAccessAppLoading={false}
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns true', () => {
          expect(wrapper.instance().isLoading()).toBeTruthy();
        });
      });

      describe('isTeacherAccessAppLoading is false', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading={false}
              isUsageSummaryLoading={false}
              isStudentEnrollmentLoading={false}
              isTeacherAccessLoading={false}
              isTeacherAccessAppLoading={false}
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns false', () => {
          expect(wrapper.instance().isLoading()).toBeFalsy();
        });
      });

      describe('isTeacherAccessAppLoading is true', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading={false}
              isUsageSummaryLoading={false}
              isStudentEnrollmentLoading={false}
              isTeacherAccessLoading={false}
              isTeacherAccessAppLoading
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns true', () => {
          expect(wrapper.instance().isLoading()).toBeTruthy();
        });
      });
    });

    describe('isGlobalLoading is false, pathname is /roster/manageTeacherAccess', () => {
      beforeEach(() => {
        mockLocation = {
          pathname: ROUTE_PATHS.manageTeacherAccess,
        };
      });

      describe('isStudentEnrollmentLoading is false', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading={false}
              isUsageSummaryLoading={false}
              isStudentEnrollmentLoading={false}
              isTeacherAccessLoading={false}
              isTeacherAccessAppLoading={false}
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns false', () => {
          expect(wrapper.instance().isLoading()).toBeFalsy();
        });
      });

      describe('isStudentEnrollmentLoading is true', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading={false}
              isStudentEnrollmentLoading
              isUsageSummaryLoading={false}
              isTeacherAccessLoading
              isTeacherAccessAppLoading={false}
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns true', () => {
          expect(wrapper.instance().isLoading()).toBeTruthy();
        });
      });

      describe('isTeacherAccessLoading is false', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading={false}
              isUsageSummaryLoading={false}
              isStudentEnrollmentLoading={false}
              isTeacherAccessLoading={false}
              isTeacherAccessAppLoading={false}
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns false', () => {
          expect(wrapper.instance().isLoading()).toBeFalsy();
        });
      });

      describe('isTeacherAccessLoading is true', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading={false}
              isUsageSummaryLoading={false}
              isStudentEnrollmentLoading={false}
              isTeacherAccessLoading
              isTeacherAccessAppLoading={false}
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns true', () => {
          expect(wrapper.instance().isLoading()).toBeTruthy();
        });
      });

      describe('isTeacherAccessAppLoading is false', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading={false}
              isUsageSummaryLoading={false}
              isStudentEnrollmentLoading={false}
              isTeacherAccessLoading={false}
              isTeacherAccessAppLoading={false}
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns false', () => {
          expect(wrapper.instance().isLoading()).toBeFalsy();
        });
      });

      describe('isTeacherAccessAppLoading is true', () => {
        beforeEach(() => {
          wrapper = shallow(
            <RosterPage
              profileUserType="Administrator"
              isGlobalLoading={false}
              isManageAdminAccountsLoading={false}
              isUsageSummaryLoading={false}
              isStudentEnrollmentLoading={false}
              isTeacherAccessLoading={false}
              isTeacherAccessAppLoading
              isProgramSettingsLoading={false}
              location={mockLocation}
              loginData={loginData}
              smartBarSelections={smartBarSelections}
              selectedCohortType={mockSelectedCohortType}
            />
          );
        });

        it('should match snapshot', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('isLoading returns true', () => {
          expect(wrapper.instance().isLoading()).toBeTruthy();
        });
      });
    });

    describe('isGlobalLoading is false, pathname is not defined', () => {
      beforeEach(() => {
        mockLocation = {
          pathname: 'mockPathName',
        };
        const mockProfileOrgType = 'District';
        wrapper = shallow(
          <RosterPage
            profileUserType="Administrator"
            isGlobalLoading={false}
            isManageAdminAccountsLoading={false}
            isUsageSummaryLoading={false}
            isStudentEnrollmentLoading={false}
            isTeacherAccessLoading={false}
            isTeacherAccessAppLoading={false}
            isProgramSettingsLoading={false}
            location={mockLocation}
            loginData={loginData}
            smartBarSelections={smartBarSelections}
            selectedCohortType={mockSelectedCohortType}
            profileOrgType={mockProfileOrgType}
          />
        );
      });

      it('should match snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('isLoading returns false', () => {
        expect(wrapper.instance().isLoading()).toBeFalsy();
      });
    });
  });
});
