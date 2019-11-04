/**
 *
 * DeactivateStudentModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';
import DeactivateStudentModal from 'components/DeactivateStudentModal/DeactivateStudentModal';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { deactivateStudentRequest } from './actions';
import reducer from './reducer';
import saga from './saga';

export function DeactivateStudentModalContainer(props) {
  const handleNo = e => {
    e.preventDefault();
    props.hideModal();
  };

  const handleYes = e => {
    e.preventDefault();
    props.deactivateStudentRequest();
  };

  return <DeactivateStudentModal isOpen onNo={handleNo} onYes={handleYes} />;
}

DeactivateStudentModalContainer.propTypes = {
    hideModal: PropTypes.func.isRequired,  // eslint-disable-line
  deactivateStudentRequest: PropTypes.func.isRequired,
};

const withConnect = connect(null, { hideModal, deactivateStudentRequest });
const withSaga = injectSaga({ key: 'deactivateStudent', saga });
const withReducer = injectReducer({ key: 'deactivateStudent', reducer });

export default compose(withReducer, withSaga, withConnect)(DeactivateStudentModalContainer);
