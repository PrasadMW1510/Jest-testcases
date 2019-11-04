import { createSelector } from 'reselect';

/**
 * Direct selector to the s44SettingContainer state domain
 */
const selectS44SettingContainerDomain = state => state.get('s44SettingContainer');

/**
 * Default selector used by S44SettingContainer
 */
const makeSelectS44SettingContainer = () =>
  createSelector(selectS44SettingContainerDomain, substate => substate);

export { makeSelectS44SettingContainer };
