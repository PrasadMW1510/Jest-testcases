/**
 *
 * DeactivateClassModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';
import DeactivateClassModal from 'components/DeactivateClassModal/DeactivateClassModal';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { deactivateClassRequest } from './actions';
import reducer from './reducer';
import saga from './saga';

export function DeactivateClassModalContainer(props) {
  const handleNo = e => {
    e.preventDefault();
    props.hideModal();
  };

  const handleYes = e => {
    e.preventDefault();
    props.deactivateClassRequest();
  };

  return <DeactivateClassModal isOpen onNo={handleNo} onYes={handleYes} />;
}

DeactivateClassModalContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,  // eslint-disable-line
  deactivateClassRequest: PropTypes.func.isRequired,
};

const withConnect = connect(null, { hideModal, deactivateClassRequest });
const withSaga = injectSaga({ key: 'deactivateClass', saga });
const withReducer = injectReducer({ key: 'deactivateClass', reducer });

export default compose(withReducer, withSaga, withConnect)(DeactivateClassModalContainer);
