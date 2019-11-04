/**
 *
 * UsageSummaryContainer
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { USER_TYPE, COHORT_TYPE, USER_ORG } from 'containers/App/constants';
import { isUserTypeAdminOrTech, sortData } from 'utils/utilities';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import UsageSummary from 'components/UsageSummary';
import makeSelectUsageSummaryData from './selectors';
import { makeSelectLoginData } from '../App/selectors';
import { makeSelectSmartBarContainer } from '../SmartBarContainer/selectors';
import reducer from './reducer';
import saga from './saga';
import * as Constants from './constants';

import { usageSummaryRequest } from './actions';

export class UsageSummaryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnData: null,
      selectedCell: { rowIndex: 0, columnIndex: 0 },
      sortDescending: false,
    };
  }
  componentDidMount() {
    this.props.usageSummaryRequest();
  }

  componentWillReceiveProps(nextProps) {
    const { smartBarSelections } = this.props;

    const cohortType = smartBarSelections.getIn(['selectedCohType']);
    const nextCohortType = nextProps.smartBarSelections.getIn(['selectedCohType']);
    if (
      smartBarSelections.get('selectedTeacherId') !==
        nextProps.smartBarSelections.getIn(['selectedTeacherId']) ||
      smartBarSelections.getIn(['selectedSchoolId']) !==
        nextProps.smartBarSelections.getIn(['selectedSchoolId']) ||
      smartBarSelections.getIn(['selectedGradeId']) !==
        nextProps.smartBarSelections.getIn(['selectedGradeId']) ||
      smartBarSelections.getIn(['selectedClassId']) !==
        nextProps.smartBarSelections.getIn(['selectedClassId']) ||
      smartBarSelections.getIn(['selectedGroupId']) !==
        nextProps.smartBarSelections.getIn(['selectedGroupId']) ||
      smartBarSelections.getIn(['selectedStudentId']) !==
        nextProps.smartBarSelections.getIn(['selectedStudentId']) ||
      cohortType !== nextCohortType
    ) {
      this.setState({ selectedCell: { rowIndex: 0, columnIndex: 0 }, columnData: null });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.usageSummary.get('usageSummary') !== nextProps.usageSummary.get('usageSummary') ||
      this.state.sortDescending !== nextState.sortDescending ||
      this.state.selectedCell !== nextState.selectedCell
    );
  }

  onGridHeaderClick = (tableData, clickedRowIndex, clickedColumnIndex, sortKey) => {
    const { selectedCell } = this.state;

    let isDescending = this.state.sortDescending;

    if (
      selectedCell.rowIndex === clickedRowIndex &&
      selectedCell.columnIndex === clickedColumnIndex
    ) {
      isDescending = !isDescending;
    }

    const sortedTable = tableData.sort((a, b) => {
      const current = a[sortKey];
      const next = b[sortKey];
      return sortData(current, next);
    });

    this.setState({
      columnData: isDescending ? sortedTable.reverse() : sortedTable,
      selectedCell: {
        rowIndex: clickedRowIndex,
        columnIndex: clickedColumnIndex,
      },
      sortDescending: isDescending,
    });
  };

  getTotals() {
    const { usageSummary, loginData, smartBarSelections } = this.props;

    const items = usageSummary.get('usageSummary');
    let totals = [];
    const cohortType = smartBarSelections.getIn(['selectedCohType']);
    const userType = loginData.getIn(['user_type', 0]);
    const orgType = loginData.getIn(['user_org', 0]);

    if (
      cohortType === COHORT_TYPE.Student ||
      items.size === 0 ||
      items.get(0) === '' ||
      items.getIn(['applications', 0]) === ''
    ) {
      return totals;
    }

    totals = items
      .getIn(['applications', 0, 'application'])
      .map(a => a.getIn(['seats', 1, '_']))
      .toJS();

    if (
      (orgType === USER_ORG.School && isUserTypeAdminOrTech(userType) && cohortType === '') ||
      cohortType === COHORT_TYPE.Grade ||
      cohortType === COHORT_TYPE.School
    )
      totals.unshift('');
    return totals;
  }

  getProductDetails() {
    const { usageSummary, smartBarSelections } = this.props;
    const items = usageSummary.get('usageSummary');

    const cohortType = smartBarSelections.getIn(['selectedCohType']);
    if (
      !(cohortType === COHORT_TYPE.Student) ||
      items.size === 0 ||
      items.get(0) === '' ||
      items.getIn(['applications', 0]) === ''
    ) {
      return [];
    }
    return items
      .getIn(['applications', 0, 'application'])
      .map(a => ({
        name: a.getIn(['name']),
        enrolled: a.getIn(['$', 'enrolled']),
        datapoint: a.getIn(['datapoint']),
      }))
      .toJS();
  }

  getHeaderData() {
    const { usageSummary, loginData, smartBarSelections } = this.props;
    const items = usageSummary.get('usageSummary');
    let headerData = [];
    const cohortType = smartBarSelections.getIn(['selectedCohType']);
    if (
      cohortType === COHORT_TYPE.Student ||
      items.size === 0 ||
      items.get(0) === '' ||
      items.getIn(['applications', 0]) === ''
    ) {
      return headerData;
    }

    headerData = items
      .getIn(['applications', 0, 'application'])
      .map(a => a.getIn(['name']))
      .toJS();

    const userType = loginData.getIn(['user_type', 0]);
    const orgType = loginData.getIn(['user_org', 0]);
    if (
      (orgType === USER_ORG.School && isUserTypeAdminOrTech(userType) && cohortType === '') ||
      cohortType === COHORT_TYPE.Grade ||
      cohortType === COHORT_TYPE.School
    )
      headerData.unshift([USER_TYPE.Teacher]);
    return headerData;
  }

  getTableData() {
    const { usageSummary, loginData, smartBarSelections } = this.props;
    const items = usageSummary.get('usageSummary');
    const data = {};

    const cohortType = smartBarSelections.getIn(['selectedCohType']);
    if (
      cohortType === COHORT_TYPE.Student ||
      items.size === 0 ||
      items.get(0) === '' ||
      items.getIn(['applications', 0]) === ''
    ) {
      return data;
    }

    const orgType = loginData.getIn(['user_org', 0]);
    const userType = loginData.getIn(['user_type', 0]);

    if (cohortType === COHORT_TYPE.Group || cohortType === COHORT_TYPE.Class) {
      if (items.getIn(['students', 0, 'student']) && items.getIn(['students', 0]) !== '') {
        items.getIn(['students', 0, 'student']).forEach(item => {
          const studentName = `${item.getIn(['student_last_name', 0])}, ${item.getIn([
            'student_first_name',
            0,
          ])}`;

          const appData = item.getIn(['applications', 0, 'application']);
          const appDataSorted = appData.sort(this.compareAppId);
          data[studentName] = appDataSorted
            .map(a => [a.getIn(['$', 'used']) === 'true' ? Constants.CHECK_MARK : ''])
            .toJS();
        });
      }
    } else if (cohortType === COHORT_TYPE.Teacher) {
      if (items.getIn(['classes']) && items.getIn(['classes', 0]) !== '') {
        items.getIn(['classes', 0, 'class']).forEach(item => {
          data[item.getIn(['name', 0])] = item
            .getIn(['applications', 0, 'application'])
            .sort(this.compareAppId)
            .filter(a => !/.+Teacher/.test(a.getIn(['name'])))
            .map(a => a.getIn(['students', 0, 'total']))
            .toJS();
        });
      }
    } else if (cohortType === COHORT_TYPE.Grade || cohortType === COHORT_TYPE.School) {
      if (items.getIn(['classes']) && items.getIn(['classes', 0]) !== '') {
        items.getIn(['classes', 0, 'class']).forEach(classItem => {
          if (classItem.getIn(['teachers']) && classItem.getIn(['teachers', 0]) !== '') {
            classItem.getIn(['teachers', 0, 'teacher']).forEach(teacher => {
              const givenName = teacher.getIn(['name', 0, 'given.name', 0]);
              const familyName = teacher.getIn(['name', 0, 'family.name', 0]);
              const teacherName = !givenName && !familyName ? '' : `${familyName}, ${givenName}`;
              const appData = classItem.getIn(['applications', 0, 'application']);
              const appDataSorted = appData.sort(this.compareAppId);
              const key = classItem.getIn(['name', 0]) + Constants.SPLIT_IDENTIFIER + teacherName;
              data[key] = appDataSorted
                .filter(a => !/.+Teacher/.test(a.getIn(['name'])))
                .map(a => a.getIn(['students', 0, 'total', 0]))
                .toJS();
              data[key].unshift(teacherName);
            });
          } else {
            const appData = classItem.getIn(['applications', 0, 'application']);
            const appDataSorted = appData.sort(this.compareAppId);
            const key = classItem.getIn(['name', 0]) + Constants.SPLIT_IDENTIFIER;
            data[key] = appDataSorted
              .filter(a => !/.+Teacher/.test(a.getIn(['name'])))
              .map(a => a.getIn(['students', 0, 'total', 0]))
              .toJS();
            data[key].unshift('');
          }
        });
      }
    } else if (loginData.getIn(['user_type', 0]) === USER_TYPE.Teacher) {
      if (items.getIn(['classes']) && items.getIn(['classes', 0]) !== '') {
        items.getIn(['classes', 0, 'class']).forEach(item => {
          const appData = item.getIn(['applications', 0, 'application']);
          const appDataSorted = appData.sort(this.compareAppId);
          data[item.getIn(['name', 0])] = appDataSorted
            .filter(a => !/.+Teacher/.test(a.getIn(['name'])))
            .map(a => a.getIn(['students', 0, 'total', 0]))
            .toJS();
        });
      }
    } else if (
      loginData.getIn(['user_org', 0]) === USER_ORG.District &&
      isUserTypeAdminOrTech(loginData.getIn(['user_type', 0]))
    ) {
      if (
        items.getIn(['schools']) &&
        items.getIn(['schools', 0]) !== '' &&
        items.getIn(['schools', 0, 'school'])
      ) {
        items.getIn(['schools', 0, 'school']).forEach(item => {
          data[item.getIn(['school_name', 0])] = item
            .getIn(['applications', 0, 'application'])
            .map(a => a.getIn(['seats', 0, '_']))
            .toJS();
        });
      }
    } else if (orgType === USER_ORG.School && isUserTypeAdminOrTech(userType)) {
      if (items.getIn(['classes']) && items.getIn(['classes', 0]) !== '') {
        items.getIn(['classes', 0, 'class']).forEach(classItem => {
          if (classItem.getIn(['teachers']) && classItem.getIn(['teachers', 0]) !== '') {
            classItem.getIn(['teachers', 0, 'teacher']).forEach(teacher => {
              const givenName = teacher.getIn(['name', 0, 'given.name', 0]);
              const familyName = teacher.getIn(['name', 0, 'family.name', 0]);
              const teacherName = !givenName && !familyName ? '' : `${familyName}, ${givenName}`;
              const appData = classItem.getIn(['applications', 0, 'application']);
              const appDataSorted = appData.sort(this.compareAppId);
              const key = classItem.getIn(['name', 0]) + Constants.SPLIT_IDENTIFIER + teacherName;
              data[key] = appDataSorted
                .filter(a => !/.+Teacher/.test(a.getIn(['name'])))
                .map(a => a.getIn(['students', 0, 'total', 0]))
                .toJS();
              data[key].unshift(teacherName);
            });
          } else {
            const appData = classItem.getIn(['applications', 0, 'application']);
            const appDataSorted = appData.sort(this.compareAppId);
            const key = classItem.getIn(['name', 0]) + Constants.SPLIT_IDENTIFIER;
            data[key] = appDataSorted
              .filter(a => !/.+Teacher/.test(a.getIn(['name'])))
              .map(a => a.getIn(['students', 0, 'total', 0]))
              .toJS();
            data[key].unshift('');
          }
        });
      }
    }
    return data;
  }

  getKeys() {
    const data = this.getTableData();
    return Object.keys(data);
  }

  // The data from the api comes in an array with student count
  // ex. ExampleSchool: [0,0,0,0,0,0,0,0,0,]
  // ex. [Course1, Course2, Course3]
  // this function matches the array and creates an array of objects for the table
  // {Course1: 0, Course2: 0, Course3: 0, school: ExampleSchool}

  createColumnData = (headers, rowKeys, rowData) => {
    let firstColumnTitle;
    const tableData = rowKeys.map(key => {
      const obj = headers.reduce((tableRowData, headerTitle, currentIndex) => {
        const { smartBarSelections, loginData } = this.props;
        let rowValue;
        // firstColumnTitle = '';
        const cohortType = smartBarSelections.getIn(['selectedCohType']);
        const orgType = loginData.getIn(['user_org', 0]);
        const userType = loginData.getIn(['user_type', 0]);

        if (
          cohortType === COHORT_TYPE.School ||
          cohortType === COHORT_TYPE.Grade ||
          cohortType === COHORT_TYPE.Teacher
        ) {
          firstColumnTitle = 'Class';
          rowValue = rowData[key][currentIndex];
        } else if (cohortType === COHORT_TYPE.Class || cohortType === COHORT_TYPE.Group) {
          firstColumnTitle = 'Student';
          rowValue = rowData[key][currentIndex];
        } else if (userType === USER_TYPE.Teacher) {
          firstColumnTitle = 'School';
          rowValue = Number(rowData[key][currentIndex]);
        } else if (orgType === USER_ORG.District && isUserTypeAdminOrTech(userType)) {
          firstColumnTitle = 'School';
          rowValue = Number(rowData[key][currentIndex]);
        } else if (orgType === USER_ORG.School && isUserTypeAdminOrTech(userType)) {
          firstColumnTitle = 'Class';
          rowValue = rowData[key][currentIndex];
        }

        return {
          ...tableRowData,
          [headerTitle]: rowValue,
          [firstColumnTitle]: key,
          _id: key,
        };
      }, {});

      return { ...obj, key };
    });

    const sortedTable = tableData.sort((a, b) => {
      const current = a[firstColumnTitle];
      const next = b[firstColumnTitle];
      return sortData(current, next);
    });

    return sortedTable;
  };

  compareAppId(a, b) {
    // Use toUpperCase() to ignore character casing
    const itemA = a.getIn(['application.id', 0])
      ? a.getIn(['application.id', 0]).toUpperCase()
      : a.getIn(['$', 'id']).toUpperCase();
    const itemB = b.getIn(['application.id', 0])
      ? b.getIn(['application.id', 0]).toUpperCase()
      : b.getIn(['$', 'id']).toUpperCase();

    let comparison = 0;
    if (itemA > itemB) {
      comparison = 1;
    } else if (itemA < itemB) {
      comparison = -1;
    }
    return comparison;
  }

  render() {
    const columnData = this.createColumnData(
      this.getHeaderData(),
      this.getKeys(),
      this.getTableData()
    );

    return (
      <UsageSummary
        title="Usage Summary"
        headers={this.getHeaderData()}
        data={this.getTableData()}
        selectedCell={this.state.selectedCell}
        tableData={this.state.columnData || columnData}
        onGridHeaderClick={this.onGridHeaderClick}
        dataKeys={this.getKeys()}
        smartBarSelections={this.props.smartBarSelections}
        loginData={this.props.loginData}
        studentView={this.props.smartBarSelections.getIn(['selectedStudentId'])}
        studentItems={this.getProductDetails()}
        totals={this.getTotals()}
      />
    );
  }
}

UsageSummaryContainer.propTypes = {
  usageSummaryRequest: PropTypes.any,
  usageSummary: PropTypes.any,
  loginData: PropTypes.object.isRequired,
  smartBarSelections: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  usageSummary: makeSelectUsageSummaryData(),
  loginData: makeSelectLoginData(),
  smartBarSelections: makeSelectSmartBarContainer(),
});

const withConnect = connect(mapStateToProps, { usageSummaryRequest });

const withReducer = injectReducer({ key: 'usageSummary', reducer });
const withSaga = injectSaga({ key: 'usageSummary', saga });

export default compose(withReducer, withSaga, withConnect)(UsageSummaryContainer);
