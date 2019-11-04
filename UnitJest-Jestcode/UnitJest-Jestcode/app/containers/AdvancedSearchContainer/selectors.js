import { createSelector } from 'reselect';

/**
 * Direct selector to the advancedSearchContainer state domain
 */
const selectAdvancedSearchContainerDomain = state => state.get('advancedSearchContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdvancedSearchContainer
 */

const makeSelectAdvancedSearchContainer = () =>
  createSelector(selectAdvancedSearchContainerDomain, substate => substate.toJS());

const makeSelectGlobalBookResultData = () =>
  createSelector(selectAdvancedSearchContainerDomain, substate => substate.get('bookResult'));

export default makeSelectAdvancedSearchContainer;
export { selectAdvancedSearchContainerDomain, makeSelectGlobalBookResultData };
