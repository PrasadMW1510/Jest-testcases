import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BooksPaginator from 'components/BooksPaginator';
import CollectionsList from 'components/CollectionsList';
import {
  UNINITIALIZED_ITEM_COUNT,
  ALL_PRODUCT_FILTER,
} from 'containers/SearchResultsContainer/constants';
import myDisk from 'images/disk.png';
import myNoDisk from 'images/no-disk.png';
import * as Constants from './constants';
import ResultsTable from './ResultsTable';
import './SearchResults.scss';

class SearchResults extends React.Component {
  state = {
    searchBy: 'Title',
    searchResultsIdsChecked: [],
    selectedrows: [],
    selectAll: false,
    itemsPerPage: Constants.DEFAULT_ITEMS_PER_PAGE,
    curPage: Constants.PAGE_ZERO,
    productFilter: ALL_PRODUCT_FILTER,
    searchFilterInfo: '',
    pageNav: false,
    hoverResults: false,
  };

  getDataArrayIndex = (resultSet, dataID) => {
    let matchingID = -1;
    resultSet.map((item, i) => (item[0] === dataID[0] ? (matchingID = i) : -1));
    return matchingID;
  };

  getSelecedDataArrayIndex = (resultSet, dataID) => {
    let matchingID = -1;
    resultSet.map((item, i) => (item[0] === dataID[0] ? (matchingID = i) : -1));
    return matchingID;
  };

  handleRowCheckboxOnChange = (isChecked, itemId) => {
    this.setState(previousState => {
      const searchResultsIdsChecked = previousState.searchResultsIdsChecked;

      if (isChecked) {
        searchResultsIdsChecked.push(itemId);
      } else {
        const Index = searchResultsIdsChecked.findIndex(element => element === itemId);
        searchResultsIdsChecked.splice(Index, 1);
      }
      return { searchResultsIdsChecked };
    });
  };
  handleRowSelections = (isChecked, itemId, row) => {
    const searchResultsContainerselectedrows = this.props.searchResultsContainerselectedrows;
    const searchResultsIdsChecked = this.props.searchResultsContainersearchResultsIdsChecked;
    const Index = this.getSelecedDataArrayIndex(searchResultsIdsChecked, itemId);
    if (Index === -1) {
      searchResultsContainerselectedrows.push(row);
      searchResultsIdsChecked.push(itemId);
    } else {
      searchResultsContainerselectedrows.splice(Index, 1);
      const IndexIdsChecked = this.getDataArrayIndex(searchResultsIdsChecked, itemId);
      searchResultsIdsChecked.splice(IndexIdsChecked, 1);
    }
    this.props.getselectedbookresults(searchResultsContainerselectedrows, searchResultsIdsChecked);
    this.forceUpdate();
  };
  handleselectedRow = (selRows, selIDs) => {
    this.props.handleSelectedItems(selRows, selIDs);
  };
  toggleAllCheckboxes = (isChecked, itemIds, selectedRows) => {
    this.setState({
      searchResultsIdsChecked: itemIds,
      selectAll: isChecked,
    });

    const searchResultsContainerselectedrows = this.props.searchResultsContainerselectedrows;
    const searchResultsIdsChecked = this.props.searchResultsContainersearchResultsIdsChecked;
    let i = 0;
    if (isChecked === true) {
      for (i = 0; i < selectedRows.length; i += 1) {
        const Index = this.getSelecedDataArrayIndex(searchResultsIdsChecked, selectedRows[i].ID);
        if (Index === -1) {
          searchResultsContainerselectedrows.push(selectedRows[i]);
          searchResultsIdsChecked.push(selectedRows[i].ID);
        }
      }
    }
    if (isChecked === false) {
      for (i = 0; i < selectedRows.length; i += 1) {
        const Index = this.getSelecedDataArrayIndex(searchResultsIdsChecked, selectedRows[i].ID);
        if (Index > -1) {
          searchResultsContainerselectedrows.splice(Index, 1);
          searchResultsIdsChecked.splice(Index, 1);
        }
      }
    }

    if (itemIds.length > 0) {
      this.props.getselectedbookresults(
        searchResultsContainerselectedrows,
        searchResultsIdsChecked
      );
    } else {
      this.props.getselectedbookresults(
        searchResultsContainerselectedrows,
        searchResultsIdsChecked
      );
    }

    this.forceUpdate();
  };

