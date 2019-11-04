/**
 *
 * SAMContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './SAMContainer.scss';

const SAMContainer = ({ children, ...other }) => (
  <div className="sam-container" {...other}>
    {children}
  </div>
);

SAMContainer.propTypes = {
  children: PropTypes.node,
};

export default SAMContainer;
