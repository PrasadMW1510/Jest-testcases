import { createSelector } from 'reselect';

/**
 * Direct selector to the loadingController state domain
 */
const selectLoadingControllerDomain = state => state.get('loadingController');

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoadingController
 */

const makeSelectLoadingController = () =>
  createSelector(selectLoadingControllerDomain, substate => substate);

export default makeSelectLoadingController;
export { selectLoadingControllerDomain };