  createSearchFilters = resetCurPage => {
    this.setState({ selectAll: false });

    const searchTerms = {};
    searchTerms.Term = this.state.searchBy;
    searchTerms.Order = this.state.order;

    const formTerms = {};
    formTerms.Title = this.state.searchBy === 'Title' ? this.state.term : '';
    formTerms.Author = this.state.searchBy === 'Author' ? this.state.term : '';

    const searchFilters = {};
    searchFilters.SortTerm = searchTerms;
    searchFilters.curPage = resetCurPage ? Constants.PAGE_ZERO : this.state.curPage;
    searchFilters.searchBy = this.state.searchBy;

    const searchSortTerms = {};
    searchSortTerms.SortTerms = searchFilters;
    searchSortTerms.BookInfo = formTerms;

    return searchSortTerms;
  };

  handlePaginateSearch = pageNum => {
    let i = pageNum;
    this.setState({ pageNav: true });
    i = Math.min(Math.max(0, i), this.props.searchResults.paginationData.page_count[0] - 1);
    this.setState({ curPage: i }, this.handlePaginatedSearchClick);
    this.setState({ selectAll: false });
  };

  handlePaginatedSearchClick = () => {
    const curPage = this.state.curPage;

    this.props.onSearch(curPage);
  };

  // Items count
  handleSaveTableRow = e => {
    e.preventDefault();
    if (this.state.searchResultsIdsChecked.length > 0) {
      this.props.handleSaveOnClick(this.state.searchResultsIdsChecked);
    }
  };

  searchResultDetailsRequest = (rowData, page) => {
    this.props.searchResultDetailsRequest(rowData, page, this.state.searchResultsIdsChecked.length);
  };

  showAwards() {
    const showAwardsList = [];
    if (
      this.props.searchOpts !== undefined &&
      this.props.searchOpts.SrcSearchReq !== undefined &&
      this.props.searchOpts.SrcSearchReq.Awards[0]
    ) {
      const awardsList = this.props.searchOpts.SrcSearchReq.Awards[0];
      awardsList.forEach(item => {
        showAwardsList.push(item.Award.replace(/_/g, ' '));
      });
    }
    return showAwardsList.join(', ');
  }

  showComprehensionSkills() {
    const showComprehensionSkillsList = [];
    if (
      this.props.searchOpts !== undefined &&
      this.props.searchOpts.SrcSearchReq !== undefined &&
      this.props.searchOpts.SrcSearchReq.ComprehensionSkills[0]
    ) {
      const comprehensionSkillsList = this.props.searchOpts.SrcSearchReq.ComprehensionSkills[0];
      comprehensionSkillsList.forEach(item => {
        showComprehensionSkillsList.push(item.ComprehensionSkill.replace(/_/g, ' '));
      });
    }

    return showComprehensionSkillsList.join(', ');
  }

  showCultures() {
    const showCulturesList = [];
    if (
      this.props.searchOpts !== undefined &&
      this.props.searchOpts.SrcSearchReq !== undefined &&
      this.props.searchOpts.SrcSearchReq.Cultures[0]
    ) {
      const cultures = this.props.searchOpts.SrcSearchReq.Cultures[0];
      cultures.forEach(item => {
        showCulturesList.push(item.Culture.replace(/_/g, ' '));
      });
    }
    return showCulturesList.join(', ');
  }

