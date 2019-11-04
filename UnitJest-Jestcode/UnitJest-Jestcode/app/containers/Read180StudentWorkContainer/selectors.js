import { createSelector } from 'reselect';

/**
 * Direct selector to the read180StudentWorkContainer state domain
 */
const selectRead180StudentWorkContainerDomain = state => state.get('read180StudentWorkContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Read180StudentWorkContainer
 */

const makeSelectRead180StudentWorkContainer = () =>
  createSelector(selectRead180StudentWorkContainerDomain, substate => substate.toJS());

export default makeSelectRead180StudentWorkContainer;
export { selectRead180StudentWorkContainerDomain };
