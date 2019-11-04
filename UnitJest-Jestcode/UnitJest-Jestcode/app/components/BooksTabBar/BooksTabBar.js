import React from 'react';
import { NavLink } from 'react-router-dom';
import Tab from 'components/Tab';
import './BookTabBar.scss';

class BooksTabBar extends React.Component {
  render() {
    const props = {
      activeClassName: 'nav-bar__tab--active',
      component: NavLink,
    };
    return (
      <div className="tab-bar book-nav-bar">
        <div className="nav-bar__container book-nav-container">
          <Tab {...props} className="nav-bar__tab--expert" to="/books/expert">
            Reading Counts! Book Expert
          </Tab>
          <Tab {...props} className="nav-bar__tab--quiz" to="/books/quiz">
            Reading Counts! Quiz Manager
          </Tab>
        </div>
      </div>
    );
  }
}

export default BooksTabBar;
