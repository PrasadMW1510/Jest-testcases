/**
 *
 * ProfilePage
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isUserTypeAdminOrTech } from 'utils/utilities';
import { USER_TYPE, USER_ORG, COHORT_TYPE } from 'containers/App/constants';

import './ProfilePage.scss';

class ProfilePage extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      this.props.smartBarSelections.getIn(['selectedCohType']) === COHORT_TYPE.Group &&
      nextProps.profilePage.profileDetails.owner_id &&
      (nextProps.profilePage.classDetails.length === 0 ||
        nextProps.profilePage.classDetails.class_id[0] !==
          nextProps.profilePage.profileDetails.owner_id[0])
    ) {
      this.props.profilePageClassRequest(nextProps.profilePage.profileDetails.owner_id[0]);
    }
  }

  onClassSelection = () => {
    this.props.classRedirectionInGroup(this.props.profilePage.classDetails.class_id[0]);
  };

  onGradeSelection = e => {
    const gradeId = e.target.getAttribute('data-id');
    this.props.gradeRedirection(gradeId);
  };

  onTeacherSelection = e => {
    const teacherId = e.target.getAttribute('data-id');
    this.props.teacherRedirection(teacherId);
  };

  renderDefaultDetails = profile => {
    if (this.props.profileUserType === USER_TYPE.Teacher) {
      return this.renderTeacherDefaultDetails(profile);
    } else if (
      this.props.profileOrgType === USER_ORG.District &&
      isUserTypeAdminOrTech(this.props.profileUserType)
    ) {
      return this.renderDistAdminDefaultDetails(profile);
    }
    return this.renderSchoolAdminDefaultDetails(profile);
  };

  renderDistAdminDefaultDetails = profile => (
    <div className="profile-details">
      <div className="profile-details__heading profile-details__heading--text">
        Profile for {`${profile.display_name}`}
      </div>
      <ul className="profile-details__info">
        <li>
          <span className="profile-details__item">Contact Name: </span>
          {profile.contact_person &&
            `${profile.contact_person[0].last_name}, ${profile.contact_person[0].first_name}`}
        </li>
        <li>
          <span className="profile-details__item">Title: </span>
          {profile.contact_person && `${profile.contact_person[0].title}`}
        </li>
        <li>
          <span className="profile-details__item">Email: </span>
          {profile.contact_info && `${profile.contact_info[0].email_address1}`}
        </li>
        <li>
          <span className="profile-details__item">Phone Number: </span>
          {profile.contact_info &&
            `${profile.contact_info[0].phone_number1[0]
              .toString()
              .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}`}
        </li>
        <li>
          <span className="profile-details__item">Number of Students: </span>
          {`${profile.student_count}`}
        </li>
      </ul>
    </div>
  );

  renderSchoolAdminDefaultDetails = profile => (
    <div className="profile-details">
      <div className="profile-details__heading profile-details__heading--text">
        Profile for {`${profile.display_name}`}
      </div>
      <ul className="profile-details__info">
        <li>
          <span className="profile-details__item">Contact Name: </span>
          {profile.contact_person &&
            `${profile.contact_person[0].last_name}, ${profile.contact_person[0].first_name}`}
        </li>
        <li>
          <span className="profile-details__item">Title: </span>
          {profile.contact_person && `${profile.contact_person[0].title}`}
        </li>
        <li>
          <span className="profile-details__item">Email: </span>
          {profile.contact_info && `${profile.contact_info[0].email_address1}`}
        </li>
        <li>
          <span className="profile-details__item">Phone Number: </span>
          {profile.contact_info &&
            `${profile.contact_info[0].phone_number1[0]
              .toString()
              .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}`}
        </li>
        <li>
          <span className="profile-details__item">Number of Students: </span>
          {`${profile.student_count}`}
        </li>
      </ul>
    </div>
  );

  renderTeacherDefaultDetails = profile => (
    <div className="profile-details">
      <div className="profile-details__heading profile-details__heading--text">
        Profile for {`${profile.last_name}, ${profile.first_name}`}
      </div>
      <ul className="profile-details__info">
        <li>
          <span className="profile-details__item">Email: </span>
          {`${profile.email}`}
        </li>
        <li>
          <span className="profile-details__item">Type of Account: </span>
          {`${profile.user_type}`}
        </li>
        <li>
          <span className="profile-details__item">Username: </span>
          {`${profile.user_name}`}
        </li>
        <li>
          <span className="profile-details__item">Number of Students: </span>
          {`${profile.student_count}`}
        </li>
      </ul>
    </div>
  );

  renderGrades = grades => {
    if (grades && grades.length > 0 && grades[0].grade) {
      return grades[0].grade.map(grade => (
        <button
          className="clickable-button__item"
          data-id={grade.name}
          key={grade.name}
          onClick={this.onGradeSelection}
        >
          {grade.name}
        </button>
      ));
    }
    return [];
  };

  renderTeachers = teachers => {
    if (teachers && teachers.length > 0 && teachers[0].user) {
      return teachers[0].user.map(user => (
        <button
          className="clickable-button__item"
          data-id={user.user_id[0]}
          key={user.user_id[0]}
          onClick={this.onTeacherSelection}
        >{`${user.first_name} ${user.last_name}`}</button>
      ));
    }
    return [];
  };

  renderClassGrades = grades => {
    if (grades && grades.length > 0 && grades[0].grade) {
      return grades[0].grade.map(grade => grade.name);
    }
    return [];
  };

  renderClassTeachers = teachers => {
    if (teachers && teachers.length > 0 && teachers[0].user) {
      return teachers[0].user.map(user => `${user.first_name} ${user.last_name}`);
    }
    return [];
  };

  renderClassDetails = profilePage => {
    if (this.props.profileUserType === USER_TYPE.Teacher) {
      return (
        <div className="profile-details">
          <div className="profile-details__heading profile-details__heading--text">
            Profile for {profilePage.profileDetails.display_name}
          </div>
          <ul className="profile-details__info">
            <li>
              <span className="profile-details__item">Number of Students: </span>
              {`${profilePage.profileDetails.student_count}`}
            </li>
            <li>
              <span className="profile-details__item">Grade(s): </span>
              {this.renderClassGrades(profilePage.profileDetails.grades).join(', ')}
            </li>
            <div className="teacher-overflow">
              <span className="profile-details__item">Teacher(s): </span>
              {this.renderClassTeachers(profilePage.profileDetails.teachers).join(', ')}
            </div>
          </ul>
        </div>
      );
    }
    return (
      <div className="profile-details">
        <div className="profile-details__heading profile-details__heading--text">
          Profile for {profilePage.profileDetails.display_name}
        </div>
        <ul className="profile-details__info">
          <li>
            <span className="profile-details__item">Number of Students: </span>
            {`${profilePage.profileDetails.student_count}`}
          </li>
          <li>
            <span className="profile-details__item">Grade(s): </span>
            {this.renderGrades(profilePage.profileDetails.grades)}
          </li>
          <div className="teacher-overflow">
            <span className="profile-details__item">Teacher(s): </span>
            {this.renderTeachers(profilePage.profileDetails.teachers)}
          </div>
        </ul>
      </div>
    );
  };

  renderGradeDetails = profilePage => (
    <div className="profile-details">
      <div className="profile-details__heading profile-details__heading--text">
        Profile for Grade {this.props.smartBarSelections.getIn(['activeGradeId'])}
      </div>
      <ul className="profile-details__info">
        <li>
          <span className="profile-details__item">Number of Teachers: </span>
          {profilePage.teacherByGradeDetails}
        </li>
        <li>
          <span className="profile-details__item">Number of Classes: </span>
          {profilePage.classByGradeDetails}
        </li>
        <li>
          <span className="profile-details__item">Number of Students: </span>
          {profilePage.studentByGradeDetails}
        </li>
      </ul>
    </div>
  );

  renderTeacherDetails = profilePage => (
    <div className="profile-details">
      <div className="profile-details__heading profile-details__heading--text">
        Profile for{' '}
        {`${profilePage.profileDetails.last_name}, ${profilePage.profileDetails.first_name}`}
      </div>
      <ul className="profile-details__info">
        <li>
          <span className="profile-details__item">Email: </span>
          {`${profilePage.profileDetails.email}`}
        </li>
        <li>
          <span className="profile-details__item">Type of Account: </span>
          {`${profilePage.profileDetails.user_type}`}
        </li>
        <li>
          <span className="profile-details__item">Username: </span>
          {`${profilePage.profileDetails.user_name}`}
        </li>
        <li>
          <span className="profile-details__item">Number of Students: </span>
          {`${profilePage.profileDetails.student_count}`}
        </li>
      </ul>
    </div>
  );

  renderGroupDetails = profilePage => (
    <div className="profile-details">
      <div className="profile-details__heading profile-details__heading--text">
        Profile for {profilePage.profileDetails.display_name}
      </div>
      <ul className="profile-details__info">
        <li>
          <span className="profile-details__item">This group is part of: </span>
          <button
            className="profile-details__item clickable-button__item"
            onClick={this.onClassSelection}
          >
            {profilePage.classDetails.display_name && profilePage.classDetails.display_name}
          </button>
        </li>
        <li>
          <span className="profile-details__item">Number of Students: </span>
          {profilePage.profileDetails.users &&
            profilePage.profileDetails.users[0].user &&
            `${profilePage.profileDetails.users[0].user.length}`}
        </li>
      </ul>
    </div>
  );

  renderStudentDetails = profilePage => (
    <div className="profile-details">
      <div className="profile-details__heading profile-details__heading--text">
        Profile for{' '}
        {`${profilePage.profileDetails.last_name}, ${profilePage.profileDetails.first_name}`}
      </div>
      <ul className="profile-details__info">
        <li>
          <span className="profile-details__item">Grade: </span>
          {profilePage.profileDetails.extended_user_data &&
            `${profilePage.profileDetails.extended_user_data[0].grade[0].full_name}`}
        </li>
        <li>
          <span className="profile-details__item">Username: </span>
          {`${profilePage.profileDetails.user_name}`}
        </li>
      </ul>
    </div>
  );

  renderSchoolDetails = profilePage => (
    <div className="profile-details">
      <div className="profile-details__heading profile-details__heading--text">
        Profile for {`${profilePage.profileDetails.display_name}`}
      </div>
      <ul className="profile-details__info">
        <li>
          <span className="profile-details__item">Contact Name: </span>
          {profilePage.profileDetails.contact_person &&
            `${profilePage.profileDetails.contact_person[0].last_name}, ${
              profilePage.profileDetails.contact_person[0].first_name
            }`}
        </li>
        <li>
          <span className="profile-details__item">Title: </span>
          {profilePage.profileDetails.contact_person &&
            `${profilePage.profileDetails.contact_person[0].title}`}
        </li>
        <li>
          <span className="profile-details__item">Email: </span>
          {profilePage.profileDetails.contact_info &&
            `${profilePage.profileDetails.contact_info[0].email_address1}`}
        </li>
        <li>
          <span className="profile-details__item">Phone Number: </span>
          {profilePage.profileDetails.contact_info &&
            `${profilePage.profileDetails.contact_info[0].phone_number1[0]
              .toString()
              .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}`}
        </li>
        <li>
          <span className="profile-details__item">Number of Students: </span>
          {`${profilePage.profileDetails.student_count}`}
        </li>
      </ul>
    </div>
  );

  renderProfile = (smartBarSelections, profilePage, profile) => {
    if (smartBarSelections.getIn(['selectedCohType']) === COHORT_TYPE.Grade) {
      return this.renderGradeDetails(profilePage);
    } else if (smartBarSelections.getIn(['selectedCohType']) === COHORT_TYPE.Teacher) {
      return this.renderTeacherDetails(profilePage);
    } else if (smartBarSelections.getIn(['selectedCohType']) === COHORT_TYPE.Class) {
      return this.renderClassDetails(profilePage);
    } else if (smartBarSelections.getIn(['selectedCohType']) === COHORT_TYPE.Group) {
      return this.renderGroupDetails(profilePage);
    } else if (smartBarSelections.getIn(['selectedCohType']) === COHORT_TYPE.Student) {
      return this.renderStudentDetails(profilePage);
    } else if (
      smartBarSelections.getIn(['selectedCohType']) === COHORT_TYPE.School &&
      !(
        this.props.profileOrgType === USER_ORG.School &&
        isUserTypeAdminOrTech(this.props.profileUserType)
      )
    ) {
      return this.renderSchoolDetails(profilePage);
    }
    return this.renderDefaultDetails(profile);
  };

  render() {
    const { profilePage, smartBarSelections, profile } = this.props;
    return <div>{this.renderProfile(smartBarSelections, profilePage, profile)}</div>;
  }
}
ProfilePage.propTypes = {
  profile: PropTypes.any,
  profilePage: PropTypes.object,
  profileUserType: PropTypes.string,
  profileOrgType: PropTypes.string,
  profilePageClassRequest: PropTypes.func,
  smartBarSelections: PropTypes.object,
  teacherRedirection: PropTypes.func,
  gradeRedirection: PropTypes.func,
  classRedirectionInGroup: PropTypes.func,
};

export default ProfilePage;
