/**
 *
 * AboutSamLinkModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';
import AboutSamLinkModal from 'components/AboutSamLinkModal/AboutSamLinkModal';

export function AboutSamLinkModalContainer(props) {
  const handleOk = e => {
    e.preventDefault();
    props.hideModal();
  };
  return <AboutSamLinkModal isOpen onOk={handleOk} item={props.data.item} />;
}

AboutSamLinkModalContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  data: PropTypes.object,
};

const withConnect = connect(null, { hideModal });

export default compose(withConnect)(AboutSamLinkModalContainer);
