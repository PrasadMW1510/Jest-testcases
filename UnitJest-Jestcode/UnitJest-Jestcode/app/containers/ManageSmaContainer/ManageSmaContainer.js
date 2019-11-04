/**
 *
 * ManageSmaContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getMediaServersRequest } from './actions';
import {
  makeSelectManageSmaContainer,
  makeSelectManageSmaContainerGetMediaServers,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import ManageSma from '../../components/ManageSma/ManageSma';

export class ManageSmaContainer extends React.Component {
  componentDidMount = () => {
    this.props.getMediaServersRequest();
  };

  render() {
    return <ManageSma mediaServers={this.props.mediaServers} />;
  }
}

ManageSmaContainer.defaultProps = {
  mediaServers: [],
};

ManageSmaContainer.propTypes = {
  getMediaServersRequest: PropTypes.func.isRequired,
  mediaServers: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manageSmaContainer: makeSelectManageSmaContainer(),
  mediaServers: makeSelectManageSmaContainerGetMediaServers(),
});

const withConnect = connect(mapStateToProps, {
  getMediaServersRequest,
});

const withReducer = injectReducer({ key: 'manageSmaContainer', reducer });
const withSaga = injectSaga({ key: 'manageSmaContainer', saga });

export default compose(withReducer, withSaga, withConnect)(ManageSmaContainer);
