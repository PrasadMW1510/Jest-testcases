/**
 *
 * DeactivateSuccessGroupModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { hideModal } from 'containers/ModalController/actions';
import DeactivateGroupSuccessModal from 'components/DeactivateGroupSuccessModal/DeactivateGroupSuccessModal';
import makeSelectProfilePageData from 'containers/ProfilePageContainer/selectors';
import { classRedirection } from 'containers/SmartBarContainer/actions';

export function DeactivateSuccessGroupModalContainer(props) {
  const handleYes = e => {
    e.preventDefault();
    props.hideModal();
    props.hideModal();
    if (props.profilePage) {
      props.classRedirection(props.profilePage.toJS().classDetails.class_id[0]);
    }
  };

  return <DeactivateGroupSuccessModal isOpen onYes={handleYes} />;
}

DeactivateSuccessGroupModalContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  classRedirection: PropTypes.func.isRequired,
  profilePage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePageData(),
});

const withConnect = connect(mapStateToProps, {
  hideModal,
  classRedirection,
});

export default compose(withRouter, withConnect)(DeactivateSuccessGroupModalContainer);
