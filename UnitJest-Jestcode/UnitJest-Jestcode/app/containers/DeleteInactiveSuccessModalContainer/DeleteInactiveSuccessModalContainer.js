/**
 *
 * DeleteInactiveSuccessModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hideModal } from 'containers/ModalController/actions';
import { getInactiveCohortMembersRequest } from 'containers/ManageInactiveAccountsContainer/actions';
import DeleteInactiveSuccessModal from 'components/DeleteInactiveSuccessModal';

export function DeleteInactiveSuccessModalContainer(props) {
  const handleYes = e => {
    e.preventDefault();
    props.hideModal();
    props.hideModal();
    props.getInactiveCohortMembersRequest(props.data.searchOpts);
  };

  return <DeleteInactiveSuccessModal isOpen data={props.data} onYes={handleYes} />;
}

DeleteInactiveSuccessModalContainer.propTypes = {
  data: PropTypes.object,
  hideModal: PropTypes.func.isRequired,
  getInactiveCohortMembersRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps, { hideModal, getInactiveCohortMembersRequest });

export default compose(withConnect)(DeleteInactiveSuccessModalContainer);
