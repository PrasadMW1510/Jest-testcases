import { createSelector } from 'reselect';

/**
 * Direct selector to the clearRosterModal state domain
 */
export const selectClearRosterModalContainerDomain = state =>
  state.get('clearRosterModalContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by ClearRosterModal
 */

const makeSelectClearRosterModalContainer = () =>
  createSelector(selectClearRosterModalContainerDomain, substate => substate);

export default makeSelectClearRosterModalContainer;
