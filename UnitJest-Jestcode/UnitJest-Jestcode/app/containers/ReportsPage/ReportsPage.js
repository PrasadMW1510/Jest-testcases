/**
 *
 * ReportsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ReportList from 'components/ReportList';
import ReportsCohortTitle from 'components/ReportsCohortTitle';
import {
  makeSelectLoginData,
  makeSelectProgramAvailableData,
  makeSelectProfileDistrictId,
  makeSelectGlobalUserData,
} from 'containers/App/selectors';
import makeSelectReportsPage from './selectors';
import { reportListRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectSelectedSchoolData,
  makeSelectSelectedGradeData,
  makeSelectSelectedTeacherData,
  makeSelectSelectedClassData,
  makeSelectSelectedGroupData,
  makeSelectSelectedStudentData,
  makeSelectSchoolId,
  makeSelectGradeId,
  makeSelectTeacherId,
  makeSelectClassId,
  makeSelectGroupId,
  makeSelectStudentId,
} from '../SmartBarContainer/selectors';

export class ReportsPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.reportListRequest();
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.districtId !== this.props.districtId ||
      newProps.schoolId !== this.props.schoolId ||
      newProps.gradeId !== this.props.gradeId ||
      newProps.teacherId !== this.props.teacherId ||
      newProps.classId !== this.props.classId ||
      newProps.groupId !== this.props.groupId ||
      newProps.studentId !== this.props.studentId
    ) {
      this.props.reportListRequest();
    }
  }

  render() {
    return (
      <span>
        <ReportsCohortTitle
          schoolData={this.props.schoolData}
          gradeData={this.props.gradeData}
          teacherData={this.props.teacherData}
          classData={this.props.classData}
          groupData={this.props.groupData}
          studentData={this.props.studentData}
          userData={this.props.userData}
        />
        <ReportList
          reports={this.props.reports}
          user={this.props.user}
          programs={this.props.programs}
          districtId={this.props.districtId}
          schoolData={this.props.schoolData}
          gradeData={this.props.gradeData}
          teacherData={this.props.teacherData}
          classData={this.props.classData}
          groupData={this.props.groupData}
          studentData={this.props.studentData}
          schoolId={this.props.schoolId}
          gradeId={this.props.gradeId}
          teacherId={this.props.teacherId}
          classId={this.props.classId}
          groupId={this.props.groupId}
          studentId={this.props.studentId}
          userData={this.props.userData}
        />
      </span>
    );
  }
}

ReportsPage.propTypes = {
  reports: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
  user: PropTypes.object.isRequired,
  programs: PropTypes.object.isRequired,
  reportListRequest: PropTypes.func.isRequired,
  districtId: PropTypes.string.isRequired,
  schoolData: PropTypes.object,
  gradeData: PropTypes.object,
  teacherData: PropTypes.object,
  classData: PropTypes.object,
  groupData: PropTypes.object,
  studentData: PropTypes.object,
  schoolId: PropTypes.string,
  gradeId: PropTypes.string,
  teacherId: PropTypes.string,
  classId: PropTypes.string,
  groupId: PropTypes.string,
  studentId: PropTypes.string,
  userData: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  reports: makeSelectReportsPage(),
  user: makeSelectLoginData(),
  programs: makeSelectProgramAvailableData(),
  districtId: makeSelectProfileDistrictId(),
  schoolData: makeSelectSelectedSchoolData(),
  gradeData: makeSelectSelectedGradeData(),
  teacherData: makeSelectSelectedTeacherData(),
  classData: makeSelectSelectedClassData(),
  groupData: makeSelectSelectedGroupData(),
  studentData: makeSelectSelectedStudentData(),
  schoolId: makeSelectSchoolId(),
  gradeId: makeSelectGradeId(),
  teacherId: makeSelectTeacherId(),
  classId: makeSelectClassId(),
  groupId: makeSelectGroupId(),
  studentId: makeSelectStudentId(),
  userData: makeSelectGlobalUserData(),
});

const withConnect = connect(mapStateToProps, { reportListRequest });
const withReducer = injectReducer({ key: 'reportsPage', reducer });
const withSaga = injectSaga({ key: 'reportsPage', saga });

export default compose(withReducer, withSaga, withConnect)(ReportsPage);
