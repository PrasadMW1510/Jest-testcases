import { createSelector } from 'reselect';

/**
 * Direct selector to the searchResultDetailsContainer state domain
 */
const selectSearchResultDetailsContainerDomain = state => state.get('searchResultDetailsContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by SearchResultDetailsContainer
 */
const makeSelectSearchResultDetailsContainer = () =>
  createSelector(selectSearchResultDetailsContainerDomain, substate => substate.toJS());

export default makeSelectSearchResultDetailsContainer;
export { selectSearchResultDetailsContainerDomain };
