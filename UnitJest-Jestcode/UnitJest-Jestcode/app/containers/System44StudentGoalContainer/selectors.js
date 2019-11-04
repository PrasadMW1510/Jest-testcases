import { createSelector } from 'reselect';

/**
 * Direct selector to the system44StudentGoalContainer state domain
 */
const selectSystem44StudentGoalContainerDomain = state => state.get('system44StudentGoalContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by System44StudentGoalContainer
 */

const makeSelectSystem44StudentGoalContainer = () =>
  createSelector(selectSystem44StudentGoalContainerDomain, substate => substate.toJS());

export default makeSelectSystem44StudentGoalContainer;
export { selectSystem44StudentGoalContainerDomain };
