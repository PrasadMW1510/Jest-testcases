/**
 *
 * PrintQuizAndAnswerKeyContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { hideModal, showMessageLogModal } from 'containers/ModalController/actions';
import PopupModal from 'components/PrintQuizAndAnswerKey/PopupModal';
import PrintQuizAndAnswerKey from 'components/PrintQuizAndAnswerKey';
import makeSelectPrintQuizAndAnswerKeyContainer from './selectors';
import saga from './saga';
import reducer from './reducer';
import { printQuizAndAnswerKeyRequest } from './actions';

export class PrintQuizAndAnswerKeyContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { showError } = nextProps.printquizandanswerkeycontainer;
    if (showError) {
      this.props.showMessageLogModal({
        payloadData: <PopupModal />,
      });
    }
  }
  handlePreview = opts => {
    this.props.printQuizAndAnswerKeyRequest(opts);
  };
  handleCancel = () => {
    this.props.hideModal();
  };
  render() {
    return (
      <PrintQuizAndAnswerKey
        isOpen
        handleCancel={this.handleCancel}
        onPreview={this.handlePreview}
        {...this.props}
      />
    );
  }
}

PrintQuizAndAnswerKeyContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  printQuizAndAnswerKeyRequest: PropTypes.func.isRequired,
  showMessageLogModal: PropTypes.func,
  printquizandanswerkeycontainer: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  printquizandanswerkeycontainer: makeSelectPrintQuizAndAnswerKeyContainer(),
});

const withConnect = connect(mapStateToProps, {
  hideModal,
  printQuizAndAnswerKeyRequest,
  showMessageLogModal,
});
const withReducer = injectReducer({ key: 'printQuizAndAnswerKeyContainer', reducer });
const withSaga = injectSaga({ key: 'printQuizAndAnswerKeyContainer', saga });

export default compose(withReducer, withSaga, withConnect)(PrintQuizAndAnswerKeyContainer);
