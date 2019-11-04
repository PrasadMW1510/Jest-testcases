import { createSelector } from 'reselect';

/**
 * Direct selector to the addRead180NgAssaignmentContainer state domain
 */
const selectRead180NgAssaignmentContainerDomain = state =>
  state.get('addRead180NgAssaignmentContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Read180NgAssaignmentContainer
 */

const makeSelectRead180NgAssaignmentContainer = () =>
  createSelector(selectRead180NgAssaignmentContainerDomain, substate => substate.toJS());

export default makeSelectRead180NgAssaignmentContainer;
export { selectRead180NgAssaignmentContainerDomain };
