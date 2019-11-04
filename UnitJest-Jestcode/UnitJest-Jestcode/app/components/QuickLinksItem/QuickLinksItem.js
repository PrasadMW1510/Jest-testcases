/**
 *
 * QuickLinksItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './QuickLinksItem.scss';

const QuickLinksItem = ({ color, children, ...other }) => (
  <a className={`quick-links-item${color ? ` quick-links-item--${color}` : ''}`} {...other}>
    {children}
  </a>
);

QuickLinksItem.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
};

export default QuickLinksItem;
