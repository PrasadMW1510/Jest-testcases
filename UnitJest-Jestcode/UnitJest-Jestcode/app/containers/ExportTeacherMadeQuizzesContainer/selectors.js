import { createSelector } from 'reselect';

/**
 * Direct selector to the exportTeacherMadeQuizzesContainer state domain
 */
const selectExportTeacherMadeQuizzesContainerDomain = state =>
  state.get('exportTeacherMadeQuizzesContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by ExportTeacherMadeQuizzesContainer
 */

const makeSelectExportTeacherMadeQuizzesContainer = () =>
  createSelector(selectExportTeacherMadeQuizzesContainerDomain, substate => substate.toJS());

export default makeSelectExportTeacherMadeQuizzesContainer;
export { selectExportTeacherMadeQuizzesContainerDomain };
