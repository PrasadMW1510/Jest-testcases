import { createSelector } from 'reselect';

/**
 * Direct selector to the studentWorksContainer state domain
 */
const selectStudentWorksContainerDomain = state => state.get('studentWorksContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by StudentWorksContainer
 */

const schoolList = () =>
  createSelector(selectStudentWorksContainerDomain, substate => substate.toJS());

const makeSelectStudentWorksContainer = () =>
  createSelector(selectStudentWorksContainerDomain, substate => substate.toJS());

export default makeSelectStudentWorksContainer;
export { selectStudentWorksContainerDomain, schoolList };
