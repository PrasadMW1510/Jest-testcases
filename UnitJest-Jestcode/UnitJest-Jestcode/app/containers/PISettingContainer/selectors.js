import { createSelector } from 'reselect';

/**
 * Direct selector to the piSettingContainer state domain
 */
const selectPISettingContainerDomain = state => state.get('piSettingContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by PISettingContainer
 */

const makeSelectPISettingContainer = () =>
  createSelector(selectPISettingContainerDomain, substate => substate);
export { makeSelectPISettingContainer };
