/**
 *
 * ReportAdditionalSettings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './ReportAdditionalSettings.scss';

class ReportAdditionalSettings extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  /* renderOptions:
  renders the options inside of the select box
   */
  renderOptions() {
    return this.props.optionValues.map((value, index) => (
      <option value={value} key={value}>
        {this.props.optionLabels[index]}
      </option>
    ));
  }
  render() {
    return (
      <div id="AdditionalSettingsBox" className="additional-settings-box report-right-box">
        <div className="report-settings-box-title">
          {this.props.optionName ? this.props.optionName : 'Additional Settings'}
        </div>
        <div className="report-settings-box report-additional-settings">
          {this.props.optionValues && this.props.optionValues.length ? (
            <select
              className="additional-settings-select"
              onChange={this.props.optionChoose}
              defaultValue={this.props.optionDefault}
            >
              {this.renderOptions()}
            </select>
          ) : (
            'None'
          )}
        </div>
      </div>
    );
  }
}

ReportAdditionalSettings.propTypes = {
  optionName: PropTypes.string,
  optionLabels: PropTypes.array,
  optionValues: PropTypes.array,
  optionDefault: PropTypes.string,
  optionChoose: PropTypes.func.isRequired,
};

export default ReportAdditionalSettings;
