import { createSelector } from 'reselect';

/**
 * Direct selector to the read180NgContainer state domain
 */
const selectRead180NgContainerDomain = state => state.get('read180NgContainer');

/**
 * Other specific selectors
 */
/**
 * Default selector used by Read180NgContainer
 */

const makeSelectRead180NgContainer = () =>
  createSelector(selectRead180NgContainerDomain, substate => substate.toJS());
export default makeSelectRead180NgContainer;
export { selectRead180NgContainerDomain };
