/**
 *
 * SchoolsSmartTab
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import SmartBarTab from 'components/SmartBarTab/SmartBarTab';
import {
  makeSelectSchoolsData,
  makeSelectLoginData,
  makeSelectSchoolExpandCollapseStatus,
} from 'containers/App/selectors';
import {
  makeSelectClickedSchoolId,
  makeSelectSchoolId,
  makeSelectCohortType,
} from 'containers/SmartBarContainer/selectors';
import {
  schoolSelection,
  activeSelectedSchool,
  activeSelectedGrade,
  activeSelectedTeacher,
  activeSelectedClass,
  activeSelectedGroup,
  activeSelectedStudent,
  smartbarSelectedUpdateData,
} from 'containers/SmartBarContainer/actions';
import { COHORT_TYPE } from 'containers/App/constants';

export class SchoolsSmartTab extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedSchoolId === nextProps.smartBarSelectedSchoolId &&
      nextProps.selectedSchoolId !== '' &&
      nextProps.selectedCohortType === COHORT_TYPE.School
    ) {
      this.props.activeSelectedSchool(nextProps.selectedSchoolId);
      this.props.activeSelectedGrade('');
      this.props.activeSelectedTeacher('');
      this.props.activeSelectedClass('');
      this.props.activeSelectedGroup('');
      this.props.activeSelectedStudent('');
    }
  }

  getSchools = () => {
    if (!this.props.schools) {
      return null;
    }

    return this.props.schools
      .map(item => ({ text: item.getIn(['name', 0]), id: item.getIn(['org_id', 0]) }))
      .toJS();
  };

  getForName = () =>
    `${this.props.login.getIn(['first_name', 0])} ${this.props.login.getIn(['last_name', 0])}`;

  shouldDisplay = () => {
    // only show this tab if the user is a district user or a teacher with more than one school
    const userOrg = this.props.login.getIn(['user_org', 0]);
    return (
      userOrg === COHORT_TYPE.District ||
      (!userOrg && this.props.schools && this.props.schools.size > 1)
    );
  };

  render() {
    if (!this.shouldDisplay()) {
      return null;
    }

    return (
      <SmartBarTab
        title="Schools"
        forName={this.getForName()}
        items={this.getSchools()}
        onItemClick={this.props.schoolSelection}
        selectedItemId={this.props.selectedSchoolId}
        defaultChecked={this.props.schoolStatus}
        isTabActive={this.props.selectedCohortType === COHORT_TYPE.School}
        smartbarSelectedUpdateData={this.props.smartbarSelectedUpdateData}
      />
    );
  }
}

SchoolsSmartTab.propTypes = {
  schools: PropTypes.object,
  login: PropTypes.object.isRequired,
  selectedSchoolId: PropTypes.string,
  schoolSelection: PropTypes.func.isRequired,
  selectedCohortType: PropTypes.string,
  smartBarSelectedSchoolId: PropTypes.string,
  activeSelectedSchool: PropTypes.func.isRequired,
  activeSelectedGrade: PropTypes.func.isRequired,
  activeSelectedTeacher: PropTypes.func.isRequired,
  activeSelectedClass: PropTypes.func.isRequired,
  activeSelectedGroup: PropTypes.func.isRequired,
  activeSelectedStudent: PropTypes.func.isRequired,
  smartbarSelectedUpdateData: PropTypes.func.isRequired,
  schoolStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  schools: makeSelectSchoolsData(),
  selectedSchoolId: makeSelectClickedSchoolId(),
  selectedCohortType: makeSelectCohortType(),
  login: makeSelectLoginData(),
  smartBarSelectedSchoolId: makeSelectSchoolId(),
  schoolStatus: makeSelectSchoolExpandCollapseStatus(),
});

const withConnect = connect(mapStateToProps, {
  schoolSelection,
  activeSelectedSchool,
  activeSelectedGrade,
  activeSelectedTeacher,
  activeSelectedClass,
  activeSelectedGroup,
  activeSelectedStudent,
  smartbarSelectedUpdateData,
});

export default compose(withConnect)(SchoolsSmartTab);
