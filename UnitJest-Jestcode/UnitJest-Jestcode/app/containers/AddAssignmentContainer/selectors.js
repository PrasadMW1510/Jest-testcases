import { createSelector } from 'reselect';

/**
 * Direct selector to the addAssignmentContainer state domain
 */
const selectAddAssignmentContainerDomain = state => state.get('addAssignmentContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddAssignmentContainer
 */

const makeSelectAddAssignmentContainer = () =>
  createSelector(selectAddAssignmentContainerDomain, substate => substate.toJS());

export default makeSelectAddAssignmentContainer;
export { selectAddAssignmentContainerDomain };
