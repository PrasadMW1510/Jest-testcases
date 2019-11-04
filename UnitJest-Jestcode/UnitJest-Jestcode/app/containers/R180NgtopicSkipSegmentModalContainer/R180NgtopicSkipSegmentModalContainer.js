/**
 *
 * R180NgtopicSkipSegmentModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';
import { R180NG_SKIP_SEGMENT_MODAL } from 'containers/ModalController/constants';
import R180NgtopicSkipSegmentModal from 'components/R180NgtopicSkipSegmentModal/R180NgtopicSkipSegmentModal';

export class R180NgtopicSkipSegmentModalContainer extends React.Component {
  handleNo = () => {
    // TODO Functionality
    this.props.hideModal(R180NG_SKIP_SEGMENT_MODAL);
    return false;
  };

  handleYes = () => {
    // TODO Functionality
    this.props.data.skipSegment();
    this.props.hideModal(R180NG_SKIP_SEGMENT_MODAL);
  };

  render() {
    return (
      <R180NgtopicSkipSegmentModal
        isOpen
        onNo={this.handleNo}
        onYes={this.handleYes}
        data={this.props.data}
      />
    );
  }
}

R180NgtopicSkipSegmentModalContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  data: PropTypes.any,
};

const withConnect = connect(null, { hideModal });

export default compose(withConnect)(R180NgtopicSkipSegmentModalContainer);
