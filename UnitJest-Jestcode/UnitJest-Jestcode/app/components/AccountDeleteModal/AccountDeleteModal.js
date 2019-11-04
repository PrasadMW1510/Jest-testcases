/**
 *
 * AccountDeleteModal
 *
 */
import PropTypes from 'prop-types';
import React from 'react';
import SAMButton from 'components/SAMButton';
import SAMModal from 'components/SAMModal';

import './AccountDeleteModal.scss';

class AccountDeleteModal extends React.Component {
  renderMessage() {
    let message;
    if (this.props.isAccountDelete) {
      message = (
        <div className="account-delete-modal__message">
          Are you sure you want to permanently delete the{' '}
          <span className="account-delete-modal--bold">{` ${this.props.itemCount} `}</span>
          selected account(s)?
        </div>
      );
    } else {
      message = (
        <div className="account-delete-modal__message">
          Are you sure you want to unenroll the{' '}
          <span className="account-delete-modal--bold">{` ${this.props.itemCount} `}</span>
          selected accounts from all programs?
        </div>
      );
    }
    return message;
  }

  render() {
    return (
      <SAMModal
        isOpen={this.props.isOpen}
        contentLabel=""
        modalClassModifier="account-delete-modal"
      >
        {this.renderMessage()}
        <div className="account-delete-modal__button-group-container">
          <div className="account-delete-modal__button-group">
            <SAMButton
              id="account-delete-modal__yes-btn"
              buttonClassModifier="account-delete-modal__button"
              isPrimaryButton
              onClickHandler={this.props.onYes}
            >
              Yes
            </SAMButton>
            <SAMButton
              id="account-delete-modal__no-btn"
              buttonClassModifier="account-delete-modal__button"
              buttonType="submit"
              onClickHandler={this.props.onNo}
            >
              No
            </SAMButton>
          </div>
        </div>
      </SAMModal>
    );
  }
}

AccountDeleteModal.propTypes = {
  isOpen: PropTypes.bool,
  itemCount: PropTypes.number,
  isAccountDelete: PropTypes.bool,
  onYes: PropTypes.func.isRequired,
  onNo: PropTypes.func.isRequired,
};

export default AccountDeleteModal;
