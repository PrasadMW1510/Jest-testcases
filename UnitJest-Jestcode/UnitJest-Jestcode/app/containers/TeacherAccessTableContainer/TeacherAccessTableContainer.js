/**
 *
 * TeacherAccessTableContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TeacherAccessTable from 'components/TeacherAccessTable';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { fromJS } from 'immutable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { teacherEnrollRequest, teacherAppsUsageRequest, teacherAccessSaveRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  getTeacherName,
  getApplicationData,
  sortApplicationData,
  getTeacherIDs,
  jsonToXML,
} from './transformers';
import * as Selectors from './selectors';

export class TeacherAccessTableContainer extends React.Component {
  state = {
    isDataInitialized: false,
    totals: null,
    apps: null,
    sortedApps: fromJS([]),
    teacherData: fromJS([]),
  };

  componentDidMount() {
    this.props.teacherEnrollRequest();
    this.props.teacherAppsUsageRequest();
  }

  componentWillReceiveProps(nextProps) {
    const loadingNext = nextProps.isDataLoading;
    const errorNext = nextProps.teacherAccessInfo.get('error');
    const saveSuccess =
      this.props.teacherAccessInfo && this.props.teacherAccessInfo.get('saveSuccess');
    const saveSuccessNext =
      nextProps.teacherAccessInfo && nextProps.teacherAccessInfo.get('saveSuccess');
    const loadingApps = nextProps.teacherAccessInfo.get('loadingApps');
    const loadingTeachers = nextProps.teacherAccessInfo.get('loadingTeachers');

    // On saveSuccess, remove the tab isolation
    if (saveSuccess !== true && saveSuccessNext === true) {
      this.props.handleTabReset();
    }

    // Don't update state while loading for better ux
    if (
      errorNext !== false ||
      loadingNext ||
      (loadingApps && !this.state.isDataInitialized) ||
      loadingTeachers
    )
      return;

    // Only sort apps once and always refer to sorted apps
    const sortedApps = this.getSortedApps(nextProps);
    const teacherData = this.getTeacherData(nextProps, sortedApps);
    const teacherIDs = this.getTeacherIds(nextProps);

    // Any variable starting with `grid`, implies data tweaked to include header row & fixed 1st column
    const gridHeaders = this.getGridHeaders(sortedApps);
    const gridHeaderIDs = this.getGridHeaderIDs(sortedApps);

    // Include the fixed column as first item
    const headers = [{ id: 'fixed-column' }].concat(
      sortedApps.map(app => ({ label: app.name[0] }))
    );

    // Footer contains totals so needs to be integer
    const gridFooters = ['Total seats remaining:'].concat(
      sortedApps.map(app => Number(app.available_seats[0]))
    );

    const gridData = [gridHeaders].concat(teacherData && teacherData.length ? teacherData : []);

    if (this.props.isolateTab === nextProps.isolateTab) {
      this.setState({
        isDataInitialized: true,
        gridData: fromJS(gridData),
        gridHeaderIDs,
        teacherIDs,
        gridFooters,
        gridHeaders,
        headers,
        sortedApps,
      });
    }
  }

  getTeacherData = (props, sortedApps) => {
    const teacherData = props.teacherAccessInfo.get('teacherEnroll');
    return (
      teacherData &&
      teacherData.size > 0 &&
      teacherData
        .toJS()
        .map((item, index) =>
          [getTeacherName(item, index)].concat(getApplicationData(item, sortedApps))
        )
    );
  };

  getGridHeaders = sortedApps =>
    ['Teachers'].concat(sortedApps.map(app => app && app.name && app.name[0]));

  getGridHeaderIDs = sortedApps =>
    ['Teachers'].concat(sortedApps.map(app => app && app.application_id && app.application_id[0]));

  getTeacherIds = props => {
    const teacherData = props.teacherAccessInfo.get('teacherEnroll');
    if (teacherData && teacherData.size > 0) {
      return teacherData.toJS().map((item, index) => getTeacherIDs(item, index));
    }
    return null;
  };

  getSortedApps = props => {
    const immApps = props.teacherAccessInfo.getIn(['teacherAppsUsage', 'application']);
    return (
      (this.state.sortedApps.size > 0 && this.state.sortedApps) ||
      (immApps && immApps.toJS && immApps.toJS().sort(sortApplicationData)) ||
      []
    );
  };

  handleCancel = () => {
    this.props.teacherEnrollRequest();
    this.props.handleTabReset();
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
      const uncheckedDelta = this.state.gridData.reduce((total, row) => {
        const value = row.get(columnIndex);
        // Skip header & footer rows and any checkbox already checked
        if (typeof value !== 'boolean' || value === true) {
          return total;
        }
        row.set(columnIndex, isHeaderChecked);
        // Tally
        return total + 1;
      }, 0);

      const gridData = this.state.gridData.map(row => {
        const value = row.get(columnIndex);
        return typeof value === 'boolean' ? row.set(columnIndex, isHeaderChecked) : row;
      });

      const gridFooters = [...this.state.gridFooters];
      headers[columnIndex].checked = headers[columnIndex] && !headers[columnIndex].checked;

      // Decrease total seats when item changes to checked
      gridFooters[columnIndex] = isHeaderChecked
        ? gridFooters[columnIndex] - uncheckedDelta
        : gridFooters[columnIndex] + (this.state.gridData.size - 1 - uncheckedDelta);

      this.setState({ gridData, gridFooters, headers });
      this.props.handleTabIsolate();
      return;
    }

    const gridData = this.state.gridData.setIn([rowIndex, columnIndex], ev.target.checked);
    const gridFooters = [...this.state.gridFooters];

    // Header will always be unchecked in this situation
    headers[columnIndex].checked = false;

    // Decrease total seats when item changes to checked
    gridFooters[columnIndex] = ev.target.checked
      ? gridFooters[columnIndex] - 1
      : gridFooters[columnIndex] + 1;
    this.setState({ gridData, gridFooters, headers });
    this.props.handleTabIsolate();
  };

  handleTeacherAccessSave = (shouldReturn = false, currentPage = 1) => {
    const users = [];
    const gridData = (this.state.gridData && this.state.gridData.toJS()) || [];

    for (let index = 1; index < gridData.length; index += 1) {
      const user = {};
      const applications = [];
      user.user_id = this.state.teacherIDs[index - 1];
      for (let userIndex = 1; userIndex < gridData[index].length; userIndex += 1) {
        if (gridData[index][userIndex]) {
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
    this.props.teacherAccessSaveRequest(
      jsonToXML(enrollment, 'enrollment'),
      shouldReturn,
      currentPage
    );
  };

  render() {
    const { teacherAccessInfo, isDataLoading } = this.props;
    const { gridData, gridFooters, headers, sortedApps } = this.state;
    const error = teacherAccessInfo && teacherAccessInfo.get('error');
    if (!sortedApps || !gridData) {
      return null;
    }
    const paginationData = Selectors.selectPaginationData(teacherAccessInfo);
    return (
      <TeacherAccessTable
        error={error}
        handleToggle={this.handleToggle}
        gridList={gridData.toJS()}
        headers={headers}
        footers={gridFooters}
        isDataInitialized={this.state.isDataInitialized}
        isDataLoading={isDataLoading}
        paginationData={paginationData}
        teacherEnrollRequest={this.props.teacherEnrollRequest}
        isolateTab={this.props.isolateTab}
        handleTabIsolate={this.props.handleTabIsolate}
        teacherAccessSaveRequest={this.handleTeacherAccessSave}
        handleCancel={this.handleCancel}
        handleTabReset={this.props.handleTabReset}
      />
    );
  }
}

TeacherAccessTableContainer.propTypes = {
  teacherEnrollRequest: PropTypes.any,
  teacherAppsUsageRequest: PropTypes.any,
  teacherAccessSaveRequest: PropTypes.func,
  teacherAccessInfo: PropTypes.any,
  isolateTab: PropTypes.bool.isRequired,
  handleTabIsolate: PropTypes.func.isRequired,
  handleTabReset: PropTypes.func.isRequired,
  isDataLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  teacherAccessInfo: Selectors.makeSelectTeacherAccessTableContainer(),
  isDataLoading: Selectors.makeSelectLoading(),
});

const withConnect = connect(mapStateToProps, {
  teacherEnrollRequest,
  teacherAppsUsageRequest,
  teacherAccessSaveRequest,
});

const withReducer = injectReducer({ key: 'teacherEnroll', reducer });
const withSaga = injectSaga({ key: 'teacherEnroll', saga });

export default compose(withReducer, withSaga, withConnect)(TeacherAccessTableContainer);
