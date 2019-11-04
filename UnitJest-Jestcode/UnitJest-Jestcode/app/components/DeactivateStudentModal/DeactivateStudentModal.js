/**
 *
 * DeactivateStudentModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import '../DeactivateTeacherModal/DeactivateTeacherModal.scss';

function DeactivateStudentModal(props) {
  return (
    <SAMModal isOpen={props.isOpen} modalClassModifier="modal--deactivate-cohort">
      <div className="deactivate-modal__message">
        Are you sure you want to deactivate this student?
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

DeactivateStudentModal.propTypes = {
  isOpen: PropTypes.bool,
  onNo: PropTypes.func,
  onYes: PropTypes.func,
};

export default DeactivateStudentModal;
