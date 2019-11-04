import { createSelector } from 'reselect';

/**
 * Direct selector to the DeactivateStudentModalContainer state domain
 */
const selectDeactivateStudentModalContainerDomain = state => state.get('deactivateStudent');

/**
 * Other specific selectors
 */

/**
 * Default selector used by DeactivateStudentModalContainer
 */

const makeSelectDeactivateStudentModalContainer = () =>
  createSelector(selectDeactivateStudentModalContainerDomain, substate => substate);

export { makeSelectDeactivateStudentModalContainer };
