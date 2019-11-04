import { createSelector } from 'reselect';

/**
 * Direct selector to the reactivateSchoolModalContainer state domain
 */
const selectReactivateSchoolModalContainerDomain = state =>
  state.get('reactivateSchoolModalContainer');

/**
 * Default selector used by ReactivateSchoolModalContainer
 */

const makeSelectReactivateSchoolModalContainer = () =>
  createSelector(selectReactivateSchoolModalContainerDomain, substate => substate.toJS());

export default makeSelectReactivateSchoolModalContainer;
export { selectReactivateSchoolModalContainerDomain };
