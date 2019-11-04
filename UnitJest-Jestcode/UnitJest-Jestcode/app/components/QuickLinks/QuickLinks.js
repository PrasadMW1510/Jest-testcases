/**
 *
 * QuickLinks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import QuickLinksItem from 'components/QuickLinksItem';

import './QuickLinks.scss';

function QuickLinks(props) {
  return (
    <span className="quick-links">
      <QuickLinksItem onClick={props.onSearchClick}>SEARCH</QuickLinksItem>
      <span> | </span>
      <QuickLinksItem onClick={props.onLogoutClick}>EXIT</QuickLinksItem>
      <span> | </span>
      <QuickLinksItem onClick={props.onHelpClick}>HELP</QuickLinksItem>
      <span> | </span>
      <QuickLinksItem onClick={props.onProfileClick}>MY PROFILE</QuickLinksItem>
      <span> | </span>
      <QuickLinksItem color="red" onClick={props.onHomeClick}>
        HOME
      </QuickLinksItem>
    </span>
  );
}

QuickLinks.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  onHelpClick: PropTypes.func.isRequired,
  onSearchClick: PropTypes.func.isRequired,
  onProfileClick: PropTypes.func.isRequired,
  onHomeClick: PropTypes.func.isRequired,
};

export default QuickLinks;
