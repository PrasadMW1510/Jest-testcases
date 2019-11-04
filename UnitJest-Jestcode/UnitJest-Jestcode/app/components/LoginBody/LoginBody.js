/**
 *
 * LoginBody
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './LoginBody.scss';

function LoginBody(props) {
  return <div className="login-body">{props.children}</div>;
}

LoginBody.propTypes = {
  children: PropTypes.node,
};

export default LoginBody;
