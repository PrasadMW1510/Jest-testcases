import { createSelector } from 'reselect';

/**
 * Direct selector to the studentWorkProgramsContainer state domain
 */
const selectStudentWorkProgramsContainerDomain = state => state.get('studentWorkProgramsContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by StudentWorkProgramsContainer
 */

const makeSelectStudentWorkProgramsContainer = () =>
  createSelector(selectStudentWorkProgramsContainerDomain, substate => substate.toJS());

export default makeSelectStudentWorkProgramsContainer;
export { selectStudentWorkProgramsContainerDomain };
