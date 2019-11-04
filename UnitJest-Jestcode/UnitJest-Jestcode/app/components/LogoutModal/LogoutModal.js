/**
 *
 * LogoutModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import './LogoutModal.scss';

function LogoutModal(props) {
  return (
    <SAMModal isOpen={props.isOpen} contentLabel="Logout Modal">
      <div className="logout-modal__message">
        Do you really want to exit? If not, click Cancel. Otherwise, click Exit SAM to close the
        program.
      </div>

      <button className="logout-modal__no" onClick={props.onNo}>
        Cancel
      </button>
      <button className="logout-modal__yes" onClick={props.onYes}>
        Exit SAM
      </button>
    </SAMModal>
  );
}

LogoutModal.propTypes = {
  onYes: PropTypes.func,
  onNo: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default LogoutModal;
