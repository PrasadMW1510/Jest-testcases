import { createSelector } from 'reselect';

/**
 * Direct selector to the system44SuccessRecordContainer state domain
 */
const selectSystem44SuccessRecordContainerDomain = state =>
  state.get('system44SuccessRecordContainer');

/**
 * Other specific selectors
 */
/**
 * Default selector used by System44SuccessRecordContainer
 */

const makeSelectSystem44SuccessRecordContainer = () =>
  createSelector(selectSystem44SuccessRecordContainerDomain, substate => substate.toJS());

export default makeSelectSystem44SuccessRecordContainer;
export { selectSystem44SuccessRecordContainerDomain };
