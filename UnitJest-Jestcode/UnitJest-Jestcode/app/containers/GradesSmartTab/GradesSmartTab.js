/**
 *
 * GradesSmartTab
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import SmartBarTab from 'components/SmartBarTab/SmartBarTab';
import {
  makeSelectGradesData,
  makeSelectLoginData,
  makeSelectGradeExpandCollapseStatus,
} from 'containers/App/selectors';
import {
  makeSelectClickedGradeId,
  makeSelectClickedSchoolData,
  makeSelectCohortType,
  makeSelectGradeId,
  makeSelectClickedSchoolId,
} from 'containers/SmartBarContainer/selectors';
import {
  gradeSelection,
  activeSelectedSchool,
  activeSelectedGrade,
  activeSelectedTeacher,
  activeSelectedClass,
  activeSelectedGroup,
  activeSelectedStudent,
  smartbarSelectedUpdateData,
} from 'containers/SmartBarContainer/actions';
import { COHORT_TYPE } from 'containers/App/constants';

export class GradesSmartTab extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedGradeId === nextProps.smartBarSelectedGradeId &&
      nextProps.selectedGradeId !== '' &&
      nextProps.selectedCohortType === COHORT_TYPE.Grade
    ) {
      this.props.activeSelectedSchool(nextProps.clickedSchoolId);
      this.props.activeSelectedGrade(nextProps.smartBarSelectedGradeId);
      this.props.activeSelectedTeacher('');
      this.props.activeSelectedClass('');
      this.props.activeSelectedGroup('');
      this.props.activeSelectedStudent('');
    }
  }

  getGrades = () => {
    if (!this.props.grades) {
      return null;
    }

    return this.props.grades
      .map(item => ({ text: item.getIn(['full_name', 0]), id: item.getIn(['name', 0]) }))
      .toJS();
  };

  getForName = () => {
    if (this.props.selectedSchoolData) {
      return this.props.selectedSchoolData.getIn(['name', 0]);
    }

    return `${this.props.login.getIn(['first_name', 0])} ${this.props.login.getIn([
      'last_name',
      0,
    ])}`;
  };

  shouldDisplay = () => {
    // only show this tab if the user is a district or school admin
    const userOrg = this.props.login.getIn(['user_org', 0]);
    return userOrg === COHORT_TYPE.District || userOrg === COHORT_TYPE.School;
  };

  render() {
    if (!this.shouldDisplay()) {
      return null;
    }

    return (
      <SmartBarTab
        title="Grades"
        forName={this.getForName()}
        items={this.getGrades()}
        onItemClick={this.props.gradeSelection}
        selectedItemId={this.props.selectedGradeId}
        defaultChecked={this.props.gradeStatus}
        isTabActive={this.props.selectedCohortType === COHORT_TYPE.Grade}
        smartbarSelectedUpdateData={this.props.smartbarSelectedUpdateData}
      />
    );
  }
}

GradesSmartTab.propTypes = {
  grades: PropTypes.object,
  login: PropTypes.object.isRequired,
  selectedSchoolData: PropTypes.object,
  selectedGradeId: PropTypes.string,
  gradeSelection: PropTypes.func.isRequired,
  selectedCohortType: PropTypes.string,
  activeSelectedSchool: PropTypes.func.isRequired,
  activeSelectedGrade: PropTypes.func.isRequired,
  activeSelectedTeacher: PropTypes.func.isRequired,
  activeSelectedClass: PropTypes.func.isRequired,
  activeSelectedGroup: PropTypes.func.isRequired,
  activeSelectedStudent: PropTypes.func.isRequired,
  smartBarSelectedGradeId: PropTypes.string,
  clickedSchoolId: PropTypes.string,
  smartbarSelectedUpdateData: PropTypes.func.isRequired,
  gradeStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  grades: makeSelectGradesData(),
  login: makeSelectLoginData(),
  selectedGradeId: makeSelectClickedGradeId(),
  selectedSchoolData: makeSelectClickedSchoolData(),
  selectedCohortType: makeSelectCohortType(),
  smartBarSelectedGradeId: makeSelectGradeId(),
  clickedSchoolId: makeSelectClickedSchoolId(),
  gradeStatus: makeSelectGradeExpandCollapseStatus(),
});

const withConnect = connect(mapStateToProps, {
  gradeSelection,
  activeSelectedSchool,
  activeSelectedGrade,
  activeSelectedTeacher,
  activeSelectedClass,
  activeSelectedGroup,
  activeSelectedStudent,
  smartbarSelectedUpdateData,
});

export default compose(withConnect)(GradesSmartTab);
