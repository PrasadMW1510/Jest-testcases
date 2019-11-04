import { createSelector } from 'reselect';

/**
 * Direct selector to the S44NGSettingContainer state domain
 */
const selectS44NGSettingContainerDomain = state => state.get('s44NGSettingContainer');

/**
 * Default selector used by S44NGSettingContainer
 */
const makeSelectS44NGSettingContainer = () =>
  createSelector(selectS44NGSettingContainerDomain, substate => substate);

/**
 * Other specific selectors
 */

export { makeSelectS44NGSettingContainer };
