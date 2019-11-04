/**
 *
 * QuickLinksContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import QuickLinks from 'components/QuickLinks';
import { HELP_PAGE_URL } from 'utils/externalLinkConstants';
import { USER_TYPE } from 'containers/App/constants';
import { makeSelectProfileUserType } from 'containers/App/selectors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  showModal,
  showLogoutModal,
  showSearchModal,
  showTeacherFormModal,
} from 'containers/ModalController/actions';
import * as ModalConstants from 'containers/ModalController/constants';

export class QuickLinksContainer extends React.Component {
  handleSearchClick = e => {
    e.preventDefault();
    this.props.showSearchModal();
  };

  handleHelpClick = e => {
    e.preventDefault();
    window.open(HELP_PAGE_URL);
  };

  handleLogoutClick = e => {
    e.preventDefault();
    this.props.showLogoutModal();
  };

  handleHomeClick = e => {
    e.preventDefault();
    this.props.history.push('/');
  };

  handleProfileClick = e => {
    e.preventDefault();

    switch (this.props.profileUserType) {
      case USER_TYPE.Administrator:
      case USER_TYPE.Tech:
        this.props.showModal(ModalConstants.EDIT_ADMIN_MODAL, {
          editMode: true,
          editingSameAccount: true,
        });
        break;
      case USER_TYPE.Teacher:
        this.props.showTeacherFormModal({
          editMode: true,
          editingSameAccount: true,
        });
        break;
      default:
        break;
    }
  };

  render = () => (
    <QuickLinks
      onLogoutClick={this.handleLogoutClick}
      onHelpClick={this.handleHelpClick}
      onSearchClick={this.handleSearchClick}
      onProfileClick={this.handleProfileClick}
      onHomeClick={this.handleHomeClick}
    />
  );
}

QuickLinksContainer.propTypes = {
  history: PropTypes.object.isRequired,
  profileUserType: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
  showLogoutModal: PropTypes.func.isRequired,
  showSearchModal: PropTypes.func.isRequired,
  showTeacherFormModal: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profileUserType: makeSelectProfileUserType(),
});

const withConnect = connect(mapStateToProps, {
  showModal,
  showLogoutModal,
  showSearchModal,
  showTeacherFormModal,
});

export default compose(withRouter, withConnect)(QuickLinksContainer);
