/**
 *
 * ErrorModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ErrorModal from 'components/ErrorModal';
import { hideModal } from 'containers/ModalController/actions';
import { logoutRequest } from 'containers/App/actions';
export function ErrorModalContainer(props) {
  const handleOK = e => {
    e.preventDefault();
    if (props.shouldLogout) {
      props.logoutRequest();
    }
    props.hideModal();
  };

  return (
    <ErrorModal
      isOpen
      errorMessage={props.error}
      onClick={handleOK}
      shouldLogout={props.shouldLogout}
    />
  );
}

ErrorModalContainer.defaultProps = {
  shouldLogout: false,
};

ErrorModalContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  logoutRequest: PropTypes.func.isRequired,
  error: PropTypes.string,
  shouldLogout: PropTypes.bool,
};

const withConnect = connect(null, { hideModal, logoutRequest });

export default compose(withConnect)(ErrorModalContainer);
