/**
 *
 * ErrorBoundary
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { generalFailure } from 'containers/App/actions';
import { GENERIC_ERROR_MSG } from './constants';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch() {
    this.props.generalFailure({ error: GENERIC_ERROR_MSG });
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError && this.props.fallbackComponent) {
      return this.props.fallbackComponent;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  generalFailure: PropTypes.func.isRequired,
  children: PropTypes.node,
  fallbackComponent: PropTypes.node,
};

const withConnect = connect(null, { generalFailure });

export default compose(withRouter, withConnect)(ErrorBoundary);
