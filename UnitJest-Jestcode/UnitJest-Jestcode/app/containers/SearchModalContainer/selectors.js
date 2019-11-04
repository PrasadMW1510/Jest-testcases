import { createSelector } from 'reselect';

/**
 * Direct selector to the searchModalContainer state domain
 */
const selectSearchModalContainerDomain = state => state.get('searchModalContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by SearchModalContainer
 */

const makeSelectSearchModalContainer = () =>
  createSelector(selectSearchModalContainerDomain, substate => substate);

export default makeSelectSearchModalContainer;
export { selectSearchModalContainerDomain };
