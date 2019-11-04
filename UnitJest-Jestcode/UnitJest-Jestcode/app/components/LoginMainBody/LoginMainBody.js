/**
 *
 * LoginMainBody
 *
 */

import React from 'react';

import PropTypes from 'prop-types';
import './LoginMainBody.scss';

function LoginMainBody(props) {
  return <div className="login-main-body">{props.children}</div>;
}

LoginMainBody.propTypes = {
  children: PropTypes.node,
};

export default LoginMainBody;
