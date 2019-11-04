/**
 *
 * SAMBody
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './SAMBody.scss';

const SAMBody = ({ bgColor, children, ...other }) => (
  <div className={`sam-body sam-body--${bgColor}`} {...other}>
    {children}
  </div>
);

SAMBody.propTypes = {
  bgColor: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default SAMBody;
