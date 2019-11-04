/**
 *
 * RemoveAdminModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';

import './RemoveAdminModal.scss';

class RemoveAdminModal extends React.Component {
  render() {
    return (
      <SAMModal isOpen={this.props.isOpen} modalClassModifier="remove-admin-modal">
        <div className="remove-admin-modal__message">
          Are you sure you want to permanently delete this account?
        </div>

        <button className="remove-admin-modal__yes-button" onClick={this.props.onYes}>
          Yes
        </button>

        <button className="remove-admin-modal__no-button" onClick={this.props.onNo}>
          No
        </button>
      </SAMModal>
    );
  }
}

RemoveAdminModal.propTypes = {
  isOpen: PropTypes.bool,
  onNo: PropTypes.func,
  onYes: PropTypes.func,
};
export default RemoveAdminModal;
