/**
 *
 * RSkillsCCTestAssignmentSaveSuccessContainer
 *
 */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import RSkillsCCTestAssignmentSaveSuccessModal from 'components/RSkillsCCTestAssignmentSaveSuccessModal';
import { hideModal } from 'containers/ModalController/actions';
import { rSkillsCCSettingsTestAssignmentRequest } from 'containers/RSkillsCCSettingContainer/actions';

export class RSkillsCCTestAssignmentSaveSuccessModalContainer extends React.Component {
  handleYes = () => {
    this.props.hideModal();
    if (!this.props.data.redirectToRoster) {
      // call this request only when we haven't redirected
      this.props.rSkillsCCSettingsTestAssignmentRequest();
    }
  };

  parseAffectedMessage = () => {
    const { data } = this.props;
    let usersAffectedBelowGrade = '';
    if (data && data.users_affected && data.users_affected[0].below_grade_count) {
      usersAffectedBelowGrade = data.users_affected[0].below_grade_count;
    }

    let usersAffectedGrade = '';
    if (data && data.users_affected && data.users_affected[0].grade_count) {
      usersAffectedGrade = data.users_affected[0].grade_count;
    }
    const affectedMsg = `On the next login, ${usersAffectedBelowGrade} students will take the below grade-level
        test, and ${usersAffectedGrade} students will take the grade-level test.`;
    return affectedMsg;
  };

  /*
    returns an array of the unaffected users. the modal decides how to display these
  */
  unaffectedUsers = () => {
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
      data.users_unaffected[0].unenrolled_users_rt &&
      data.users_unaffected[0].unenrolled_users_rt[0]
    ) {
      result = data.users_unaffected[0].unenrolled_users_rt[0].user;
    }
    return result;
  };

  render() {
    const { data } = this.props;
    return (
      <RSkillsCCTestAssignmentSaveSuccessModal
        affectedMessage={this.parseAffectedMessage()}
        isOpen
        onYes={this.handleYes}
        redirectToRoster={data.redirectToRoster}
        rSkillsTestName={data.rSkillsTestDescription}
        title={data.rBookName}
        unaffectedUsers={this.unaffectedUsers()}
        unenrolledUsers={this.unenrolledUsers()}
      />
    );
  }
}

RSkillsCCTestAssignmentSaveSuccessModalContainer.propTypes = {
  data: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  rSkillsCCSettingsTestAssignmentRequest: PropTypes.func.isRequired,
};

const withConnect = connect(null, { hideModal, rSkillsCCSettingsTestAssignmentRequest });

export default compose(withConnect)(RSkillsCCTestAssignmentSaveSuccessModalContainer);
