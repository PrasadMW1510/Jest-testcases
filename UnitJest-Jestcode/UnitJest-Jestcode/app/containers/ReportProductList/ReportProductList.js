/**
 *
 * ReportProductList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ReportEntry from 'components/ReportEntry/';
import './ReportProductList.scss';

export class ReportProductList extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.reportListProductArrow = {};
    this.reportEntries = {};
    this.toggleViz = this.toggleViz.bind(this);
    this.state = { arrowChar: '▼', reportKey: props.reportKey, reports: props.reports };
  }

  toggleViz(e) {
    const entries = this.reportEntries[e.target.attributes.rel.value];
    let arrowChar = null;
    if (entries.style.display !== 'none') {
      entries.style.display = 'none';
      arrowChar = '▶';
    } else {
      entries.style.display = 'inherit';
      arrowChar = '▼';
    }
    this.setState({ arrowChar });
  }
  render() {
    return (
      <div className="report-list-product-header" key={this.props.reportKey}>
        <div
          className="report-list-product-title"
          rel={this.props.reportKey}
          onClick={this.toggleViz}
          role="button"
          tabIndex={0}
        >
          <span className="report-list-product-arrow">{this.state.arrowChar}</span>
          {this.props.productName}
        </div>
        <div
          className="report-list-product-entries"
          ref={div => {
            this.reportEntries[this.props.reportKey] = div;
          }}
        >
          {this.props.reports.map((report, index) => {
            if (report.report_cohort_type !== this.props.filter && this.props.filter.length > 0) {
              return <div key={report.type_id}> </div>;
            }
            return (
              <ReportEntry
                reorderedReports={this.props.reorderedReports}
                report={report}
                index={index}
                reportKey={this.props.reportKey}
                chooseReport={this.props.chooseReport}
                key={report.type_id}
              />
            );
          })}
        </div>
        <div className="report-list-clear-float" />
      </div>
    );
  }
}

ReportProductList.propTypes = {
  reports: PropTypes.array.isRequired,
  productName: PropTypes.string.isRequired,
  reportKey: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  chooseReport: PropTypes.func.isRequired,
  reorderedReports: PropTypes.number,
};

const withConnect = connect(null);

export default compose(withConnect)(ReportProductList);
