/**
 *
 * GroupsSmartTab
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { COHORT_TYPE } from 'containers/App/constants';
import SmartBarTab from 'components/SmartBarTab/SmartBarTab';
import {
  makeSelectGroupsData,
  makeSelectLoginData,
  makeSelectGroupExpandCollapseStatus,
} from 'containers/App/selectors';
import {
  makeSelectClickedGroupId,
  makeSelectClickedClassData,
  makeSelectClickedTeacherData,
  makeSelectClickedSchoolData,
  makeSelectCohortType,
  makeSelectClickedSchoolId,
  makeSelectClickedGradeId,
  makeSelectClickedTeacherId,
  makeSelectClickedClassId,
  makeSelectGroupId,
} from 'containers/SmartBarContainer/selectors';
import {
  groupSelection,
  activeSelectedSchool,
  activeSelectedGrade,
  activeSelectedTeacher,
  activeSelectedClass,
  activeSelectedGroup,
  activeSelectedStudent,
  smartbarSelectedUpdateData,
} from 'containers/SmartBarContainer/actions';

export class GroupsSmartTab extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedGroupId === nextProps.smartBarSelectedGroupId &&
      nextProps.selectedGroupId !== '' &&
      nextProps.selectedCohortType === COHORT_TYPE.Group
    ) {
      this.props.activeSelectedSchool(nextProps.clickedSchoolId);
      this.props.activeSelectedGrade(nextProps.clickedGradeId);
      this.props.activeSelectedTeacher(nextProps.clickedTeacherId);
      this.props.activeSelectedClass(nextProps.clickedClassId);
      this.props.activeSelectedGroup(nextProps.smartBarSelectedGroupId);
      this.props.activeSelectedStudent('');
    }
  }

  getGroups = () => {
    if (!this.props.groupData) {
      return null;
    }

    return this.props.groupData
      .map(item => ({ text: item.getIn(['display_name', 0]), id: item.getIn(['group_id', 0]) }))
      .toJS();
  };

  getForName = () => {
    if (this.props.selectedClassData) {
      return this.props.selectedClassData.getIn(['display_name', 0]);
    } else if (this.props.selectedTeacherData) {
      return `${this.props.selectedTeacherData.getIn([
        'first_name',
        0,
      ])} ${this.props.selectedTeacherData.getIn(['last_name', 0])}`;
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
        title="Groups"
        items={this.getGroups()}
        forName={this.getForName()}
        onItemClick={this.props.groupSelection}
        selectedItemId={this.props.selectedGroupId}
        defaultChecked={this.props.groupStatus}
        isTabActive={this.props.selectedCohortType === COHORT_TYPE.Group}
        smartbarSelectedUpdateData={this.props.smartbarSelectedUpdateData}
      />
    );
  }
}

GroupsSmartTab.propTypes = {
  groupData: PropTypes.object,
  selectedClassData: PropTypes.object,
  selectedTeacherData: PropTypes.object,
  selectedSchoolData: PropTypes.object,
  login: PropTypes.object.isRequired,
  selectedGroupId: PropTypes.string,
  selectedCohortType: PropTypes.string,
  groupSelection: PropTypes.func.isRequired,
  activeSelectedSchool: PropTypes.func.isRequired,
  activeSelectedGrade: PropTypes.func.isRequired,
  activeSelectedTeacher: PropTypes.func.isRequired,
  activeSelectedClass: PropTypes.func.isRequired,
  activeSelectedGroup: PropTypes.func.isRequired,
  activeSelectedStudent: PropTypes.func.isRequired,
  clickedSchoolId: PropTypes.string,
  clickedClassId: PropTypes.string,
  clickedGradeId: PropTypes.string,
  clickedTeacherId: PropTypes.string,
  smartBarSelectedGroupId: PropTypes.string,
  smartbarSelectedUpdateData: PropTypes.func.isRequired,
  groupStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  groupData: makeSelectGroupsData(),
  selectedGroupId: makeSelectClickedGroupId(),
  selectedClassData: makeSelectClickedClassData(),
  selectedTeacherData: makeSelectClickedTeacherData(),
  selectedSchoolData: makeSelectClickedSchoolData(),
  selectedCohortType: makeSelectCohortType(),
  login: makeSelectLoginData(),
  clickedSchoolId: makeSelectClickedSchoolId(),
  clickedGradeId: makeSelectClickedGradeId(),
  clickedTeacherId: makeSelectClickedTeacherId(),
  clickedClassId: makeSelectClickedClassId(),
  smartBarSelectedGroupId: makeSelectGroupId(),
  groupStatus: makeSelectGroupExpandCollapseStatus(),
});

const withConnect = connect(mapStateToProps, {
  groupSelection,
  activeSelectedSchool,
  activeSelectedGrade,
  activeSelectedTeacher,
  activeSelectedClass,
  activeSelectedGroup,
  activeSelectedStudent,
  smartbarSelectedUpdateData,
});

export default compose(withConnect)(GroupsSmartTab);
