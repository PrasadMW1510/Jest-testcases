import { createSelector } from 'reselect';

/**
 * Direct selector to the reactivateClassModalContainer state domain
 */
const selectReactivateClassModalContainerDomain = state =>
  state.get('reactivateClassModalContainer');

/**
 * Default selector used by ReactivateClassModalContainer
 */

const makeSelectReactivateClassModalContainer = () =>
  createSelector(selectReactivateClassModalContainerDomain, substate => substate.toJS());

export default makeSelectReactivateClassModalContainer;
export { selectReactivateClassModalContainerDomain };
