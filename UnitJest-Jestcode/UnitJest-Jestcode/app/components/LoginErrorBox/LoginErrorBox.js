/**
 *
 * LoginErrorBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './LoginErrorBox.scss';

function LoginErrorBox(props) {
  if (!props.error) {
    return null;
  }

  return <textarea className="login-error-box" value={props.error} readOnly />;
}

LoginErrorBox.propTypes = {
  error: PropTypes.string,
};

export default LoginErrorBox;