  showGenres() {
    const showGenresList = [];
    if (
      this.props.searchOpts !== undefined &&
      this.props.searchOpts.SrcSearchReq !== undefined &&
      this.props.searchOpts.SrcSearchReq.Genres[0]
    ) {
      const genres = this.props.searchOpts.SrcSearchReq.Genres[0];
      genres.forEach(item => {
        showGenresList.push(item.Genre.replace(/_/g, ' '));
      });
    }
    return showGenresList.join(', ');
  }

  showInterestLevels() {
    const showInterestLevelsList = [];
    if (
      this.props.searchOpts !== undefined &&
      this.props.searchOpts.SrcSearchReq !== undefined &&
      this.props.searchOpts.SrcSearchReq.InterestLevels[0]
    ) {
      const interestLevels = this.props.searchOpts.SrcSearchReq.InterestLevels[0];
      interestLevels.forEach(item => {
        showInterestLevelsList.push(item.InterestLevel.replace(/_/g, ' '));
      });
    }
    return showInterestLevelsList.join(', ');
  }

  showPrograms() {
    const showProgramsList = [];
    if (
      this.props.searchOpts !== undefined &&
      this.props.searchOpts.SrcSearchReq !== undefined &&
      this.props.searchOpts.SrcSearchReq.Programs[0]
    ) {
      const programs = this.props.searchOpts.SrcSearchReq.Programs[0];
      programs.forEach(item => {
        showProgramsList.push(item.Program.replace(/_/g, ' '));
      });
    }
    return showProgramsList.join(', ');
  }

  showThemes() {
    const showThemesList = [];
    if (
      this.props.searchOpts !== undefined &&
      this.props.searchOpts.SrcSearchReq !== undefined &&
      this.props.searchOpts.SrcSearchReq.Themes[0]
    ) {
      const themes = this.props.searchOpts.SrcSearchReq.Themes[0];
      themes.forEach(item => {
        showThemesList.push(item.Theme.replace(/_/g, ' '));
      });
    }
    return showThemesList.join(', ');
  }

  showTopics() {
    const showTopicsList = [];
    if (
      this.props.searchOpts !== undefined &&
      this.props.searchOpts.SrcSearchReq !== undefined &&
      this.props.searchOpts.SrcSearchReq.Topics[0]
    ) {
      const topics = this.props.searchOpts.SrcSearchReq.Topics[0];
      topics.forEach(item => {
        showTopicsList.push(item.Topic.replace(/_/g, ' '));
      });
    }
    return showTopicsList.join(', ');
  }

  resultSelectAll = () => {
    const searchResultsIdsChecked = this.props.searchResultsContainersearchResultsIdsChecked;
    if (
      this.props.searchResults.results !== undefined &&
      this.props.searchResults.results.length > 0
    ) {
      let j = 0;
      let selectCount = 0;
      for (j = 0; j < this.props.searchResults.results.length; j += 1) {
        const Index = this.getSelecedDataArrayIndex(
          searchResultsIdsChecked,
          this.props.searchResults.results[j].ID
        );
        if (Index > -1) {
          selectCount += 1;
        }
      }
      if (this.props.searchResults.results.length === selectCount) {
        return true;
      }
    }
    return false;
  };

  handleSortResultsClick = sortState => {
    this.props.handleSortResultsOnClick(sortState);
    this.forceUpdate();
  };

