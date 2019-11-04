import { createSelector } from 'reselect';

/**
 * Direct selector to the accountDeleteModalContainer state domain
 */
const selectAccountDeleteModalContainerDomain = state => state.get('accountDeleteModalContainer');

/**
 * Default selector used by AccountDeleteModalContainer
 */

const makeSelectAccountDeleteModalContainer = () =>
  createSelector(selectAccountDeleteModalContainerDomain, substate => substate.toJS());

export default makeSelectAccountDeleteModalContainer;
export { selectAccountDeleteModalContainerDomain };
