/**
 *
 * StudentsSmartTab
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { COHORT_TYPE } from 'containers/App/constants';
import SmartBarTab from 'components/SmartBarTab/SmartBarTab';
import {
  makeSelectClickedStudentId,
  makeSelectClickedGroupData,
  makeSelectClickedTeacherData,
  makeSelectClickedGradeData,
  makeSelectClickedClassData,
  makeSelectClickedSchoolData,
  makeSelectCohortType,
  makeSelectStudentId,
  makeSelectClickedSchoolId,
  makeSelectClickedGradeId,
  makeSelectClickedTeacherId,
  makeSelectClickedClassId,
  makeSelectClickedGroupId,
} from 'containers/SmartBarContainer/selectors';
import {
  makeSelectStudentsData,
  makeSelectLoginData,
  makeSelectStudentExpandCollapseStatus,
} from 'containers/App/selectors';
import {
  studentSelection,
  activeSelectedSchool,
  activeSelectedGrade,
  activeSelectedTeacher,
  activeSelectedClass,
  activeSelectedGroup,
  activeSelectedStudent,
  smartbarSelectedUpdateData,
} from 'containers/SmartBarContainer/actions';

export class StudentsSmartTab extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedStudentId === nextProps.smartBarSelectedStudentId &&
      nextProps.selectedStudentId !== '' &&
      nextProps.selectedCohortType === COHORT_TYPE.Student
    ) {
      this.props.activeSelectedSchool(nextProps.clickedSchoolId);
      this.props.activeSelectedGrade(nextProps.clickedGradeId);
      this.props.activeSelectedTeacher(nextProps.clickedTeacherId);
      this.props.activeSelectedClass(nextProps.clickedClassId);
      this.props.activeSelectedGroup(nextProps.clickedGroupId);
      this.props.activeSelectedStudent(nextProps.smartBarSelectedStudentId);
    }
  }

  getStudents = () => {
    if (!this.props.students) {
      return null;
    }

    return this.props.students
      .map(item => ({
        text: `${item.getIn(['last_name', 0])}, ${item.getIn(['first_name', 0])}`,
        id: item.getIn(['user_id', 0]),
      }))
      .toJS();
  };

  getForName = () => {
    if (this.props.selectedGroupData) {
      return this.props.selectedGroupData.getIn(['display_name', 0]);
    } else if (this.props.selectedClassData) {
      return this.props.selectedClassData.getIn(['display_name', 0]);
    } else if (this.props.selectedTeacherData) {
      return `${this.props.selectedTeacherData.getIn([
        'first_name',
        0,
      ])} ${this.props.selectedTeacherData.getIn(['last_name', 0])}`;
    } else if (this.props.selectedGradeData) {
      return this.props.selectedGradeData.getIn(['full_name', 0]);
    } else if (this.props.selectedSchoolData) {
      return this.props.selectedSchoolData.getIn(['name', 0]);
    }

    return `${this.props.login.getIn(['first_name', 0])} ${this.props.login.getIn([
      'last_name',
      0,
    ])}`;
  };

  render() {
    return (
      <SmartBarTab
        title="Students"
        items={this.getStudents()}
        forName={this.getForName()}
        onItemClick={this.props.studentSelection}
        selectedItemId={this.props.selectedStudentId}
        defaultChecked={this.props.studentStatus}
        isTabActive={this.props.selectedCohortType === COHORT_TYPE.Student}
        smartbarSelectedUpdateData={this.props.smartbarSelectedUpdateData}
      />
    );
  }
}

StudentsSmartTab.propTypes = {
  students: PropTypes.object,
  login: PropTypes.object.isRequired,
  selectedGroupData: PropTypes.object,
  selectedClassData: PropTypes.object,
  selectedTeacherData: PropTypes.object,
  selectedGradeData: PropTypes.object,
  selectedSchoolData: PropTypes.object,
  selectedStudentId: PropTypes.string,
  studentSelection: PropTypes.func.isRequired,
  selectedCohortType: PropTypes.string,
  smartBarSelectedStudentId: PropTypes.string,
  activeSelectedSchool: PropTypes.func.isRequired,
  activeSelectedGrade: PropTypes.func.isRequired,
  activeSelectedTeacher: PropTypes.func.isRequired,
  activeSelectedClass: PropTypes.func.isRequired,
  activeSelectedGroup: PropTypes.func.isRequired,
  activeSelectedStudent: PropTypes.func.isRequired,
  clickedSchoolId: PropTypes.string,
  clickedGradeId: PropTypes.string,
  clickedTeacherId: PropTypes.string,
  clickedClassId: PropTypes.string,
  clickedGroupId: PropTypes.string,
  smartbarSelectedUpdateData: PropTypes.func.isRequired,
  studentStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  students: makeSelectStudentsData(),
  selectedStudentId: makeSelectClickedStudentId(),
  selectedGroupData: makeSelectClickedGroupData(),
  selectedClassData: makeSelectClickedClassData(),
  selectedTeacherData: makeSelectClickedTeacherData(),
  selectedGradeData: makeSelectClickedGradeData(),
  selectedSchoolData: makeSelectClickedSchoolData(),
  selectedCohortType: makeSelectCohortType(),
  login: makeSelectLoginData(),
  smartBarSelectedStudentId: makeSelectStudentId(),
  clickedSchoolId: makeSelectClickedSchoolId(),
  clickedGradeId: makeSelectClickedGradeId(),
  clickedTeacherId: makeSelectClickedTeacherId(),
  clickedClassId: makeSelectClickedClassId(),
  clickedGroupId: makeSelectClickedGroupId(),
  studentStatus: makeSelectStudentExpandCollapseStatus(),
});

const withConnect = connect(mapStateToProps, {
  studentSelection,
  activeSelectedSchool,
  activeSelectedGrade,
  activeSelectedTeacher,
  activeSelectedClass,
  activeSelectedGroup,
  activeSelectedStudent,
  smartbarSelectedUpdateData,
});

export default compose(withConnect)(StudentsSmartTab);
