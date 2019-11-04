/**
 *
 * ManageRoster
 *
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { COHORT_TYPE, USER_ORG, USER_TYPE } from 'containers/App/constants';
import * as ModalConstants from 'containers/ModalController/constants';
import RosterIcon from 'images/roster-icon.png';
import { isUserTypeAdminOrTech } from 'utils/utilities';

import './ManageRoster.scss';

const actionMapping = {
  TeacherLoginActions: [
    'Edit Own Profile',
    'Add Classes',
    'Add Groups',
    'Add Students',
    'Manage Student Enrollment',
  ],
  TeachersActions: [
    'Edit Own Profile',
    'Add Classes',
    'Add Groups',
    'Add Students',
    'Manage Student Enrollment',
    'Deactivate Teacher',
  ],
  gradeActions: ['Add Classes', 'Add Teachers', 'Add Students', 'Manage Student Enrollment'],
  defaultDistrictActions: ['Manage Teacher Access'],
  DistrictAdminActions: ['Edit District Profile', 'Add Schools', 'Manage Student Enrollment'],
  SchoolAdminActions: [
    'Edit School Profile',
    'Add Classes',
    'Add Teachers',
    'Manage Student Enrollment',
  ],
  classesActions: [
    'Edit Class Profile',
    'Add Groups',
    'Add Students',
    'Manage Student Enrollment',
    'Deactivate Class',
  ],
  groupsActions: [
    'Edit Group Profile',
    'Add Students',
    'Manage Student Enrollment',
    'Deactivate Group',
  ],
  schoolsActions: [
    'Edit School Profile',
    'Add Classes',
    'Add Teachers',
    'Manage Student Enrollment',
    'Deactivate School',
  ],
  studentsActions: ['Edit Student Profile', 'Manage Student Enrollment', 'Deactivate Student'],
};

class ManageRoster extends Component {
  handleAddClass = ev => {
    ev.preventDefault();
    this.props.showClassFormModal();
  };

  handleClearRoster = ev => {
    ev.preventDefault();
    this.props.showModal(ModalConstants.CLEAR_ROSTER_MODAL);
  };

  handleEditClass = ev => {
    ev.preventDefault();
    this.props.showClassFormModal({ edit: true });
  };

  handleDeactivateTeacher = ev => {
    ev.preventDefault();
    this.props.showDeactivateUserModal();
  };

  handleDeactivateSchool = ev => {
    ev.preventDefault();
    this.props.showModal(ModalConstants.DEACTIVATE_SCHOOL_MODAL);
  };

  handleDeactivateGroup = ev => {
    ev.preventDefault();
    this.props.showDeactivateGroupModal();
  };

  handleDeactivateClass = ev => {
    ev.preventDefault();
    this.props.showModal(ModalConstants.DEACTIVATE_CLASS_MODAL);
  };

  handleDeactivateStudent = ev => {
    ev.preventDefault();
    this.props.showModal(ModalConstants.DEACTIVATE_STUDENT_MODAL);
  };

  handleAddStudent = ev => {
    ev.preventDefault();
    this.props.showStudentFormModal();
  };

  handleAddTeacher = ev => {
    ev.preventDefault();
    this.props.showModal(ModalConstants.TEACHER_FORM_MODAL, { editMode: false });
  };

  handleEditStudent = ev => {
    ev.preventDefault();
    this.props.showStudentFormModal({ edit: true });
  };

  handleAddSchool = ev => {
    ev.preventDefault();
    this.props.showModal(ModalConstants.SCHOOL_FORM_MODAL);
  };

  handleEditSchool = ev => {
    ev.preventDefault();
    this.props.showModal(ModalConstants.SCHOOL_FORM_MODAL, { edit: true });
  };

  handleAddGroup = event => {
    event.preventDefault();
    this.props.showModal(ModalConstants.ADD_A_GROUP, { edit: false });
  };

  handleEditGroup = event => {
    event.preventDefault();
    this.props.showModal(ModalConstants.ADD_A_GROUP, { edit: true });
  };

  handleEditTeacherProfile = ev => {
    ev.preventDefault();
    this.props.showTeacherFormModal({ editMode: true, editingSameAccount: true });
  };

  handleAdminEditTeacherProfile = ev => {
    ev.preventDefault();
    this.props.showTeacherFormModal({ editMode: true, editingSameAccount: false });
  };

  handleEditDistrict = ev => {
    ev.preventDefault();
    this.props.showModal(ModalConstants.EDIT_DISTRICT_PROFILE);
  };

  renderLink = (action, index) => {
    switch (action) {
      case 'Edit Class Profile':
        return (
          <Link
            className="roster-links"
            to="/roster/edit-class"
            key={index}
            onClick={this.handleEditClass}
          >
            Edit Class Profile
          </Link>
        );
      case 'Edit School Profile':
        return (
          <Link
            className="roster-links"
            key={index}
            onClick={this.handleEditSchool}
            to="/roster/edit-school"
          >
            Edit School Profile
          </Link>
        );
      case 'Manage Student Enrollment':
        return (
          <div key={`${index}container`}>
            <div>
              <Link className="roster-links" to="/roster/manageStudentEnrollment" key={index}>
                Manage Student Enrollment
              </Link>
            </div>
            <div>
              {this.props.profileUserType !== USER_TYPE.Teacher &&
                this.props.smartBarSelections.getIn(['selectedCohType']) !== COHORT_TYPE.Group &&
                this.props.smartBarSelections.getIn(['selectedCohType']) !== COHORT_TYPE.Student &&
                this.props.smartBarSelections.getIn(['selectedCohType']) !== COHORT_TYPE.Class && (
                  <Link className="roster-links" to="/roster/manageTeacherAccess" key={index + 200}>
                    Manage Teacher Access
                  </Link>
                )}
            </div>
          </div>
        );
      case 'Edit Group Profile':
        return (
          <Link className="roster-links" to="/roster" key={index} onClick={this.handleEditGroup}>
            Edit Group Profile
          </Link>
        );
      case 'Deactivate Group':
        return (
          <Link
            className="roster-links"
            to="/roster"
            key={index}
            onClick={this.handleDeactivateGroup}
          >
            Deactivate Group
          </Link>
        );
      case 'Deactivate Teacher':
        return (
          <Link
            className="roster-links"
            to="/roster/deactivate-teacher"
            onClick={this.handleDeactivateTeacher}
            key={index}
          >
            Deactivate Teacher
          </Link>
        );
      case 'Deactivate Class':
        return (
          <Link
            className="roster-links"
            to="/roster"
            key={index}
            onClick={this.handleDeactivateClass}
          >
            Deactivate Class
          </Link>
        );
      case 'Deactivate School':
        return (
          <Link
            className="roster-links"
            to="/roster"
            key={index}
            onClick={this.handleDeactivateSchool}
          >
            Deactivate School
          </Link>
        );
      case 'Edit Student Profile':
        return (
          <Link
            className="roster-links"
            to="/roster/edit-student"
            key={index}
            onClick={this.handleEditStudent}
          >
            Edit Student Profile
          </Link>
        );
      case 'Add Students':
      case 'Add a Student':
        return (
          <Link
            className="roster-links"
            to="/roster/add-student"
            key={index}
            onClick={this.handleAddStudent}
          >
            Add a Student
          </Link>
        );
      case 'Add Teachers':
        return (
          <Link
            className="roster-links"
            to="/roster/add-teacher"
            key={index}
            onClick={this.handleAddTeacher}
          >
            Add a Teacher
          </Link>
        );
      case 'Add Schools':
        return (
          <Link
            className="roster-links"
            to="/roster/add-school"
            key={index}
            onClick={this.handleAddSchool}
          >
            Add a School
          </Link>
        );
      case 'Add Groups':
      case 'Add a Group':
        return (
          <Link className="roster-links" to="/roster" key={index} onClick={this.handleAddGroup}>
            Add a Group
          </Link>
        );
      case 'Edit Own Profile':
        return (
          <div key={index}>
            {this.props.profileUserType === USER_TYPE.Teacher && (
              <Link className="roster-links" to="/roster" onClick={this.handleEditTeacherProfile}>
                Edit Profile
              </Link>
            )}
            {this.props.profileUserType !== USER_TYPE.Teacher && (
              <Link
                className="roster-links"
                to="/roster"
                onClick={this.handleAdminEditTeacherProfile}
              >
                Edit Teacher Profile
              </Link>
            )}
          </div>
        );
      case 'Edit District Profile':
        return (
          <Link
            className="roster-links"
            to="/roster/edit-district"
            onClick={this.handleEditDistrict}
            key={index}
          >
            Edit District Profile
          </Link>
        );
      case 'Add Classes':
        return (
          <Link
            className="roster-links"
            to="/roster/add-class"
            key={index}
            onClick={this.handleAddClass}
          >
            Add a Class
          </Link>
        );
      default:
        return (
          <Link
            className="roster-links"
            to="/roster"
            key={index}
            onClick={this.handleDeactivateStudent}
          >
            Deactivate Student
          </Link>
        );
    }
  };

  renderCategoryLinks = (profile, categoryMap) => {
    if (profile.permissions && profile.permissions[0].permission) {
      const links = [];
      const categoryLinks = [];
      // eslint-disable-next-line no-shadow
      return categoryMap.reduce((links, action, index) => {
        for (
          let permissionIndex = 0;
          permissionIndex < profile.permissions[0].permission.length;
          permissionIndex += 1
        ) {
          if (
            profile.permissions[0].permission[permissionIndex].display_name[0] === action &&
            categoryLinks.indexOf(
              profile.permissions[0].permission[permissionIndex].display_name[0]
            ) === -1
          ) {
            categoryLinks.push(profile.permissions[0].permission[permissionIndex].display_name[0]);
            links.push(this.renderLink(action, index));
          }
        }
        return links;
      }, links);
    }
    return null;
  };

  renderDefaultLinks = profile => {
    if (this.props.profileUserType === USER_TYPE.Teacher) {
      return this.renderCategoryLinks(profile, actionMapping.TeacherLoginActions);
    } else if (
      this.props.profileOrgType === USER_ORG.District &&
      isUserTypeAdminOrTech(this.props.profileUserType)
    ) {
      return this.renderCategoryLinks(profile, actionMapping.DistrictAdminActions);
    }
    const categoryLinks = this.renderCategoryLinks(profile, actionMapping.SchoolAdminActions);
    if (categoryLinks) {
      categoryLinks.push(
        <Link
          className="roster-links"
          to="/roster"
          key={categoryLinks.length + 1}
          onClick={this.handleClearRoster}
        >
          Clear School Roster
        </Link>
      );
    }

    return categoryLinks;
  };

  renderLinks = (smartBarSelections, profile) => {
    const selectedCohType = smartBarSelections.getIn(['selectedCohType']);
    switch (selectedCohType) {
      case COHORT_TYPE.Class:
        return this.renderCategoryLinks(profile, actionMapping.classesActions);
      case COHORT_TYPE.Grade:
        return this.renderCategoryLinks(profile, actionMapping.gradeActions);
      case COHORT_TYPE.Group:
        return this.renderCategoryLinks(profile, actionMapping.groupsActions);
      case COHORT_TYPE.School: {
        const categoryLinks = this.renderCategoryLinks(profile, actionMapping.schoolsActions);
        categoryLinks.push(
          <Link
            className="roster-links"
            to="/roster"
            key={categoryLinks.length + 1}
            onClick={this.handleClearRoster}
          >
            Clear School Roster
          </Link>
        );
        return categoryLinks;
      }
      case COHORT_TYPE.Student:
        return this.renderCategoryLinks(profile, actionMapping.studentsActions);
      case COHORT_TYPE.Teacher:
        return this.renderCategoryLinks(profile, actionMapping.TeachersActions);
      default:
        return this.renderDefaultLinks(profile);
    }
  };

  render() {
    const { smartBarSelections, profile } = this.props;
    return (
      <div className="manage-roster">
        <div className="manage-roster__heading">
          <img src={RosterIcon} width="25px" height="25px" hspace="5px" alt="roster-icon" />
          Manage Roster
        </div>
        <div className="manage-roster__links">{this.renderLinks(smartBarSelections, profile)}</div>
      </div>
    );
  }
}

ManageRoster.propTypes = {
  profile: PropTypes.any.isRequired,
  showClassFormModal: PropTypes.func.isRequired,
  showDeactivateUserModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  showStudentFormModal: PropTypes.func.isRequired,
  showTeacherFormModal: PropTypes.func.isRequired,
  showDeactivateGroupModal: PropTypes.func,
  profileOrgType: PropTypes.string,
  profileUserType: PropTypes.string,
  smartBarSelections: PropTypes.object,
};

export default ManageRoster;
