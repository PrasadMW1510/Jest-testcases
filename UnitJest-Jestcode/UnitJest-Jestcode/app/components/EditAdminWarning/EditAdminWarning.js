/**
 *
 * EditAdminWarning
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';

import './EditAdminWarning.scss';

function EditAdminWarning(props) {
  return (
    <SAMModal modalClassModifier="edit-admin-warning" isOpen={props.isOpen}>
      <div className="edit-admin-warning--message">
        Changing usernames will create a new Interactive Teaching System (ITS) profile for READ 180
        users and make previously stored ITS data inaccessible. Are you sure you want to change the
        username?
      </div>
      <SAMButton
        isPrimaryButton
        buttonClassModifier="edit-admin-warning--ok-button"
        onClickHandler={props.okOnClickHandler}
      >
        OK
      </SAMButton>
      <SAMButton
        buttonClassModifier="edit-admin-warning--cancel-button"
        onClickHandler={props.cancelOnClickHandler}
      >
        Cancel
      </SAMButton>
    </SAMModal>
  );
}

EditAdminWarning.defaultProps = {
  isOpen: false,
};

EditAdminWarning.propTypes = {
  isOpen: PropTypes.bool,
  okOnClickHandler: PropTypes.func.isRequired,
  cancelOnClickHandler: PropTypes.func.isRequired,
};

export default EditAdminWarning;
