/**
 *
 * ClearRosterModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';
import ClearRosterModal from 'components/ClearRosterModal';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { deactivateAllClassesRequest } from './actions';
import reducer from './reducer';
import saga from './saga';

export class ClearRosterModalContainer extends React.Component {
  handleNo = e => {
    e.preventDefault();
    this.props.hideModal();
  };
  handleYes = e => {
    e.preventDefault();
    this.props.deactivateAllClassesRequest();
  };

  render() {
    return <ClearRosterModal isOpen onYes={this.handleYes} onNo={this.handleNo} />;
  }
}

ClearRosterModalContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  deactivateAllClassesRequest: PropTypes.func.isRequired,
};

const withConnect = connect(null, { hideModal, deactivateAllClassesRequest });
const withSaga = injectSaga({ key: 'clearRosterModalContainer', saga });
const withReducer = injectReducer({ key: 'clearRosterModalContainer', reducer });

export default compose(withReducer, withSaga, withConnect)(ClearRosterModalContainer);
