import { createSelector } from 'reselect';

/**
 * Direct selector to the DeactivateGroupModalContainer state domain
 */
const selectDeactivateGroupModalContainerDomain = state => state.get('deactivateGroup');

/**
 * Other specific selectors
 */

/**
 * Default selector used by DeactivateGroupModalContainer
 */

const makeSelectDeactivateGroupModalContainer = () =>
  createSelector(selectDeactivateGroupModalContainerDomain, substate => substate);

export { makeSelectDeactivateGroupModalContainer };
