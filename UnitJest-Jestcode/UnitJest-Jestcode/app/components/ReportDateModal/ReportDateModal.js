/**
 *
 * ReportDateModal
 *
 */

import React from 'react';
import SAMModal from 'components/SAMModal';
import PropTypes from 'prop-types';
import './ReportDateModal.scss';

function ReportDateModal(props) {
  return (
    <SAMModal isOpen={props.isOpen} contentLabel="Custom Date Modal">
      <div>Select a custom time period:</div>
      <div>From (MM/DD/YY)</div>
      <div>
        <input type="date" id="ReportDateCustomStart" onChange={props.chooseDate} />
      </div>
      <div>To (MM/DD/YY)</div>
      <div>
        <input type="date" id="ReportDateCustomEnd" onChange={props.chooseDate} />
      </div>
      <input
        type="button"
        className="grey-button"
        onClick={props.closeModal}
        value="Cancel"
        id="CancelReportButton"
      />
      <input
        type="button"
        className="orange-button"
        id="RunReportModal"
        onClick={props.runReport}
        value="Run Report"
      />
    </SAMModal>
  );
}

ReportDateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  chooseDate: PropTypes.func.isRequired,
  runReport: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ReportDateModal;
