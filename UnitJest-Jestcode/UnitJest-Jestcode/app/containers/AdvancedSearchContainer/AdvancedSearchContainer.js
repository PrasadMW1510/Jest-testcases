/**
 *
 * AdvancedSearchContainer
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import AdvancedSearch from 'components/AdvancedSearch';
import { fromJS } from 'immutable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  showTeacherMadeQuiz,
  showEditQuizCollectionNames,
  showMessageLogModal,
} from 'containers/ModalController/actions';
import {
  clearSearchOptions,
  getAllTeacherMadeQuizDataRequest,
} from '../SearchResultsContainer/actions';
import { clearSearchTerm } from '../BookQuizContainer/actions';

import makeSelectAdvancedSearchContainer, { makeSelectGlobalBookResultData } from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  getAwardsDataRequest,
  getComskillDataRequest,
  getCultureDataRequest,
  getGenreDataRequest,
  getInterestLevelDataRequest,
  getProgramSeriesDataRequest,
  getTopicsDataRequest,
  getThemesDataRequest,
  getInstalledQuizCountDataRequest,
  getSearchResultsRequest,
  getBookResult,
  getBookSearchFilters,
} from './actions';

import * as Constants from './constants';

export class AdvancedSearchContainer extends PureComponent {
  componentDidMount() {
    this.props.getAwardsDataRequest();
    this.props.getComskillDataRequest();
    this.props.getCultureDataRequest();
    this.props.getGenreDataRequest();
    this.props.getInterestLevelDataRequest();
    this.props.getProgramSeriesDataRequest();
    this.props.getTopicsDataRequest();
    this.props.getThemesDataRequest();
    this.props.getInstalledQuizCountDataRequest();
    this.props.getAllTeacherMadeQuizDataRequest();

    if (this.props.searchbookresult === '1') {
      this.props.getBookResult('1');
    } else {
      this.props.getBookResult();
    }

    const searchFormInitialState = {
      title: '',
      author: '',
      booktype: '',
      lang: '',
      accessibility: '',
      lexilemin: '',
      lexilemax: '',
      readinglevelmin: '',
      readinglevelmax: '',
      guidereadinglevelmin: '',
      guidereadinglevelmax: '',
      pointsrangemin: '',
      pointsrangemax: '',
      awardsinfo: [],
      comprehensionlist: [],
      culturelist: [],
      genrelist: [],
      interestlevellist: [],
      programserieslist: [],
      topicslist: [],
      themedatalist: [],
    };

    this.props.getBookSearchFilters(searchFormInitialState);
  }

  handleDisplayTeacher = () => {
    const opts = {};
    this.props.clearSearchTerm();
    this.props.clearSearchOptions();
    this.props.getBookResult(Constants.BOOK_RESULT_GO);
    this.props.getSearchResultsRequest(opts);
  };

  handleSearch = (opts, searchfilters) => {
    this.props.getSearchResultsRequest(opts);
    this.props.getBookResult(Constants.BOOK_RESULT_GO);
    this.props.getBookSearchFilters(searchfilters);
    this.props.getAllTeacherMadeQuizDataRequest(searchfilters);
    this.props.history.push('/books/quiz/results');
  };

  handleSearchFilters = searchfilters => {
    this.props.getBookSearchFilters(searchfilters);
  };

  handleMessageModal = e => {
    this.props.showMessageLogModal(e);
  };
  render() {
    return (
      <AdvancedSearch
        onSearch={this.handleSearch}
        messageModal={this.handleMessageModal}
        onDisplayTeachers={this.handleDisplayTeacher}
        searchFilters={this.handleSearchFilters}
        awardsData={this.props.advancedSearchContainer.awards}
        comskillData={this.props.advancedSearchContainer.comskill}
        cultureData={this.props.advancedSearchContainer.culture}
        genreData={this.props.advancedSearchContainer.genre}
        interestLevelData={this.props.advancedSearchContainer.interestLevel}
        programSeriesData={this.props.advancedSearchContainer.programSeries}
        topicsData={this.props.advancedSearchContainer.topics}
        themesData={this.props.advancedSearchContainer.themes}
        installedQuizCountData={this.props.advancedSearchContainer.installedQuizCount}
        showTeacherMadeQuizData={this.props.showTeacherMadeQuiz}
        showEditQuizCollectionModalData={this.props.showEditQuizCollectionNames}
        searchFiltersData={this.props.advancedSearchContainer.bookSearchFilters}
        clearSearchOptions={this.props.clearSearchOptions}
        clearSearchTerm={this.props.clearSearchTerm}
      />
    );
  }
}

AdvancedSearchContainer.defaultProps = {
  advancedSearchContainer: fromJS({}),
};

AdvancedSearchContainer.propTypes = {
  advancedSearchContainer: PropTypes.object,
  getAwardsDataRequest: PropTypes.func.isRequired,
  getComskillDataRequest: PropTypes.func.isRequired,
  getCultureDataRequest: PropTypes.func.isRequired,
  getGenreDataRequest: PropTypes.func.isRequired,
  getInterestLevelDataRequest: PropTypes.func.isRequired,
  getProgramSeriesDataRequest: PropTypes.func.isRequired,
  getTopicsDataRequest: PropTypes.func.isRequired,
  getThemesDataRequest: PropTypes.func.isRequired,
  getInstalledQuizCountDataRequest: PropTypes.func.isRequired,
  showTeacherMadeQuiz: PropTypes.func,
  showEditQuizCollectionNames: PropTypes.func,
  getSearchResultsRequest: PropTypes.func.isRequired,
  showMessageLogModal: PropTypes.func.isRequired,
  getBookResult: PropTypes.func.isRequired,
  getBookSearchFilters: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  searchbookresult: PropTypes.string.isRequired,
  clearSearchOptions: PropTypes.func.isRequired,
  getAllTeacherMadeQuizDataRequest: PropTypes.func.isRequired,
  clearSearchTerm: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  advancedSearchContainer: makeSelectAdvancedSearchContainer(),
  searchbookresult: makeSelectGlobalBookResultData(),
});

const withConnect = connect(mapStateToProps, {
  getAwardsDataRequest,
  getComskillDataRequest,
  getCultureDataRequest,
  getGenreDataRequest,
  getInterestLevelDataRequest,
  getProgramSeriesDataRequest,
  getTopicsDataRequest,
  getThemesDataRequest,
  getInstalledQuizCountDataRequest,
  showTeacherMadeQuiz,
  showEditQuizCollectionNames,
  getSearchResultsRequest,
  getBookResult,
  showMessageLogModal,
  getBookSearchFilters,
  clearSearchOptions,
  getAllTeacherMadeQuizDataRequest,
  clearSearchTerm,
});

const withReducer = injectReducer({ key: 'advancedSearchContainer', reducer });
const withSaga = injectSaga({ key: 'advancedSearchContainer', saga });

export default compose(withReducer, withSaga, withConnect)(AdvancedSearchContainer);
