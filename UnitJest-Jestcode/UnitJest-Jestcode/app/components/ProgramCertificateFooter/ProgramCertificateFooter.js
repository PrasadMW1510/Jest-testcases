/**
 *
 * ProgramCertificateFooter
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import './ProgramCertificateFooter.scss';

class ProgramCertificateFooter extends React.Component {
  render() {
    const { onPrintPdfClick, onCancel, isWorksheetUpdate } = this.props;
    return (
      <div className="recipients-footer">
        <button className="recipients-footer__print" onClick={onPrintPdfClick}>
          Print Preview (PDF)
        </button>
        <button className="recipients-footer__profile">Return to Profile</button>
        {isWorksheetUpdate && (
          <button className="recipients-footer__cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    );
  }
}

ProgramCertificateFooter.propTypes = {
  onPrintPdfClick: PropTypes.func,
  onCancel: PropTypes.func,
  isWorksheetUpdate: PropTypes.bool,
};

export default ProgramCertificateFooter;
