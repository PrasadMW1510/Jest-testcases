import React from 'react';
import PropTypes from 'prop-types';
import UserTitleText from 'containers/UserTitleText/UserTitleText';
import SAMModal from '../SAMModal/SAMModal';
import './ProgramSettingSetStudentLevelModal.scss';
import SAMButton from '../SAMButton/SAMButton';
function ProgramSettingSetStudentLevelModal(props) {
  return (
    <SAMModal
      isOpen={props.isOpen}
      contentLabel="Set Student Level"
      modalClassModifier="student-level-modal"
    >
      <h4 className="student-level-modal-heading">Set Student Level</h4>
      <div className="student-level-modal-message">
        <div className="student-level-modal-message-confirmation1">
          Are you sure you want <UserTitleText /> set
        </div>
        <div>at Level {props.displayLevel.Level} in READ 180 Next Generation?</div>
        <div className="student-level-modal-message-confirmation1">
          Changes will take effect when the student begins
        </div>
        <div>a new segment.</div>
      </div>
      <div className="student-level-modal-message-footer">
        <SAMButton
          buttonClassModifier="student-level-modal--ok-button"
          onClickHandler={props.onYes}
          isPrimaryButton
        >
          OK
        </SAMButton>
        <SAMButton
          buttonClassModifier="student-level-modal--cancel-button"
          onClickHandler={props.onNo}
        >
          Cancel
        </SAMButton>
      </div>
    </SAMModal>
  );
}
ProgramSettingSetStudentLevelModal.propTypes = {
  onYes: PropTypes.func,
  onNo: PropTypes.func,
  isOpen: PropTypes.bool,
  displayLevel: PropTypes.any,
};

export default ProgramSettingSetStudentLevelModal;
