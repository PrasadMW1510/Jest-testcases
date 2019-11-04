/**
 *
 * LoadingController
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import LoadingModal from 'components/LoadingModal';
import injectReducer from 'utils/injectReducer';
import makeSelectLoadingController from './selectors';
import reducer from './reducer';

export function LoadingController(props) {
  if (props.loadingController.get('loadingOpen')) {
    return <LoadingModal isOpen />;
  }

  return null;
}

LoadingController.propTypes = {
  loadingController: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loadingController: makeSelectLoadingController(),
});

const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({ key: 'loadingController', reducer });

export default compose(withReducer, withConnect)(LoadingController);
