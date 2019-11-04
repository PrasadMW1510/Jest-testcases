/**
 *
 * LoadingModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import LoadingBar from 'components/LoadingBar';
import SAMModal from 'components/SAMModal';

import './LoadingModal.scss';

function LoadingModal(props) {
  return (
    <SAMModal isOpen={props.isOpen} modalClassModifier="loading-modal">
      <LoadingBar />
    </SAMModal>
  );
}

LoadingModal.propTypes = {
  isOpen: PropTypes.bool,
};

export default LoadingModal;
