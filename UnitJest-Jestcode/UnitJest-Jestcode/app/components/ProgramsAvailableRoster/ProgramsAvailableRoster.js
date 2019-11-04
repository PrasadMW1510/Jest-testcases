/**
 *
 * ProgramsAvailableRoster
 *
 */

import React, { Component } from 'react';

import ProgramAvailableRosterRow from 'components/ProgramAvailableRosterRow';
import PROGRAMS_TABLE from 'containers/App/ProgramTable';

import PropTypes from 'prop-types';
import './ProgramsAvailableRoster.scss';

class ProgramsAvailableRoster extends Component {
  getRowData = productCode => PROGRAMS_TABLE.find(item => item.product_code === productCode);

  renderItems = () => {
    if (this.props.messages.length > 0) {
      return this.props.messages.map(rowData => (
        <ProgramAvailableRosterRow
          key={rowData.array}
          rowData={this.getRowData(rowData.array)}
          onSelectProgram={this.props.handleSelectProgram}
        />
      ));
    }

    // ToDo: Place holder for now
    return (
      <tr>
        <td>No Data</td>
      </tr>
    );
  };

  render() {
    return (
      <div className="program-available">
        <table className="program-available__table">
          <thead />
          <tbody className="program-available-table__body">{this.renderItems()}</tbody>
        </table>
      </div>
    );
  }
}

ProgramsAvailableRoster.propTypes = {
  messages: PropTypes.array.isRequired,
  handleSelectProgram: PropTypes.func,
};

export default ProgramsAvailableRoster;
