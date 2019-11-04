/**
 *
 * CustomListContainer
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  clearSelectedCustomList,
  makeSelectedbookresults,
} from 'containers/SearchResultsContainer/actions';
import CustomList from 'components/CustomList/CustomList';
import PrintCustomList from 'components/PrintCustomList';
import {
  showPrintQuizModal,
  showPrintBookLabelModal,
  showPrintQuizAndAnswerKeyModal,
  activateQuizModal,
  deactivateQuizModal,
  handleExportTeacherQuizModal,
  getSearchResultDetailsRequest,
} from 'containers/ModalController/actions';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import makeSelectSearchResultsContainer from 'containers/SearchResultsContainer/selectors';
import injectSaga from 'utils/injectSaga';
import saga from './saga';

import { exportCustomQuizRequest } from './actions';

export class CustomListContainer extends PureComponent {
  state = {
    noDataToExportHTML: false,
  };

  viewExportHTML = () => {
    const selectedItemData = this.props.searchResultsContainer.selectedItems;
    if (selectedItemData.length > 0) {
      const BookID = [];
      for (let i = 0; i < selectedItemData.length; i += 1) {
        BookID.push(selectedItemData[i].ID[0]);
      }

      const rootElm = {};
      const BookList = {};
      BookList.BookID = BookID;

      const Books = {};
      Books.BookList = BookList;
      Books.AllInstalledQuizzes = false;

      const ExportTitlesToHtmlReq = {};
      ExportTitlesToHtmlReq.Books = Books;

      rootElm.ExportTitlesToHtmlReq = ExportTitlesToHtmlReq;

      this.props.exportCustomQuizRequest(rootElm);
    } else {
      this.setState({
        noDataToExportHTML: true,
      });
    }
  };

  closeNoTitlesToPrintModal = () => {
    this.setState({
      noDataToExportHTML: false,
    });
  };

  handleTitleClick = () => {};

  render() {
    return (
      <div>
        <CustomList
          onTitleClick={this.props.handleTitleClick}
          searchresultsData={this.props.searchResultsContainer}
          clearCustomList={this.props.clearSelectedCustomList}
          makeSelectedbookresults={this.props.makeSelectedbookresults}
          searchResultDetailsRequest={this.props.getSearchResultDetailsRequest}
          noDataToExportHTML={this.state.noDataToExportHTML}
          closeNoTitlesToPrintModal={this.closeNoTitlesToPrintModal}
        />
        <PrintCustomList
          viewExportHTML={this.viewExportHTML}
          searchresultsData={this.props.searchResultsContainer}
          {...this.props}
        />
      </div>
    );
  }
}

CustomListContainer.propTypes = {
  clearSelectedCustomList: PropTypes.func,
  makeSelectedbookresults: PropTypes.func,
  handleTitleClick: PropTypes.func,
  exportCustomQuizRequest: PropTypes.func,
  getSearchResultDetailsRequest: PropTypes.func,
  searchResultsContainer: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  searchResultsContainer: makeSelectSearchResultsContainer(),
});

const withConnect = connect(mapStateToProps, {
  showPrintQuizModal,
  showPrintBookLabelModal,
  showPrintQuizAndAnswerKeyModal,
  clearSelectedCustomList,
  makeSelectedbookresults,
  exportCustomQuizRequest,
  activateQuizModal,
  deactivateQuizModal,
  handleExportTeacherQuizModal,
  getSearchResultDetailsRequest,
});

const withSaga = injectSaga({ key: 'customListContainer', saga });

export default compose(withSaga, withConnect)(CustomListContainer);
