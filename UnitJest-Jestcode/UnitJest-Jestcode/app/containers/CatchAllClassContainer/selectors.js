import { createSelector } from 'reselect';

/**
 * Direct selector to the catchAllClassContainer state domain
 */
const selectCatchAllClassContainerDomain = state => state.get('catchAllClassContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by CatchAllClassContainer
 */

const makeSelectCatchAllClassContainer = () =>
  createSelector(selectCatchAllClassContainerDomain, substate => substate.toJS());

export default makeSelectCatchAllClassContainer;
export { selectCatchAllClassContainerDomain };
