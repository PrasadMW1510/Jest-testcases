/**
 *
 * OkCancelModalContainer
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';

import { hideModal } from 'containers/ModalController/actions';
import { OK_CANCEL_MODAL } from 'containers/ModalController/constants';

import './OkCancelModalContainer.scss';

export function OkCancelModalContainer(props) {
  const handleOk = () => {
    if (props.data.onOk) {
      props.data.onOk(props.data.onOkParam);
    }
    props.hideModal(OK_CANCEL_MODAL, { buttonClicked: 'ok', ...props.data });
  };

  const handleCancel = () => {
    if (props.data.onCancel) {
      props.data.onCancel(props.data.onCancelParam);
    }
    props.hideModal(OK_CANCEL_MODAL, { buttonClicked: 'cancel', ...props.data });
  };
  const modalClassName = props.data.modalClassName || '';
  const headerClassName = props.data.headerClassName || '';
  const okLabel = props.data.okLabel || 'OK';
  const cancelLabel = props.data.cancelLabel || 'Cancel';
  return (
    <SAMModal modalClassModifier={`ok-cancel-modal ${modalClassName}`} isOpen>
      {props.data.heading && (
        <h2 className={`ok-cancel-modal--header ${headerClassName}`}>{props.data.heading}</h2>
      )}
      <div className="ok-cancel-modal--body">
        <div className="ok-cancel-modal--message">{props.data.message}</div>
        <SAMButton
          isPrimaryButton
          buttonClassModifier="ok-cancel-modal--ok-button"
          onClickHandler={handleOk}
        >
          {okLabel}
        </SAMButton>
        <SAMButton
          buttonClassModifier="ok-cancel-modal--cancel-button"
          onClickHandler={handleCancel}
        >
          {cancelLabel}
        </SAMButton>
      </div>
    </SAMModal>
  );
}

OkCancelModalContainer.defaultProps = {
  data: {},
};

OkCancelModalContainer.propTypes = {
  data: PropTypes.object,
  hideModal: PropTypes.func.isRequired,
};

const withConnect = connect(null, { hideModal });

export default compose(withConnect)(OkCancelModalContainer);
