/**
 * NoItemsSelectedModal
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';

import './NoItemsSelectedModal.scss';

function NoItemsSelectedModal(props) {
  function renderMessage() {
    const type = props.data.type;
    const message = (
      <div className="no-items-selected-modal-success__message">No {type} selected.</div>
    );
    return message;
  }

  return (
    <SAMModal
      isOpen={props.isOpen}
      contentLabel=""
      modalClassModifier="no-items-selected-modal-success"
    >
      {renderMessage()}
      <div className="no-items-selected-modal-success__button">
        <button className="no-items-selected-modal-success__ok" onClick={props.onOK}>
          OK
        </button>
      </div>
    </SAMModal>
  );
}

NoItemsSelectedModal.propTypes = {
  isOpen: PropTypes.bool,
  data: PropTypes.object.isRequired,
  onOK: PropTypes.func.isRequired,
};

export default NoItemsSelectedModal;
