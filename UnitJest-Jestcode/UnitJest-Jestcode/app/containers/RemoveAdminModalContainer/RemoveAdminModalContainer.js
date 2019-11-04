/**
 *
 * RemoveAdminModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import RemoveAdminModal from 'components/RemoveAdminModal';
import { hideModal } from 'containers/ModalController/actions';
import saga from './saga';

import { disableAdminRequest } from './actions';

export class RemoveAdminModalContainer extends React.Component {
  handleNo = e => {
    e.preventDefault();
    this.props.hideModal();
  };
  handleYes = e => {
    e.preventDefault();
    this.props.disableAdminRequest(this.props.data.adminId);
  };

  render() {
    return (
      <div>
        <RemoveAdminModal isOpen onYes={this.handleYes} onNo={this.handleNo} />;
      </div>
    );
  }
}

RemoveAdminModalContainer.propTypes = {
  data: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  disableAdminRequest: PropTypes.func.isRequired,
};

const withConnect = connect(null, { hideModal, disableAdminRequest });
const withSaga = injectSaga({ key: 'removeModalContainer', saga });

export default compose(withConnect, withSaga)(RemoveAdminModalContainer);
