/**
 *
 * MessageContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { fromJS } from 'immutable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { showMessageLogModal } from 'containers/ModalController/actions';
import { makeSelectProgramAvailableData } from 'containers/App/selectors';
import makeSelectMessageContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getMessageRequest, postDeleteRequest } from './actions';

import MessageLog from '../../components/MessageLog';

export class MessageContainer extends React.Component {
  componentDidMount() {
    this.props.getMessageRequest();
  }

  getMessageContainer = () => this.props.messageContainer.toJS();

  getProgramsAvailable = () => this.props.programsAvailable.map(item => item.get('$')).toJS();

  handleDeleteOnClick = messageIdsChecked => {
    this.props.postDeleteRequest(messageIdsChecked);
  };

  handleShowMeClick = data => {
    this.props.showMessageLogModal(data);
  };

  render() {
    return (
      <MessageLog
        messages={this.getMessageContainer().messages}
        handleDeleteOnClick={this.handleDeleteOnClick}
        onShowMeClick={this.handleShowMeClick}
        productsAvailable={this.getProgramsAvailable()}
      />
    );
  }
}

MessageContainer.defaultProps = {
  messageContainer: fromJS({}),
  programsAvailable: fromJS({}),
};

MessageContainer.propTypes = {
  messageContainer: PropTypes.object,
  programsAvailable: PropTypes.object,
  getMessageRequest: PropTypes.func.isRequired,
  postDeleteRequest: PropTypes.func.isRequired,
  showMessageLogModal: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  messageContainer: makeSelectMessageContainer(),
  programsAvailable: makeSelectProgramAvailableData(),
});

const withConnect = connect(mapStateToProps, {
  getMessageRequest,
  postDeleteRequest,
  showMessageLogModal,
});

const withReducer = injectReducer({ key: 'messageContainer', reducer });
const withSaga = injectSaga({ key: 'messageContainer', saga });

export default compose(withReducer, withSaga, withConnect)(MessageContainer);
