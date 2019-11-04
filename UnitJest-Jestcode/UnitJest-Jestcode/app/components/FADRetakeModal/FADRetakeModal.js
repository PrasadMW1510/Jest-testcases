/**
 *
 * FADRetakeModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import './FADRetakeModal.scss';

function FADRetakeModal(props) {
  return (
    <SAMModal isOpen={props.isOpen} modalClassModifier="fad-retake-modal">
      <div className="fad-retake-modal__title">Reset Student</div>
      <p>
        Retaking the Final Assessment will require the selected student(s) who have already taken
        the Final Assessment to retake it the next time the program is used. Any prior final
        assessment results wil be overwritten.
      </p>
      <p>Are you sure you want the selected student(s) to retake the Final Assessment?</p>
      <input
        type="button"
        onClick={props.doYes}
        value="Yes"
        className="fad-retake-modal__orange-button"
      />
      <input
        type="button"
        onClick={props.doNo}
        value="No"
        className="fad-retake-modal__grey-button"
      />
    </SAMModal>
  );
}

FADRetakeModal.propTypes = {
  isOpen: PropTypes.bool,
  doYes: PropTypes.func,
  doNo: PropTypes.func,
};

export default FADRetakeModal;
