import { createSelector } from 'reselect';

/**
 * Direct selector to the searchModalContainer state domain
 */
export const selectClassAssignModalContainerDomain = state =>
  state.get('classAssignModalContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by ClassAssignModalContainer
 */

const makeSelectClassAssignModalContainer = () =>
  createSelector(selectClassAssignModalContainerDomain, substate => substate);

export default makeSelectClassAssignModalContainer;
