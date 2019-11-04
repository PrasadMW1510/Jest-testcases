/**
 *
 * DeactivateSchoolModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';
import DeactivateSchoolModal from 'components/DeactivateSchoolModal/DeactivateSchoolModal';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { deactivateSchoolRequest } from './actions';
import reducer from './reducer';
import saga from './saga';

export function DeactivateSchoolModalContainer(props) {
  const handleNo = e => {
    e.preventDefault();
    props.hideModal();
  };

  const handleYes = e => {
    e.preventDefault();
    props.deactivateSchoolRequest();
  };

  return <DeactivateSchoolModal isOpen onNo={handleNo} onYes={handleYes} />;
}

DeactivateSchoolModalContainer.propTypes = {
    hideModal: PropTypes.func.isRequired,  // eslint-disable-line
  deactivateSchoolRequest: PropTypes.func.isRequired,
};

const withConnect = connect(null, { hideModal, deactivateSchoolRequest });
const withSaga = injectSaga({ key: 'deactivateSchool', saga });
const withReducer = injectReducer({ key: 'deactivateSchool', reducer });

export default compose(withReducer, withSaga, withConnect)(DeactivateSchoolModalContainer);
