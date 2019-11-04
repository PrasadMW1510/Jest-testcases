/**
 *
 * ProgramSettingsNavBar
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import NavBar, { NavItem } from 'components/NavBar';

import './ProgramSettingsNavBar.scss';

class ProgramSettingsNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.tabs[0].id,
    };
  }

  getActionCall = () => {
    this.props.tabs.forEach(tab => {
      if (tab.id === this.state.activeTab && tab.renderAction) {
        tab.renderAction();
      }
    });
  };

  handleTabClick = ev => {
    this.setState({ activeTab: ev.currentTarget.id }, this.getActionCall);
  };

  renderChildren = () => {
    let renderFunction = null;

    this.props.tabs.forEach(tab => {
      if (tab.id === this.state.activeTab) {
        renderFunction = tab.renderFunction;
      }
    });
    return renderFunction();
  };

  render() {
    const { isolateTab, overrideClassName, tabs } = this.props;
    const { activeTab } = this.state;

    const classesNavBar = `program-settings-nav-bar__tabs ${
      isolateTab ? 'program-settings-nav-bar__tabs--isolate' : ''
    } ${overrideClassName}`;

    return (
      <div>
        <NavBar activeItemId={activeTab} className={classesNavBar} theme="tabs" palette="orange">
          {tabs.map(({ label, id }) => (
            <NavItem id={id} key={id} onClick={this.handleTabClick}>
              {label}
            </NavItem>
          ))}
        </NavBar>
        <div className="program-settings-nav-bar__tab-content">{this.renderChildren()}</div>
      </div>
    );
  }
}

ProgramSettingsNavBar.defaultProps = {
  isolateTab: false,
  overrideClassName: '',
};

ProgramSettingsNavBar.propTypes = {
  tabs: PropTypes.array.isRequired,
  isolateTab: PropTypes.bool,
  overrideClassName: PropTypes.string,
};

export default ProgramSettingsNavBar;
