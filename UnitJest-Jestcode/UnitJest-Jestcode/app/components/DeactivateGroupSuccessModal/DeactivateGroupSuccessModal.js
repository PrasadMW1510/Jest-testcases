/**
 *
 * DeactivateGroupSuccessModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import 'components/DeactivateTeacherSuccessModal/DeactivateTeacherSuccessModal.scss';

function DeactivateGroupSuccessModal(props) {
  return (
    <SAMModal isOpen={props.isOpen} modalClassModifier="modal--deactivate-modal-success">
      <h2 className="deactivate-success__heading"> Success! </h2>
      <div className="deactivate-success__message">
        You have successfully deactivated this group.
      </div>
      <div className="deactivate-success__button">
        <button className="deactivate-success__yes" onClick={props.onYes}>
          Back to Profile
        </button>
      </div>
    </SAMModal>
  );
}

DeactivateGroupSuccessModal.propTypes = {
  isOpen: PropTypes.bool,
  onYes: PropTypes.func,
};

export default DeactivateGroupSuccessModal;
