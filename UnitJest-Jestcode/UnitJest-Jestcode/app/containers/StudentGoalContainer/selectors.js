import { createSelector } from 'reselect';

/**
 * Direct selector to the studentGoalContainer state domain
 */
const selectStudentGoalContainerDomain = state => state.get('studentGoalContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by StudentGoalContainer
 */

const makeSelectStudentGoalContainer = () =>
  createSelector(selectStudentGoalContainerDomain, substate => substate.toJS());

export default makeSelectStudentGoalContainer;
export { selectStudentGoalContainerDomain };
