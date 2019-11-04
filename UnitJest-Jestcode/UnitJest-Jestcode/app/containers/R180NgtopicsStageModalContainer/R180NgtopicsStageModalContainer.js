/**
 *
 * R180NgtopicsStageModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { R180NGTopicsRequest } from 'containers/R180NGTopicContainer/actions';
import { hideModal } from 'containers/ModalController/actions';
import { R180NG_TOPICS_STAGE_MODAL } from 'containers/ModalController/constants';
import R180NgtopicsStageModal from 'components/R180NgtopicsStageModal';

export function R180NgtopicsStageModalContainer(props) {
  const handleNo = () => {
    props.R180NGTopicsRequest(props.data.prevValue);
    props.hideModal(R180NG_TOPICS_STAGE_MODAL);
    return false;
  };

  const handleYes = () => {
    props.R180NGTopicsRequest(props.data.currentValue);
    props.hideModal(R180NG_TOPICS_STAGE_MODAL);
  };

  return <R180NgtopicsStageModal isOpen onNo={handleNo} onYes={handleYes} />;
}

R180NgtopicsStageModalContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
  R180NGTopicsRequest: PropTypes.func,
};

const withConnect = connect(null, { hideModal, R180NGTopicsRequest });
export default compose(withConnect)(R180NgtopicsStageModalContainer);
