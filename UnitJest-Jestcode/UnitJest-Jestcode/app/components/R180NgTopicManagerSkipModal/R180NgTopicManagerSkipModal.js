/**
 *
 * R180NgtopicManagerSkipModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import UserTitleText from 'containers/UserTitleText/UserTitleText';
import SAMModal from 'components/SAMModal/SAMModal';
import SAMButton from 'components/SAMButton/SAMButton';
import './R180NgTopicManagerSkipModal.scss';

function R180NgTopicManagerSkipModal(props) {
  return (
    <SAMModal
      isOpen={props.isOpen}
      contentLabel="Skip Topic CD"
      modalClassModifier="r180ng-topics-skip-modal"
    >
      <h4 className="r180ng-topics-skip-modal-heading">Skip Topic CD</h4>
      <div className="r180ng-topics-skip-modal-body">
        <div className="r180ng-topics-skip-modal-message1">
          Are you sure you want <UserTitleText /> to{' '}
        </div>
        <div className="r180ng-topics-skip-modal-message1">skip topic {props.data.data} ? </div>
      </div>
      <div className="r180ng-topics-skip-modal-footer">
        <SAMButton
          buttonClassModifier="r180ng-topics-skip-modal--ok-button"
          onClickHandler={props.onYes}
          isPrimaryButton
        >
          Yes
        </SAMButton>
        <SAMButton
          buttonClassModifier="r180ng-topics-skip-modal--cancel-button"
          onClickHandler={props.onNo}
        >
          No
        </SAMButton>
      </div>
    </SAMModal>
  );
}

R180NgTopicManagerSkipModal.propTypes = {
  onYes: PropTypes.func,
  onNo: PropTypes.func,
  isOpen: PropTypes.bool,
  data: PropTypes.any,
};

export default R180NgTopicManagerSkipModal;
