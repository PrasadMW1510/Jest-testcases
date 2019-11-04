/**
 *
 * PortfolioTabBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Tab from 'components/Tab';

import { USER_TYPE } from 'containers/App/constants';
import './PortfolioTabBar.scss';

class PortfolioTabBar extends React.Component {
  render() {
    return (
      <div className="portfoloio-nav-bar">
        <div className="nav-bar__container portfolio-nav-container">
          {this.props.usertype === USER_TYPE.Teacher && (
            <Tab
              activeClassName="nav-bar__tab--active"
              component={NavLink}
              className="nav-bar__tab--inbox"
              to="/portfolio/inBox"
            >
              Inbox
            </Tab>
          )}
          {this.props.usertype === USER_TYPE.Teacher &&
            this.props.programList.indexOf('S44NG') !== -1 && (
              <Tab
                activeClassName="nav-bar__tab--active"
                component={NavLink}
                className="nav-bar__tab--student"
                to="/portfolio/studentGoals"
              >
                Student Goals
              </Tab>
            )}
          {this.props.usertype === USER_TYPE.Teacher &&
            (this.props.programList.indexOf('S44NG') !== -1 ||
              this.props.programList.indexOf('r180u_B') !== -1 ||
              this.props.programList.indexOf('r180ng_A') !== -1 ||
              this.props.programList.indexOf('r180ng_B') !== -1 ||
              this.props.programList.indexOf('r180ng_C') !== -1 ||
              this.props.programList.indexOf('S44JR') !== -1) && (
              <Tab
                activeClassName="nav-bar__tab--active"
                component={NavLink}
                className="nav-bar__tab--assignments"
                to="/portfolio/assignments"
              >
                Assignments
              </Tab>
            )}
          <Tab
            activeClassName="nav-bar__tab--active"
            component={NavLink}
            className="nav-bar__tab--studentwork"
            to="/portfolio/studentWorks"
          >
            Student Work
          </Tab>
        </div>
      </div>
    );
  }
}

PortfolioTabBar.propTypes = {
  usertype: PropTypes.string,
  programList: PropTypes.array,
};

export default PortfolioTabBar;
