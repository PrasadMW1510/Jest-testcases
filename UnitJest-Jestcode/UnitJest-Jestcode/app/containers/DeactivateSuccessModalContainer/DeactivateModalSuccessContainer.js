/**
 *
 * DeactivateSuccessModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { USER_ORG } from 'containers/App/constants';
import { isUserTypeAdminOrTech } from 'utils/utilities';
import { makeSelectProfileUserType, makeSelectLoginUserOrg } from 'containers/App/selectors';
import { hideModal } from 'containers/ModalController/actions';
import { schoolRedirection } from 'containers/SmartBarContainer/actions';
import { schoolUserLoginFlowRequest } from 'containers/App/actions';
import { usageSummaryRequest } from 'containers/UsageSummaryContainer/actions';
import DeactivateTeacherSuccessModal from 'components/DeactivateTeacherSuccessModal/DeactivateTeacherSuccessModal';
import { makeSelectSchoolId } from 'containers/SmartBarContainer/selectors';

export function DeactivateModalSuccessContainer(props) {
  const handleYes = e => {
    e.preventDefault();
    props.hideModal();
    props.hideModal();
    props.schoolRedirection(props.activeSmartBarSchoolId);
    if (props.profileOrgType === USER_ORG.School && isUserTypeAdminOrTech(props.profileUserType)) {
      props.schoolUserLoginFlowRequest();
      props.usageSummaryRequest();
    }
  };

  return <DeactivateTeacherSuccessModal isOpen onYes={handleYes} />;
}

DeactivateModalSuccessContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  schoolRedirection: PropTypes.func,
  schoolUserLoginFlowRequest: PropTypes.func,
  usageSummaryRequest: PropTypes.func,
  activeSmartBarSchoolId: PropTypes.string,
  profileOrgType: PropTypes.string,
  profileUserType: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  activeSmartBarSchoolId: makeSelectSchoolId(),
  profileOrgType: makeSelectLoginUserOrg(),
  profileUserType: makeSelectProfileUserType(),
});

const withConnect = connect(mapStateToProps, {
  hideModal,
  schoolRedirection,
  schoolUserLoginFlowRequest,
  usageSummaryRequest,
});

export default compose(withRouter, withConnect)(DeactivateModalSuccessContainer);
