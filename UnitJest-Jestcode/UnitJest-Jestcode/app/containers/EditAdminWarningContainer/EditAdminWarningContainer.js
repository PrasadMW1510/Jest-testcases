/**
 *
 * EditAdminWarningContainer
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import EditAdminWarning from 'components/EditAdminWarning';
import { postSaveTeacherRequest } from 'containers/AddEditTeacher/actions';
import { postSaveAdminRequest } from 'containers/EditAdminContainer/actions';
import { hideModal } from 'containers/ModalController/actions';

export function EditAdminWarningContainer(props) {
  const handleOk = () => {
    props.hideModal();

    if (props.data.isTeacher) {
      props.postSaveTeacherRequest(props.data.values, props.data.permissionsChecked);
    }

    if (!props.data.isTeacher && props.data.editingSameAccount) {
      props.postSaveAdminRequest(props.data.values, [], true);
    }

    if (!props.data.isTeacher && !props.data.editingSameAccount) {
      props.postSaveAdminRequest(props.data.values, props.data.permissionsChecked, false);
    }
  };

  return (
    <EditAdminWarning isOpen okOnClickHandler={handleOk} cancelOnClickHandler={props.hideModal} />
  );
}

EditAdminWarningContainer.propTypes = {
  data: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  postSaveAdminRequest: PropTypes.func.isRequired,
  postSaveTeacherRequest: PropTypes.func.isRequired,
};

const withConnect = connect(null, { hideModal, postSaveAdminRequest, postSaveTeacherRequest });

export default compose(withConnect)(EditAdminWarningContainer);
