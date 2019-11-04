/**
 *
 * QuickSearch
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as Constants from './constants';
import './QuickSearch.scss';

class QuickSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResultsIdsChecked: [],
      searchBy: Constants.SEARCH_TITLE,
      order: 'asc',
      term: '',
      itemsPerPage: Constants.DEFAULT_ITEMS_PER_PAGE,
      curPage: Constants.PAGE_ZERO,
      selectAll: false,
      quickSearch: '',
    };
  }

  handleChange = e => {
    const change = {};
    const targetVal = e.target.value;
    change[e.target.name] = e.target.value;
    this.props.onSearchtermChange(e.target.value);
    if (e.target.name === Constants.SEARCH_BY) {
      this.handleSearchByChange(targetVal);
    } else {
      this.setState({
        quickSearch: e.target.value,
      });
    }
  };

  handleSearchByChange = targetVal => {
    const stateSearchBy = this.state.searchBy;
    if (stateSearchBy !== targetVal) {
      this.setState(
        { term: '', searchBy: targetVal, searchResultsIdsChecked: [] },
        this.props.onResetSearchResults()
      );
    }
  };

  handleSearchClick = () => {
    const searchTerms = {};
    searchTerms.Term = this.state.searchBy;
    searchTerms.Order = this.state.order;

    const formTerms = {};
    formTerms.Title = this.state.searchBy === 'Title' ? this.props.searchTerm : '';
    formTerms.Author = this.state.searchBy === 'Author' ? this.props.searchTerm : '';

    const searchFilters = {};
    searchFilters.SortTerm = searchTerms;

    const searchSortTerms = {};
    searchSortTerms.SortTerms = searchFilters;
    searchSortTerms.BookInfo = formTerms;

    const rootElm = {};
    rootElm.SrcSearchReq = searchSortTerms;

    this.props.onSearch(rootElm);
    // location.href = '/#/books/quiz/results';
  };

  render() {
    return (
      <div className="quick-search__wrapper">
        <p className="quick-search-para">Quick Search</p>
        <span className="quick-search-span"> Search by:</span>
        <select
          className="quick-search__select"
          value={this.state.searchBy}
          name={Constants.SEARCH_BY}
          id={Constants.SEARCH_BY}
          onChange={this.handleChange}
        >
          <option value="Title">Title</option>
          <option value="Author">Author</option>
        </select>
        <div className="form-control">
          <input
            name="term"
            className="quick-search-input"
            id="term"
            type="text"
            onChange={this.handleChange}
            value={this.state.quickSearch}
          />
          <button className="quicksearch-search-btn" onClick={this.handleSearchClick}>
            GO
          </button>
        </div>
      </div>
    );
  }
}

QuickSearch.propTypes = {
  onResetSearchResults: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSearchtermChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
};

export default QuickSearch;
