import { createSelector } from 'reselect';

/**
 * Direct selector to the editAssignmentContainer state domain
 */
const selectEditAssignmentContainerDomain = state => state.get('editAssignmentContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by EditAssignmentContainer
 */

const makeSelectEditAssignmentContainer = () =>
  createSelector(selectEditAssignmentContainerDomain, substate => substate.toJS());

export default makeSelectEditAssignmentContainer;
export { selectEditAssignmentContainerDomain };
