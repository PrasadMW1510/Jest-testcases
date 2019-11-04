/**
 *
 * ManageStudentsTeachers
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar, { NavItem } from 'components/NavBar';
import { Link } from 'react-router-dom';
import TeacherAccessTableContainer from 'containers/TeacherAccessTableContainer';
import StudentEnrollmentTableContainer from 'containers/StudentEnrollmentTableContainer';
import { ROUTE_PATHS } from 'containers/RosterPage/constants';
import { COHORT_TYPE, USER_ORG } from 'containers/App/constants';

import '../NavBar/NavBarThemeTabs.scss';
import './ManageStudentsTeachers.scss';
import { TAB } from './constants';

class ManageStudentsTeachers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.tab, // default active tab
      isolateTab: false,
    };
  }

  handleTabReset = () => this.setState({ isolateTab: false });

  handleTabIsolate = () => this.setState({ isolateTab: true });

  handleTabClick = ev => this.setState({ activeTab: ev.currentTarget.id });

  render = () => {
    const { smartBarSelections, loginData } = this.props;
    const cohortType = smartBarSelections.getIn(['selectedCohType']);
    const orgType = loginData.getIn(['user_org', 0]);

    let tabs = [];
    if (orgType === USER_ORG.District) {
      if (cohortType === COHORT_TYPE.School) {
        tabs = [
          {
            id: TAB.StudentLicensing,
            label: 'Student Licensing',
            route: ROUTE_PATHS.manageStudentLicenses,
          },
          {
            id: TAB.StudentEnrollment,
            label: 'Student Enrollment',
            route: ROUTE_PATHS.manageStudentEnrollment,
          },
          {
            id: TAB.TeacherLicensing,
            label: 'Teacher Licensing',
            route: ROUTE_PATHS.manageTeacherLicenses,
          },
          {
            id: TAB.TeacherAccess,
            label: 'Teacher Access',
            route: ROUTE_PATHS.manageTeacherAccess,
          },
        ];
      } else if (cohortType === COHORT_TYPE.Grade || cohortType === COHORT_TYPE.Teacher) {
        tabs = [
          {
            id: TAB.StudentEnrollment,
            label: 'Student Enrollment',
            route: ROUTE_PATHS.manageStudentEnrollment,
          },
          {
            id: TAB.TeacherAccess,
            label: 'Teacher Access',
            route: ROUTE_PATHS.manageTeacherAccess,
          },
        ];
      } else if (
        cohortType === COHORT_TYPE.Class ||
        cohortType === COHORT_TYPE.Group ||
        cohortType === COHORT_TYPE.Student
      ) {
        tabs = [
          {
            id: TAB.StudentEnrollment,
            label: 'Student Enrollment',
            route: ROUTE_PATHS.manageStudentEnrollment,
          },
        ];
      } else {
        tabs = [
          {
            id: TAB.StudentLicensing,
            label: 'Student Licensing',
            route: ROUTE_PATHS.manageStudentLicenses,
          },
          {
            id: TAB.StudentEnrollment,
            label: 'Student Enrollment',
            route: ROUTE_PATHS.manageStudentEnrollment,
          },
          {
            id: TAB.TeacherLicensing,
            label: 'Teacher Licensing',
            route: ROUTE_PATHS.manageTeacherLicenses,
          },
          {
            id: TAB.TeacherAccess,
            label: 'Teacher Access',
            route: ROUTE_PATHS.manageTeacherAccess,
          },
        ];
      }
    } else if (orgType === USER_ORG.School) {
      if (cohortType === COHORT_TYPE.Grade || cohortType === COHORT_TYPE.Teacher) {
        tabs = [
          {
            id: TAB.StudentEnrollment,
            label: 'Student Enrollment',
            route: ROUTE_PATHS.manageStudentEnrollment,
          },
          {
            id: TAB.TeacherAccess,
            label: 'Teacher Access',
            route: ROUTE_PATHS.manageTeacherAccess,
          },
        ];
      } else if (
        cohortType === COHORT_TYPE.Class ||
        cohortType === COHORT_TYPE.Group ||
        cohortType === COHORT_TYPE.Student
      ) {
        tabs = [
          {
            id: TAB.StudentEnrollment,
            label: 'Student Enrollment',
            route: ROUTE_PATHS.manageStudentEnrollment,
          },
        ];
      } else {
        tabs = [
          {
            id: TAB.StudentLicensing,
            label: 'Student Licensing',
            route: ROUTE_PATHS.manageStudentLicenses,
          },
          {
            id: TAB.StudentEnrollment,
            label: 'Student Enrollment',
            route: ROUTE_PATHS.manageStudentEnrollment,
          },
          {
            id: TAB.TeacherLicensing,
            label: 'Teacher Licensing',
            route: ROUTE_PATHS.manageTeacherLicenses,
          },
          {
            id: TAB.TeacherAccess,
            label: 'Teacher Access',
            route: ROUTE_PATHS.manageTeacherAccess,
          },
        ];
      }
    } else if (orgType === USER_ORG.Teacher) {
      if (
        cohortType === COHORT_TYPE.Class ||
        cohortType === COHORT_TYPE.Group ||
        cohortType === COHORT_TYPE.Student
      ) {
        tabs = [
          {
            id: TAB.StudentEnrollment,
            label: 'Student Enrollment',
            route: ROUTE_PATHS.manageStudentEnrollment,
          },
        ];
      } else if (cohortType === COHORT_TYPE.School) {
        tabs = [
          {
            id: TAB.StudentLicensing,
            label: 'Student Licensing',
            route: ROUTE_PATHS.manageStudentLicenses,
          },
          {
            id: TAB.StudentEnrollment,
            label: 'Student Enrollment',
            route: ROUTE_PATHS.manageStudentEnrollment,
          },
          {
            id: TAB.TeacherLicensing,
            label: 'Teacher Licensing',
            route: ROUTE_PATHS.manageTeacherLicenses,
          },
          {
            id: TAB.TeacherAccess,
            label: 'Teacher Access',
            route: ROUTE_PATHS.manageTeacherAccess,
          },
        ];
      } else {
        tabs = [
          {
            id: TAB.StudentEnrollment,
            label: 'Student Enrollment',
            route: ROUTE_PATHS.manageStudentEnrollment,
          },

          {
            id: TAB.TeacherAccess,
            label: 'Teacher Access',
            route: ROUTE_PATHS.manageTeacherAccess,
          },
        ];
      }
    }

    const classesNavBar = `manage-students-teachers__nav-bar ${
      this.state.isolateTab ? 'manage-students-teachers__nav-bar--isolate-tab' : ''
    }`;
    const { activeTab } = this.state;
    return (
      <div className="roster-content-panel roster-content-panel--white">
        <NavBar activeItemId={activeTab} className={classesNavBar} theme="tabs" palette="orange">
          {tabs.map(({ label, id, route }) => (
            <NavItem key={id} id={id} onClick={this.handleTabClick}>
              <Link to={route}>{label}</Link>
            </NavItem>
          ))}
        </NavBar>
        <div className="manage-students-teachers__panel">
          {/* Student Licensing Section */}
          <section style={{ display: activeTab === TAB.StudentLicensing ? 'block' : 'none' }}>
            This is the Student Licensing section.
          </section>
          {/* Student Enrollment Section */}
          <section style={{ display: activeTab === TAB.StudentEnrollment ? 'block' : 'none' }}>
            {activeTab === TAB.StudentEnrollment && (
              <StudentEnrollmentTableContainer
                isolateTab={this.state.isolateTab}
                handleTabIsolate={this.handleTabIsolate}
                handleTabReset={this.handleTabReset}
              />
            )}
          </section>
          {/* Teacher Licensing Section */}
          <section style={{ display: activeTab === TAB.TeacherLicensing ? 'block' : 'none' }}>
            This is the Teacher Licensing section.
          </section>
          {/* Teacher Access Section */}
          <section style={{ display: activeTab === TAB.TeacherAccess ? 'block' : 'none' }}>
            {activeTab === TAB.TeacherAccess && (
              <TeacherAccessTableContainer
                isolateTab={this.state.isolateTab}
                handleTabIsolate={this.handleTabIsolate}
                handleTabReset={this.handleTabReset}
              />
            )}
          </section>
        </div>
      </div>
    );
  };
}

ManageStudentsTeachers.propTypes = {
  tab: PropTypes.string,
  smartBarSelections: PropTypes.object.isRequired,
  loginData: PropTypes.object.isRequired,
};

export default ManageStudentsTeachers;
