import { createSelector } from 'reselect';

/**
 * Direct selector to the DeactivateClassModalContainer state domain
 */
const selectDeactivateClassModalContainerDomain = state => state.get('deactivateClass');

/**
 * Other specific selectors
 */

/**
 * Default selector used by DeactivateClassModalContainer
 */

const makeSelectDeactivateClassModalContainer = () =>
  createSelector(selectDeactivateClassModalContainerDomain, substate => substate);

export { makeSelectDeactivateClassModalContainer };
