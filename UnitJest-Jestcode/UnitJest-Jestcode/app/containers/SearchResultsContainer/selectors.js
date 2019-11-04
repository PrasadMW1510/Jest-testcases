import { createSelector } from 'reselect';

/**
 * Direct selector to the searchResultsContainer state domain
 */
const selectSearchResultsContainerDomain = state => state.get('searchResultsContainer');
/**
 * Other specific selectors
 */

/**
 * Default selector used by SearchResultsContainer
 */

const makeSelectSearchResultsContainer = () =>
  createSelector(selectSearchResultsContainerDomain, substate => {
    if (substate !== undefined) {
      return substate.toJS();
    }
    return substate;
  });

const getselectedBookingResults = () =>
  createSelector(selectSearchResultsContainerDomain, substate => substate);

export default makeSelectSearchResultsContainer;
export { selectSearchResultsContainerDomain, getselectedBookingResults };
