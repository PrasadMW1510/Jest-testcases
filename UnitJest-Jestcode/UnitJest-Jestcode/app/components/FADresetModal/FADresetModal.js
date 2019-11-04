/**
 *
 * FADresetModal
 *
 */
import PropTypes from 'prop-types';
import React from 'react';
import SAMModal from 'components/SAMModal';
import './FADresetModal.scss';

function FADresetModal(props) {
  return (
    <SAMModal isOpen={props.isOpen} modalClassModifier="fad-reset-modal">
      <div className="fad-reset-modal__title">Reset Student</div>
      <p>
        Resetting the selected student to the Initial Assessment will require the student to retake
        the Initial Assessment the next time this program is used. The student will be reset to an
        entry point and may repeat material. All prior performance data will be deleted.
      </p>
      <p>Are you sure you want the selected student to be reset to the Initial Assessment?</p>
      <input
        type="button"
        onClick={props.doYes}
        value="Yes"
        className="fad-reset-modal__orange-button"
      />
      <input
        type="button"
        onClick={props.doNo}
        value="No"
        className="fad-reset-modal__grey-button"
      />
    </SAMModal>
  );
}

FADresetModal.propTypes = {
  isOpen: PropTypes.bool,
  doYes: PropTypes.func,
  doNo: PropTypes.func,
};

export default FADresetModal;
