/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import LoginBox from 'components/LoginBox';
import { loginRequest, passwordHintRequest } from 'containers/App/actions';
import { makeSelectGlobal } from 'containers/App/selectors';
import LoginBody from 'components/LoginBody';
import LoginMainBody from 'components/LoginMainBody';
import LoginHelpBox from 'components/LoginHelpBox';
import SAMInfoLink from 'components/SAMInfoLink';
import LoginCopyrightFooter from 'components/LoginCopyrightFooter';
import LoginErrorBox from 'components/LoginErrorBox';

export class LoginPage extends React.Component {
  componentDidMount() {
    if (this.props.global.get('currentUser')) {
      // If the user is already logged in, redirect to the homepage
      this.props.history.push('/');
    }
  }

  handleLogin = ({ username, password }) => {
    this.props.loginRequest(username, password);
  };

  render() {
    return (
      <LoginBody>
        <LoginMainBody>
          <LoginBox onSubmit={this.handleLogin} onPasswordHint={this.props.passwordHintRequest} />
          <LoginErrorBox error={this.props.global.get('error')} />
        </LoginMainBody>

        <LoginHelpBox />
        <SAMInfoLink />
        <LoginCopyrightFooter />
      </LoginBody>
    );
  }
}

LoginPage.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  global: PropTypes.object.isRequired,
  passwordHintRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  global: makeSelectGlobal(),
});

export default connect(mapStateToProps, { loginRequest, passwordHintRequest })(LoginPage);
