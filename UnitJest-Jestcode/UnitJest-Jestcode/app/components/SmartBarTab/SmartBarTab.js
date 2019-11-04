/**
 *
 * SmartBarTab
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SmartBarTab.scss';

class SmartBarTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.defaultChecked,
      initialForName: this.props.forName,
      showHighlight: true, // redux selection
    };
  }

  // Display cohort based on the value received.
  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultChecked) {
      this.setState({
        checked: true,
      });
    } else {
      this.setState({
        checked: false,
      });
    }
    if (nextProps.selectedItemId !== '') {
      this.props.smartbarSelectedUpdateData();
    }
  }

  getClassName = (i, selectedItemId) => {
    if (selectedItemId === i.id && this.state.showHighlight && this.props.isTabActive) {
      return 'tab__list-item tab__list-item--highlighted';
    } else if (selectedItemId === i.id) {
      return 'tab__list-item tab__list-item--selected';
    }

    return 'tab__list-item';
  };

  getRootClassName = () => {
    const rootClasses = ['tabs__tab'];
    const maxItems = 20;
    // The default itemCount is 1 because even if there's no items, placeholder text is inserted.
    const itemsCount = (this.props.items && Math.min(maxItems, this.props.items.length)) || 1;
    // Add class for an open smartbar tab
    if (this.state.checked) {
      rootClasses.push('tabs__tab--active');
    }
    // Add class that reflects how many items are in the list gets added (for example `tabs__tab--has-items-3`)
    if (this.props.items && this.props.items.length > 0 && this.props.items.length <= maxItems) {
      rootClasses.push(`tabs__tab--has-items-${itemsCount}`);
    }
    // Add class for case where a label is inserted as an item
    if (this.props.items && !this.props.items.length) {
      rootClasses.push(`tabs__tab--has-items-1`);
    }
    // Add a class for open lists with lots of items (more than max)
    if (this.state.checked && this.props.items && this.props.items.length > maxItems) {
      rootClasses.push('tabs__tab--has-many-items');
    }
    return rootClasses.join(' ');
  };

  handleChange = () => {
    this.setState(prevState => ({
      checked: !prevState.checked,
    }));
  };

  handleItemClick = id => {
    this.props.onItemClick(id);

    if (id === this.props.selectedItemId) {
      this.setState({
        showHighlight: true,
      });
    } else {
      this.setState({
        showHighlight: false,
      });
    }
  };

  renderItems = (items, onItemClick, selectedItemId) => {
    if (items.length === 0) {
      return (
        <li className="tab__list-item">
          <div className="tab__list-text">(No Items)</div>
        </li>
      );
    }

    return items.map(i => (
      <li key={i.id} className={this.getClassName(i, selectedItemId)}>
        <div
          className="tab__list-button"
          role="button"
          tabIndex="-1"
          onClick={() => {
            this.handleItemClick(i.id);
          }}
        >
          {' '}
          {i.text}
        </div>
      </li>
    ));
  };

  renderBody = () => {
    // if there are no items retrieved yet, only show the cohort label
    if (!this.props.items) {
      return (
        <label className="tab__label" htmlFor={this.props.title}>
          {this.props.title}
        </label>
      );
    }

    return (
      <React.Fragment>
        <label className="tab__label" htmlFor={this.props.title}>
          {this.props.title}
        </label>
        {this.props.forName && (
          <label className="tab__for-label" htmlFor={this.props.title}>{`for ${
            this.props.forName
          }`}</label>
        )}
        <div className="tab__content">
          <ul className="tab__list">
            {this.renderItems(this.props.items, this.props.onItemClick, this.props.selectedItemId)}
          </ul>
        </div>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className={this.getRootClassName()}>
        <input
          className="tab__input"
          id={this.props.title}
          type="checkbox"
          name="tabs2"
          disabled={!this.props.items}
          onChange={this.handleChange}
          checked={this.state.checked}
        />
        {this.renderBody()}
      </div>
    );
  }
}

SmartBarTab.propTypes = {
  title: PropTypes.string.isRequired,
  forName: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  defaultChecked: PropTypes.bool,
  onItemClick: PropTypes.func.isRequired,
  selectedItemId: PropTypes.string,
  // The active smartbar tab is the last one to receive a double-click
  isTabActive: PropTypes.bool.isRequired,
  smartbarSelectedUpdateData: PropTypes.func.isRequired,
};

SmartBarTab.defaultProps = {
  defaultChecked: false,
  isTabActive: false,
};

export default SmartBarTab;
