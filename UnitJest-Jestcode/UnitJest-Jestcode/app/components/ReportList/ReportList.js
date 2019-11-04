/**
 *
 * ReportList
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReportProductList from 'containers/ReportProductList/';
import ReportDateRangeOptions from 'components/ReportDateRangeOptions/';
import ReportDescription from 'components/ReportDescription/';
import ReportDateModal from 'components/ReportDateModal/';
import ReportLoadingModal from 'components/ReportLoadingModal/';
import ReportAdditionalSettings from 'components/ReportAdditionalSettings/';
import ErrorModal from 'components/ErrorModal/';
import { getBaseUrl } from 'utils/request';
import { getReportId } from 'containers/ReportsPage/request';
import * as AppConstants from 'containers/App/constants';
import './ReportList.scss';
import ReportSettings from './ReportSettings/';
import PDFSorts from './PDFSorts';

class ReportList extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.reportEntries = {};
    this.sortName = { classList: { remove() {}, add() {} } };
    this.sortType = this.sortName;
    this.sortDate = this.sortName;
    this.state = {
      productMap: {},
      cohortName: 'Test District',
      cohortType: AppConstants.COHORT_TYPE.District,
      cohortId: 'abc123',
      sort_state: { name: 'asc', type: 'asc', date: 'asc' },
      filter: '',
      show_report_custom_dialog: false,
      reportOptions: { start_date: '01/01/01', end_date: '12/31/01', report_id: 'rep_01' },
      active_report: {
        reportSettings: {
          dateRanges: [],
          option_name: 'Additional Settings',
          option_values: [],
          option_labels: [],
          option_default: '',
        },
        description: 'Please select a report.',
      },
      rows: [],
      show_report_loading_modal: false,
      showErrorModal: false,
      errorModalMessage: '',
      reorderedReports: 0.0,
    };
    this.state.reportSettings = ReportSettings;
  }
  // On initial mounting parse programs
  componentDidMount = () => {
    const daProps = this.props;
    this.determineCohort(daProps);
    this.organizeProducts();
  };
  // If props change, reorganize the reports
  componentWillReceiveProps = nextProps => {
    this.determineCohort(nextProps);
  };
  // Handles closing the modal
  onRequestClose = () => {
    this.setState({
      show_report_custom_dialog: false,
      show_report_loading_modal: false,
      showErrorModal: false,
    });
  };
  // Handles setting the filter for the top drop-down labeled "Show:"
  setFilter = e => {
    this.setState({ filter: e.target.value });
  };

  determineCohort = nextProps => {
    let cohortType = AppConstants.COHORT_TYPE.District;
    let cohortId = nextProps.districtId;
    let cohortName = nextProps.userData
      .get('profile')
      .get('organizations')
      .first()
      .get('organization')
      .first()
      .get('name')
      .first();
    if (nextProps.schoolId && nextProps.schoolId.length && nextProps.schoolData) {
      cohortType = AppConstants.COHORT_TYPE.School;
      cohortId = nextProps.schoolId;
      cohortName = nextProps.schoolData.get('name').first();
    }
    if (nextProps.gradeId && nextProps.gradeId.length && nextProps.gradeData) {
      cohortType = AppConstants.COHORT_TYPE.Grade;
      cohortId = nextProps.gradeId;
      cohortName = nextProps.gradeData.get('full_name').first();
    }
    if (nextProps.teacherId && nextProps.teacherId.length && nextProps.teacherData) {
      cohortType = AppConstants.COHORT_TYPE.Teacher;
      cohortId = nextProps.teacherId;
      cohortName = `${nextProps.teacherData.get('last_name').first()}, ${nextProps.teacherData
        .get('first_name')
        .first()}`;
    }
    if (nextProps.classId && nextProps.classId.length && nextProps.classData) {
      cohortType = AppConstants.COHORT_TYPE.Class;
      cohortId = nextProps.classId;
      cohortName = nextProps.classData.get('name').first();
    }
    if (nextProps.groupId && nextProps.groupId.length && nextProps.groupData) {
      cohortType = AppConstants.COHORT_TYPE.Group;
      cohortId = nextProps.groupId;
      cohortName = nextProps.groupData.get('name').first();
    }
    if (nextProps.studentId && nextProps.studentId.length && nextProps.studentData) {
      cohortType = AppConstants.COHORT_TYPE.Student;
      cohortId = nextProps.studentId;
      cohortName = `${nextProps.studentData.get('last_name').first()}, ${nextProps.studentData
        .get('first_name')
        .first()}`;
    }
    if (nextProps.reports) {
      this.setState({ cohortType, cohortId, cohortName }, () => {
        this.organizeReports(nextProps.reports.get('reports'), cohortType);
      });
    } else {
      this.setState({ cohortType, cohortId, cohortName });
    }
  };

  // Handles all of the clicks on date elements, saves date choices to state or shows the custom date modal as necessary
  chooseDate = e => {
    if (e.target.className === 'report-date-range-radio') {
      switch (e.target.value) {
        case 'Custom': {
          this.setState({ show_report_custom_dialog: true });
          break;
        }
        default: {
          const reportOptions = this.state.reportOptions;
          reportOptions.date_range = e.target.value;
          this.setState({ reportOptions });
        }
      }
    } else {
      const reportOptions = this.state.reportOptions;
      if (e.target.id === 'ReportDateCustomStart') {
        reportOptions.start_date = e.target.value;
      }
      if (e.target.id === 'ReportDateCustomEnd') {
        reportOptions.end_date = e.target.value;
      }
      reportOptions.date_range = `(${reportOptions.start_date},${reportOptions.end_date})`;
      this.setState({ reportOptions });
    }
  };
  // Saves the user's chosen report to the state
  chooseReport = e => {
    const id = e.target.value;
    Object.keys(this.state.rows).forEach(product => {
      const reports = this.state.rows[product];
      Object.keys(reports).forEach(report => {
        if (reports[report].type_id === id) {
          const reportOptions = this.state.reportOptions;
          reportOptions.date_range = reports[report].reportSettings.dateRanges[0];
          this.setState({ active_report: reports[report], reportOptions });
        }
      });
    });
  };
  // Saves the user's chosen additional option to the state
  chooseOption = e => {
    this.state.active_report.chosen_option = e.target.value;
  };
  // When the user clicks the Run Report button this code will:
  // look up the URL for that report and do the necessary replacements
  // The request function will parse the result and use it to open up a new window with the requested PDF
  runReport = () => {
    this.onRequestClose();
    if (this.state.active_report.type_id === 'math_inventory_07') {
      // The expection to the rule of how reports are handled, this report is generated in flash and has no PDF counterpart.
      // The logic for how to show this report is completely different than the rest, so we get to have a nice big-ol' branch
      // in the middle of this function
      // https://h511000002.education.scholastic.com/
      const mathInventoryUrl = `math_inventory/flex/MathInventoryReport.html?cohort_id=${
        this.state.cohortId
      }&cohort_type=${
        this.state.cohortType
      }&attribute_filters=()&group_filters=()&grade_filters=()&app_filters=()&default_app=SMI&report_type_id=math_inventory_07&date_range=${
        this.state.reportOptions.date_range
      }&user_id=${this.props.user.get('user_id').first()}&sid=${this.props.user
        .get('session_id')
        .first()}&school_id=${this.props.schoolId}`;
      window.open(getBaseUrl().substr(0, getBaseUrl().length - 4) + mathInventoryUrl, '_blank');
      return;
    }
    let url = null;
    try {
      url = this.state.active_report.reportSettings.connect_url.substring(5);
    } catch (e) {
      this.setState({ showErrorModal: true, errorModalMessage: 'Unable to run this report.' });
      return;
    }
    if (this.state.active_report.reportSettings.option_property !== null) {
      const placeholder = `$${this.state.active_report.reportSettings.option_property.toUpperCase()}$`;
      url = url.replace(placeholder, this.state.active_report.chosen_option);
    }
    url = url.replace('$SESSION_ID$', this.props.user.get('session_id').first());
    url = url.replace('$REPORT_TYPE_ID$', this.state.active_report.type_id.toLowerCase());
    url = url.replace('$USER_ID$', this.props.user.get('user_id').first());
    url = url.replace('$FAMILY$', this.state.cohortType);
    url = url.replace('$COHORT_ID$', this.state.cohortId);
    url = url.replace('$DATE_RANGE$', this.state.reportOptions.date_range);
    url = url.replace('$ATTRIBUTE_FILTERS$', '');
    url = url.replace('$APP_FILTERS$', '');
    url = url.replace('$PROGRAM$', '');
    url = url.replace(/\$SCHOOL_ID\$/g, this.props.schoolId ? this.props.schoolId : '');
    url = url.replace('$GRADE_FILTERS$', '');
    url = url.replace('$GROUP_FILTERS$', '');
    const pdfQs =
      PDFSorts[this.state.cohortType.toLowerCase()][this.state.active_report.type_id.toLowerCase()];
    this.setState({ show_report_loading_modal: true });
    getReportId(this.state.active_report.type_id, getBaseUrl(), url, pdfQs, this.runReportCallback);
  };
  // This function is called by the request function after the response has been received,
  // It is used to close the loading dialog
  runReportCallback = result => {
    if (result === 1) {
      this.onRequestClose();
      const rows = this.state.rows;
      Object.keys(rows).forEach(product => {
        rows[product].forEach((report, index) => {
          if (report.type_id === this.state.active_report.type_id) {
            const d = new Date();
            let month = d.getMonth() + 1;
            if (month < 10) {
              month = `0${month}`;
            }
            let day = d.getDate();
            if (day < 10) {
              day = `0${day}`;
            }
            rows[product][index].last_generated = `${d.getFullYear()}-${month}-${day}`;
            const reorderedReports = !this.state.reorderedReports;
            this.setState({ rows, reorderedReports });
          }
        });
      });
    } else {
      this.onRequestClose();
      this.setState({
        showErrorModal: true,
        errorModalMessage: 'Report generation returned an error',
      });
    }
  };
  // organizeProducts takes the list of products returned by the API call and
  // creates a map of abbreviations to customer facing names for all enabled products
  organizeProducts = () => {
    const prodReduce = (prodmap, prod) => {
      const productMap = this.state.productMap;
      productMap[prod.$.community_id] = prod.$.name;
      this.setState({ productMap });
    }; // Reducer for product list
    const prods = this.props.programs
      .toJS()
      .filter(elem => elem.$.enabled === 'true' && elem.$.name.length > 0); // Filter for product list
    const productMap = [];
    this.setState({ productMap }); // Clear old list
    prods.reduce(prodReduce); // Compute new one
  };
  // organizeReports takes in the list of reports from the API request and
  // reorganizes to be arranged by product instead of a flat list
  organizeReports = (reportsIm, cohortType) => {
    const rows = [[]];
    if (
      typeof reportsIm !== 'undefined' &&
      typeof reportsIm.toJS !== 'undefined' &&
      reportsIm.toJS().length
    ) {
      const reports = reportsIm.toJS();
      Object.keys(reports).forEach(i => {
        const key = Object.keys(reports)[i];
        const report = reports[key];
        if (typeof rows[report.app_id] === 'undefined') {
          rows[report.app_id] = [];
        }
        let bestSettings;
        try {
          bestSettings =
            ReportSettings[report.app_id[0].toLowerCase()][`${report.type_id[0].toLowerCase()}`][
              cohortType.toLowerCase()
            ];
        } catch (error) {
          return; // Cannot find settings for report, do not add it to organized list
        }

        if (typeof bestSettings === 'undefined') {
          bestSettings = { dateRanges: [], option_default: '' };
        }
        rows[report.app_id].push({
          category_name: report.category_name[0],
          cohort_id: report.cohort_id[0],
          cohort_type: report.cohort_type[0],
          description: report.description[0],
          last_generated: report.last_generated[0],
          name: report.name[0],
          relationship: report.relationship[0],
          report_cohort_type: report.report_cohort_type[0],
          report_id: report.report_id[0],
          type_id: report.type_id[0],
          reportSettings: bestSettings,
          chosen_option: bestSettings.option_default,
        });
      });
      Object.keys(rows).forEach(i => {
        rows[i].sort((a, b) => {
          // Sort that array with a custom compare function
          if (a.name > b.name) {
            // If the column of interest is larger in a, return 1
            return 1;
          }
          if (a.name < b.name) {
            // if b is bigger, return -1
            return -1;
          }
          return 0; // They're equal, return 0
        });
      });
    }
    this.setState({ rows });
  };
  // sortRows sorts the per-product arrays of reports based on the column and direction selected
  sortRows = e => {
    let reps = [];
    const colmap = { name: 'name', type: 'category_name', date: 'last_generated' }; // Mapping between UI column names and data column names
    const col = e.target.id.substr(-4); // Determine which sort column we clicked on by looking at its id
    const dir = this.state.sort_state[col]; // Determine which direction we're sorting by checking our state
    const rows = []; // Create a new array to hold the sorted result
    // For each product:
    for (let i = 0; i < Object.keys(this.state.rows).length; i += 1) {
      reps = this.state.rows[Object.keys(this.state.rows)[i]]; // Fetch that report's arrays into a variable
      reps.sort((a, b) => {
        // Sort that array with a custom compare function
        if (a[colmap[col]] > b[colmap[col]]) {
          // If the column of interest is larger in a, return 1
          return 1;
        }
        if (a[colmap[col]] < b[colmap[col]]) {
          // if b is bigger, return -1
          return -1;
        }
        return 0; // They're equal, return 0
      });
      // Array is now sorted (ascending)
      if (dir === 'desc') {
        // If we actually want descending it's simply a matter of reversing that
        reps.reverse();
      }
      rows[Object.keys(this.state.rows)[i]] = reps; // Put the sorted array into the main array of products
    }
    if (dir === 'asc') {
      // Set the sort state for the next time
      this.state.sort_state[col] = 'desc';
    } else {
      this.state.sort_state[col] = 'asc';
    }
    const reorderedReports = !this.state.reorderedReports; // Reordered elements of an array doesn't count as a state change
    this.setState({ rows, reorderedReports }); // Save our work to the state so it can be re-rendered
    this.sortName.classList.remove('report-list-active-sort'); // Remove the active sort style from all columns
    this.sortType.classList.remove('report-list-active-sort');
    this.sortDate.classList.remove('report-list-active-sort');
    e.target.classList.add('report-list-active-sort'); // Put the active sort style on the selected column
  };

  sortNameRef = div => {
    this.sortName = div;
  };
  sortTypeRef = div => {
    this.sortType = div;
  };
  sortDateRef = div => {
    this.sortDate = div;
  };
  renderReports = () => {
    const sortedKeys = Object.keys(this.state.rows).sort();
    if (sortedKeys.length > 1) {
      return sortedKeys.map(productReportKey => {
        if (
          !isNaN(productReportKey) ||
          typeof this.state.productMap[productReportKey] === 'undefined' ||
          !this.state.rows[productReportKey].length
        ) {
          return <div key={productReportKey}>{this.state.productMap[productReportKey]} </div>;
        }
        return (
          <ReportProductList
            reorderedReports={this.state.reorderedReports}
            chooseReport={this.chooseReport}
            reports={this.state.rows[productReportKey]}
            productName={this.state.productMap[productReportKey]}
            reportKey={productReportKey}
            filter={this.state.filter}
            key={`RE${productReportKey}`}
          />
        );
      });
    }
    return <div className="report-no-reports">There are no reports matching this filter.</div>;
  };

  render() {
    return (
      <div className="report-list">
        <div className="report-page-title reports-cohort-title__text--body">
          Reports for {this.state.cohortName}
        </div>
        <table className="report-table">
          <tbody>
            <tr className="report-controls">
              <td width="576" align="left" valign="middle" height="40">
                Show:
                <select id="report-scope" className="report-list-select" onChange={this.setFilter}>
                  <option value="">All Reports</option>
                  <option value="Aggregate">Multi-Classroom Reports</option>
                  <option value="Group">Classroom Reports</option>
                  <option value="Student">Student Reports</option>
                </select>
              </td>
              <td align="right" />
            </tr>
            <tr valign="top">
              <td>
                <div className="report-list-sort-row">
                  <div
                    className="report-list-col1 report-list-sort-header"
                    id="ReportListSort_name"
                    ref={this.sortNameRef}
                    onClick={this.sortRows}
                    role="button"
                    tabIndex={0}
                  >
                    Name
                  </div>
                  <div
                    className="report-list-col2 report-list-sort-header"
                    id="ReportListSort_type"
                    ref={this.sortTypeRef}
                    onClick={this.sortRows}
                    role="button"
                    tabIndex={0}
                  >
                    Type
                  </div>
                  <div
                    className="report-list-col3 report-list-sort-header"
                    id="ReportListSort_date"
                    ref={this.sortDateRef}
                    onClick={this.sortRows}
                    role="button"
                    tabIndex={0}
                  >
                    Date Last Run
                  </div>
                  <div className="report-list-clear-float" />
                </div>

                <div className="report-list-table-container">
                  <form name="ReportForm" id="ReportForm">
                    {this.renderReports()}
                  </form>
                </div>
              </td>
              <td align="center">
                <ReportDateRangeOptions
                  dateRanges={this.state.active_report.reportSettings.dateRanges}
                  chooseDate={this.chooseDate}
                  cohortType={this.state.cohortType}
                />
                <ReportAdditionalSettings
                  optionChoose={this.chooseOption}
                  optionName={this.state.active_report.reportSettings.option_name}
                  optionValues={this.state.active_report.reportSettings.option_values}
                  optionLabels={this.state.active_report.reportSettings.option_labels}
                  optionDefault={this.state.active_report.reportSettings.option_default}
                  optionProperty={this.state.active_report.reportSettings.option_property}
                />
                <ReportDescription description={this.state.active_report.description} />
                <input
                  type="button"
                  className="orange-button"
                  id="GenerateReport"
                  onClick={this.runReport}
                  value="Run Report"
                />
                <ReportDateModal
                  isOpen={this.state.show_report_custom_dialog}
                  chooseDate={this.chooseDate}
                  runReport={this.runReport}
                  closeModal={this.onRequestClose}
                />
                <ReportLoadingModal
                  isOpen={this.state.show_report_loading_modal}
                  className="report-loading-modal"
                />
                <ErrorModal
                  isOpen={this.state.showErrorModal}
                  errorMessage={this.state.errorModalMessage}
                  onClick={this.onRequestClose}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
// The ignore lines below are for false positives, like jest really thinks the reports prop is unused
ReportList.propTypes = {
  reports: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  user: PropTypes.object.isRequired,
  programs: PropTypes.object.isRequired,
  districtId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  schoolData: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  gradeData: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  teacherData: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  classData: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  groupData: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  studentData: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  schoolId: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  gradeId: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  teacherId: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  classId: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  groupId: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  studentId: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  userData: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
};

export default ReportList;
