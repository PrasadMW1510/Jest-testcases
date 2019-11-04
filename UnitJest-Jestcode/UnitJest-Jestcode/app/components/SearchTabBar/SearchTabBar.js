import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Tab from '../Tab/index';
import './SearchTabBar.scss';

class SearchTabBar extends React.Component {
  render() {
    const props = {
      activeClassName: 'tab-bar__tab--active',
      component: NavLink,
    };
    return (
      <div className="tab-bar search-tab-bar">
        <div className="tab-bar__container search-tab-container">
          <Tab {...props} className="tab-bar__tab--adv-search" to="/books/quiz/advanced">
            Advanced Search
          </Tab>
          <Tab
            {...props}
            className="tab-bar__tab--results"
            to="/books/quiz/results"
            onClick={this.props.checkSearch}
          >
            Search Results
          </Tab>
          <Tab {...props} className="tab-bar__tab--custom" to="/books/quiz/custom">
            Custom List
          </Tab>
        </div>
      </div>
    );
  }
}

SearchTabBar.propTypes = {
  checkSearch: PropTypes.func,
};

export default SearchTabBar;
