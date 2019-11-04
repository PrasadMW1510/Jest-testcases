/**
 *
 * DeactivateQuizContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import DeactivateQuiz from 'components/DeactivateQuiz';
import injectSaga from 'utils/injectSaga';

import PopupModal from 'components/ActivateQuiz/PopupModal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import makeSelectSearchResultsContainer from 'containers/SearchResultsContainer/selectors';

import { getSearchedResults } from 'containers/BookQuizContainer/selectors';
import { hideModal, showMessageLogModal } from 'containers/ModalController/actions';
import { deactivateQuizRequest } from './actions';
import saga from './saga';

export class DeactivateQuizContainer extends React.Component {
  deactivateQuiz = () => {
    const { selectedItems } = this.props.searchResultsContainer;
    this.props.deactivateQuizRequest(selectedItems);

    if (selectedItems.length === 0) {
      this.props.deactivateQuizRequest(false);
      this.props.showMessageLogModal({
        payloadData: <PopupModal />,
      });
    }
  };
  render() {
    const { hideModal: hideModalProp } = this.props;

    return (
      <div>
        <DeactivateQuiz
          isOpen
          handleCancel={hideModalProp}
          deactivateQuiz={this.deactivateQuiz}
          {...this.props}
        />
      </div>
    );
  }
}

DeactivateQuizContainer.propTypes = {
  deactivateQuizRequest: PropTypes.func,
  hideModal: PropTypes.func,
  searchResultsContainer: PropTypes.object,
  showMessageLogModal: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  searchedBookResults: getSearchedResults(),
  searchResultsContainer: makeSelectSearchResultsContainer(),
});
const withConnect = connect(mapStateToProps, {
  hideModal,
  deactivateQuizRequest,
  showMessageLogModal,
});
const withSaga = injectSaga({ key: 'deactivateQuizContainer', saga });

export default compose(withSaga, withConnect)(DeactivateQuizContainer);
