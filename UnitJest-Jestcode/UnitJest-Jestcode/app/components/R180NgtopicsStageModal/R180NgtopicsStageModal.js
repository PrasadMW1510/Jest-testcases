/**
 *
 * R180NgtopicsStageModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './R180NgtopicsStageModal.scss';
import SAMModal from '../SAMModal/SAMModal';
import SAMButton from '../SAMButton/SAMButton';
function R180NgtopicsStageModal(props) {
  return (
    <SAMModal
      isOpen={props.isOpen}
      contentLabel="Set Student Level"
      modalClassModifier="r180ng-topics-stage-modal"
    >
      <div className="r180ng-topics-stage-modal-body">
        <div>Using the filter menu will erase any</div>
        <div>changes that you have not already </div>
        <div>saved. Would you like to continue?</div>

        <div className="r180ng-topics-stage-modal-footer">
          <SAMButton
            buttonClassModifier="r180ng-topics-stage-modal--ok-button"
            onClickHandler={props.onYes}
            isPrimaryButton
          >
            Yes
          </SAMButton>
          <SAMButton
            buttonClassModifier="r180ng-topics-stage-modal--cancel-button"
            onClickHandler={props.onNo}
          >
            No
          </SAMButton>
        </div>
      </div>
    </SAMModal>
  );
}

R180NgtopicsStageModal.propTypes = {
  onYes: PropTypes.func,
  onNo: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default R180NgtopicsStageModal;
