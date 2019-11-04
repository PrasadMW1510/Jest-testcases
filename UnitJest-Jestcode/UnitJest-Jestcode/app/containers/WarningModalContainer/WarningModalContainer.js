/**
 *
 * WarningModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';
import WarningModal from 'components/WarningModal';
import { WARNING_MODAL } from 'containers/ModalController/constants';

export function WarningModalContainer(props) {
  const handleOk = () => {
    props.hideModal(WARNING_MODAL, props.data);
  };
  return <WarningModal data={props.data} isOpen okOnClickHandler={handleOk} />;
}

WarningModalContainer.propTypes = {
  data: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
};

const withConnect = connect(null, { hideModal });

export default compose(withConnect)(WarningModalContainer);
