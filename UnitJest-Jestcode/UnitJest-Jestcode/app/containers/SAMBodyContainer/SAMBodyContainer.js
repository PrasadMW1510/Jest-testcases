/**
 *
 * SAMBodyContainer
 * This is a container of SAMBody and sets the background color based on the current browser location.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SAMBody from 'components/SAMBody';

function SAMBodyContainer(props) {
  function getBodyBgColor() {
    const loc = props.location.pathname.split('/');
    const path = loc.length > 1 && loc[1];
    switch (path) {
      case 'roster':
        return 'orange';
      case 'reports':
        return 'blue';
      case 'resources':
        return 'green';
      case 'books':
        return 'red';
      case 'portfolio':
        return 'purple';
      default:
        return 'cream';
    }
  }

  return <SAMBody bgColor={getBodyBgColor()}>{props.children}</SAMBody>;
}

SAMBodyContainer.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default withRouter(SAMBodyContainer);
