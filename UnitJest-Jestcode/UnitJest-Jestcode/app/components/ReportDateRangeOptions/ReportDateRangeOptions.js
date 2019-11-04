/**
 *
 * ReportDateRangeOptions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as AppConstants from 'containers/App/constants';
import './ReportDateRangeOptions.scss';
import dateRangeText from './constants';

class ReportDateRangeOptions extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  selected(index) {
    return index === 0;
  }

  render() {
    if (typeof this.props.dateRanges === 'undefined') {
      return (
        <div id="TimePeriodBox" className="report-right-box">
          <div className="report-settings-box-title">Time Period</div>
        </div>
      );
    }
    return (
      <div className="time-period-box report-right-box">
        <div className="report-settings-box-title">Time Period</div>
        <div className="report-settings-box report-settings-box-description" id="ReportDateRanges">
          {this.props.dateRanges.map(
            (dateRange, index) =>
              this.props.cohortType === AppConstants.COHORT_TYPE.District &&
              dateRange.match(/Grading/) ? (
                ''
              ) : (
                <div className="report-date-range-option" key={dateRange}>
                  <label htmlFor="ReportDateRange" className="report-date-range-option-value">
                    <input
                      type="radio"
                      name="ReportDateRange"
                      className="report-date-range-radio"
                      value={dateRange}
                      onClick={this.props.chooseDate}
                      defaultChecked={this.selected(index)}
                    />
                    {dateRangeText[dateRange]}
                  </label>
                </div>
              )
          )}
        </div>
      </div>
    );
  }
}

ReportDateRangeOptions.propTypes = {
  dateRanges: PropTypes.array,
  chooseDate: PropTypes.func.isRequired,
  cohortType: PropTypes.string,
};

export default ReportDateRangeOptions;
