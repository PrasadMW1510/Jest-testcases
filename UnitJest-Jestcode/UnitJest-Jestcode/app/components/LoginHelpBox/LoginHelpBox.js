/**
 *
 * LoginHelpBox
 *
 */

import React from 'react';

import './LoginHelpBox.scss';

function LoginHelpBox() {
  return (
    <p className="login-help">
      Welcome to the Student Achievement Manager. If you do not have a Username or Password, contact
      your School Technical Administrator. Forgot your password? Click Password Hint.
    </p>
  );
}

LoginHelpBox.propTypes = {};

export default LoginHelpBox;
