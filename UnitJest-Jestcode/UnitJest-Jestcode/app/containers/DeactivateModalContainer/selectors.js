import { createSelector } from 'reselect';

/**
 * Direct selector to the deactivateModalContainer state domain
 */
const selectDeactivateModalContainerDomain = state => state.get('deactivateUser');

/**
 * Other specific selectors
 */

/**
 * Default selector used by DeactivateModalContainer
 */

const makeSelectDeactivateModalContainer = () =>
  createSelector(selectDeactivateModalContainerDomain, substate => substate);

export { makeSelectDeactivateModalContainer };
