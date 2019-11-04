/**
 *
 * XSkillsTestAssignmentSaveSuccessModal
 *
 */
import PropTypes from 'prop-types';
import React from 'react';
import SAMButton from 'components/SAMButton';
import SAMLinkButton from 'components/SAMLinkButton';
import SAMModal from 'components/SAMModal';

import './XSkillsTestAssignmentSaveSuccessModal.scss';

function XSkillsTestAssignmentSaveSuccessModal({
  affectedUserCount,
  completedUsers,
  isOpen,
  onYes,
  redirectToRoster,
  assignedButIncompleteUsers,
  unenrolledUsers,
  xSkillsTestNumber,
}) {
  function saveSuccessMsg() {
    return (
      <div className="xskills-test-assignment-save-success__message">
        On the next login, {affectedUserCount + assignedButIncompleteUsers.length} students will
        take xSkills Test {xSkillsTestNumber}
      </div>
    );
  }

  function testsAlreadyCompletedMsg() {
    if (completedUsers.length > 0) {
      return (
        <div className="xskills-test-assignment-save-success__details-message">
          The following students are excluded from this assignment because they have already taken
          xSkills Test {xSkillsTestNumber}:
          {renderUsersList(completedUsers)}
        </div>
      );
    }
    return null;
  }
  function assignedButIncompleteUsersMsg() {
    if (assignedButIncompleteUsers.length > 0) {
      return (
        <div className="xskills-test-assignment-save-success__details-message">
          The following students have already been assigned xSkills Test {xSkillsTestNumber}:
          {renderUsersList(assignedButIncompleteUsers)}
        </div>
      );
    }
    return null;
  }

  function unenrolledUsersMsg() {
    if (unenrolledUsers.length > 0) {
      return (
        <div className="xskills-test-assignment-save-success__details-message">
          The following students are not enrolled in xSkills Tests:
          {renderUsersList(unenrolledUsers)}
        </div>
      );
    }
    return null;
  }

  function renderUsersList(userArray) {
    const usersList = userArray.map(u => (
      <li key={u.user_id}>
        {u.first_name} {u.middle_name} {u.last_name}
      </li>
    ));
    return <ul className="xskills-test-assignment-modal-save-success__list">{usersList}</ul>;
  }

  function renderCloseButton() {
    const cssClass = 'xskills-test-assignment-save-success__ok-button';
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
      modalClassModifier="xskills-test-assignment-modal-save-success"
    >
      <div className="xskills-test-assignment-save-success__container">
        <div className="xskills-test-assignment-save-success__title" />
        <div className="xskills-test-assignment-save-success__info-container">
          <div className="xskills-test-assignment-save-success__info">
            {saveSuccessMsg()}
            {testsAlreadyCompletedMsg()}
            {assignedButIncompleteUsersMsg()}
            {unenrolledUsersMsg()}
          </div>
        </div>
      </div>
      <div className="xskills-test-assignment-save-success__ok-button-container">
        {renderCloseButton()}
      </div>
    </SAMModal>
  );
}

XSkillsTestAssignmentSaveSuccessModal.defaultProps = {
  affectedUserCount: 0,
  completedUsers: [],
  redirectToRoster: false,
  assignedButIncompleteUsers: [],
  unenrolledUsers: [],
  xSkillsTestName: '',
};

XSkillsTestAssignmentSaveSuccessModal.propTypes = {
  affectedUserCount: PropTypes.number,
  completedUsers: PropTypes.array,
  isOpen: PropTypes.bool,
  onYes: PropTypes.func.isRequired,
  redirectToRoster: PropTypes.bool,
  assignedButIncompleteUsers: PropTypes.array,
  unenrolledUsers: PropTypes.array,
  xSkillsTestNumber: PropTypes.string,
};

export default XSkillsTestAssignmentSaveSuccessModal;
