/**
 *
 * LogoutBox
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './LogoutBox.scss';

function LogoutBox() {
  return (
    <div className="logout-box">
      <h3>Sign Off Complete</h3>
      <p>
        Thank you for using SAM. To sign on again, click <Link to="/login">here.</Link>
      </p>
      <p>It is now safe to close this browser window.</p>
    </div>
  );
}

LogoutBox.propTypes = {};

export default LogoutBox;