  truncateSearchResults = () => (
    <p className="search-results__content" ref={node => (this.searchResultsReq = node)}>
      <span className="search-results__content-results">Results for Quiz Manager Search on:</span>
      {this.props.searchOpts !== undefined &&
        this.props.searchOpts.SrcSearchReq !== undefined &&
        this.props.searchOpts.SrcSearchReq.BookInfo.Title && (
          <span className="search-results__content--title">
            (Title) {this.props.searchOpts.SrcSearchReq.BookInfo.Title}
            <span>; </span>
          </span>
        )}
      {this.props.searchOpts !== undefined &&
        this.props.searchOpts.SrcSearchReq !== undefined &&
        this.props.searchOpts.SrcSearchReq.BookInfo.Type && (
          <span className="search-results__content--title">
            (Book Type) {this.props.searchOpts.SrcSearchReq.BookInfo.Type}
            <span>; </span>
          </span>
        )}
      {this.props.searchOpts !== undefined &&
        this.props.searchOpts.SrcSearchReq !== undefined &&
        this.props.searchOpts.SrcSearchReq.BookInfo.Language && (
          <span className="search-results__content--title">
            (Language) {this.props.searchOpts.SrcSearchReq.BookInfo.Language}
            <span>; </span>
          </span>
        )}
      {this.props.searchOpts !== undefined &&
        this.props.searchOpts.SrcSearchReq !== undefined &&
        this.props.searchOpts.SrcSearchReq.BookInfo.Accessibility && (
          <span className="search-results__content--title">
            (Accessibility) {this.props.searchOpts.SrcSearchReq.BookInfo.Accessibility}
            <span>; </span>
          </span>
        )}
      {this.props.searchOpts !== undefined &&
        this.props.searchOpts.SrcSearchReq !== undefined &&
        this.props.searchOpts.SrcSearchReq.BookInfo.Author && (
          <span className="search-results__content--title">
            (Author) {this.props.searchOpts.SrcSearchReq.BookInfo.Author}
            <span>; </span>
          </span>
        )}
      {this.props.searchOpts !== undefined &&
        this.props.searchOpts.SrcSearchReq !== undefined &&
        this.props.searchOpts.SrcSearchReq.BookLevel &&
        this.props.searchOpts.SrcSearchReq.BookLevel.LexileLevel && (
          <span className="search-results__content--title">
            (Lexile range) {this.props.searchOpts.SrcSearchReq.BookLevel.LexileLevel.Min} -{' '}
            {this.props.searchOpts.SrcSearchReq.BookLevel.LexileLevel.Max}
            <span>; </span>
          </span>
        )}
      {this.props.searchOpts !== undefined &&
        this.props.searchOpts.SrcSearchReq !== undefined &&
        this.props.searchOpts.SrcSearchReq.BookLevel &&
        this.props.searchOpts.SrcSearchReq.BookLevel.ReadingLevel && (
          <span className="search-results__content--title">
            (Reading level range) {this.props.searchOpts.SrcSearchReq.BookLevel.ReadingLevel.Min} -{' '}
            {this.props.searchOpts.SrcSearchReq.BookLevel.ReadingLevel.Max}
            <span>; </span>
          </span>
        )}
      {this.props.searchOpts !== undefined &&
        this.props.searchOpts.SrcSearchReq !== undefined &&
        this.props.searchOpts.SrcSearchReq.BookLevel &&
        this.props.searchOpts.SrcSearchReq.BookLevel.GuidedReadingLevel && (
          <span className="search-results__content--title">
            (Guided Reading level range){' '}
            {this.props.searchOpts.SrcSearchReq.BookLevel.GuidedReadingLevel.Min} -{' '}
            {this.props.searchOpts.SrcSearchReq.BookLevel.GuidedReadingLevel.Max}
            <span>; </span>
          </span>
        )}
      {this.props.searchOpts !== undefined &&
        this.props.searchOpts.SrcSearchReq !== undefined &&
        this.props.searchOpts.SrcSearchReq.BookLevel &&
        this.props.searchOpts.SrcSearchReq.BookLevel.PointLimit && (
          <span className="search-results__content--title">
            (Points range) {this.props.searchOpts.SrcSearchReq.BookLevel.PointLimit.Min} -{' '}
            {this.props.searchOpts.SrcSearchReq.BookLevel.PointLimit.Max}
            <span>; </span>
          </span>
        )}
      {this.props.searchOpts !== undefined &&
        this.props.searchOpts.SrcSearchReq !== undefined &&
        this.props.searchOpts.SrcSearchReq.Awards && (
          <span className="search-results__content--title">
            (Award) {`${this.showAwards()}`}
            <span>; </span>
          </span>
        )}
      {this.props.searchOpts !== undefined &&
        this.props.searchOpts.SrcSearchReq !== undefined &&
        this.props.searchOpts.SrcSearchReq.ComprehensionSkills && (
          <span className="search-results__content--title">
            (ComprehensionSkill) {`${this.showComprehensionSkills()}`}
            <span>; </span>
          </span>
        )}
      {this.props.searchOpts !== undefined &&
        this.props.searchOpts.SrcSearchReq !== undefined &&
        this.props.searchOpts.SrcSearchReq.Cultures && (
          <span className="search-results__content--title">
            (Culture) {`${this.showCultures()}`}
            <span>; </span>
          </span>
        )}
      {this.props.searchOpts !== undefined &&
        this.props.searchOpts.SrcSearchReq !== undefined &&
        this.props.searchOpts.SrcSearchReq.Genres && (
          <span className="search-results__content--title">
            (Genre) {`${this.showGenres()}`}
            <span>; </span>
          </span>
        )}
      {this.props.searchOpts !== undefined &&
        this.props.searchOpts.SrcSearchReq !== undefined &&
        this.props.searchOpts.SrcSearchReq.InterestLevels && (
          <span className="search-results__content--title">
            (InterestLevel) {`${this.showInterestLevels()}`}
            <span>; </span>
          </span>
        )}
      {this.props.searchOpts !== undefined &&
        this.props.searchOpts.SrcSearchReq !== undefined &&
        this.props.searchOpts.SrcSearchReq.Programs && (
          <span className="search-results__content--title">
            (Program/Series) {`${this.showPrograms()}`}
            <span>; </span>
          </span>
        )}
      {this.props.searchOpts !== undefined &&
        this.props.searchOpts.SrcSearchReq !== undefined &&
        this.props.searchOpts.SrcSearchReq.Themes && (
          <span className="search-results__content--title">
            (Theme) {`${this.showThemes()}`}
            <span>; </span>
          </span>
        )}
      {this.props.searchOpts !== undefined &&
        this.props.searchOpts.SrcSearchReq !== undefined &&
        this.props.searchOpts.SrcSearchReq.Topics && (
          <span className="search-results__content--title">
            (Topic) {`${this.showTopics()}`}
            <span>; </span>
          </span>
        )}
      {Object.keys(this.props.searchOpts).length === 0 && (
        <span className="search-results__content--title">(Teacher Made) All </span>
      )}
    </p>
  );

