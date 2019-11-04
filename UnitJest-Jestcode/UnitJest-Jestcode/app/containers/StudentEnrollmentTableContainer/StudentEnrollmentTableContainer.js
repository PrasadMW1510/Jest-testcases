/**
 *
 * StudentEnrollmentTableContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SettingsMessage from 'components/SettingsMessage';
import { connect } from 'react-redux';
import { isUserTypeAdminOrTech } from 'utils/utilities';
import StudentEnrollmentTable from 'components/StudentEnrollmentTable';
import 'components/StudentEnrollmentTable/StudentEnrollmentTable.scss';
import { createStructuredSelector } from 'reselect';
import { makeSelectSmartBarContainer } from 'containers/SmartBarContainer/selectors';
import { compose } from 'redux';
import { fromJS } from 'immutable';
import { USER_ORG, COHORT_TYPE } from 'containers/App/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as Actions from './actions';
import reducer from './reducer';
import saga from './saga';
import * as Constants from './constants';
import { makeSelectLoginUserOrg, makeSelectProfileUserType } from '../App/selectors';
import { getStudentName, getApplicationData, getStudentIDs, jsonToXML } from './transformers';
import * as Selectors from './selectors';
import * as ValidationUtils from './tableValidation';
import getValidationRules from './tableValidationRules';

export class StudentEnrollmentTableContainer extends React.Component {
  state = {
    isDataInitialized: false,
    totals: null,
    apps: null,
    sortedApps: fromJS([]),
    studentData: fromJS([]),
  };

  componentDidMount() {
    this.props.studentEnrollRequest();
    this.props.studentAppsUsageRequest();
    this.props.studentGetListRequest();
    if (this.props.orgType === USER_ORG.District && isUserTypeAdminOrTech(this.props.userType)) {
      this.props.samCentralStatusRequest();
    }
  }

  componentWillReceiveProps(nextProps) {
    const loadingNext = nextProps.isDataLoading;
    const loadingApps = nextProps.studentEnrollInfo.get('loadingApps');
    const loadingStudents = nextProps.studentEnrollInfo.get('loadingStudents');
    const studentGetList = nextProps.studentEnrollInfo.get('studentGetList');

    // Don't update state while loading for better ux
    if (loadingNext || (loadingApps && !this.state.isDataInitialized) || loadingStudents) return;

    // Only sort apps once and always refer to sorted apps
    const sortedApps = this.getSortedApps(nextProps, studentGetList);
    const studentData = this.getStudentData(nextProps, sortedApps);
    const studentIDs = this.getStudentIds(nextProps);

    // Any variable starting with `grid`, implies data tweaked to include header row & fixed 1st column
    const gridHeaders = this.getGridHeaders(sortedApps);
    const gridHeaderIDs = this.getGridHeaderIDs(sortedApps);

    // Include the fixed column as first item
    const headers = [{ id: 'fixed-column' }].concat(
      sortedApps.map(app => ({ id: app.application_id[0], label: app.name[0], header: true }))
    );

    // Footer contains totals so needs to be integer
    const gridFooters = ['Total seats remaining:'].concat(
      sortedApps.map(app => Number(app.available_seats[0]))
    );
    const gridData = [this.getHeaders(sortedApps)].concat(
      studentData && studentData.length ? studentData : []
    );

    if (this.props.isolateTab === nextProps.isolateTab) {
      const validatedData = ValidationUtils.validateAll(gridData, getValidationRules());
      this.setState({
        isDataInitialized: true,
        gridData: fromJS(validatedData),
        gridHeaderIDs,
        studentIDs,
        gridFooters,
        gridHeaders,
        headers,
        sortedApps,
      });
    }
  }

  getStudentData = (props, sortedApps) => {
    const studentData = props.studentEnrollInfo.get('studentEnroll');
    if (this.props.smartBarSelections.getIn(['selectedCohType']) !== COHORT_TYPE.Student) {
      return (
        studentData &&
        studentData.size > 0 &&
        studentData
          .toJS()
          .map((item, index) =>
            [getStudentName(item, index)].concat(getApplicationData(item, sortedApps))
          )
      );
    }
    return (
      studentData &&
      studentData.size > 0 &&
      studentData.toJS().map(item => getApplicationData(item, sortedApps))
    );
  };

  getHeaders = sortedApps => {
    if (this.props.smartBarSelections.getIn(['selectedCohType']) !== COHORT_TYPE.Student) {
      return (
        sortedApps &&
        ['Students'].concat(
          sortedApps.map(app => ({
            id: app.application_id && app.application_id[0],
            label: app.name && app.name[0],
          }))
        )
      );
    }

    return (
      sortedApps &&
      sortedApps.map(app => ({
        id: app.application_id && app.application_id[0],
        label: app.name && app.name[0],
      }))
    );
  };

  getGridHeaders = sortedApps => {
    if (this.props.smartBarSelections.getIn(['selectedCohType']) !== COHORT_TYPE.Student) {
      return ['Students'].concat(sortedApps.map(app => app && app.name && app.name[0]));
    }
    return sortedApps.map(app => app && app.name && app.name[0]);
  };

  getGridHeaderIDs = sortedApps => {
    if (this.props.smartBarSelections.getIn(['selectedCohType']) !== COHORT_TYPE.Student) {
      return ['Students'].concat(
        sortedApps.map(app => app && app.application_id && app.application_id[0])
      );
    }
    return sortedApps.map(app => app && app.application_id && app.application_id[0]);
  };

  getStudentIds = props => {
    const studentData = props.studentEnrollInfo.get('studentEnroll');
    if (studentData && studentData.size > 0) {
      return studentData.toJS().map((item, index) => getStudentIDs(item, index));
    }
    return null;
  };

  getSortedApps = (props, studentGetList) => {
    const studentList =
      studentGetList && studentGetList.toJS() ? studentGetList.toJS() : { application: [] };
    const immApps = props.studentEnrollInfo.getIn(['studentAppsUsage', 'application']);
    if (this.state.sortedApps && this.state.sortedApps.size > 0) {
      return this.state.sortedApps;
    } else if (immApps && immApps.toJS()) {
      const sortedApps = immApps.toJS();
      return studentList.application.map(student => {
        if (student) {
          const app = sortedApps.find(item => student.app_id[0] === item.application_id[0]);
          if (app) {
            return app;
          }
        }
        return null;
      });
    }
    return [];
  };

  handleCancel = () => {
    this.props.studentEnrollRequest();
    this.props.handleTabReset();
  };

  handleStudentViewToggle = ev => {
    const rowIndex = Number(ev.target.dataset.row);
    const updatedData = ValidationUtils.toggle(this.state.gridData.toJS(), 1, rowIndex);
    const validatedData = ValidationUtils.validateAll(updatedData, getValidationRules());
    this.setState({ gridData: fromJS(validatedData) });
    this.props.handleTabIsolate();
  };

  handleToggle = ev => {
    const isHeader = Boolean(ev.target.dataset.header);
    const rowIndex = Number(ev.target.dataset.row);
    const columnIndex = Number(ev.target.dataset.column);
    const headers = [...this.state.headers];

    // Handle header clicks
    if (isHeader) {
      const isHeaderChecked = ev.target.checked;

      // Loop through column and update checked state
      const uncheckedDelta = this.state.gridData.slice(1).reduce((total, row) => {
        const value = row.get(columnIndex) && row.get(columnIndex).toJS();
        // Skip header & footer rows and any checkbox already checked
        if (value.checked === true) {
          return total;
        }
        // Tally
        return total + 1;
      }, 0);

      const gridData = this.state.gridData.map(row => {
        const value = row.get(columnIndex) && row.get(columnIndex).toJS();

        return typeof value === 'object'
          ? row.set(columnIndex, fromJS({ ...value, checked: isHeaderChecked }))
          : row;
      });

      const gridFooters = [...this.state.gridFooters];
      headers[columnIndex].checked = headers[columnIndex] && !headers[columnIndex].checked;

      // Decrease total seats when item changes to checked
      gridFooters[columnIndex] = isHeaderChecked
        ? gridFooters[columnIndex] - uncheckedDelta
        : gridFooters[columnIndex] + (this.state.gridData.size - 1 - uncheckedDelta);

      const validatedDataHeader = ValidationUtils.validateAll(
        ValidationUtils.toggleAll(gridData.toJS(), columnIndex, isHeaderChecked),
        getValidationRules()
      );
      this.setState({ gridData: fromJS(validatedDataHeader), gridFooters, headers });
      this.props.handleTabIsolate();
      return;
    }

    const gridFooters = [...this.state.gridFooters];

    // Header will always be unchecked in this situation
    headers[columnIndex].checked = false;

    // Decrease total seats when item changes to checked
    gridFooters[columnIndex] = ev.target.checked
      ? gridFooters[columnIndex] - 1
      : gridFooters[columnIndex] + 1;

    const updatedData = ValidationUtils.toggle(this.state.gridData.toJS(), rowIndex, columnIndex);
    const validatedData = ValidationUtils.validateAll(updatedData, getValidationRules());
    this.setState({ gridData: fromJS(validatedData), gridFooters, headers });
    this.props.handleTabIsolate();
  };

  handleStudentEnrollSave = (shouldReturn = false, currentPage = 1) => {
    const users = [];
    const gridData = this.state.gridData.toJS();
    for (let index = 1; index < gridData.length; index += 1) {
      const user = {};
      const applications = [];
      user.user_id = this.state.studentIDs[index - 1];
      for (let userIndex = 1; userIndex < gridData[index].length; userIndex += 1) {
        // Checkboxes have state - example { checked: true, disabled: false }
        if (gridData[index][userIndex] && gridData[index][userIndex].checked) {
          applications.push({ application_id: this.state.gridHeaderIDs[userIndex] });
        }
      }
      if (applications.length > 0) {
        user.applications = { applications };
      }
      users.push({ user });
    }
    const enrollment = {
      users: { users },
    };
    this.props.studentEnrollSaveRequest(
      jsonToXML(enrollment, 'enrollment'),
      shouldReturn,
      currentPage
    );
    this.props.handleTabReset();
  };

  handleStudentViewEnrollSave = (shouldReturn = false, currentPage = 1) => {
    const users = [];
    const gridData = this.state.gridData.toJS();
    for (let index = 1; index < gridData.length; index += 1) {
      const user = {};
      const applications = [];
      user.user_id = this.state.studentIDs[index - 1];
      for (let userIndex = 0; userIndex < gridData[index].length; userIndex += 1) {
        if (gridData[index][userIndex] && gridData[index][userIndex].checked) {
          applications.push({ application_id: this.state.gridHeaderIDs[userIndex] });
        }
      }
      if (applications.length > 0) {
        user.applications = { applications };
      }
      users.push({ user });
    }
    const enrollment = {
      school_id: this.props.smartBarSelections.getIn(['selectedSchoolId']),
      users: { users },
    };

    this.props.studentEnrollSaveRequest(
      jsonToXML(enrollment, 'enrollment'),
      shouldReturn,
      currentPage
    );
    this.props.handleTabReset();
  };

  render() {
    const { smartBarSelections, isDataLoading } = this.props;
    const { gridData, gridFooters, headers, sortedApps } = this.state;
    if (!sortedApps || !gridData) {
      return null;
    }
    const paginationData = Selectors.selectPaginationData(this.props.studentEnrollInfo);
    const studentData = this.props.studentEnrollInfo.get('studentEnroll');
    return (
      <div>
        {studentData &&
          studentData.size > 0 && (
            <StudentEnrollmentTable
              handleToggle={this.handleToggle}
              handleStudentViewToggle={this.handleStudentViewToggle}
              gridList={gridData.toJS()}
              headers={headers}
              footers={gridFooters}
              isDataInitialized={this.state.isDataInitialized}
              isDataLoading={isDataLoading}
              paginationData={paginationData}
              studentEnrollRequest={this.props.studentEnrollRequest}
              isolateTab={this.props.isolateTab}
              handleTabIsolate={this.props.handleTabIsolate}
              studentEnrollSaveRequest={this.handleStudentEnrollSave}
              studentViewEnrollSaveRequest={this.handleStudentViewEnrollSave}
              handleCancel={this.handleCancel}
              handleTabReset={this.props.handleTabReset}
              smartBarSelections={smartBarSelections}
            />
          )}
        {!studentData && (
          <div>
            <div className="teacher-enrollment-header">
              Use the check boxes to enroll or unenroll students in HMH programs. Use the check box
              at the top of each column to enroll all students in that program.
            </div>
            <SettingsMessage message1={Constants.STUDENT_ENROLLMENT_COUNT} />
          </div>
        )}
      </div>
    );
  }
}

StudentEnrollmentTableContainer.propTypes = {
  smartBarSelections: PropTypes.object.isRequired,
  studentEnrollRequest: PropTypes.func,
  studentAppsUsageRequest: PropTypes.func,
  studentEnrollSaveRequest: PropTypes.func,
  samCentralStatusRequest: PropTypes.func,
  studentGetListRequest: PropTypes.func,
  studentEnrollInfo: PropTypes.any,
  isolateTab: PropTypes.bool.isRequired,
  handleTabIsolate: PropTypes.func.isRequired,
  handleTabReset: PropTypes.func.isRequired,
  orgType: PropTypes.any,
  userType: PropTypes.any,
  isDataLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentEnrollInfo: Selectors.makeSelectStudentEnrollTableContainer(),
  orgType: makeSelectLoginUserOrg(),
  userType: makeSelectProfileUserType(),
  smartBarSelections: makeSelectSmartBarContainer(),
  isDataLoading: Selectors.makeSelectLoading(),
});

const withConnect = connect(mapStateToProps, {
  ...Actions,
});

const withReducer = injectReducer({ key: 'studentEnroll', reducer });
const withSaga = injectSaga({ key: 'studentEnroll', saga });

export default compose(withReducer, withSaga, withConnect)(StudentEnrollmentTableContainer);
