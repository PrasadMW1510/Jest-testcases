/**
 *
 * TeachersSmartTab
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import SmartBarTab from 'components/SmartBarTab/SmartBarTab';
import {
  makeSelectTeachersData,
  makeSelectLoginData,
  makeSelectTeacherExpandCollapseStatus,
} from 'containers/App/selectors';
import {
  makeSelectClickedTeacherId,
  makeSelectClickedGradeData,
  makeSelectClickedSchoolData,
  makeSelectCohortType,
  makeSelectClickedGradeId,
  makeSelectClickedSchoolId,
  makeSelectTeacherId,
} from 'containers/SmartBarContainer/selectors';
import {
  teacherSelection,
  activeSelectedSchool,
  activeSelectedGrade,
  activeSelectedTeacher,
  activeSelectedClass,
  activeSelectedGroup,
  activeSelectedStudent,
  smartbarSelectedUpdateData,
} from 'containers/SmartBarContainer/actions';
import { COHORT_TYPE } from 'containers/App/constants';

export class TeachersSmartTab extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedTeacherId === nextProps.smartBarSelectedTeacherId &&
      nextProps.selectedTeacherId !== '' &&
      nextProps.selectedCohortType === COHORT_TYPE.Teacher
    ) {
      this.props.activeSelectedSchool(nextProps.clickedSchoolId);
      this.props.activeSelectedGrade(nextProps.clickedGradeId);
      this.props.activeSelectedTeacher(nextProps.smartBarSelectedTeacherId);
      this.props.activeSelectedClass('');
      this.props.activeSelectedGroup('');
      this.props.activeSelectedStudent('');
    }
  }

  getTeachers = () => {
    if (!this.props.teachers) {
      return null;
    }

    return this.props.teachers
      .map(item => ({
        text: `${item.getIn(['last_name', 0])}, ${item.getIn(['first_name', 0])}`,
        id: item.getIn(['user_id', 0]),
      }))
      .toJS();
  };

  getForName = () => {
    if (this.props.selectedGradeData) {
      return this.props.selectedGradeData.getIn(['full_name', 0]);
    } else if (this.props.selectedSchoolData) {
      return this.props.selectedSchoolData.getIn(['name', 0]);
    }

    return `${this.props.login.getIn(['first_name', 0])} ${this.props.login.getIn([
      'last_name',
      0,
    ])}`;
  };

  shouldDisplay = () => {
    const userOrg = this.props.login.getIn(['user_org', 0]);
    return userOrg === COHORT_TYPE.District || userOrg === COHORT_TYPE.School;
  };

  render() {
    if (!this.shouldDisplay()) {
      return null;
    }

    return (
      <SmartBarTab
        title="Teachers"
        items={this.getTeachers()}
        forName={this.getForName()}
        onItemClick={this.props.teacherSelection}
        selectedItemId={this.props.selectedTeacherId}
        defaultChecked={this.props.teacherStatus}
        isTabActive={this.props.selectedCohortType === COHORT_TYPE.Teacher}
        smartbarSelectedUpdateData={this.props.smartbarSelectedUpdateData}
      />
    );
  }
}

TeachersSmartTab.propTypes = {
  teachers: PropTypes.object,
  selectedTeacherId: PropTypes.string,
  login: PropTypes.object.isRequired,
  teacherSelection: PropTypes.func.isRequired,
  selectedGradeData: PropTypes.object,
  selectedSchoolData: PropTypes.object,
  selectedCohortType: PropTypes.string,
  activeSelectedSchool: PropTypes.func.isRequired,
  activeSelectedGrade: PropTypes.func.isRequired,
  activeSelectedTeacher: PropTypes.func.isRequired,
  activeSelectedClass: PropTypes.func.isRequired,
  activeSelectedGroup: PropTypes.func.isRequired,
  activeSelectedStudent: PropTypes.func.isRequired,
  clickedGradeId: PropTypes.string,
  clickedSchoolId: PropTypes.string,
  smartBarSelectedTeacherId: PropTypes.string,
  smartbarSelectedUpdateData: PropTypes.func.isRequired,
  teacherStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  teachers: makeSelectTeachersData(),
  selectedTeacherId: makeSelectClickedTeacherId(),
  selectedGradeData: makeSelectClickedGradeData(),
  selectedSchoolData: makeSelectClickedSchoolData(),
  smartBarSelectedTeacherId: makeSelectTeacherId(),
  clickedGradeId: makeSelectClickedGradeId(),
  clickedSchoolId: makeSelectClickedSchoolId(),
  selectedCohortType: makeSelectCohortType(),
  login: makeSelectLoginData(),
  teacherStatus: makeSelectTeacherExpandCollapseStatus(),
});

const withConnect = connect(mapStateToProps, {
  teacherSelection,
  activeSelectedSchool,
  activeSelectedGrade,
  activeSelectedTeacher,
  activeSelectedClass,
  activeSelectedGroup,
  activeSelectedStudent,
  smartbarSelectedUpdateData,
});

export default compose(withConnect)(TeachersSmartTab);
