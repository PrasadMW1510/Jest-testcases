/**
 *
 * LogoutModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import LogoutModal from 'components/LogoutModal/LogoutModal';
import { hideModal } from 'containers/ModalController/actions';
import { logoutRequest } from 'containers/App/actions';
export function LogoutModalContainer(props) {
  const handleNo = e => {
    e.preventDefault();
    props.hideModal();
  };

  const handleYes = e => {
    e.preventDefault();
    props.logoutRequest();
    props.hideModal();
  };

  return <LogoutModal isOpen onNo={handleNo} onYes={handleYes} />;
}

LogoutModalContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  logoutRequest: PropTypes.func.isRequired,
};

const withConnect = connect(null, { hideModal, logoutRequest });

export default compose(withConnect)(LogoutModalContainer);
