/**
 *
 * ActivateQuizContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ActivateQuiz from 'components/ActivateQuiz';
import PopupModal from 'components/ActivateQuiz/PopupModal';

import injectSaga from 'utils/injectSaga';
import { clearSelectedCustomList } from 'containers/SearchResultsContainer/actions';
import makeSelectSearchResultsContainer from 'containers/SearchResultsContainer/selectors';
import { hideModal, showMessageLogModal } from 'containers/ModalController/actions';

import saga from './saga';

import { activateQuizRequest } from './actions';

export class ActivateQuizContainer extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.escFunc, false);
  }

  escFunc = event => {
    if (event.keyCode === 27) {
      this.props.hideModal();
    }
  };

  activateQuiz = () => {
    const { selectedItems } = this.props.searchResultsContainer;

    this.props.activateQuizRequest(selectedItems);

    if (selectedItems.length === 0) {
      this.props.activateQuizRequest(false);
      this.props.showMessageLogModal({
        payloadData: <PopupModal />,
      });
    }
  };
  render() {
    const { hideModal: hideModalProp } = this.props;

    return (
      <div>
        <ActivateQuiz
          isOpen
          handleCancel={hideModalProp}
          activateQuiz={this.activateQuiz}
          {...this.props}
        />
      </div>
    );
  }
}

ActivateQuizContainer.propTypes = {
  activateQuizRequest: PropTypes.func.isRequired,
  searchResultsContainer: PropTypes.object,
  hideModal: PropTypes.func,
  showMessageLogModal: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  searchResultsContainer: makeSelectSearchResultsContainer(),
});

const withConnect = connect(mapStateToProps, {
  hideModal,
  activateQuizRequest,
  showMessageLogModal,
  clearSelectedCustomList,
});

const withSaga = injectSaga({ key: 'activateQuizContainer', saga });

export default compose(withSaga, withConnect)(ActivateQuizContainer);
