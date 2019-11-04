/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ContentPanel from 'components/ContentPanel';
import FolderNavBar from 'components/FolderNavBar';
import AppBar from 'components/AppBar';
import { showModal } from 'containers/ModalController/actions';
import * as ModalConstants from 'containers/ModalController/constants';
import {
  isGlobalLoading,
  makeSelectProfileUserType,
  makeSelectResetCredentials,
} from 'containers/App/selectors';
import UserTitleText from 'containers/UserTitleText';
import { isMessageContainerLoading } from 'containers/MessageContainer/selectors';
import MessageContainer from '../MessageContainer';

export class HomePage extends React.Component {
  componentDidMount() {
    const resetCredentials = this.props.resetCredentials === 'true';
    if (resetCredentials) {
      this.props.showModal(ModalConstants.EDIT_ADMIN_MODAL, {
        editMode: true,
        editingSameAccount: true,
        defaultMode: true,
      });
    }
  }

  /**
   * Used for if we want to show the Tab level loading.
   * Add to this function using '||'
   */

  isLoading = () => this.props.isGlobalLoading || this.props.isMessageContainerLoading;

  render() {
    return (
      <span>
        <ContentPanel loading={this.isLoading()}>
          <h2 style={{ marginBottom: '0px', marginTop: '15px' }}>
            <UserTitleText />
          </h2>
          <FolderNavBar profileUserType={this.props.profileUserType} />
          <MessageContainer />
          <AppBar />
        </ContentPanel>
      </span>
    );
  }
}

HomePage.propTypes = {
  isGlobalLoading: PropTypes.bool.isRequired,
  isMessageContainerLoading: PropTypes.bool.isRequired,
  profileUserType: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
  resetCredentials: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isGlobalLoading: isGlobalLoading(),
  isMessageContainerLoading: isMessageContainerLoading(),
  profileUserType: makeSelectProfileUserType(),
  resetCredentials: makeSelectResetCredentials(),
});

const withConnect = connect(mapStateToProps, { showModal });

export default compose(withConnect)(HomePage);
