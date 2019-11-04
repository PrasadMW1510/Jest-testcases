/**
 *
 * WarningModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';

import './WarningModal.scss';

function WarningModal(props) {
  return (
    <SAMModal modalClassModifier="warning-modal" isOpen={props.isOpen}>
      <div className="warning-modal--message">{props.data.message}</div>
      <div className="warning-modal__button-box">
        <SAMButton
          isPrimaryButton
          buttonClassModifier="warning-modal--ok-button"
          onClickHandler={props.okOnClickHandler}
        >
          OK
        </SAMButton>
      </div>
    </SAMModal>
  );
}

WarningModal.defaultProps = {
  data: {},
  isOpen: false,
};

WarningModal.propTypes = {
  data: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  okOnClickHandler: PropTypes.func.isRequired,
};

export default WarningModal;
