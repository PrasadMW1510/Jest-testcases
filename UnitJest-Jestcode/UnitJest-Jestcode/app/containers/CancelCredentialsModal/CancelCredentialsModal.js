/**
 *
 * CancelCredentialsModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { logoutRequest } from 'containers/App/actions';
import { hideModal } from 'containers/ModalController/actions';
import SAMModal from 'components/SAMModal';
import './CancelCredentialsModal.scss';

export class CancelCredentialsModal extends React.Component {
  handleYes = e => {
    e.preventDefault();
    this.props.hideModal();
    this.props.hideModal();
    this.props.logoutRequest();
  };

  handleNo = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <SAMModal isOpen modalClassModifier="cancel-credentials-modal">
        <div className="cancel-credentials-modal__message">
          The default credentials must be changed in order to access the SAM Client. Canceling now
          will terminate this login process.
        </div>

        <div className="cancel-credentials-modal__message">Do you want to proceed?</div>

        <button className="cancel-credentials-modal__yes-button" onClick={this.handleYes}>
          Yes
        </button>

        <button className="cancel-credentials-modal__no-button" onClick={this.handleNo}>
          No
        </button>
      </SAMModal>
    );
  }
}

CancelCredentialsModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  logoutRequest: PropTypes.func.isRequired,
};

const mapStateToProps = null;

const withConnect = connect(mapStateToProps, {
  hideModal,
  logoutRequest,
});

export default compose(withConnect)(CancelCredentialsModal);
