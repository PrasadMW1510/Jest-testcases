/**
 *
 * LogoutPage
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import LoginBody from 'components/LoginBody';
import LoginMainBody from 'components/LoginMainBody';
import LoginCopyrightFooter from 'components/LoginCopyrightFooter';
import LogoutBox from 'components/LogoutBox';
import { logoutRequest } from 'containers/App/actions';
import { makeSelectGlobal } from 'containers/App/selectors';

export class LogoutPage extends Component {
  componentDidMount() {
    // If we are logged in, do a logout
    if (this.props.global.get('currentUser')) {
      this.props.logoutRequest();
    } else {
      // If we are already logged out, go to the login page
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <LoginBody>
        <LoginMainBody>
          <LogoutBox />
        </LoginMainBody>
        <LoginCopyrightFooter />
      </LoginBody>
    );
  }
}

LogoutPage.propTypes = {
  logoutRequest: PropTypes.func.isRequired,
  global: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  global: makeSelectGlobal(),
});

export default connect(mapStateToProps, { logoutRequest })(LogoutPage);
