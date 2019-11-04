/**
 *
 * HeaderUserText
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import './HeaderUserText.scss';

function HeaderUserText(props) {
  return <span className="header-usr-txt">{`${props.firstName} ${props.lastName}`}</span>;
}

HeaderUserText.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

export default HeaderUserText;