  showTruncateResults = () => {
    const childWidth = this.searchResultsReq.offsetWidth;
    if (childWidth > 500) {
      this.setState({
        hoverResults: true,
      });
    }
  };

  hideTruncateResults = () => {
    this.setState({
      hoverResults: false,
    });
  };

  renderCountResultsIdsChecked = () =>
    this.props.searchResultsContainersearchResultsIdsChecked.length;
  renderCountInfo = () => {
    const cssClassName = 'search-results__count';
    let result = <div className={cssClassName} />;
    let low = 0;
    let high = 0;
    let totalItems = 0;
    const searchedFilters = this.state.searchFilterInfo;
    if (this.props.searchResults.itemCount) {
      if (
        isNaN(this.props.searchResults.itemCount) ||
        Number(this.props.searchResults.itemCount) <= UNINITIALIZED_ITEM_COUNT
      ) {
        result = <div className={cssClassName} />;
      } else if (
        isNaN(this.props.searchResults.itemCount) ||
        Number(this.props.searchResults.itemCount) === 0
      ) {
        result = (
          <div
            className={cssClassName}
          >{`Items ${low} - ${high} of ${totalItems} ${searchedFilters}`}</div>
        );
      } else {
        totalItems = Number(this.props.searchResults.itemCount);
        const curPage = Number(this.props.searchResults.paginationData.current_page);
        const ipp = Number(this.props.searchResults.paginationData.items_per_page);
        low = curPage * ipp + 1;
        high = (curPage + 1) * ipp > totalItems ? totalItems : (curPage + 1) * ipp;

        result = (
          <div
            className={cssClassName}
          >{`Items ${low} - ${high} of ${totalItems} ${searchedFilters}`}</div>
        );
      }
    }
    return result;
  };
  renderCountResultsIdsChecked = () =>
    this.props.searchResultsContainersearchResultsIdsChecked.length;

