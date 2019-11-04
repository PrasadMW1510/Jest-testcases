/**
 *
 * DeactivateModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';
import DeactivateTeacherModal from 'components/DeactivateTeacherModal/DeactivateTeacherModal';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { deactivateUserRequest } from './actions';
import reducer from './reducer';
import saga from './saga';

export function DeactivateModalContainer(props) {
  const handleNo = e => {
    e.preventDefault();
    props.hideModal();
  };

  const handleYes = e => {
    e.preventDefault();
    props.deactivateUserRequest();
  };

  return <DeactivateTeacherModal isOpen onNo={handleNo} onYes={handleYes} />;
}

DeactivateModalContainer.propTypes = {
  hideModal: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  deactivateUserRequest: PropTypes.func.isRequired,
};

const withConnect = connect(null, { hideModal, deactivateUserRequest });
const withSaga = injectSaga({ key: 'deactivateUser', saga });
const withReducer = injectReducer({ key: 'deactivateUser', reducer });

export default compose(withReducer, withSaga, withConnect)(DeactivateModalContainer);
