/**
 *
 * R180NgTopicManagerSkipModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';
import { R180NG_TOPICS_SKIP_MODAL } from 'containers/ModalController/constants';
import R180NgTopicManagerSkipModal from 'components/R180NgTopicManagerSkipModal/R180NgTopicManagerSkipModal';

export class R180NgTopicManagerSkipModalContainer extends React.Component {
  handleNo = () => {
    this.props.hideModal(R180NG_TOPICS_SKIP_MODAL);
    return false;
  };

  handleYes = () => {
    this.props.data.skipTopic();
    this.props.hideModal(R180NG_TOPICS_SKIP_MODAL);
  };

  render() {
    return (
      <R180NgTopicManagerSkipModal
        isOpen
        onNo={this.handleNo}
        onYes={this.handleYes}
        data={this.props.data}
      />
    );
  }
}

R180NgTopicManagerSkipModalContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  data: PropTypes.any,
};

const withConnect = connect(null, { hideModal });

export default compose(withConnect)(R180NgTopicManagerSkipModalContainer);
