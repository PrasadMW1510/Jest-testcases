/**
 *
 * RSkillsCCTestAssignmentSaveSuccessModal
 *
 */
import PropTypes from 'prop-types';
import React from 'react';

import SAMButton from 'components/SAMButton';
import SAMLinkButton from 'components/SAMLinkButton';
import SAMModal from 'components/SAMModal';
import './RSkillsCCTestAssignmentSaveSuccessModal.scss';

function RSkillsCCTestAssignmentSaveSuccessModal({
  affectedMessage,
  isOpen,
  onYes,
  redirectToRoster,
  rSkillsTestName,
  title,
  unaffectedUsers,
  unenrolledUsers,
}) {
  function unaffectedUsersMsg() {
    if (unaffectedUsers.length > 0) {
      return (
        <div className="rskillscc-test-assignment-save-success__unaffected-users-message">
          The following students have already been assigned {rSkillsTestName}:
          {renderUnaffectedUnenrolledUsers(unaffectedUsers)}
        </div>
      );
    }
    return null;
  }

  function renderUnaffectedUnenrolledUsers(userArray) {
    const unaffectedUsersLi = userArray.map(u => (
      <li key={u.user_id}>
        {u.first_name} {u.last_name}
      </li>
    ));
    return (
      <ul className="rskillscc-test-assignment-modal-save-success__list">{unaffectedUsersLi}</ul>
    );
  }

  function unenrolledUsersMsg() {
    if (unenrolledUsers.length > 0) {
      return (
        <div className="rskillscc-test-assignment-save-success__unenrolled-users-message">
          The following students are not enrolled in rSkills Tests:
          {renderUnaffectedUnenrolledUsers(unenrolledUsers)}
        </div>
      );
    }
    return null;
  }

  function renderCloseButton() {
    const cssClass = 'rskillscc-test-assignment-save-success__ok-button';
    if (redirectToRoster) {
      return (
        <SAMLinkButton
          to="/roster"
          id="ok"
          buttonClassModifier={cssClass}
          onClickHandler={onYes}
          isPrimaryButton
        >
          OK
        </SAMLinkButton>
      );
    }
    return (
      <SAMButton buttonClassModifier={cssClass} onClickHandler={onYes} isPrimaryButton>
        OK
      </SAMButton>
    );
  }

  return (
    <SAMModal
      isOpen={isOpen}
      contentLabel=""
      modalClassModifier="rskillscc-test-assignment-modal-save-success"
    >
      <div className="rskillscc-test-assignment-save-success__container">
        <div className="rskillscc-test-assignment-save-success__title">{title}</div>
        <div className="rskillscc-test-assignment-save-success__info-container">
          <div className="rskillscc-test-assignment-save-success__info">
            <div className="rskillscc-test-assignment-save-success__test-name">
              {rSkillsTestName}
            </div>
            <div className="rskillscc-test-assignment-save-success__message">{affectedMessage}</div>
            {unaffectedUsersMsg()}
            {unenrolledUsersMsg()}
          </div>
        </div>
      </div>
      <div className="rskillscc-test-assignment-save-success__ok-button-container">
        {renderCloseButton()}
      </div>
    </SAMModal>
  );
}

RSkillsCCTestAssignmentSaveSuccessModal.defaultProps = {
  redirectToRoster: false,
  unaffectedUsers: [],
  unenrolledUsers: [],
};

RSkillsCCTestAssignmentSaveSuccessModal.propTypes = {
  affectedMessage: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onYes: PropTypes.func.isRequired,
  redirectToRoster: PropTypes.bool,
  rSkillsTestName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  unaffectedUsers: PropTypes.array,
  unenrolledUsers: PropTypes.array,
};

export default RSkillsCCTestAssignmentSaveSuccessModal;
