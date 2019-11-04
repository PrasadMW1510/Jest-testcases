import { createSelector } from 'reselect';

/**
 * Direct selector to the pssettingContainer state domain
 */
const selectPssettingContainerDomain = state => state.get('psSettingContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by PssettingContainer
 */

const makeSelectPSSettingContainer = () =>
  createSelector(selectPssettingContainerDomain, substate => substate);

export { makeSelectPSSettingContainer };
