/**
 *
 * ClearRosterSuccessModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import './ClearRosterSuccessModal.scss';

function ClearRosterSuccessModal(props) {
  return (
    <SAMModal isOpen={props.isOpen} modalClassModifier="clear-roster-success-modal">
      <h2 className="clear-roster-success-modal__heading"> Success! </h2>
      <div className="clear-roster-success-modal__message">
        {`You've successfully cleared the school roster.`}
      </div>
      <div className="clear-roster-success-modal__button">
        <button className="clear-roster-success-modal__profile-button" onClick={props.onYes}>
          Back to Profile
        </button>
      </div>
    </SAMModal>
  );
}

ClearRosterSuccessModal.propTypes = {
  isOpen: PropTypes.bool,
  onYes: PropTypes.func,
};

export default ClearRosterSuccessModal;
