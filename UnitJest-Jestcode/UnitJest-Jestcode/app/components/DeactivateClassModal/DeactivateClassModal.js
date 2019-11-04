/**
 *
 * DeactivateClassModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import '../DeactivateTeacherModal/DeactivateTeacherModal.scss';

function DeactivateClassModal(props) {
  return (
    <SAMModal isOpen={props.isOpen} modalClassModifier="modal--deactivate-class-cohort">
      <div className="deactivate-modal__message">
        Are you sure you want to deactivate this class? Any teachers or students associated with
        this class will also be deactivated if they are associated with no other class.
      </div>
      <button className="deactivate-modal__no" onClick={props.onNo}>
        No
      </button>
      <button className="deactivate-modal__yes" onClick={props.onYes}>
        Yes
      </button>
    </SAMModal>
  );
}

DeactivateClassModal.propTypes = {
  isOpen: PropTypes.bool,
  onNo: PropTypes.func,
  onYes: PropTypes.func,
};

export default DeactivateClassModal;
