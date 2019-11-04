/**
 *
 * NoItemsSelectedModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hideModal } from 'containers/ModalController/actions';
import NoItemsSelectedModal from 'components/NoItemsSelectedModal';

export function NoItemsSelectedModalContainer(props) {
  const handleOK = e => {
    e.preventDefault();
    props.hideModal();
  };

  return <NoItemsSelectedModal isOpen data={props.data} onOK={handleOK} />;
}

NoItemsSelectedModalContainer.propTypes = {
  data: PropTypes.object,
  hideModal: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps, { hideModal });

export default compose(withConnect)(NoItemsSelectedModalContainer);
