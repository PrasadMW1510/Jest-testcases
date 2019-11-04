/**
 *
 * ProgramAvailableRosterRow
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import './ProgramAvailableRosterRow.scss';

class ProgramAvailableRosterRow extends React.Component {
  handleProgram = () => {
    this.props.onSelectProgram(this.props.rowData);
  };

  renderRow = () => {
    const { rowData } = this.props;

    // SLMS shows up in the list of products from server.
    // Since we dont have that in our PROGRAM_TABLE it will come back as undefined.
    if (rowData !== undefined) {
      return (
        <tr key={rowData.product_code} className="programs-body-table__tr">
          <td className="programs-body-table__list">
            <img
              className="programs-body-table__image"
              src={rowData.display_image}
              alt={rowData.display_name}
              height="10"
              width="10"
            />
            {rowData.display_name}
          </td>
          <td className="programs-body-table__settings">
            <Link
              className="programs-body-table__link"
              to="/roster/programSettings"
              onClick={this.handleProgram}
            >
              {rowData.settings}
            </Link>
          </td>
          <td className="programs-body-table__grading">
            <Link
              className="programs-body-table__link"
              to="/roster/programGrading"
              onClick={this.handleProgram}
            >
              {rowData.worksheets}
            </Link>
          </td>
          <td className="programs-body-table__portfolio">
            <Link className="programs-body-table__link" to="/">
              {rowData.portfolio}
            </Link>
          </td>
          <td className="programs-body-table__certificates">
            <Link
              className="programs-body-table__link"
              to="/roster/programCertificate"
              onClick={this.handleProgram}
            >
              {rowData.certificates}
            </Link>
          </td>
        </tr>
      );
    }

    return null;
  };

  render() {
    return this.renderRow();
  }
}

ProgramAvailableRosterRow.propTypes = {
  rowData: PropTypes.object,
  onSelectProgram: PropTypes.func,
};

export default ProgramAvailableRosterRow;
