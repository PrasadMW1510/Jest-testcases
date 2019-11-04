/**
 *
 * ExportTeacherMadeQuizzesContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ExportTeacherMadeQuizzes from 'components/ExportTeacherMadeQuizzes';

import { hideModal } from 'containers/ModalController/actions';
import makeSelectSearchResultsContainer from 'containers/SearchResultsContainer/selectors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectExportTeacherMadeQuizzesContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

import { exportTeacherMadeQuizRequest } from './actions';

export class ExportTeacherMadeQuizzesContainer extends React.Component {
  handleExportTeacherMadeQuiz = quizData => {
    this.props.exportTeacherMadeQuizRequest(quizData);
  };
  render() {
    const { openSuccessModal } = this.props.exportTeacherMadeQuizzesContainer;
    const { selectedItems } = this.props.searchResultsContainer;
    const {
      hideModal: hideModalProp, // Avoid dup declaration
    } = this.props;
    return (
      <ExportTeacherMadeQuizzes
        isOpen
        handleCancel={hideModalProp}
        onExportTeacherMadeQuiz={this.handleExportTeacherMadeQuiz}
        openSuccessModal={openSuccessModal}
        selectedItems={selectedItems}
        {...this.props}
      />
    );
  }
}

ExportTeacherMadeQuizzesContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  exportTeacherMadeQuizRequest: PropTypes.func.isRequired,
  exportTeacherMadeQuizzesContainer: PropTypes.object,
  searchResultsContainer: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  exportTeacherMadeQuizzesContainer: makeSelectExportTeacherMadeQuizzesContainer(),
  searchResultsContainer: makeSelectSearchResultsContainer(),
});

const withConnect = connect(mapStateToProps, { hideModal, exportTeacherMadeQuizRequest });

const withReducer = injectReducer({ key: 'exportTeacherMadeQuizzesContainer', reducer });
const withSaga = injectSaga({ key: 'exportTeacherMadeQuizzesContainer', saga });

export default compose(withReducer, withSaga, withConnect)(ExportTeacherMadeQuizzesContainer);
