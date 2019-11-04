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
import DeactivateGroupModal from 'components/DeactivateGroupModal/DeactivateGroupModal';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { deactivateGroupRequest } from './actions';
import reducer from './reducer';
import saga from './saga';

export function DeactivateGroupModalContainer(props) {
  const handleNo = e => {
    e.preventDefault();
    props.hideModal();
  };

  const handleYes = e => {
    e.preventDefault();
    props.deactivateGroupRequest();
  };

  return <DeactivateGroupModal isOpen onNo={handleNo} onYes={handleYes} />;
}

DeactivateGroupModalContainer.propTypes = {
    hideModal: PropTypes.func.isRequired,  // eslint-disable-line
  deactivateGroupRequest: PropTypes.func.isRequired,
};

const withConnect = connect(null, { hideModal, deactivateGroupRequest });
const withSaga = injectSaga({ key: 'deactivateGroup', saga });
const withReducer = injectReducer({ key: 'deactivateGroup', reducer });

export default compose(withReducer, withSaga, withConnect)(DeactivateGroupModalContainer);
