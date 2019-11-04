/**
 *
 * Header
 *
 */

import React from 'react';

import HeaderImage from 'components/HeaderImage';
import HeaderUserTextContainer from 'containers/HeaderUserTextContainer';
import QuickLinksContainer from 'containers/QuickLinksContainer';
import './Header.scss';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <span className="header__username">
          <HeaderUserTextContainer />
        </span>
        <span className="header__logo">
          <HeaderImage />
        </span>
        <span className="header__actions">
          <QuickLinksContainer />
        </span>
      </div>
    );
  }
}

Header.propTypes = {};

export default Header;
