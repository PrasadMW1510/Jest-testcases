/**
 *
 * SearchResultsContainer
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import SearchResults from 'components/SearchResults';
import { fromJS } from 'immutable';
import { makeSelectGlobalBookResultData } from 'containers/AdvancedSearchContainer/selectors';
import {
  showMessageLogModal,
  getSearchResultDetailsRequest,
} from 'containers/ModalController/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSearchResultsContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getAllTeacherMadeQuizDataRequest,
  getCollectionsNameRequest,
  getChangeCollectionResultsRequest,
  postSaveRequest,
  makeSelectedbookresults,
  clearSelectedCustomList,
} from './actions';

export class SearchResultsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      selectedIds: [],
    };
    this.handleSortResultsOnClick = this.handleSortResultsOnClick.bind(this);
  }
  componentDidMount() {
    if (this.props.global === '0') {
      this.props.showMessageLogModal({
        payloadData: 'Please enter a search term to view the information on this tab.',
      });
      this.props.clearSelectedCustomList();
      this.props.history.push('/books/quiz/advanced');
    }

    this.props.getAllTeacherMadeQuizDataRequest();
    this.props.getCollectionsNameRequest();
    this.props.getChangeCollectionResultsRequest();
  }

  handleResultMessageModal = e => {
    this.props.showMessageLogModal(e);
  };

  handlePageClick = searchTerm => {
    const rootElm = this.props.searchResultsContainer.searchOpts;
    rootElm.SrcSearchReq.SortTerms.curPage = searchTerm;
    this.props.getAllTeacherMadeQuizDataRequest(rootElm);
  };

  handleChange = collectionOpts => {
    const rootElm = this.props.searchResultsContainer.searchOpts;

    if (rootElm.SrcSearchReq) {
      rootElm.SrcSearchReq.Collection = collectionOpts;
    } else {
      const searchTerms = {};
      searchTerms.Term = 'Title';
      searchTerms.Order = 'asc';

      const formTerms = {};
      formTerms.Title = '';
      formTerms.Author = '';

      const searchFilters = {};
      searchFilters.SortTerm = searchTerms;

      const searchSortTerms = {};
      searchSortTerms.SortTerms = searchFilters;
      searchSortTerms.BookInfo = formTerms;
      searchSortTerms.Collection = collectionOpts;

      rootElm.SrcSearchReq = searchSortTerms;
    }

    this.props.getChangeCollectionResultsRequest(rootElm);
    this.props.getAllTeacherMadeQuizDataRequest(rootElm);
  };

  handleSaveOnClick = () => {
    this.props.history.push('/books/quiz/custom');
  };

  handleSelectedItems = (bookItems, selIds) => {
    this.state.selectedItems = bookItems;
    this.state.selectedIds = selIds;
  };

  handleSortResultsOnClick = sortState => {
    const rootElm = this.props.searchResultsContainer.searchOpts;
    rootElm.SrcSearchReq.SortTerms.SortTerm.Term = sortState.id;
    rootElm.SrcSearchReq.SortTerms.SortTerm.curPage = sortState.curPage;
    if (sortState.desc) {
      rootElm.SrcSearchReq.SortTerms.SortTerm.Order = 'desc';
    } else {
      rootElm.SrcSearchReq.SortTerms.SortTerm.Order = 'asc';
    }
    this.props.getAllTeacherMadeQuizDataRequest(rootElm);
    this.forceUpdate();
  };

  render() {
    if (
      this.props.searchResultsContainer.collectionName[0] &&
      this.props.searchResultsContainer.collectionName[0].Name[0] === ''
    ) {
      this.props.searchResultsContainer.collectionName[0].Name[0] = 'All Collections';
    }
    return (
      <div>
        <SearchResults
          onSearch={this.handlePageClick}
          handleSaveOnClick={this.handleSaveOnClick}
          handleSelectedItems={this.handleSelectedItems}
          onCollectionsChange={this.handleChange}
          collectionsList={this.props.searchResultsContainer.collectionName}
          searchResults={this.props.searchResultsContainer.searchResults}
          searchOpts={this.props.searchResultsContainer.searchOpts}
          searchResultDetailsRequest={this.props.getSearchResultDetailsRequest}
          getselectedbookresults={this.props.makeSelectedbookresults}
          searchResultsContainersearchResultsIdsChecked={
            this.props.searchResultsContainer.searchResultsIdsChecked || []
          }
          searchResultsContainerselectedrows={this.props.searchResultsContainer.selectedItems}
          handleSortResultsOnClick={columnHeader => this.handleSortResultsOnClick(columnHeader)}
        />
      </div>
    );
  }
}

SearchResultsContainer.defaultProps = {
  searchResultsContainer: fromJS({}),
};

SearchResultsContainer.propTypes = {
  searchResultsContainer: PropTypes.object,
  getAllTeacherMadeQuizDataRequest: PropTypes.func.isRequired,
  getCollectionsNameRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  getChangeCollectionResultsRequest: PropTypes.func.isRequired,
  makeSelectedbookresults: PropTypes.func.isRequired,
  showMessageLogModal: PropTypes.func.isRequired,
  global: PropTypes.string,
  getSearchResultDetailsRequest: PropTypes.func.isRequired,
  clearSelectedCustomList: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  searchResultsContainer: makeSelectSearchResultsContainer(),
  global: makeSelectGlobalBookResultData(),
});

const withConnect = connect(mapStateToProps, {
  getAllTeacherMadeQuizDataRequest,
  getCollectionsNameRequest,
  getChangeCollectionResultsRequest,
  postSaveRequest,
  makeSelectedbookresults,
  showMessageLogModal,
  getSearchResultDetailsRequest,
  clearSelectedCustomList,
});

const withReducer = injectReducer({ key: 'searchResultsContainer', reducer });
const withSaga = injectSaga({ key: 'searchResultsContainer', saga });

export default compose(withReducer, withSaga, withConnect)(SearchResultsContainer);
