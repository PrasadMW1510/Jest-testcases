/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import HomePage from 'containers/HomePage/Loadable';
import RosterPage from 'containers/RosterPage/Loadable';
import ReportsPage from 'containers/ReportsPage/Loadable';
import ResourcesPage from 'containers/ResourcesPage/Loadable';
import BooksPage from 'containers/BooksPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ErrorBoundary from 'containers/ErrorBoundary';
import SmartBarContainer from 'containers/SmartBarContainer';
import PortfolioPage from 'containers/PortfolioPageContainer/Loadable';

import SAMContainer from 'components/SAMContainer';
import Header from 'components/Header';
import TabBar from 'components/TabBar';
import SAMBodyContainer from 'containers/SAMBodyContainer';

const App = props => {
  const pathname = props.location.pathname;
  return (
    <ErrorBoundary>
      <SAMContainer>
        <Header />
        {pathname.indexOf('portfolio') === -1 && <TabBar />}
        <SAMBodyContainer>
          <SmartBarContainer />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/roster" component={RosterPage} />
            <Route exact path="/reports" component={ReportsPage} />
            <Route exact path="/resources" component={ResourcesPage} />
            <Route path="/books" component={BooksPage} />
            <Route path="/portfolio" component={PortfolioPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </SAMBodyContainer>
      </SAMContainer>
    </ErrorBoundary>
  );
};

App.propTypes = {
  location: PropTypes.object.isRequired,
};

export default App;
