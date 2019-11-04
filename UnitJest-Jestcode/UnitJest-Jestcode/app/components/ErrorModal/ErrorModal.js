/**
 *
 * ErrorModal
 * This modal is only shown to logged in users.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import './ErrorModal.scss';

function ErrorModal(props) {
  return (
    <SAMModal modalClassModifier="error-modal" isOpen={props.isOpen} contentLabel="Error Modal">
      <div className="error-modal__message">{props.errorMessage}</div>

      <button className="error-modal__ok" onClick={props.onClick}>
        Exit SAM
      </button>
    </SAMModal>
  );
}

ErrorModal.propTypes = {
  onClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
};

export default ErrorModal;
