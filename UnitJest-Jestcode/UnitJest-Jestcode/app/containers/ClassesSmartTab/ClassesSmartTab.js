/**
 *
 * ClassesSmartTab
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import SmartBarTab from 'components/SmartBarTab/SmartBarTab';
import { COHORT_TYPE } from 'containers/App/constants';
import {
  makeSelectClickedTeacherData,
  makeSelectClickedGradeData,
  makeSelectClickedClassId,
  makeSelectClickedSchoolData,
  makeSelectCohortType,
  makeSelectClassId,
  makeSelectClickedSchoolId,
  makeSelectClickedGradeId,
  makeSelectClickedTeacherId,
} from 'containers/SmartBarContainer/selectors';
import {
  makeSelectClassesData,
  makeSelectLoginData,
  makeSelectClassExpandCollapseStatus,
} from 'containers/App/selectors';
import {
  classSelection,
  activeSelectedSchool,
  activeSelectedGrade,
  activeSelectedTeacher,
  activeSelectedClass,
  activeSelectedGroup,
  activeSelectedStudent,
  smartbarSelectedUpdateData,
} from 'containers/SmartBarContainer/actions';

export class ClassesSmartTab extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedClass === nextProps.smartBarSelectedClassId &&
      nextProps.selectedClass !== '' &&
      nextProps.selectedCohortType === COHORT_TYPE.Class
    ) {
      this.props.activeSelectedSchool(nextProps.clickedSchoolId);
      this.props.activeSelectedGrade(nextProps.clickedGradeId);
      this.props.activeSelectedTeacher(nextProps.clickedTeacherId);
      this.props.activeSelectedClass(nextProps.smartBarSelectedClassId);
      this.props.activeSelectedGroup('');
      this.props.activeSelectedStudent('');
    }
  }

  getClasses = () => {
    if (!this.props.classes) {
      return null;
    }

    return this.props.classes
      .map(item => ({ text: item.getIn(['display_name', 0]), id: item.getIn(['class_id', 0]) }))
      .toJS();
  };

  getForName = () => {
    if (this.props.selectedTeacherData) {
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
        defaultChecked={this.props.classStatus}
        title="Classes"
        forName={this.getForName()}
        items={this.getClasses()}
        onItemClick={this.props.classSelection}
        selectedItemId={this.props.selectedClass}
        isTabActive={this.props.selectedCohortType === COHORT_TYPE.Class}
        smartbarSelectedUpdateData={this.props.smartbarSelectedUpdateData}
      />
    );
  }
}

ClassesSmartTab.propTypes = {
  classes: PropTypes.object,
  classSelection: PropTypes.func.isRequired,
  selectedClass: PropTypes.string,
  login: PropTypes.object.isRequired,
  selectedTeacherData: PropTypes.object,
  selectedGradeData: PropTypes.object,
  selectedSchoolData: PropTypes.object,
  selectedCohortType: PropTypes.string,
  activeSelectedSchool: PropTypes.func.isRequired,
  activeSelectedGrade: PropTypes.func.isRequired,
  activeSelectedTeacher: PropTypes.func.isRequired,
  activeSelectedClass: PropTypes.func.isRequired,
  activeSelectedGroup: PropTypes.func.isRequired,
  activeSelectedStudent: PropTypes.func.isRequired,
  clickedSchoolId: PropTypes.string,
  smartBarSelectedClassId: PropTypes.string,
  clickedGradeId: PropTypes.string,
  clickedTeacherId: PropTypes.string,
  smartbarSelectedUpdateData: PropTypes.func.isRequired,
  classStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  classes: makeSelectClassesData(),
  selectedClass: makeSelectClickedClassId(),
  selectedTeacherData: makeSelectClickedTeacherData(),
  selectedGradeData: makeSelectClickedGradeData(),
  selectedSchoolData: makeSelectClickedSchoolData(),
  selectedCohortType: makeSelectCohortType(),
  login: makeSelectLoginData(),
  smartBarSelectedClassId: makeSelectClassId(),
  clickedSchoolId: makeSelectClickedSchoolId(),
  clickedGradeId: makeSelectClickedGradeId(),
  clickedTeacherId: makeSelectClickedTeacherId(),
  classStatus: makeSelectClassExpandCollapseStatus(),
});

const withConnect = connect(mapStateToProps, {
  classSelection,
  activeSelectedSchool,
  activeSelectedGrade,
  activeSelectedTeacher,
  activeSelectedClass,
  activeSelectedGroup,
  activeSelectedStudent,
  smartbarSelectedUpdateData,
});

export default compose(withConnect)(ClassesSmartTab);
