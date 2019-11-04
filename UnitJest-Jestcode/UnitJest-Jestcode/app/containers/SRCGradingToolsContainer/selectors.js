import { createSelector } from 'reselect';

/**
 * Direct selector to the state domain
 */
const selectGradingToolsData = state => state.get('srcGradingToolsData');

const makeSelectGradingToolsScoreData = () =>
  createSelector(selectGradingToolsData, searchState =>
    searchState.get('srcGradingToolsScoresData').toJS()
  );

const makeSelectGradingToolsPointsData = () =>
  createSelector(selectGradingToolsData, searchState =>
    searchState.get('srcGradingToolsPointsData').toJS()
  );

const makeSelectQuizSearchResults = () =>
  createSelector(selectGradingToolsData, searchState =>
    searchState.get('srcQuizSearchResults').toJS()
  );

const makeSelectQuizSearchPaginationData = () =>
  createSelector(selectGradingToolsData, searchState => searchState.get('paginationData').toJS());

const makeSelectQuizSearchItemCount = () =>
  createSelector(selectGradingToolsData, searchState => searchState.get('itemCount'));

const makeSelectIsLoading = () =>
  createSelector(selectGradingToolsData, searchState => searchState.get('loading'));

export {
  makeSelectGradingToolsScoreData,
  makeSelectGradingToolsPointsData,
  makeSelectQuizSearchResults,
  makeSelectQuizSearchPaginationData,
  makeSelectQuizSearchItemCount,
  makeSelectIsLoading,
};
