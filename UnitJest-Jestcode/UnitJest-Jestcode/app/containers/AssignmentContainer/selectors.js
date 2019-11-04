import { createSelector } from 'reselect';

/**
 * Direct selector to the assignmentContainer state domain
 */
const selectAssignmentContainerDomain = state => state.get('assignmentContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by AssignmentContainer
 */

const makeSelectAssignmentContainer = () =>
  createSelector(selectAssignmentContainerDomain, substate => substate.toJS());

export default makeSelectAssignmentContainer;
export { selectAssignmentContainerDomain };
