import { createSelector } from 'reselect';

/**
 * Direct selector to the DeactivateSchoolModalContainer state domain
 */
const selectDeactivateSchoolModalContainerDomain = state => state.get('deactivateSchool');

/**
 * Other specific selectors
 */

/**
 * Default selector used by DeactivateSchoolModalContainer
 */

const makeSelectDeactivateSchoolModalContainer = () =>
  createSelector(selectDeactivateSchoolModalContainerDomain, substate => substate);

export { makeSelectDeactivateSchoolModalContainer };
