import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { fromJS } from 'immutable';

import AdvancedSearchContainer from 'containers/AdvancedSearchContainer';
import SearchResultsContainer from 'containers/SearchResultsContainer';
import CustomListContainer from 'containers/CustomListContainer';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import SearchTabBar from 'components/SearchTabBar/SearchTabBar';
// import CustomListContainer from 'components/CustomList';
import QuickSearch from 'components/QuickSearch';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getBookResult } from 'containers/AdvancedSearchContainer/actions';
import { getSearchResultsRequest, resetSearchResultsData, setSearchTerm } from './actions';
import makeSelectBookQuizContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

export class BookQuizContainer extends React.Component {
  state = {
    isOpen: false,
  };

  handleSearch = opts => {
    this.props.history.push('/books/quiz/results');
    this.props.getSearchResultsRequest(opts);
    this.props.getBookResult('1');
  };

  handleResetSearchResults = () => {
    this.props.resetSearchResultsData();
  };

  handleCheckSearch = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleSearchtermChange = term => this.props.setSearchTerm(term);

  render() {
    const { path } = this.props.match;
    const { searchTerm } = this.props.bookQuizContainer.toJS();
    return (
      <div className="book-quiz-page">
        <QuickSearch
          onSearch={this.handleSearch}
          onResetSearchResults={this.handleResetSearchResults}
          onSearchtermChange={this.handleSearchtermChange}
          searchTerm={searchTerm}
        />
        <div className="search-tab-wrapper">
          <SearchTabBar />
          <div>
            <Switch>
              <Route path={`${path}/advanced`} component={AdvancedSearchContainer} />
              <Route path={`${path}/results`} component={SearchResultsContainer} />
              <Route path={`${path}/custom`} component={CustomListContainer} />
              <Redirect to={`${path}/advanced`} />
            </Switch>
          </div>
        </div>

        <SAMModal
          modalClassModifier="error-modal"
          isOpen={this.state.isOpen}
          contentLabel="Error Modal"
        >
          <div className="error-modal__message">
            Please enter a search term to view the information on this tab.
          </div>
          <SAMButton isPrimaryButton className="error-modal__ok" onClickHandler={this.handleClose}>
            Ok
          </SAMButton>
        </SAMModal>
      </div>
    );
  }
}

BookQuizContainer.defaultProps = {
  bookQuizContainer: fromJS({}),
};

BookQuizContainer.propTypes = {
  match: PropTypes.object.isRequired,
  getSearchResultsRequest: PropTypes.func.isRequired,
  resetSearchResultsData: PropTypes.func.isRequired,
  getBookResult: PropTypes.func.isRequired,
  history: PropTypes.object,
  setSearchTerm: PropTypes.func.isRequired,
  bookQuizContainer: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bookQuizContainer: makeSelectBookQuizContainer(),
});

const withConnect = connect(mapStateToProps, {
  getSearchResultsRequest,
  resetSearchResultsData,
  getBookResult,
  setSearchTerm,
});

const withReducer = injectReducer({ key: 'bookQuizContainer', reducer });
const withSaga = injectSaga({ key: 'bookQuizContainer', saga });

export default compose(withReducer, withSaga, withConnect)(BookQuizContainer);
