/**
 *
 * XSkillsTestAssignmentSaveSuccessModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';
import XSkillsTestAssignmentSaveSuccessModal from 'components/XSkillsTestAssignmentSaveSuccessModal';
import { xSkillsTestAssignmentRequest } from 'containers/XSkillsSettingContainer/actions';
export class XSkillsTestAssignmentSaveSuccessModalContainer extends React.Component {
  handleYes = () => {
    this.props.hideModal();
    if (!this.props.data.redirectToRoster) {
      // call this request only when we haven't redirected
      this.props.xSkillsTestAssignmentRequest();
    }
  };

  determineAffectedUserCount = () => {
    const { data } = this.props;
    let result = 0;
    if (data && data.users_affected && data.users_affected[0] && data.users_affected[0].user) {
      result = data.users_affected[0].user.length;
    }
    return result;
  };

  /*
    returns an array of the user who have completed the test. the modal decides how to display these
  */
  completedUsers = () => {
    const { data } = this.props;
    let result = [];
    if (
      data &&
      data.users_unaffected &&
      data.users_unaffected[0] &&
      data.users_unaffected[0].test_completed &&
      data.users_unaffected[0].test_completed[0]
    ) {
      result = data.users_unaffected[0].test_completed[0].user;
    }
    return result;
  };

  /*
    returns an array of the assignedButIncompleteUsers. the modal decides how to display these
  */
  assignedButIncompleteUsers = () => {
    const { data } = this.props;
    let result = [];
    if (
      data &&
      data.users_unaffected &&
      data.users_unaffected[0] &&
      data.users_unaffected[0].assigned_but_incomplete_users &&
      data.users_unaffected[0].assigned_but_incomplete_users[0]
    ) {
      result = data.users_unaffected[0].assigned_but_incomplete_users[0].user;
    }
    return result;
  };

  /*
   returns an array of the unenrolled users. the modal decides how to display these
 */
  unenrolledUsers = () => {
    const { data } = this.props;
    let result = [];
    if (
      data &&
      data.users_unaffected &&
      data.users_unaffected[0] &&
      data.users_unaffected[0].unenrolled_users_xt &&
      data.users_unaffected[0].unenrolled_users_xt[0]
    ) {
      result = data.users_unaffected[0].unenrolled_users_xt[0].user;
    }
    return result;
  };

  render() {
    const { data } = this.props;
    return (
      <XSkillsTestAssignmentSaveSuccessModal
        affectedUserCount={this.determineAffectedUserCount()}
        completedUsers={this.completedUsers()}
        xSkillsTestNumber={String(data.xSkillsTestNumber)}
        isOpen
        onYes={this.handleYes}
        redirectToRoster={data.redirectToRoster}
        assignedButIncompleteUsers={this.assignedButIncompleteUsers()}
        unenrolledUsers={this.unenrolledUsers()}
      />
    );
  }
}

XSkillsTestAssignmentSaveSuccessModalContainer.propTypes = {
  data: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  xSkillsTestAssignmentRequest: PropTypes.func.isRequired,
};

const withConnect = connect(null, { hideModal, xSkillsTestAssignmentRequest });

export default compose(withConnect)(XSkillsTestAssignmentSaveSuccessModalContainer);
