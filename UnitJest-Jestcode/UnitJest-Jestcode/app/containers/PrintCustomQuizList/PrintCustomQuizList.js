/**
 *
 * PrintCustomQuizList
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import PrintCustomQuiz from 'components/PrintCustomQuiz';
import PropTypes from 'prop-types';
import { printCustomQuizRequest } from './actions';
import makeSelectPrintCustomQuizList from './selectors';
import reducer from './reducer';
import saga from './saga';

export class PrintCustomQuizList extends React.Component {
  handlePreview = (opts, quizId) => {
    this.props.printCustomQuizRequest(opts, quizId);
  };

  render() {
    const {
      hideModal: hideModalProp, // Avoid dup declaration
    } = this.props;

    return (
      <PrintCustomQuiz
        isOpen
        handleCancel={hideModalProp}
        onPreview={this.handlePreview}
        {...this.props}
      />
    );
  }
}

PrintCustomQuizList.propTypes = {
  hideModal: PropTypes.func.isRequired,
  printCustomQuizRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  printcustomquizlist: makeSelectPrintCustomQuizList(),
});

const withConnect = connect(mapStateToProps, { hideModal, printCustomQuizRequest });

const withReducer = injectReducer({ key: 'printCustomQuizList', reducer });
const withSaga = injectSaga({ key: 'printCustomQuizList', saga });
export default compose(withReducer, withSaga, withConnect)(PrintCustomQuizList);
