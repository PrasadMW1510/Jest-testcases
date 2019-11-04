/**
 *
 * MessageLogModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';
import MessageLogModal from 'components/MessageLogModal/MessageLogModal';

export function MessageLogModalContainer(props) {
  const handleOk = e => {
    e.preventDefault();
    props.hideModal();
  };

  return <MessageLogModal isOpen onOk={handleOk} displayText={props.data} />;
}

MessageLogModalContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  data: PropTypes.object,
};

const withConnect = connect(null, { hideModal });

export default compose(withConnect)(MessageLogModalContainer);
