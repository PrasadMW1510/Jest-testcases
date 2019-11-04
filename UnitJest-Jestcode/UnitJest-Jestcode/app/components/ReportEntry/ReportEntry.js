/**
 *
 * ReportEntry
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './ReportEntry.scss';

class ReportEntry extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="report-list-product-entry" key={this.props.report.type_id}>
        <div className="report-list-col1">
          <input
            type="radio"
            name="type_id"
            value={this.props.report.type_id}
            id={`Report${this.props.reportKey}_${this.props.index}`}
            onClick={this.props.chooseReport}
            className="report-list-product-entry-input"
          />
          {this.props.report.name}
        </div>
        <div className="report-list-col2">{this.props.report.category_name}</div>
        <div className="report-list-col3">{this.props.report.last_generated}</div>
        <div className="report-list-clear-float" />
      </div>
    );
  }
}

ReportEntry.propTypes = {
  report: PropTypes.object.isRequired,
  reportKey: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  chooseReport: PropTypes.func.isRequired,
};

export default ReportEntry;
