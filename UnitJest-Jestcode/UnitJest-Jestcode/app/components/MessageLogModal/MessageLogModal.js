/**
 *
 * MessageLogModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import './MessageLogModal.scss';

function MessageLogModal(props) {
  return (
    <SAMModal isOpen={props.isOpen} modalClassModifier="message-log-modal">
      <div className="message-log-modal__message">{props.displayText.payloadData}</div>

      <button className="message-log-modal__ok" onClick={props.onOk}>
        OK
      </button>
    </SAMModal>
  );
}

MessageLogModal.propTypes = {
  isOpen: PropTypes.bool,
  onOk: PropTypes.func,
  displayText: PropTypes.object.isRequired,
};

export default MessageLogModal;
