/**
 *
 * R180NgtopicSkipSegmentModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import UserTitleText from 'containers/UserTitleText/UserTitleText';
import SAMModal from 'components/SAMModal/SAMModal';
import SAMButton from 'components/SAMButton/SAMButton';
import './R180NgtopicSkipSegmentModal.scss';

function R180NgtopicSkipSegmentModal(props) {
  return (
    <div>
      <SAMModal
        isOpen={props.isOpen}
        contentLabel="Skip Segment CD"
        modalClassModifier="r180ng-topics-segment-skip-modal"
      >
        <h4 className="r180ng-topics-segment-skip-modal-heading">Skip Segment</h4>
        <div className="r180ng-topics-segment-skip-modal-body">
          <div className="r180ng-topics-segment-skip-modal-message1">
            Are you sure you want <UserTitleText /> to{' '}
          </div>
          <div className="r180ng-topics-segment-skip-modal-message1">skip {props.data.data}? </div>
        </div>
        <div className="r180ng-topics-segment-skip-modal-footer">
          <SAMButton
            buttonClassModifier="r180ng-topics-segment-skip-modal--ok-button"
            onClickHandler={props.onYes}
            isPrimaryButton
          >
            Yes
          </SAMButton>
          <SAMButton
            buttonClassModifier="r180ng-topics-segment-skip-modal--cancel-button"
            onClickHandler={props.onNo}
          >
            No
          </SAMButton>
        </div>
      </SAMModal>
    </div>
  );
}

R180NgtopicSkipSegmentModal.propTypes = {
  onYes: PropTypes.func,
  onNo: PropTypes.func,
  isOpen: PropTypes.bool,
  data: PropTypes.any,
};

export default R180NgtopicSkipSegmentModal;
