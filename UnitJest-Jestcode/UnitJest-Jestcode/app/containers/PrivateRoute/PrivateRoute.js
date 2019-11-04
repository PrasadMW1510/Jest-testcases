/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import LoadingBar from 'components/LoadingBar';
import { makeSelectGlobal } from 'containers/App/selectors';

export const PrivateRoute = ({ component: Component, global, location, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (global.get('loginInProgress')) {
        // show a loading page while we wait
        return <LoadingBar />;
      } else if (global.get('currentUser')) {
        // if loaded and logged in, just show the component
        return <Component {...props} />;
      }

      // if no login is in progress and no user is logged in, redirect to login page
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      );
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  global: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  global: makeSelectGlobal(),
});

const withConnect = connect(mapStateToProps);

export default compose(withRouter, withConnect)(PrivateRoute);
