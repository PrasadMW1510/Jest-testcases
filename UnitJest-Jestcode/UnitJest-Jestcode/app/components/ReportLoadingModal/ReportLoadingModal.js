/**
 *
 * ReportLoadingModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import LoadingBar from 'components/LoadingBar';

import './ReportLoadingModal.scss';
function showStyle(props) {
  return props.isOpen ? { display: 'flex' } : { display: 'none' };
}
function ReportLoadingModal(props) {
  return (
    <div className="reports-page__loading-bar" style={showStyle(props)}>
      <LoadingBar />
    </div>
  );
}

ReportLoadingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default ReportLoadingModal;
