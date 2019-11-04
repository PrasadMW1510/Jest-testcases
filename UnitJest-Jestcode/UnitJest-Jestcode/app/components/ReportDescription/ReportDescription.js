/**
 *
 * ReportDescription
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './ReportDescription.scss';

class ReportDescription extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div id="ReportDescriptionBox" className="report-right-box report-description-box">
        <div className="report-settings-box-title">Report Description</div>
        <div className="report-settings-box report-description">{this.props.description}</div>
      </div>
    );
  }
}

ReportDescription.propTypes = {
  description: PropTypes.string,
};

export default ReportDescription;