  render() {
    const searchResultsContainersearchResultsIdsChecked = this.props
      .searchResultsContainersearchResultsIdsChecked;
    return (
      <div className="search-tabs-content advance-search__wrapper">
        <div onMouseEnter={this.showTruncateResults} onMouseLeave={this.hideTruncateResults}>
          {this.truncateSearchResults()}
        </div>

        {this.state.hoverResults ? (
          <div className="search-results__hover-truncate">{this.truncateSearchResults()}</div>
        ) : null}

        <div className="collection-search__wrapper">
          <span>Show quizzes in: </span>
          <CollectionsList
            onChange={this.props.onCollectionsChange}
            data={this.props.collectionsList}
          />

          <div className="collection-search-items-count">{this.renderCountInfo()}</div>
        </div>

        <div className="search-results__wrapper">
          <ResultsTable
            searchResults={this.props.searchResults}
            searchResultsIdsChecked={searchResultsContainersearchResultsIdsChecked}
            selectAll={this.resultSelectAll()}
            handleRowCheckboxOnChange={this.handleRowCheckboxOnChange}
            handleRowSelections={this.handleRowSelections}
            toggleAllCheckboxes={this.toggleAllCheckboxes}
            showSearchResultDetail={this.props.showSearchResultDetailsRequest}
            searchDetailModal={this.searchResultDetailsRequest}
            handleSortResultsClick={this.handleSortResultsClick}
            handleSortResultsOnClick={this.props.handleSortResultsOnClick}
          />
        </div>
        <BooksPaginator
          data={this.props.searchResults.paginationData}
          handlePaginatedSearch={this.handlePaginateSearch}
        />

        <div className="collection-result">
          <div className="collection-search-block">
            <p>
              <strong>{this.renderCountResultsIdsChecked()} Records in Custom List</strong> <br />
              Checked items are added to the Custom List.
            </p>
            <Link to="/books/quiz/custom" className="button-primary">
              View Custom List
            </Link>
          </div>

          <div className="collection-search-items-count install-quiz-desc">
            <img style={{ width: '18px' }} src={myDisk} alt="SAM" />{' '}
            <span className="collection-search-items__count-activate--quiz">Installed Quiz</span>{' '}
            <br />
            <img style={{ width: '18px' }} src={myNoDisk} alt="SAM" />
            <span className="collection-search-items__count-deactivate--quiz">
              Deactivated Quiz
            </span>
          </div>
        </div>
      </div>
    );
  }
}

SearchResults.defaultProps = {
  searchResults: {},
  productsAvailable: [],
};

SearchResults.propTypes = {
  searchResults: PropTypes.object.isRequired,
  collectionsList: PropTypes.array.isRequired,
  onCollectionsChange: PropTypes.func.isRequired,
  handleSelectedItems: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  handleSaveOnClick: PropTypes.func.isRequired,
  searchOpts: PropTypes.object.isRequired,
  searchResultDetailsRequest: PropTypes.func.isRequired,
  showSearchResultDetailsRequest: PropTypes.func,
  getselectedbookresults: PropTypes.func.isRequired,
  searchResultsContainerselectedrows: PropTypes.array,
  searchResultsContainersearchResultsIdsChecked: PropTypes.array.isRequired,
  handleSortResultsOnClick: PropTypes.func,
};

export default SearchResults;
