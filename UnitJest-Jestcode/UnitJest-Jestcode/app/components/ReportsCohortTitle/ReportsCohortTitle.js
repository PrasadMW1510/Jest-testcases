/**
 *
 * ReportsCohortTitle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import './ReportsCohortTitle.scss';

class ReportsCohortTitle extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    let cohortName = this.props.userData
      .get('profile')
      .get('organizations')
      .first()
      .get('organization')
      .first()
      .get('name')
      .first();
    if (this.props.schoolData) {
      cohortName = this.props.schoolData.get('name').first();
    }
    if (this.props.gradeData) {
      cohortName = this.props.gradeData.get('full_name').first();
    }
    if (this.props.teacherData) {
      cohortName = `${this.props.teacherData
        .get('last_name')
        .first()}, ${this.props.teacherData.get('first_name').first()}`;
    }
    if (this.props.classData) {
      cohortName = this.props.classData.get('name').first();
    }
    if (this.props.groupData) {
      cohortName = this.props.groupData.get('name').first();
    }
    if (this.props.studentData) {
      cohortName = `${this.props.studentData
        .get('last_name')
        .first()}, ${this.props.studentData.get('first_name').first()}`;
    }
    return (
      <div className="reports-cohort-title">
        <div className="reports-cohort-title__text">{cohortName}</div>
      </div>
    );
  }
}

ReportsCohortTitle.propTypes = {
  schoolData: PropTypes.object,
  gradeData: PropTypes.object,
  teacherData: PropTypes.object,
  classData: PropTypes.object,
  groupData: PropTypes.object,
  studentData: PropTypes.object,
  userData: PropTypes.object,
};

export default ReportsCohortTitle;
