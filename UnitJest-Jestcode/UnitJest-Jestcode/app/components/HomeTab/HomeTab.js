/**
 *
 * HomeTab
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './HomeTab.scss';

function HomeTab(props) {
  return (
    <NavLink exact to={props.link} className="home-tab" activeClassName="home-tab--active">
      <div className="home-tab__title">
        <span className="home-tab-title__tabtxt">{props.tabText}</span>
      </div>
    </NavLink>
  );
}

HomeTab.propTypes = {
  link: PropTypes.string.isRequired,
  tabText: PropTypes.string.isRequired,
};

export default HomeTab;
