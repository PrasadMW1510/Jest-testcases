/**
 *
 * TabBar
 *
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import Tab from 'components/Tab';
import './TabBar.scss';

class TabBar extends React.Component {
  render() {
    const props = {
      activeClassName: 'tab-bar__tab--active',
      component: NavLink,
    };
    return (
      <div className="tab-bar">
        <div className="tab-bar__container">
          <Tab {...props} className="tab-bar__tab--home" to="/" exact>
            Home
          </Tab>
          <Tab {...props} className="tab-bar__tab--roster" to="/roster">
            Roster
          </Tab>
          <Tab {...props} className="tab-bar__tab--reports" to="/reports">
            Reports
          </Tab>
          <Tab {...props} className="tab-bar__tab--resources" to="/resources">
            Resources
          </Tab>
          <Tab {...props} className="tab-bar__tab--books" to="/books">
            Books
          </Tab>
          <Tab {...props} className="tab-bar__tab--portfolio" to="/portfolio">
            Portfolio
          </Tab>
        </div>
      </div>
    );
  }
}

TabBar.propTypes = {};

export default TabBar;
