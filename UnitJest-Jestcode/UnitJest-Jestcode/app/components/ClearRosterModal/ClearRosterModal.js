/**
 *
 * ClearRosterModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import './ClearRosterModal.scss';

function ClearRosterModal(props) {
  return (
    <SAMModal isOpen={props.isOpen} modalClassModifier="clear-roster-modal">
      <div className="clear-roster-modal__message">
        Are you sure you that you want to clear the school roster? This action will deactivate all
        Teachers, Classes, and Students associated with this School and cannot be undone. HMH
        strongly recommends that you back up your database before executing this function.
      </div>

      <button className="clear-roster-modal__yes-button" onClick={props.onYes}>
        Yes
      </button>

      <button className="clear-roster-modal__no-button" onClick={props.onNo}>
        No
      </button>
    </SAMModal>
  );
}

ClearRosterModal.propTypes = {
  isOpen: PropTypes.bool,
  onNo: PropTypes.func,
  onYes: PropTypes.func,
};

export default ClearRosterModal;
