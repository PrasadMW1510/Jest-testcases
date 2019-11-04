/**
 *
 * DeactivateSuccessStudentModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { hideModal } from 'containers/ModalController/actions';
import DeactivateStudentSuccessModal from 'components/DeactivateStudentSuccessModal/DeactivateStudentSuccessModal';
import makeSelectProfilePageData from 'containers/ProfilePageContainer/selectors';
import { updateUserData } from 'containers/App/actions';
import { resetSelections } from 'containers/SmartBarContainer/actions';
import { usageSummaryRequest } from 'containers/UsageSummaryContainer/actions';

export function DeactivateSuccessStudentModalContainer(props) {
  const handleYes = e => {
    e.preventDefault();
    props.hideModal();
    props.hideModal();
    if (props.profilePage) {
      e.preventDefault();
      props.resetSelections();
      props.updateUserData();
      props.usageSummaryRequest();
      props.history.push('/roster');
    }
  };

  return <DeactivateStudentSuccessModal isOpen onYes={handleYes} />;
}

DeactivateSuccessStudentModalContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  profilePage: PropTypes.object,
  updateUserData: PropTypes.func,
  resetSelections: PropTypes.func.isRequired,
  usageSummaryRequest: PropTypes.func.isRequired,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePageData(),
});

const withConnect = connect(mapStateToProps, {
  hideModal,
  updateUserData,
  resetSelections,
  usageSummaryRequest,
});

export default compose(withRouter, withConnect)(DeactivateSuccessStudentModalContainer);
